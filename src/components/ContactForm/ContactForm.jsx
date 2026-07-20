import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { Send } from 'lucide-react';
import { siteConfig } from '../../constants/site';
import { FORM_LIMITS, INDUSTRY_OPTIONS, ORGANIZATION_TYPE_OPTIONS } from '../../constants/enquiryForm';
import { sendEnquiryEmails } from '../../services/emailService';
import {
  normalizeEnquiryData,
  validateIndustry,
  validateOrganizationName,
  validateOrganizationType,
  validateRequirement,
} from '../../utils/formValidation';
import Button from '../Buttons/Button';
import FormSelect from '../forms/FormSelect';
import SubmissionFeedbackModal from '../feedback/SubmissionFeedbackModal';

export default function ContactForm() {
  const captchaRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submissionFeedback, setSubmissionFeedback] = useState({
    isOpen: false,
    type: null,
    title: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState('');
  const isCaptchaRequired = siteConfig.recaptcha.enabled;
  const canRenderCaptcha = isCaptchaRequired && siteConfig.recaptcha.siteKey;
  const {
    control,
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      organizationType: '',
      organizationName: '',
      interestedIndustry: '',
      requirement: '',
    },
    shouldUnregister: true,
  });
  const organizationType = watch('organizationType');

  useEffect(() => {
    setValue('organizationName', '');
    clearErrors('organizationName');
  }, [organizationType, setValue, clearErrors]);

  const closeSubmissionFeedback = useCallback(() => {
    setSubmissionFeedback((current) => ({ ...current, isOpen: false }));
  }, []);

  const onSubmit = async (data) => {
    setStatus({ type: '', message: '' });

    if (isCaptchaRequired && !captchaToken) {
      setError('captcha', { type: 'manual', message: 'Please complete the captcha verification.' });
      return;
    }

    if (isCaptchaRequired && !siteConfig.recaptcha.siteKey) {
      setStatus({ type: 'error', message: 'Captcha site key is missing. Add VITE_RECAPTCHA_SITE_KEY in .env.local and restart the Vite server.' });
      return;
    }

    try {
      const normalizedData = normalizeEnquiryData(data);
      const result = await sendEnquiryEmails(normalizedData, captchaToken);
      setSubmissionFeedback(result.customerEmailSent
        ? {
            isOpen: true,
            type: 'success',
            title: 'Enquiry Sent Successfully',
            message: 'Thank you for contacting CloudTronix. A confirmation email has been sent to you.',
          }
        : {
            isOpen: true,
            type: 'partial-success',
            title: 'Enquiry Submitted',
            message: 'Thanks. Your enquiry has been sent. We could not send the confirmation email, but our team received your details.',
          });
      reset();
      setCaptchaToken('');
      captchaRef.current?.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown email delivery error.';
      setStatus({ type: 'error', message: `We could not send your enquiry right now. ${message} Please email info@cloudtronix.in.` });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-lg border border-white/10 bg-white/5 p-6 shadow-soft">
      <Field label="Full name" fieldId="name" error={errors.name?.message}>
        <input id="name" {...register('name', { required: 'Full name is required' })} className="form-input" placeholder="Your full name" autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
      </Field>
      <Field label="Email" fieldId="email" error={errors.email?.message}>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
          })}
          className="form-input"
          placeholder="you@example.com"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
      </Field>
      <Field label="Phone" fieldId="phone" error={errors.phone?.message}>
        <input
          id="phone"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: { value: /^[0-9+\-\s()]{8,18}$/, message: 'Enter a valid phone number' },
          })}
          className="form-input"
          placeholder="+91 83293 51507"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
      </Field>
      <FormSelect
        name="organizationType"
        control={control}
        label="Company / College"
        placeholder="Select organization type"
        options={ORGANIZATION_TYPE_OPTIONS}
        rules={{ validate: validateOrganizationType }}
        error={errors.organizationType?.message}
      />
      {organizationType ? (
        <Field label={organizationType === 'Company' ? 'Company Name' : 'College Name'} fieldId="organizationName" error={errors.organizationName?.message}>
          <input
            id="organizationName"
            {...register('organizationName', { validate: validateOrganizationName })}
            className="form-input"
            placeholder={organizationType === 'Company' ? 'Enter your company name' : 'Enter your college name'}
            autoComplete="organization"
            maxLength={FORM_LIMITS.organizationNameMax}
            aria-invalid={Boolean(errors.organizationName)}
            aria-describedby={errors.organizationName ? 'organizationName-error' : undefined}
          />
        </Field>
      ) : null}
      <FormSelect
        name="interestedIndustry"
        control={control}
        label="Interested Industry"
        placeholder="Select an industry"
        options={INDUSTRY_OPTIONS}
        rules={{ validate: validateIndustry }}
        error={errors.interestedIndustry?.message}
      />
      <Field label="Subject" fieldId="subject" error={errors.subject?.message}>
        <input
          id="subject"
          {...register('subject', { required: 'Subject is required' })}
          className="form-input"
          placeholder="Project enquiry, training enquiry, product demo..."
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
      </Field>
      {/* <Field label="Position, course, or interested area" fieldId="interest" error={errors.interest?.message}>
        <input
          id="interest"
          {...register('interest', { required: 'Please enter your position, course, or interested area' })}
          className="form-input"
          placeholder="Embedded Firmware Intern, IoT training, custom product..."
          aria-invalid={Boolean(errors.interest)}
          aria-describedby={errors.interest ? 'interest-error' : undefined}
        />
      </Field> */}
      <Field label="Requirement" fieldId="requirement" error={errors.requirement?.message}>
        <textarea
          id="requirement"
          {...register('requirement', { validate: validateRequirement })}
          className="form-input min-h-32 resize-y"
          placeholder="Tell us about your project, training need, or product enquiry"
          maxLength={FORM_LIMITS.requirementMax}
          aria-invalid={Boolean(errors.requirement)}
          aria-describedby={errors.requirement ? 'requirement-error' : undefined}
        />
      </Field>
      <div>
        {canRenderCaptcha ? (
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={siteConfig.recaptcha.siteKey}
            theme="dark"
            onChange={(token) => {
              setCaptchaToken(token || '');
              if (token) {
                clearErrors('captcha');
              }
            }}
            onExpired={() => setCaptchaToken('')}
            onErrored={() => {
              setCaptchaToken('');
              setError('captcha', { type: 'manual', message: 'Captcha could not load. Please refresh and try again.' });
            }}
          />
        ) : (
          <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-100">
            Captcha is waiting for configuration. Add <span className="font-bold">VITE_RECAPTCHA_SITE_KEY</span> in <span className="font-bold">.env.local</span>, then restart the Vite server.
          </div>
        )}
        {errors.captcha?.message ? <span className="mt-2 block text-xs text-red-300">{errors.captcha.message}</span> : null}
      </div>
      <div className="flex justify-center pt-1">
        <Button type="submit" icon={Send} disabled={isSubmitting || (isCaptchaRequired && !siteConfig.recaptcha.siteKey)} className="px-4 py-2.5">
          {isSubmitting ? 'Sending...' : 'Send Enquiry'}
        </Button>
      </div>
      {status.message ? (
        <p className={`text-sm font-medium ${status.type === 'error' ? 'text-red-300' : 'text-secondary'}`} role="status">
          {status.message}
        </p>
      ) : null}
      </form>
      <SubmissionFeedbackModal
        isOpen={submissionFeedback.isOpen}
        type={submissionFeedback.type}
        title={submissionFeedback.title}
        message={submissionFeedback.message}
        onClose={closeSubmissionFeedback}
      />
    </>
  );
}

function Field({ label, fieldId, error, children }) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-white">
      <label htmlFor={fieldId}>{label}</label>
      {children}
      {error ? <span id={`${fieldId}-error`} className="text-xs text-red-300" role="alert">{error}</span> : null}
    </div>
  );
}
