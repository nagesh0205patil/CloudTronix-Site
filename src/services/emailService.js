import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { siteConfig } from '../constants/site';

function getEmailJsErrorMessage(error) {
  if (error instanceof EmailJSResponseStatus) {
    return error.text || `EmailJS request failed with status ${error.status}.`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'EmailJS request failed.';
}

function assertEmailConfig() {
  const {
    publicKey,
    internalServiceId,
    internalTemplateId,
    customerServiceId,
    customerTemplateId,
  } = siteConfig.emailJs;

  const missing = [];

  if (!publicKey) missing.push('VITE_EMAILJS_PUBLIC_KEY');
  if (!internalServiceId) missing.push('VITE_EMAILJS_INTERNAL_SERVICE_ID');
  if (!internalTemplateId) missing.push('VITE_EMAILJS_INTERNAL_TEMPLATE_ID');
  if (!customerServiceId) missing.push('VITE_EMAILJS_CUSTOMER_SERVICE_ID');
  if (!customerTemplateId) missing.push('VITE_EMAILJS_CUSTOMER_TEMPLATE_ID');

  if (missing.length > 0) {
    throw new Error(`Missing EmailJS configuration: ${missing.join(', ')}`);
  }
}

function createTemplateParams(data, captchaToken) {
  const submittedAt = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  });
  const subject = data.subject || `New enquiry from ${data.name}`;

  return {
    name: data.name,
    email: data.email,
    phone: data.phone,
    organization_type: data.organizationType,
    organization_name: data.organizationName,
    project_name: data.projectName,
    requirement: data.requirement,
    company: data.organizationName,
    interest: data.interest,
    subject,
    message: data.requirement,
    submitted_at: submittedAt,
    from_name: data.name,
    from_email: data.email,
    phone_number: data.phone,
    company_name: data.organizationName,
    organizationType: data.organizationType,
    organizationName: data.organizationName,
    projectName: data.projectName,
    interested_area: data.interest,
    reply_to: data.email,
    customer_email: data.email,
    to_email: siteConfig.emailJs.internalRecipient,
    company_email: siteConfig.emailJs.internalRecipient,
    'g-recaptcha-response': captchaToken,
    captcha_token: captchaToken,
  };
}

async function sendEmail(serviceId, templateId, templateParams) {
  return emailjs.send(serviceId, templateId, templateParams, {
    publicKey: siteConfig.emailJs.publicKey,
  });
}

export async function sendEnquiryEmails(data, captchaToken) {
  assertEmailConfig();

  const templateParams = createTemplateParams(data, captchaToken);
  const {
    customerServiceId,
    customerTemplateId,
    internalServiceId,
    internalTemplateId,
  } = siteConfig.emailJs;

  // Internal delivery is business-critical. Customer welcome delivery is best-effort.
  const [internalResult, customerResult] = await Promise.allSettled([
    sendEmail(internalServiceId, internalTemplateId, templateParams),
    sendEmail(customerServiceId, customerTemplateId, templateParams),
  ]);

  if (customerResult.status === 'rejected') {
    globalThis.console?.warn('Customer welcome email failed:', getEmailJsErrorMessage(customerResult.reason));
  }

  if (internalResult.status === 'rejected') {
    throw new Error(getEmailJsErrorMessage(internalResult.reason));
  }

  return {
    customerEmailSent: customerResult.status === 'fulfilled',
    internalEmailSent: true,
  };
}
