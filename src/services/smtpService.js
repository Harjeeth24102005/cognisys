/**
 * Cognisys Clean Modern Frontend Mail Service (Static - No Backend Required)
 * 
 * Supports:
 * 1. Web3Forms API (Direct JSON POST over HTTPS - clean modern API)
 * 2. EmailJS Browser SDK (Direct client-side sending through your verified Gmail)
 * 3. StaticForms API (api.staticforms.xyz/submit)
 * 4. Direct Gmail Web & Native Mailto Protocol (Instant 1-click delivery prefilled with all details)
 */

import emailjs from '@emailjs/browser';

export const EMAIL_API_CONFIG = {
  // Official Cognisys administrative receiver email
  receiverEmail: 'contact.cognisys@gmail.com',

  // Official direct emergency helpline
  helplinePhone: '8248349844',

  // Resend API (resend.com)
  resend: {
    apiKey: import.meta.env.VITE_RESEND_API_KEY || '',
    from: import.meta.env.VITE_RESEND_FROM || 'Cognisys <onboarding@resend.dev>'
  },

  // Web3Forms API (Instant JSON submission)
  web3Forms: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '' // Add Web3Forms access key here
  },

  // EmailJS Configuration (Direct sending through your Gmail)
  emailJS: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateAdminId: import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || '',
    templateClientId: import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  },

  // StaticForms API
  staticForms: {
    endpoint: 'https://api.staticforms.xyz/submit',
    accessKey: ''
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
 * Dispatches via Resend API (Vite proxy and direct fallback)
 */
async function dispatchViaResend(payload) {
  const apiKey = (EMAIL_API_CONFIG.resend.apiKey || (typeof localStorage !== 'undefined' ? localStorage.getItem('cognisys_resend_key') : '') || '').trim();
  if (!apiKey) {
    return { success: false, provider: 'Resend', error: 'VITE_RESEND_API_KEY is not configured in .env' };
  }

  const clientEmail = payload.email || payload.customer_email || 'client@cognisys.ai';
  const clientName = payload.name || payload.customer_name || 'Valued Client';
  const orderNumber = payload.order_number || `COG-2026-${Math.random().toString(16).slice(2, 8).toUpperCase()}`;
  const title = payload.project_title || payload.title || payload.subject || 'Website Inquiry';
  const subject = payload.subject || payload.title || 'General / Custom Inquiry';
  const serviceName = payload.service_domain || payload.service_name || 'General / Custom Inquiry';
  const message = payload.message || payload.description || payload.specifications || payload.inquiry_details || 'No additional specifications provided.';
  const budget = payload.estimated_budget || payload.budget || 'Inquiry';
  const timeline = payload.target_delivery || payload.timeline || 'Direct Inquiry';
  const techPreferences = payload.architecture_preference || payload.tech_preferences || 'Default Recommended Stack';
  const phone = payload.phone || payload.customer_phone || '8248349844';
  const dateStr = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  const finalSubject = `[NEW PROJECT ORDER #${orderNumber}] - ${title}`;

  // Exact dark-gold executive specification card matching official Cognisys format
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${finalSubject}</title>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #050b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0b1528; border: 1px solid #1e293b; border-radius: 14px; padding: 28px 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);">
        
        <!-- Top Badge -->
        <div style="margin-bottom: 14px;">
          <span style="display: inline-block; background-color: #f59e0b; color: #0b132b; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase;">
            COGNISYS PROJECT SPECIFICATION
          </span>
        </div>

        <!-- Main Order Title -->
        <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.3px;">
          Order #${orderNumber}
        </h1>

        <!-- Submitted At -->
        <div style="color: #f59e0b; font-size: 12px; font-weight: 500; margin-bottom: 22px;">
          Submitted at: ${dateStr}
        </div>

        <!-- Divider line -->
        <div style="border-top: 1px solid rgba(245, 158, 11, 0.35); margin-bottom: 20px;"></div>

        <!-- Section 1: Client Contact Details -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            CLIENT CONTACT DETAILS
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Name:</strong> <span style="font-weight: 700;">${clientName}</span></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Email:</strong> <a href="mailto:${clientEmail}" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">${clientEmail}</a></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Phone:</strong> ${phone}</div>
          </div>
        </div>

        <!-- Section 2: Project Domain & Title -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            PROJECT DOMAIN &amp; TITLE
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Service:</strong> ${serviceName}</div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Project Title:</strong> <span style="font-weight: 700;">${title}</span></div>
          </div>
        </div>

        <!-- Section 3: Requirements & Technical Specifications -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            REQUIREMENTS &amp; TECHNICAL SPECIFICATIONS
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.6;">
            <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">[CONTACT MESSAGE]</div>
            <div style="color: #cbd5e1; font-weight: 600; margin-bottom: 8px;">Subject: ${subject}</div>
            <div style="color: #ffffff; white-space: pre-line; word-break: break-word;">${message}</div>
          </div>
        </div>

        <!-- Section 4: Budget & Target Delivery Timeline -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            BUDGET &amp; TARGET DELIVERY TIMELINE
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Estimated Budget:</strong> ${budget}</div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Target Delivery:</strong> ${timeline}</div>
          </div>
        </div>

        <!-- Section 5: Tech Stack Preferences -->
        <div style="margin-bottom: 22px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            TECH STACK PREFERENCES
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-radius: 8px; padding: 14px 16px; font-size: 13px; color: #ffffff;">
            ${techPreferences}
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #1e293b; padding-top: 18px; font-size: 11px; color: #64748b; text-align: center;">
          Automated Transmission to <a href="mailto:contact.cognisys@gmail.com" style="color: #38bdf8; text-decoration: none;">contact.cognisys@gmail.com</a> from cognisys.
        </div>
      </div>
    </body>
    </html>
  `;

  const requestBody = {
    from: EMAIL_API_CONFIG.resend.from || 'Cognisys <onboarding@resend.dev>',
    to: [EMAIL_API_CONFIG.receiverEmail],
    reply_to: clientEmail,
    subject: finalSubject,
    html: htmlContent
  };

  const endpoints = [
    '/api/resend/emails',
    'https://api.resend.com/emails'
  ];

  let lastError = null;
  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && (data.id || data.name !== 'validation_error')) {
        return { success: true, provider: 'Resend', id: data.id };
      } else {
        lastError = data.message || `HTTP ${res.status}: ${res.statusText}`;
      }
    } catch (err) {
      lastError = err.message;
      console.warn(`[Resend] Attempt on ${ep} failed:`, err);
    }
  }

  return { success: false, provider: 'Resend', error: lastError || 'Resend dispatch failed' };
}

/**
 * Dispatches via Web3Forms API
 */
async function dispatchViaWeb3Forms(payload) {
  const { endpoint, accessKey } = EMAIL_API_CONFIG.web3Forms;
  if (!accessKey) return null;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        from_name: payload.name || payload.customer_name || 'Cognisys Visitor',
        subject: payload._subject || payload.subject,
        reply_to: payload.email,
        to: EMAIL_API_CONFIG.receiverEmail,
        ...payload
      })
    });

    const data = await res.json().catch(() => ({}));
    if (data.success) {
      return { success: true, provider: 'Web3Forms', message: 'Delivered to ' + EMAIL_API_CONFIG.receiverEmail };
    }
    return { success: false, provider: 'Web3Forms', error: data.message };
  } catch (err) {
    console.warn('[Web3Forms] Error:', err);
    return { success: false, provider: 'Web3Forms', error: err.message };
  }
}

/**
 * Dispatches via EmailJS if configured
 */
async function dispatchViaEmailJS(adminParams, clientParams) {
  const { serviceId, templateAdminId, templateClientId, publicKey } = EMAIL_API_CONFIG.emailJS;
  if (!serviceId || !publicKey) return null;

  try {
    const p1 = templateAdminId 
      ? emailjs.send(serviceId, templateAdminId, adminParams, publicKey)
      : Promise.resolve();

    const p2 = templateClientId 
      ? emailjs.send(serviceId, templateClientId, clientParams, publicKey)
      : Promise.resolve();

    await Promise.all([p1, p2]);
    return { success: true, provider: 'EmailJS' };
  } catch (err) {
    console.warn('EmailJS error:', err);
    return { success: false, provider: 'EmailJS', error: err.message };
  }
}

/**
 * Dispatches via StaticForms API
 */
async function dispatchViaStaticForms(payload) {
  const { endpoint, accessKey } = EMAIL_API_CONFIG.staticForms;
  if (!accessKey) return null;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        accessKey: accessKey,
        ...payload
      })
    });
    const data = await res.json().catch(() => ({}));
    return { success: !!data.success, provider: 'StaticForms' };
  } catch (err) {
    return { success: false, provider: 'StaticForms', error: err.message };
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
    const subject = sanitize(data.subject || 'General Inquiry');
    const message = sanitize(data.message);
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const fullSubject = `[COGNISYS CONTACT] ${subject} from ${clientName}`;

    // 1. Try Resend API
    const resendResult = await dispatchViaResend({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: subject,
      message: message,
      _subject: fullSubject
    });

    // 2. Try EmailJS
    const emailJsResult = await dispatchViaEmailJS(
      {
        to_email: EMAIL_API_CONFIG.receiverEmail,
        receiver_email: EMAIL_API_CONFIG.receiverEmail,
        client_name: clientName,
        from_name: clientName,
        name: clientName,
        client_email: clientEmail,
        from_email: clientEmail,
        email: clientEmail,
        reply_to: clientEmail,
        client_phone: clientPhone,
        phone: clientPhone,
        subject: fullSubject,
        message: message,
        inquiry_details: message,
        submitted_at: dateStr,
        helpline_phone: EMAIL_API_CONFIG.helplinePhone
      },
      {
        to_email: clientEmail,
        client_name: clientName,
        name: clientName,
        to_name: clientName,
        helpline_phone: EMAIL_API_CONFIG.helplinePhone,
        receiver_email: EMAIL_API_CONFIG.receiverEmail,
        autoresponder_message: getAutoresponderMessage(clientName)
      }
    );

    // 2. Try Web3Forms
    const web3Result = await dispatchViaWeb3Forms({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: subject,
      message: message,
      submitted_on: dateStr,
      receiver: EMAIL_API_CONFIG.receiverEmail,
      emergency_helpline: EMAIL_API_CONFIG.helplinePhone,
      _subject: fullSubject,
      _replyto: clientEmail
    });

    // 3. Try StaticForms
    const staticResult = await dispatchViaStaticForms({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: fullSubject,
      message: message
    });

    // 4. Local persistence
    const inquiryRecord = {
      id: 'INQ-' + Date.now().toString(36).toUpperCase(),
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: subject,
      message: message,
      date: dateStr,
      receiver: EMAIL_API_CONFIG.receiverEmail,
      helpline: EMAIL_API_CONFIG.helplinePhone
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cognisys_inquiries') || '[]');
      existing.unshift(inquiryRecord);
      localStorage.setItem('cognisys_inquiries', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}

    // 5. Construct direct Gmail Web URL for instant 1-click dispatch without any third party
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_API_CONFIG.receiverEmail)}&cc=${encodeURIComponent(clientEmail)}&su=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(`Dear Cognisys Engineering Team,\n\nName: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nSubject: ${subject}\n\nMessage Details:\n${message}\n\nSubmitted on: ${dateStr}\nEmergency Hotline: +91 82483 49844`)}`;

    const isDelivered = (resendResult && resendResult.success) || (emailJsResult && emailJsResult.success) || (web3Result && web3Result.success) || (staticResult && staticResult.success);

    return {
      success: true,
      delivered: !!isDelivered,
      deliveryId: resendResult?.id || null,
      provider: isDelivered ? (resendResult?.success ? 'Resend' : (emailJsResult?.success ? 'EmailJS' : (web3Result?.success ? 'Web3Forms' : 'StaticForms'))) : null,
      error: !isDelivered ? (resendResult?.error || 'Email dispatch failed') : null,
      inquiry: inquiryRecord,
      receiverEmail: EMAIL_API_CONFIG.receiverEmail,
      senderEmail: clientEmail,
      helplinePhone: EMAIL_API_CONFIG.helplinePhone,
      gmailComposeUrl,
      mailtoUrl: this.buildMailtoUrl(EMAIL_API_CONFIG.receiverEmail, clientEmail, fullSubject, `Name: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\n\nMessage:\n${message}`)
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
    const fullSubject = `[COGNISYS ORDER #${orderNumber}] ${title} - ${clientName}`;

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

    // 1. Try Resend API
    const resendResult = await dispatchViaResend({
      order_number: orderNumber,
      client_name: clientName,
      email: clientEmail,
      phone: clientPhone,
      service_domain: serviceName,
      project_title: title,
      specifications: description,
      estimated_budget: budget,
      target_delivery: timeline,
      architecture_preference: tech,
      configured_items: cartSummary,
      _subject: fullSubject
    });

    // 2. EmailJS dispatch if configured
    const emailJsResult = await dispatchViaEmailJS(
      {
        to_email: EMAIL_API_CONFIG.receiverEmail,
        receiver_email: EMAIL_API_CONFIG.receiverEmail,
        order_number: orderNumber,
        client_name: clientName,
        from_name: clientName,
        name: clientName,
        client_email: clientEmail,
        from_email: clientEmail,
        email: clientEmail,
        reply_to: clientEmail,
        client_phone: clientPhone,
        phone: clientPhone,
        service_name: serviceName,
        project_title: title,
        title: title,
        description: description,
        message: description,
        budget: budget,
        timeline: timeline,
        tech_preferences: tech,
        cart_items: cartSummary,
        submitted_at: dateStr,
        helpline_phone: EMAIL_API_CONFIG.helplinePhone
      },
      {
        to_email: clientEmail,
        client_name: clientName,
        name: clientName,
        to_name: clientName,
        order_number: orderNumber,
        helpline_phone: EMAIL_API_CONFIG.helplinePhone,
        receiver_email: EMAIL_API_CONFIG.receiverEmail,
        autoresponder_message: getAutoresponderMessage(clientName)
      }
    );

    // 2. Web3Forms dispatch
    const web3Result = await dispatchViaWeb3Forms({
      order_number: orderNumber,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      service_domain: serviceName,
      project_title: title,
      specifications: description,
      estimated_budget: budget,
      target_delivery: timeline,
      architecture_preference: tech,
      configured_items: cartSummary,
      submitted_on: dateStr,
      receiver: EMAIL_API_CONFIG.receiverEmail,
      emergency_helpline: EMAIL_API_CONFIG.helplinePhone,
      _subject: fullSubject,
      _replyto: clientEmail
    });

    // 3. StaticForms dispatch
    const staticResult = await dispatchViaStaticForms({
      order_number: orderNumber,
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      service: serviceName,
      title: title,
      description: description,
      budget: budget,
      timeline: timeline
    });

    // 4. Local persistence
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

    try {
      const existing = JSON.parse(localStorage.getItem('cognisys_orders') || '[]');
      existing.unshift(createdOrder);
      localStorage.setItem('cognisys_orders', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {}

    // 5. Construct direct Gmail Web URL for instant 1-click dispatch
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL_API_CONFIG.receiverEmail)}&cc=${encodeURIComponent(clientEmail)}&su=${encodeURIComponent(fullSubject)}&body=${encodeURIComponent(`Dear Cognisys Engineering Team,\n\nOrder Ref: #${orderNumber}\nClient: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\nService: ${serviceName}\nProject Title: ${title}\nEstimated Budget: ${budget}\nTimeline: ${timeline}\nTech Preferences: ${tech}\nConfigured Add-ons: ${cartSummary}\n\nProject Specifications:\n${description}\n\nEmergency Helpline: +91 82483 49844`)}`;

    const isDelivered = (resendResult && resendResult.success) || (emailJsResult && emailJsResult.success) || (web3Result && web3Result.success) || (staticResult && staticResult.success);

    return {
      success: true,
      delivered: !!isDelivered,
      deliveryId: resendResult?.id || null,
      provider: isDelivered ? (resendResult?.success ? 'Resend' : (emailJsResult?.success ? 'EmailJS' : (web3Result?.success ? 'Web3Forms' : 'StaticForms'))) : null,
      error: !isDelivered ? (resendResult?.error || 'Email dispatch failed') : null,
      order: createdOrder,
      receiverEmail: EMAIL_API_CONFIG.receiverEmail,
      senderEmail: clientEmail,
      helplinePhone: EMAIL_API_CONFIG.helplinePhone,
      gmailComposeUrl,
      mailtoUrl: this.buildMailtoUrl(EMAIL_API_CONFIG.receiverEmail, clientEmail, fullSubject, `Order #${orderNumber}\nClient: ${clientName}\nEmail: ${clientEmail}\nPhone: ${clientPhone}\n\nSpecifications:\n${description}`)
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
