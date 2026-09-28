/**
 * Cognisys Clean Modern Frontend Mail Service (Static - No Backend Required)
 * 
 * Primary Provider: Formspree API (https://formspree.io)
 * Reliable static form endpoint with direct delivery to contact.cognisys@gmail.com
 * Sets Reply-To header to visitor's email address
 */

export const EMAIL_API_CONFIG = {
  // Official Cognisys administrative receiver email
  receiverEmail: 'contact.cognisys@gmail.com',

  // Official direct emergency helpline
  helplinePhone: '8248349844',

  // Formspree API Configuration (https://formspree.io)
  formspree: {
    formId: import.meta?.env?.VITE_FORMSPREE_FORM_ID || (typeof localStorage !== 'undefined' ? localStorage.getItem('cognisys_formspree_id') : '') || 'mnpnlqpn',
    endpoint: (id = 'mnpnlqpn') => `https://formspree.io/f/${id}`
  }
};

/**
 * Standard auto-responder message template for client confirmation
 */
export function getAutoresponderMessage(clientName = 'Valued Client') {
  return `Dear ${clientName},\n\nThank you for reaching out to Cognisys!\n\nYour mail has been successfully sent to ${EMAIL_API_CONFIG.receiverEmail} with all your submitted details.\n\nThe Cognisys engineering team will review your specifications and contact you soon.\n\nIf you need immediate assistance or wish to speak with our technical team now, please call: ${EMAIL_API_CONFIG.helplinePhone} (+91 82483 49844).\n\nWarm regards,\nCognisys Enterprise & Innovation Labs\nOfficial Dispatch: ${EMAIL_API_CONFIG.receiverEmail}\nDirect Hotline: +91 ${EMAIL_API_CONFIG.helplinePhone}`;
}

/**
 * Sanitizes user input
 */
function sanitize(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"&]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case "'": return '&#39;';
        case '"': return '&quot;';
        case '&': return '&amp;';
        default: return c;
      }
    })
    .trim();
}

/**
 * Dispatches via Formspree API (https://formspree.io/f/{formId})
 * No Cloudflare Turnstile blocks, full CORS support, direct delivery to contact.cognisys@gmail.com
 */
async function dispatchViaFormspree(payload) {
  const rawFormId = (
    EMAIL_API_CONFIG.formspree.formId || 
    (typeof localStorage !== 'undefined' ? localStorage.getItem('cognisys_formspree_id') : '') || 
    ''
  ).trim();

  if (!rawFormId) {
    return {
      success: false,
      delivered: false,
      needsConfig: true,
      provider: 'Formspree',
      error: 'Formspree Form ID is not configured yet. Please provide your Formspree Form ID.'
    };
  }

  // Clean formId in case user passed the full URL e.g. https://formspree.io/f/xyz
  const formId = rawFormId.replace(/^https?:\/\/formspree\.io\/f\//, '').replace(/\/$/, '').trim();
  const endpoint = `https://formspree.io/f/${formId}`;

  const clientEmail = payload.email || payload.customer_email || 'client@cognisys.ai';
  const clientName = payload.name || payload.customer_name || 'Valued Client';
  const title = payload.project_title || payload.title || payload.subject || 'Website Inquiry';
  const fullSubject = payload._subject || payload.subject || `[COGNISYS] ${title} - ${clientName}`;

  try {
    const cleanPayload = { ...payload };
    delete cleanPayload._honey;
    delete cleanPayload._subject;
    delete cleanPayload._replyto;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: clientName,
        email: clientEmail,
        _replyto: clientEmail,
        subject: fullSubject,
        ...cleanPayload
      })
    });

    const data = await res.json().catch(() => ({}));
    if (res.ok && (data.ok || !data.error)) {
      return {
        success: true,
        delivered: true,
        provider: 'Formspree',
        message: 'Delivered directly to ' + EMAIL_API_CONFIG.receiverEmail
      };
    }

    const errMsg = data.errors ? data.errors.map(e => e.message).join(', ') : (data.error || 'Formspree submission failed');
    return {
      success: false,
      delivered: false,
      provider: 'Formspree',
      error: errMsg
    };
  } catch (err) {
    console.warn('[Formspree] Error:', err);
    return {
      success: false,
      delivered: false,
      provider: 'Formspree',
      error: err.message
    };
  }
}

export const smtpService = {
  /**
   * Send a formal contact inquiry with all filled details
   */
  async sendContactInquiry(data) {
    const clientName = sanitize(data.name);
    const clientEmail = sanitize(data.email);
    const clientPhone = sanitize(data.phone || 'Not provided');
    const subject = sanitize(data.subject || 'New Website Enquiry');
    const service = sanitize(data.service || data.service_name || data.subject || 'General Inquiry');
    const message = sanitize(data.message);
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const fullSubject = `[COGNISYS INQUIRY] ${subject} - ${clientName}`;

    const inquiryRecord = {
      id: 'INQ-' + Date.now().toString(36).toUpperCase(),
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: subject,
      service: service,
      message: message,
      date: dateStr,
      receiver: EMAIL_API_CONFIG.receiverEmail,
      helpline: EMAIL_API_CONFIG.helplinePhone
    };

    // Primary Dispatch: Formspree
    const formspreeRes = await dispatchViaFormspree({
      'Client Full Name': clientName,
      'Client Email': clientEmail,
      'Client Phone Number': clientPhone,
      'Subject': subject,
      'Selected Service': service,
      'Project Requirements / Message': message,
      'Submitted At': dateStr,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: subject,
      service: service,
      message: message,
      _subject: fullSubject
    });

    if (formspreeRes && formspreeRes.success) {
      try {
        const existing = JSON.parse(localStorage.getItem('cognisys_inquiries') || '[]');
        existing.unshift(inquiryRecord);
        localStorage.setItem('cognisys_inquiries', JSON.stringify(existing.slice(0, 50)));
      } catch (e) {}

      return {
        success: true,
        delivered: true,
        provider: 'Formspree',
        inquiry: inquiryRecord,
        receiverEmail: EMAIL_API_CONFIG.receiverEmail,
        senderEmail: clientEmail,
        helplinePhone: EMAIL_API_CONFIG.helplinePhone
      };
    }

    return {
      success: false,
      delivered: false,
      needsConfig: formspreeRes?.needsConfig,
      provider: 'Formspree',
      error: formspreeRes?.error || 'Email dispatch failed. Please check your network connection or try again.',
      inquiry: null,
      receiverEmail: EMAIL_API_CONFIG.receiverEmail,
      senderEmail: clientEmail,
      helplinePhone: EMAIL_API_CONFIG.helplinePhone
    };
  },

  /**
   * Send formal project order specifications with all filled details
   */
  async sendOrderSpecifications(orderData) {
    const clientName = sanitize(orderData.customer_name || 'Valued Client');
    const clientEmail = sanitize(orderData.customer_email || 'Not provided');
    const clientPhone = sanitize(orderData.customer_phone || 'Not provided');
    const serviceName = sanitize(orderData.service_name || 'Custom Engineering Solution');
    const title = sanitize(orderData.title || 'Technical Project');
    const description = sanitize(orderData.description || 'Full specifications submitted.');
    const budget = sanitize(orderData.budget || 'Custom Quotation');
    const timeline = sanitize(orderData.timeline || 'Standard Delivery');
    const tech = sanitize(orderData.tech_preferences || 'Modern Architecture');
    const orderNumber = orderData.order_number || `COG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const fullSubject = `[COGNISYS ORDER #${orderNumber}] ${serviceName} - ${title}`;

    let cartSummary = 'None';
    if (Array.isArray(orderData.cart_items) && orderData.cart_items.length > 0) {
      cartSummary = orderData.cart_items
        .map((i, idx) => `${idx + 1}. ${sanitize(i.name || i.title)} (${i.price || i.base_price ? '₹' + (i.price || i.base_price) : 'Included'})`)
        .join(' | ');
    } else if (orderData.cart_items_json) {
      try {
        const items = JSON.parse(orderData.cart_items_json);
        cartSummary = items.map((i, idx) => `${idx + 1}. ${sanitize(i.name || i.title)}`).join(' | ');
      } catch (e) {}
    }

    const createdOrder = {
      ...orderData,
      id: orderData.id || Date.now(),
      order_number: orderNumber,
      customer_name: clientName,
      customer_email: clientEmail,
      customer_phone: clientPhone,
      service_name: serviceName,
      title: title,
      description: description,
      budget: budget,
      timeline: timeline,
      tech_preferences: tech,
      cart_summary: cartSummary,
      status: 'SUBMITTED',
      created_at: new Date().toISOString(),
      receiver: EMAIL_API_CONFIG.receiverEmail,
      helpline: EMAIL_API_CONFIG.helplinePhone
    };

    const formspreeRes = await dispatchViaFormspree({
      'Order / Reference ID': `#${orderNumber}`,
      'Submission Date & Time': dateStr,
      'Client Full Name': clientName,
      'Client Email': clientEmail,
      'Client Phone Number': clientPhone,
      'Service / Domain': serviceName,
      'Project Title / Subject': title,
      'Requirements & Specifications': description,
      'Estimated Budget': budget,
      'Target Delivery Timeline': timeline,
      'Technology Preferences': tech,
      'Configured Add-ons': cartSummary,
      order_number: orderNumber,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      service_domain: serviceName,
      project_title: title,
      specifications: description,
      estimated_budget: budget,
      target_delivery: timeline,
      tech_preferences: tech,
      _subject: fullSubject
    });

    if (formspreeRes && formspreeRes.success) {
      try {
        const existing = JSON.parse(localStorage.getItem('cognisys_orders') || '[]');
        existing.unshift(createdOrder);
        localStorage.setItem('cognisys_orders', JSON.stringify(existing.slice(0, 50)));
      } catch (e) {}

      return {
        success: true,
        delivered: true,
        provider: 'Formspree',
        order: createdOrder,
        receiverEmail: EMAIL_API_CONFIG.receiverEmail,
        senderEmail: clientEmail,
        helplinePhone: EMAIL_API_CONFIG.helplinePhone
      };
    }

    return {
      success: false,
      delivered: false,
      needsConfig: formspreeRes?.needsConfig,
      provider: 'Formspree',
      error: formspreeRes?.error || 'Order specification dispatch failed.',
      order: null,
      receiverEmail: EMAIL_API_CONFIG.receiverEmail,
      senderEmail: clientEmail,
      helplinePhone: EMAIL_API_CONFIG.helplinePhone
    };
  },

  /**
   * Helper to construct native mailto links
   */
  buildMailtoUrl(to = EMAIL_API_CONFIG.receiverEmail, cc, subject, body) {
    const params = new URLSearchParams();
    if (cc) params.append('cc', cc);
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);
    return `mailto:${to}?${params.toString()}`;
  }
};
