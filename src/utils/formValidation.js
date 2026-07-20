import { FORM_LIMITS, INDUSTRY_OPTIONS, ORGANIZATION_TYPE_OPTIONS } from '../constants/enquiryForm';

const ORGANIZATION_NAME_PATTERN = /^[\p{L}\p{N} &.,'()-]+$/u;
const REQUIREMENT_PATTERN = /^[\p{L}\p{N}\s,."'()\-:;?!/+%]+$/u;
const HTML_PATTERN = /<\s*\/?\s*[a-z][^>]*>/i;
const URL_PATTERN = /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|org|net|in|io|co|edu|gov)(?:\/|\b))/i;
const SUSPICIOUS_PATTERN = /(?:javascript\s*:|\bon\w+\s*=|\b(?:union\s+select|drop\s+table|insert\s+into|delete\s+from)\b|\b(?:eval|exec)\s*\(|document\s*\.\s*cookie)/i;
const REPEATED_SYMBOL_PATTERN = /([^\p{L}\p{N}\s])\1{3,}/u;
const SYMBOL_RUN_PATTERN = /[^\p{L}\p{N}\s]{6,}/u;

export function sanitizePlainText(value = '') {
  return removeControlCharacters(value).trim().replace(/[ \t]+/g, ' ');
}

export function sanitizeRequirement(value = '') {
  return removeControlCharacters(value)
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.trim().replace(/[ \t]+/g, ' '))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function containsHtml(value = '') {
  return HTML_PATTERN.test(String(value));
}

export function containsUrl(value = '') {
  return URL_PATTERN.test(String(value));
}

export function containsSuspiciousInput(value = '') {
  const input = String(value);
  return hasControlCharacters(input) || SUSPICIOUS_PATTERN.test(input);
}

function hasControlCharacters(value) {
  return [...String(value)].some((character) => {
    const code = character.charCodeAt(0);
    return (code >= 0 && code <= 8) || code === 11 || code === 12
      || (code >= 14 && code <= 31) || code === 127;
  });
}

function removeControlCharacters(value) {
  return [...String(value)].filter((character) => !hasControlCharacters(character)).join('');
}

export function hasExcessiveRepeatedSymbols(value = '') {
  const input = String(value);
  return REPEATED_SYMBOL_PATTERN.test(input) || SYMBOL_RUN_PATTERN.test(input);
}

export function isMeaningfulRequirement(value = '') {
  const input = sanitizeRequirement(value);
  return /\p{L}/u.test(input) && (input.match(/[\p{L}\p{N}]/gu)?.length || 0) >= 10;
}

export function validateOrganizationType(value) {
  return ORGANIZATION_TYPE_OPTIONS.some((option) => option.value === value) || 'Please select an organization type.';
}

export function validateOrganizationName(value) {
  const input = sanitizePlainText(value);
  if (!input) return 'Organization name is required.';
  if (input.length < FORM_LIMITS.organizationNameMin) {
    return `Organization name must contain at least ${FORM_LIMITS.organizationNameMin} characters.`;
  }
  if (input.length > FORM_LIMITS.organizationNameMax) {
    return `Organization name cannot exceed ${FORM_LIMITS.organizationNameMax} characters.`;
  }
  if (containsHtml(input) || containsUrl(input) || containsSuspiciousInput(input)) {
    return 'HTML, scripts, or links are not allowed.';
  }
  if (!ORGANIZATION_NAME_PATTERN.test(input)) return 'Please remove unsupported special characters.';
  return true;
}

export function validateIndustry(value) {
  return INDUSTRY_OPTIONS.some((option) => option.value === value) || 'Please select an industry.';
}

export function validateRequirement(value) {
  const input = sanitizeRequirement(value);
  if (!input) return 'Please enter your requirement.';
  if (input.length < FORM_LIMITS.requirementMin) {
    return `Requirement must contain at least ${FORM_LIMITS.requirementMin} characters.`;
  }
  if (input.length > FORM_LIMITS.requirementMax) {
    return `Requirement cannot exceed ${FORM_LIMITS.requirementMax} characters.`;
  }
  if (containsHtml(input) || containsUrl(input) || containsSuspiciousInput(input)) {
    return 'HTML, scripts, or links are not allowed.';
  }
  if (!REQUIREMENT_PATTERN.test(input)) return 'Please remove unsupported special characters.';
  if (hasExcessiveRepeatedSymbols(input) || !isMeaningfulRequirement(input)) {
    return 'Please enter a meaningful requirement.';
  }
  return true;
}

export function normalizeEnquiryData(formData) {
  // A future backend must enforce the same validation and sanitization server-side.
  return {
    ...formData,
    name: sanitizePlainText(formData.name),
    email: sanitizePlainText(formData.email),
    phone: sanitizePlainText(formData.phone),
    organizationType: sanitizePlainText(formData.organizationType),
    organizationName: sanitizePlainText(formData.organizationName),
    interestedIndustry: sanitizePlainText(formData.interestedIndustry),
    subject: sanitizePlainText(formData.subject),
    interest: sanitizePlainText(formData.interest),
    requirement: sanitizeRequirement(formData.requirement),
  };
}
