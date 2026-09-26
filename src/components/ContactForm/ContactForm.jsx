import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { Send } from 'lucide-react';
import { siteConfig } from '../../constants/site';
import { FORM_LIMITS, ORGANIZATION_TYPE_OPTIONS } from '../../constants/enquiryForm';
import { sendEnquiryEmails } from '../../services/emailService';
import {
  normalizeEnquiryData,
  validateProjectName,
  validateOrganizationName,
  validateOrganizationType,
  validateRequirement,
} from '../../utils/formValidation';
import Button from '../Buttons/Button';
import FormSelect from '../forms/FormSelect';
import SubmissionFeedbackModal from '../feedback/SubmissionFeedbackModal';

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const selectedProjectName = searchParams.get('project') || '';
  const captchaScriptPromiseRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submissionFeedback, setSubmissionFeedback] = useState({
    isOpen: false,
    type: null,
    title: '',
    message: '',
  });
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaUnavailable, setCaptchaUnavailable] = useState(false);
  const hasCaptchaSiteKey = Boolean(siteConfig.recaptcha.siteKey);
  const shouldLoadCaptcha = siteConfig.recaptcha.enabled && hasCaptchaSiteKey;
  const {
    control,
    register,
    handleSubmit,
    reset,
    resetField,
    setValue,
    clearErrors,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      organizationType: '',
      organizationName: '',
      projectName: selectedProjectName,
      requirement: '',
    },
    shouldUnregister: true,
  });
  const organizationType = watch('organizationType');

  useEffect(() => {
    resetField('projectName', { defaultValue: selectedProjectName });
  }, [selectedProjectName, resetField]);

  useEffect(() => {
    setValue('organizationName', '');
    clearErrors('organizationName');
  }, [organizationType, setValue, clearErrors]);

  useEffect(() => {
    if (!shouldLoadCaptcha) {
      setCaptchaReady(false);
      return undefined;
    }

    let mounted = true;
    loadEnterpriseCaptcha(siteConfig.recaptcha.siteKey, captchaScriptPromiseRef)
      .then(() => {
        if (mounted) {
          setCaptchaReady(true);
          setCaptchaUnavailable(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setCaptchaReady(false);
          setCaptchaUnavailable(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, [shouldLoadCaptcha]);

  const closeSubmissionFeedback = useCallback(() => {
    setSubmissionFeedback((current) => ({ ...current, isOpen: false }));
  }, []);

  const onSubmit = async (data) => {
    setStatus({ type: '', message: '' });

    try {
      const token = await getEnterpriseCaptchaToken({
        action: siteConfig.recaptcha.action,
        enabled: shouldLoadCaptcha,
        ready: captchaReady,
        siteKey: siteConfig.recaptcha.siteKey,
      });

      if (shouldLoadCaptcha && !token) {
        setCaptchaUnavailable(true);
      }

      const normalizedData = normalizeEnquiryData(data);
      const result = await sendEnquiryEmails(normalizedData, token);
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
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown email delivery error.';
      setStatus({ type: 'error', message: `We could not send your enquiry right now. ${message} Please email info@cloudtronix.in.` });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-lg border border-white/10 bg-night p-6 shadow-soft sm:p-8">
      <div className="mb-2">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Enquiry Desk</p>
        <h2 className="mt-2 font-heading text-2xl font-bold text-white">Share your requirement</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">Tell us what you want to build, automate, purchase, or learn. We will respond with the next practical step.</p>
      </div>
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
      <Field label="Project Name" fieldId="projectName" error={errors.projectName?.message}>
        <input
          id="projectName"
          {...register('projectName', { validate: validateProjectName })}
          className="form-input"
          placeholder="Enter your project name"
          maxLength={FORM_LIMITS.projectNameMax}
          aria-invalid={Boolean(errors.projectName)}
          aria-describedby={errors.projectName ? 'projectName-error' : undefined}
        />
      </Field>
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
        {captchaUnavailable ? (
          <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-100">
            Captcha verification is temporarily unavailable. You can still send your enquiry.
          </div>
        ) : null}
        {shouldLoadCaptcha && captchaReady ? (
          <p className="text-xs font-medium text-slate-300">
            Protected by reCAPTCHA Fraud Defense.
          </p>
        ) : null}
        {errors.captcha?.message ? <span className="mt-2 block text-xs text-red-300">{errors.captcha.message}</span> : null}
      </div>
      <div className="flex justify-center pt-1">
        <Button type="submit" icon={Send} disabled={isSubmitting} className="px-4 py-2.5">
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

function loadEnterpriseCaptcha(siteKey, promiseRef) {
  if (globalThis.grecaptcha?.enterprise) {
    return Promise.resolve();
  }

  if (promiseRef.current) {
    return promiseRef.current;
  }

  promiseRef.current = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-cloudtronix-recaptcha="enterprise"]');

    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.dataset.cloudtronixRecaptcha = 'enterprise';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return promiseRef.current;
}

function getEnterpriseCaptchaToken({ action, enabled, ready, siteKey }) {
  if (!enabled || !ready || !globalThis.grecaptcha?.enterprise) {
    return Promise.resolve('');
  }

  return new Promise((resolve) => {
    globalThis.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await globalThis.grecaptcha.enterprise.execute(siteKey, { action });
        resolve(token || '');
      } catch {
        resolve('');
      }
    });
  });
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
