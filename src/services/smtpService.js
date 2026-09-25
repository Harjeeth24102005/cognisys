/**
 * Cognisys Frontend SMTP Email Service
 * Enables direct client-side email dispatch via SMTP protocol to contact.cognisys@gmail.com
 * Powered by SMTP.js protocol gateway with resilient local caching and mailto fallback.
 */

const SMTP_CONFIG = {
  host: 'smtp.gmail.com',
  port: 587,
  username: 'contact.cognisys@gmail.com',
  password: 'neheoiotmdkphcva', // Gmail Application Password
  targetEmail: 'contact.cognisys@gmail.com',
  fromName: 'Cognisys Web Inquiries'
};

/**
 * Low-level SMTP client executing the SMTP dispatch protocol via SMTP.js gateway
 */
function sendViaSmtpProtocol({ subject, bodyHtml, clientName, clientEmail }) {
  return new Promise((resolve) => {
    try {
      const payload = {
        Host: SMTP_CONFIG.host,
        Username: SMTP_CONFIG.username,
        Password: SMTP_CONFIG.password,
        To: SMTP_CONFIG.targetEmail,
        From: `${clientName || 'Cognisys Visitor'} <${SMTP_CONFIG.username}>`,
        Subject: subject,
        Body: bodyHtml,
        Action: 'Send',
        nocache: Math.floor(1e6 * Math.random() + 1)
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://smtpjs.com/v3/smtpjs.aspx?', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      xhr.onload = function () {
        const responseText = xhr.responseText || '';
        console.info('[SMTP Frontend Dispatch Response]:', responseText);
        // SMTP.js returns "OK" on success
        if (responseText.trim() === 'OK') {
          resolve({ success: true, message: 'Delivered via SMTP' });
        } else {
          resolve({ success: false, error: responseText || 'SMTP gateway rejected' });
        }
      };

      xhr.onerror = function () {
        console.warn('[SMTP Dispatch Notice] Gateway network unreachable or restricted by browser.');
        resolve({ success: false, error: 'Network or adblocker restriction' });
      };

      xhr.ontimeout = function () {
        console.warn('[SMTP Dispatch Notice] Request timed out.');
        resolve({ success: false, error: 'Connection timeout' });
      };

      xhr.timeout = 10000; // 10 second safety timeout
      xhr.send(JSON.stringify(payload));
    } catch (err) {
      console.warn('[SMTP Client Error]:', err);
      resolve({ success: false, error: err.message });
    }
  });
}

/**
 * Format executive corporate HTML email for contact form submissions
 */
function formatContactHtml({ name, email, phone, subject, message, dateStr }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>[COGNISYS CONTACT INQUIRY] - ${subject || 'New Message'}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          <tr>
            <td height="6" style="background: linear-gradient(90deg, #0b132b 0%, #00b4d8 50%, #7c3aed 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 28px 32px 20px; border-bottom: 1px solid #f1f5f9;">
              <div style="font-size: 24px; font-weight: 800; color: #0b132b;">COGNI<span style="color: #00b4d8;">SYS</span></div>
              <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #64748b; text-transform: uppercase; margin-top: 3px;">
                INNOVATION <span style="color: #00b4d8;">✦</span> INTELLIGENCE <span style="color: #7c3aed;">✦</span> IMPACT
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc;">
              <h2 style="margin: 0 0 4px 0; font-size: 18px; color: #0f172a;">New Contact Inquiry Received</h2>
              <p style="margin: 0; font-size: 13px; color: #64748b;">Delivered via Front-End SMTP Runtime &bull; ${dateStr}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <div style="margin-bottom: 20px;">
                <strong style="font-size: 12px; color: #64748b; text-transform: uppercase;">From:</strong>
                <div style="font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 2px;">${name} &lt;${email}&gt;</div>
                <div style="font-size: 13px; color: #64748b; margin-top: 2px;">Phone: ${phone || 'Not provided'}</div>
              </div>
              <div style="margin-bottom: 20px;">
                <strong style="font-size: 12px; color: #64748b; text-transform: uppercase;">Subject:</strong>
                <div style="font-size: 15px; font-weight: 600; color: #0284c7; margin-top: 2px;">${subject}</div>
              </div>
              <div style="margin-bottom: 24px;">
                <strong style="font-size: 12px; color: #64748b; text-transform: uppercase;">Message:</strong>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 6px; white-space: pre-line;">${message}</div>
              </div>
              <div style="text-align: center;">
                <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" style="display: inline-block; background: #0b132b; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 600;">
                  Reply to ${name} →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 16px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #94a3b8;">
              Cognisys Automated Contact Form Relay &bull; contact.cognisys@gmail.com<br>
              MSME Registered Tech Entity &bull; Direct Line: +91 82483 49844
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Format executive corporate HTML email for Project Orders & Specifications
 */
function formatOrderHtml({ orderNumber, customerName, customerEmail, customerPhone, serviceName, title, description, budget, timeline, techPreferences, cartItems, dateStr }) {
  let cartRows = '';
  if (Array.isArray(cartItems) && cartItems.length > 0) {
    cartRows = cartItems.map((item, idx) => {
      const name = item.name || item.title || `Item #${idx + 1}`;
      const price = item.price || item.base_price ? `₹${item.price || item.base_price}` : 'Configured';
      return `<tr style="border-bottom: 1px solid #f1f5f9;">
        <td style="padding: 10px 12px; font-size: 13px; color: #0f172a;">${name}</td>
        <td style="padding: 10px 12px; font-size: 13px; color: #0284c7; font-weight: 600; text-align: right;">${price}</td>
      </tr>`;
    }).join('');
  }

  const cartSection = cartRows ? `
    <div style="margin-top: 20px; background: #f8fafc; border-radius: 8px; padding: 14px; border: 1px solid #e2e8f0;">
      <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Order Add-ons / Configured Items</div>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #e2e8f0; text-align: left;">
            <th style="padding: 6px 12px; font-size: 11px; color: #334155; text-transform: uppercase;">Component</th>
            <th style="padding: 6px 12px; font-size: 11px; color: #334155; text-transform: uppercase; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>${cartRows}</tbody>
      </table>
    </div>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>[COGNISYS PROJECT ORDER #${orderNumber}] - ${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 640px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          <tr>
            <td height="6" style="background: linear-gradient(90deg, #0b132b 0%, #00b4d8 50%, #7c3aed 100%);"></td>
          </tr>
          <tr>
            <td style="padding: 32px 32px 24px; border-bottom: 1px solid #f1f5f9;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <div style="font-size: 26px; font-weight: 800; color: #0b132b;">COGNI<span style="color: #00b4d8;">SYS</span></div>
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 2px; color: #64748b; text-transform: uppercase; margin-top: 4px;">
                      INNOVATION <span style="color: #00b4d8;">✦</span> INTELLIGENCE <span style="color: #7c3aed;">✦</span> IMPACT
                    </div>
                  </td>
                  <td style="text-align: right;">
                    <span style="display: inline-block; background-color: #ecfeff; color: #0891b2; font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 20px; border: 1px solid #a5f3fc; text-transform: uppercase;">
                      Ref #${orderNumber}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 16px; background-color: #f8fafc;">
              <h1 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #0f172a;">New Project Order & Specifications</h1>
              <p style="margin: 0; font-size: 13px; color: #64748b;">Received via Front-End SMTP Relay on <strong>${dateStr}</strong></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px;">
              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Client Contact Information</div>
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; overflow: hidden;">
                  <tr>
                    <td style="padding: 12px 16px; font-size: 13px; color: #64748b; width: 30%; border-bottom: 1px solid #f1f5f9;">Full Name</td>
                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${customerName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; font-size: 13px; color: #64748b; border-bottom: 1px solid #f1f5f9;">Email Address</td>
                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;">
                      <a href="mailto:${customerEmail}" style="color: #0284c7; text-decoration: none;">${customerEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 16px; font-size: 13px; color: #64748b;">Phone Number</td>
                    <td style="padding: 12px 16px; font-size: 14px; font-weight: 600; color: #0f172a;">${customerPhone}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Service Domain & Title</div>
                <div style="background-color: #f8fafc; border-left: 4px solid #00b4d8; padding: 14px 16px; border-radius: 0 10px 10px 0; border: 1px solid #e2e8f0; border-left-width: 4px;">
                  <div style="font-size: 12px; font-weight: 700; color: #0284c7; text-transform: uppercase; margin-bottom: 4px;">${serviceName}</div>
                  <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${title}</div>
                </div>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Project Scope & Specifications</div>
                <div style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-line;">${description}</div>
              </div>

              <div style="margin-bottom: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td width="48%" style="vertical-align: top;">
                      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 16px;">
                        <div style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase;">Estimated Budget</div>
                        <div style="font-size: 16px; font-weight: 800; color: #15803d; margin-top: 4px;">${budget || 'Custom Quotation'}</div>
                      </div>
                    </td>
                    <td width="4%"></td>
                    <td width="48%" style="vertical-align: top;">
                      <div style="background-color: #faf5ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 14px 16px;">
                        <div style="font-size: 11px; font-weight: 700; color: #6b21a8; text-transform: uppercase;">Target Delivery</div>
                        <div style="font-size: 16px; font-weight: 800; color: #7e22ce; margin-top: 4px;">${timeline || 'Standard Milestone'}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="margin-bottom: 24px;">
                <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">Architecture / Tech Stack</div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; font-size: 13px; color: #334155;">
                  <code>${techPreferences || 'FastAPI, React, Modern Architecture'}</code>
                </div>
              </div>

              ${cartSection}

              <div style="margin-top: 32px; text-align: center;">
                <a href="mailto:${customerEmail}?subject=Regarding%20Your%20Cognisys%20Order%20%23${orderNumber}" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #ffffff; background: linear-gradient(135deg, #0b132b 0%, #0284c7 100%); text-decoration: none; border-radius: 8px;">
                  Reply to Client Directly →
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
              <div style="font-size: 13px; font-weight: 700; color: #0b132b; margin-bottom: 4px;">COGNISYS ENTERPRISE &amp; INNOVATION LABS</div>
              <div style="font-size: 12px; color: #64748b; margin-bottom: 8px;">AI CCTV Surveillance &bull; Modern Web Platforms &bull; Student Engineering Capstones</div>
              <div style="font-size: 11px; color: #94a3b8;">
                Direct: +91 82483 49844 &bull; Official Dispatch: ${SMTP_CONFIG.targetEmail}<br>
                MSME Registered Enterprise | Government of India Standard Compliant
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export const smtpService = {
  /**
   * Send a contact form message via SMTP protocol directly from front end
   */
  async sendContactInquiry(data) {
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const subject = `[COGNISYS CONTACT] ${data.subject || 'General Inquiry'} from ${data.name}`;
    const bodyHtml = formatContactHtml({
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject || 'General Inquiry',
      message: data.message,
      dateStr
    });

    // 1. Dispatch through SMTP protocol gateway
    const smtpResult = await sendViaSmtpProtocol({
      subject,
      bodyHtml,
      clientName: data.name,
      clientEmail: data.email
    });

    // 2. Cache inquiry locally in browser storage so it is never lost
    try {
      const existing = JSON.parse(localStorage.getItem('cognisys_inquiries') || '[]');
      existing.unshift({
        id: 'INQ-' + Date.now().toString(36).toUpperCase(),
        ...data,
        date: dateStr,
        smtpSent: smtpResult.success
      });
      localStorage.setItem('cognisys_inquiries', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.error('Local cache error:', e);
    }

    return {
      success: true,
      smtpSuccess: smtpResult.success,
      details: smtpResult
    };
  },

  /**
   * Send a complete project order specification via SMTP protocol directly from front end
   */
  async sendOrderSpecifications(orderData) {
    const dateStr = new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    const orderNumber = orderData.order_number || `COG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const title = orderData.title || 'Custom Engineering Project';
    const subject = `[COGNISYS PROJECT ORDER #${orderNumber}] - ${title}`;

    const bodyHtml = formatOrderHtml({
      orderNumber,
      customerName: orderData.customer_name || 'Valued Client',
      customerEmail: orderData.customer_email || 'Not provided',
      customerPhone: orderData.customer_phone || 'Not provided',
      serviceName: orderData.service_name || 'Intelligent Engineering Solution',
      title,
      description: orderData.description || 'No detailed scope provided.',
      budget: orderData.budget || 'Custom Quotation',
      timeline: orderData.timeline || 'Standard Delivery',
      techPreferences: orderData.tech_preferences || 'Modern Architecture',
      cartItems: orderData.cart_items || [],
      dateStr
    });

    // 1. Dispatch through SMTP protocol gateway
    const smtpResult = await sendViaSmtpProtocol({
      subject,
      bodyHtml,
      clientName: orderData.customer_name,
      clientEmail: orderData.customer_email
    });

    // 2. Cache order locally in browser storage
    const createdOrder = {
      ...orderData,
      id: orderData.id || Date.now(),
      order_number: orderNumber,
      status: 'SUBMITTED',
      created_at: new Date().toISOString(),
      smtpSent: smtpResult.success
    };

    try {
      const existing = JSON.parse(localStorage.getItem('cognisys_orders') || '[]');
      existing.unshift(createdOrder);
      localStorage.setItem('cognisys_orders', JSON.stringify(existing.slice(0, 50)));
    } catch (e) {
      console.error('Local cache order error:', e);
    }

    return {
      success: true,
      order: createdOrder,
      smtpSuccess: smtpResult.success,
      details: smtpResult
    };
  },

  /**
   * Helper to construct mailto link as instant fail-safe or quick email app trigger
   */
  buildMailtoUrl(to = 'contact.cognisys@gmail.com', subject, body) {
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
};
