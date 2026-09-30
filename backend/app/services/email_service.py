import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger("cognisys_mail")
logging.basicConfig(level=logging.INFO)

def send_order_specifications_email(order_data: dict) -> bool:
    """
    Sends complete project requirements and specifications to contact.cognisys@gmail.com
    formatted with the exact Cognisys dark-gold executive specification card design.
    Dispatches directly via the server SMTP protocol (smtp.gmail.com).
    """
    target_email = os.getenv("TARGET_NOTIFICATION_EMAIL", "contact.cognisys@gmail.com")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()
    
    order_number = order_data.get("order_number") or f"COG-2026-{datetime.utcnow().strftime('%H%M%S')}"
    title = order_data.get("title") or "Technical Project"
    subject = f"[COGNISYS PROJECT ORDER #{order_number}] - {title}"
    
    customer_name = order_data.get("customer_name") or "Valued Client"
    customer_email = order_data.get("customer_email") or "Not provided"
    customer_phone = order_data.get("customer_phone") or "Not provided"
    service_name = order_data.get("service_name") or "Custom Intelligent Solution"
    description = order_data.get("description") or "No detailed description provided."
    budget = order_data.get("budget") or "Standard Estimate"
    timeline = order_data.get("timeline") or "Standard Milestone"
    tech_preferences = order_data.get("tech_preferences") or "Recommended Modern Architecture"
    current_time_str = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')

    # Dark-gold executive specification card matching official user specification screenshot
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{subject}</title>
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
          Order #{order_number}
        </h1>

        <!-- Submitted At -->
        <div style="color: #f59e0b; font-size: 12px; font-weight: 500; margin-bottom: 22px;">
          Submitted at: {current_time_str}
        </div>

        <!-- Divider line -->
        <div style="border-top: 1px solid rgba(245, 158, 11, 0.35); margin-bottom: 20px;"></div>

        <!-- Section 1: Client Contact Details -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            CLIENT CONTACT DETAILS
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Name:</strong> <span style="font-weight: 700;">{customer_name}</span></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Email:</strong> <a href="mailto:{customer_email}" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">{customer_email}</a></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Phone:</strong> {customer_phone}</div>
          </div>
        </div>

        <!-- Section 2: Project Domain & Title -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            PROJECT DOMAIN &amp; TITLE
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Service:</strong> {service_name}</div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Project Title:</strong> <span style="font-weight: 700;">{title}</span></div>
          </div>
        </div>

        <!-- Section 3: Requirements & Technical Specifications -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            REQUIREMENTS &amp; TECHNICAL SPECIFICATIONS
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.6;">
            <div style="color: #ffffff; white-space: pre-line; word-break: break-word;">{description}</div>
          </div>
        </div>

        <!-- Section 4: Budget & Target Delivery Timeline -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            BUDGET &amp; TARGET DELIVERY TIMELINE
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Estimated Budget:</strong> {budget}</div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Target Delivery:</strong> {timeline}</div>
          </div>
        </div>

        <!-- Section 5: Tech Stack Preferences -->
        <div style="margin-bottom: 22px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            TECH STACK PREFERENCES
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; color: #ffffff;">
            {tech_preferences}
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #1e293b; padding-top: 18px; font-size: 11px; color: #64748b; text-align: center;">
          Automated Transmission to <a href="mailto:{target_email}" style="color: #38bdf8; text-decoration: none;">{target_email}</a> from cognisys.
        </div>
      </div>
    </body>
    </html>
    """

    # Plain text version for multipart fallback
    plain_text = f"""COGNISYS PROJECT SPECIFICATION
Order #{order_number}
Submitted at: {current_time_str}
--------------------------------------------------
CLIENT CONTACT DETAILS
Name: {customer_name}
Email: {customer_email}
Phone: {customer_phone}

PROJECT DOMAIN & TITLE
Service: {service_name}
Project Title: {title}

REQUIREMENTS & TECHNICAL SPECIFICATIONS
{description}

BUDGET & TARGET DELIVERY TIMELINE
Estimated Budget: {budget}
Target Delivery: {timeline}

TECH STACK PREFERENCES
{tech_preferences}
--------------------------------------------------
Automated Transmission to {target_email} from Cognisys.
"""

    print(f"\n=======================================================")
    print(f"[COGNISYS BACKEND SMTP DISPATCH]")
    print(f"Target: {target_email}")
    print(f"Subject: {subject}")
    print(f"Client: {customer_name} ({customer_email} | {customer_phone})")
    print(f"Service: {service_name} | Project: {title}")
    print(f"Budget: {budget} | Timeline: {timeline}")
    print(f"SMTP Server: {smtp_host}:{smtp_port}")
    print(f"=======================================================\n")

    # If SMTP credentials configured, execute real dispatch via smtplib
    if smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f'"{customer_name} (Cognisys)" <{smtp_user}>'
            msg["To"] = target_email
            if customer_email and "@" in customer_email:
                msg["Reply-To"] = f'"{customer_name}" <{customer_email}>'

            msg.attach(MIMEText(plain_text, "plain", "utf-8"))
            msg.attach(MIMEText(html_content, "html", "utf-8"))

            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=15)
                server.starttls()

            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, target_email, msg.as_string())
            server.quit()
            logger.info(f"✅ Successfully delivered executive email via SMTP to {target_email}")
            return True
        except smtplib.SMTPAuthenticationError as auth_err:
            logger.error(f"❌ SMTP Authentication failed (535 BadCredentials): {auth_err}")
            print(f"[SMTP NOTICE] Google requires a valid 16-character App Password. Update SMTP_PASS in backend/.env")
            return False
        except Exception as e:
            logger.error(f"❌ SMTP delivery error: {e}")
            return False
    else:
        logger.warning(f"[SMTP Notice] No SMTP credentials configured. Email logged to console and database.")
        return False


def send_contact_inquiry_email(inquiry_data: dict) -> bool:
    """
    Sends contact form inquiries formatted with the dark-gold executive design via SMTP.
    """
    target_email = os.getenv("TARGET_NOTIFICATION_EMAIL", "contact.cognisys@gmail.com")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()

    name = inquiry_data.get("name") or "Website Visitor"
    email = inquiry_data.get("email") or "Not provided"
    phone = inquiry_data.get("phone") or "Not provided"
    subject_text = inquiry_data.get("subject") or "General Inquiry"
    message = inquiry_data.get("message") or ""
    current_time_str = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')

    email_subject = f"[COGNISYS CONTACT INQUIRY] - {subject_text} from {name}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>{email_subject}</title>
    </head>
    <body style="margin: 0; padding: 24px 12px; background-color: #050b14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #0b1528; border: 1px solid #1e293b; border-radius: 14px; padding: 28px 24px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.45);">
        
        <!-- Top Badge -->
        <div style="margin-bottom: 14px;">
          <span style="display: inline-block; background-color: #f59e0b; color: #0b132b; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 20px; letter-spacing: 0.5px; text-transform: uppercase;">
            COGNISYS CONTACT INQUIRY
          </span>
        </div>

        <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 6px 0; letter-spacing: -0.3px;">
          New Message from {name}
        </h1>

        <div style="color: #f59e0b; font-size: 12px; font-weight: 500; margin-bottom: 22px;">
          Received: {current_time_str}
        </div>

        <div style="border-top: 1px solid rgba(245, 158, 11, 0.35); margin-bottom: 20px;"></div>

        <!-- Section 1: Contact Details -->
        <div style="margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            SENDER CONTACT DETAILS
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.7;">
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Name:</strong> <span style="font-weight: 700;">{name}</span></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Email:</strong> <a href="mailto:{email}" style="color: #38bdf8; text-decoration: underline; font-weight: 600;">{email}</a></div>
            <div style="color: #ffffff;"><strong style="color: #94a3b8; font-weight: 600;">Phone:</strong> {phone}</div>
          </div>
        </div>

        <!-- Section 2: Subject & Message -->
        <div style="margin-bottom: 22px;">
          <div style="font-size: 11px; font-weight: 800; color: #f59e0b; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
            INQUIRY SUBJECT &amp; MESSAGE
          </div>
          <div style="background-color: #101e38; border: 1px solid #1e293b; border-left: 2.5px solid #f59e0b; border-radius: 6px; padding: 14px 16px; font-size: 13px; line-height: 1.6;">
            <div style="color: #cbd5e1; font-weight: 700; margin-bottom: 8px;">{subject_text}</div>
            <div style="color: #ffffff; white-space: pre-line; word-break: break-word;">{message}</div>
          </div>
        </div>

        <!-- Reply Button -->
        <div style="text-align: center; margin-bottom: 20px;">
          <a href="mailto:{email}?subject=Re:%20{subject_text}" style="display: inline-block; background: linear-gradient(135deg, #0284c7 0%, #00b4d8 100%); color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: 700;">
            Reply to {name} Directly →
          </a>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid #1e293b; padding-top: 18px; font-size: 11px; color: #64748b; text-align: center;">
          Automated Transmission to <a href="mailto:{target_email}" style="color: #38bdf8; text-decoration: none;">{target_email}</a> from cognisys.
        </div>
      </div>
    </body>
    </html>
    """

    plain_text = f"""COGNISYS CONTACT INQUIRY
From: {name} <{email}>
Phone: {phone}
Subject: {subject_text}
Received: {current_time_str}
--------------------------------------------------
{message}
--------------------------------------------------
Automated Transmission to {target_email} from Cognisys.
"""

    if smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = email_subject
            msg["From"] = f'"{name} (Cognisys Web)" <{smtp_user}>'
            msg["To"] = target_email
            if email and "@" in email:
                msg["Reply-To"] = f'"{name}" <{email}>'

            msg.attach(MIMEText(plain_text, "plain", "utf-8"))
            msg.attach(MIMEText(html_content, "html", "utf-8"))

            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=15)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=15)
                server.starttls()

            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, target_email, msg.as_string())
            server.quit()
            logger.info(f"✅ Successfully delivered contact inquiry via SMTP to {target_email}")
            return True
        except smtplib.SMTPAuthenticationError as auth_err:
            logger.error(f"❌ SMTP Authentication failed (535 BadCredentials): {auth_err}")
            return False
        except Exception as e:
            logger.error(f"❌ SMTP contact inquiry send error: {e}")
            return False
    return False


def send_signup_otp_email(to_email: str, otp: str, name: str = None) -> bool:
    """
    Sends a branded OTP verification email to the user signing up with Cognisys.
    """
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER", "").strip()
    smtp_pass = os.getenv("SMTP_PASS", "").strip()
    
    display_name = name or to_email.split("@")[0]
    subject = f"[COGNISYS] Your Account Verification Code: {otp}"

    logger.info(f"🔑 SIGNUP OTP for {to_email}: [{otp}] (Valid for 10 minutes)")

    if smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = f'"Cognisys Verification" <{smtp_user}>'
            msg["To"] = to_email
            msg.attach(MIMEText(f"Your Cognisys verification code is: {otp}\nValid for 10 minutes.", "plain", "utf-8"))

            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=10)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=10)
                server.starttls()

            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, to_email, msg.as_string())
            server.quit()
            logger.info(f"✅ OTP email successfully dispatched to {to_email}")
            return True
        except Exception as e:
            logger.warning(f"⚠️ SMTP dispatch failed for {to_email}: {e}")
            return True
    return True
