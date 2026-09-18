// Native disclosures remain usable without JavaScript.
function revealLinkedDisclosure() {
  if (window.location.hash === '#privacy') {
    const disclosure = document.getElementById('privacy');
    if (disclosure) disclosure.open = true;
  }
}
document.getElementById('privacy-link')?.addEventListener('click', revealPrivacy);
function revealPrivacy() { const disclosure = document.getElementById('privacy'); if (disclosure) disclosure.open = true; }
window.addEventListener('hashchange', revealLinkedDisclosure);
revealLinkedDisclosure();

// Configuration expected by Brevo's official form script. No private keys are used here.
window.LOCALE = 'en';
window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code.';
window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = 'Please enter a valid email address.';
window.REQUIRED_ERROR_MESSAGE = 'Please complete this field.';
window.GENERIC_INVALID_MESSAGE = 'Please check this field and try again.';
window.INVALID_NUMBER = 'Please enter a valid number.';
window.INVALID_DATE = 'Please enter a valid date.';
window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least one option.';
window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected', selectedOption: '{quantity} selected', selectedOptions: '{quantity} options selected' } };
window.AUTOHIDE = false;

let signupReady = false;
let signupLoadTimer;
window.glareFormReady = function () {
  signupReady = true;
  clearTimeout(signupLoadTimer);
  document.getElementById('signup-fields').disabled = false;
  document.getElementById('signup-loading').hidden = true;
};
window.glareFormUnavailable = function () {
  if (signupReady) return;
  const status = document.getElementById('signup-loading');
  status.hidden = false;
  status.textContent = 'The signup form couldn’t load. Please reload or use the separate form below.';
};
window.handleCaptchaResponse = function () {
  window.grecaptcha = window.turnstile;
  document.getElementById('sib-captcha').dispatchEvent(new Event('captchaChange'));
  const error = document.getElementById('captcha-error');
  error.textContent = '';
  error.style.display = 'none';
};
window.handleCaptchaError = function () {
  const error = document.getElementById('captcha-error');
  if (error) {
    error.textContent = 'The spam check couldn’t load. Please reload or try the separate form below.';
    error.style.display = 'block';
  }
};
window.handleCaptchaExpired = function () {
  const error = document.getElementById('captcha-error');
  error.textContent = 'The spam check has expired. Please complete it again before joining.';
  error.style.display = 'block';
};

const signupForm = document.getElementById('sib-form');
if (signupForm) {
  signupLoadTimer = setTimeout(window.glareFormUnavailable, 12000);
  // Keep unexpected script failures from posting an unchecked form.
  signupForm.addEventListener('submit', event => {
    if (!signupReady) { event.preventDefault(); event.stopImmediatePropagation(); window.glareFormUnavailable(); return; }
    // Brevo disables native validation; explicitly preserve email/consent semantics.
    let firstInvalid;
    for (const [fieldId, errorId, message] of [
      ['EMAIL', 'email-error', 'Please enter a valid email address.'],
      ['OPT_IN', 'consent-error', 'Please tick the box if you want to receive campaign emails.']
    ]) {
      const field = document.getElementById(fieldId);
      const error = document.getElementById(errorId);
      const valid = field.checkValidity();
      field.setAttribute('aria-invalid', String(!valid));
      error.textContent = valid ? '' : message;
      error.style.display = valid ? 'none' : 'block';
      if (!valid && !firstInvalid) firstInvalid = field;
    }
    if (firstInvalid) {
      event.preventDefault(); event.stopImmediatePropagation(); firstInvalid.focus();
    }
  }, true);
  // Brevo controls success/error state; announce and focus the actual server response.
  for (const id of ['success-message', 'error-message']) {
    const panel = document.getElementById(id);
    new MutationObserver(() => {
      if (!panel.classList.contains('sib-form-message-panel--active')) return;
      panel.focus({ preventScroll: true });
      if (id === 'success-message') {
        // Confirmation is still required; prevent accidental repeated requests.
        document.getElementById('sib-container').hidden = true;
      }
    }).observe(panel, { attributes: true, attributeFilter: ['class'] });
  }
}

// Recover from an interrupted provider request without silently retrying a signup.
let signupPending = false;
let signupRequestTimer;
function recoverSignupRequest() {
  if (!signupPending) return;
  signupPending = false;
  clearTimeout(signupRequestTimer);
  const panel = document.getElementById('error-message');
  panel.querySelector('.sib-form-message-panel__inner-text').textContent = 'We couldn’t confirm whether your request went through. Check your inbox before trying again. Your email address is still here.';
  panel.classList.add('sib-form-message-panel--active');
  const button = signupForm.querySelector('button[type="submit"]');
  button.disabled = false;
  button.classList.remove('sib-form-block__button-disabled');
  button.querySelector('svg').classList.add('sib-hide-loader-icon');
  window.turnstile?.reset();
}
if (signupForm) {
  const submitButton = signupForm.querySelector('button[type="submit"]');
  new MutationObserver(() => {
    if (submitButton.disabled && signupReady && !signupPending) {
      for (const id of ['error-message', 'success-message']) document.getElementById(id).classList.remove('sib-form-message-panel--active');
      signupPending = true;
      clearTimeout(signupRequestTimer);
      signupRequestTimer = setTimeout(recoverSignupRequest, 30000);
    } else if (!submitButton.disabled) {
      signupPending = false;
      clearTimeout(signupRequestTimer);
    }
  }).observe(submitButton, { attributes: true, attributeFilter: ['disabled'] });
  window.addEventListener('error', event => {
    if (signupPending && event.filename?.includes('sibforms.com/forms/')) recoverSignupRequest();
  });
}
