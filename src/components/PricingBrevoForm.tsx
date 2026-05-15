"use client";

import Script from "next/script";

/**
 * Brevo-hosted enquiry form. Markup is the exact embed Olivia generated in
 * her Brevo dashboard — POSTs to `c83c7e6a.sibforms.com`, includes
 * reCAPTCHA, multi-select industry checkboxes, and a consent checkbox.
 *
 * Brevo ships an inline <style> block + an external sib-styles.css that's
 * designed for a light-mode site; we leave the structural CSS in place
 * (label/input/checkbox-replacement logic relies on it) and override the
 * surface palette in globals.css under .rb-pricing-form-shell so the form
 * reads against Rosebud's dark bone-on-near-black aesthetic.
 *
 * `dangerouslySetInnerHTML` is the cleanest path here — Brevo's markup
 * carries lots of inline styles + a specific class/data-attribute contract
 * that the main.js script binds to. Rewriting it as JSX risks breaking
 * Brevo's validation, captcha wiring, or error-message panels.
 */
const BREVO_FORM_HTML = `
<div class="sib-form" style="text-align: center; background-color: #EFF2F7;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"></path>
        </svg>
        <span class="sib-form-message-panel__inner-text">Something went wrong on our end. Try again, or email contact@rosebud.global and we'll pick it up.</span>
      </div>
    </div>
    <div></div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"></path>
        </svg>
        <span class="sib-form-message-panel__inner-text">Thanks — we've got it. Expect a reply within one business day with next steps and a call slot.</span>
      </div>
    </div>
    <div></div>
    <div id="sib-container" class="sib-container--large sib-container--vertical" style="max-width:540px; text-align:center; background-color:rgba(255,255,255,1); border-width:1px; border-style:solid; border-color:#C0CCD9; border-radius:3px; direction:ltr">
      <form id="sib-form" method="POST" action="https://c83c7e6a.sibforms.com/serve/MUIFAEPuaMnM7lEs4w4CJHujUzA3fm5To53DfNnm0NNzcqOIfUQ6o_Z1XLDQMk-Ud4PrPDMRc2paWGL-dX5L8GhJgNuQfE7ig7Mh_1yaXDUnsTGaIr0j_Yj0i3tOR3Nh5hnZqmYBhUNZLmvWS2XIDs3_gzAFzsuTuCGN7lRuBnqz8mSjO1PP5LhC7hIXPpGhSvvngUXS7Kxg4Bhghw==" data-type="subscription">
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="entry__field">
                  <input class="input " maxlength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autocomplete="off" placeholder="NAME" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="entry__field">
                  <input class="input " type="text" id="EMAIL" name="EMAIL" autocomplete="off" value="" placeholder="WORK EMAIL" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight: 700; text-align: left; font-family:Helvetica, sans-serif; font-size:16px; font-weight:700; text-align:left; color:#3c4858;" data-required="*">I would like to learn about:</label>
                <div style="">
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Dental, Aesthetic &amp; Private Healthcare" value="Dental, Aesthetic &amp; Private Healthcare" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Dental, Aesthetic &amp; Private Healthcare</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Enterprise" value="Enterprise" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Enterprise</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Financial Services" value="Financial Services" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Financial Services</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Insurance" value="Insurance" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Insurance</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Real Estate" value="Real Estate" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Real Estate</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INDUSTRY_INTEREST[]" data-value="Recruitment" value="Recruitment" data-required="true" />
                      <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#3C4858; background-color:transparent;">Recruitment</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight: 700; text-align: left; font-family:Helvetica, sans-serif; font-size:16px; font-weight:700; text-align:left; color:#3c4858;" for="REQUEST" data-required="*">Tell us about your needs</label>
                <div class="entry__field">
                  <input class="input " maxlength="200" type="text" id="REQUEST" name="REQUEST" autocomplete="off" placeholder="Tell us about your needs" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-optin sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <div class="entry__choice" style="">
                  <label>
                    <input type="checkbox" class="input_replaced" value="1" id="CONSENT" name="CONSENT" required />
                    <span class="checkbox checkbox_tick_positive" style="margin-left:"></span><span style="font-family:Helvetica, sans-serif; font-size:14px; text-align:left; color:#3C4858; background-color:transparent;"><p>I would like to receive communications about Rosebud Solutions tailored to my interests and preferences, including latest news about products, services, events and promotions. For more information, please see our <a href="https://rosebud.global/privacy" rel="nofollow">Privacy Policy.</a></p><span data-required="*" style="display: inline;" class="entry__label entry__label_optin"></span></span>
                  </label>
                </div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
              <label class="entry__specification" style="font-family:Helvetica, sans-serif; font-size:12px; text-align:left; color:#8390A4; text-align:left">You may unsubscribe at any time using the link in our newsletter.</label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-captcha sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="g-recaptcha sib-visible-recaptcha" id="sib-captcha" data-sitekey="6LdRteosAAAAAPepehV4G1MENSbkoE-y_yckJSMV" data-callback="handleCaptchaResponse" style="direction:ltr"></div>
              </div>
              <label class="entry__error entry__error--primary" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px;"></label>
            </div>
          </div>
        </div>
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align: left">
            <button class="sib-form-block__button sib-form-block__button-with-loader" style="font-family:Helvetica, sans-serif; font-size:16px; font-weight:700; text-align:left; color:#FFFFFF; background-color:#3E4857; border-width:0px; border-radius:3px;" form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"></path>
              </svg>
              GET STARTED
            </button>
          </div>
        </div>
        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="en">
      </form>
    </div>
  </div>
</div>
`;

const BREVO_GLOBALS_SCRIPT = `
window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
window.LOCALE = 'en';
window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Something's not quite right — please check the highlighted field and try again.";
window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
window.GENERIC_INVALID_MESSAGE = "Something's not quite right — please check the highlighted field and try again.";
window.INVALID_NUMBER = "Something's not quite right — please check the highlighted field and try again.";
window.INVALID_DATE = "Please enter a valid date";
window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';
window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected', selectedOption: '{quantity} selected', selectedOptions: '{quantity} selected' } };
window.AUTOHIDE = Boolean(0);
function handleCaptchaResponse() {
  var event = new Event('captchaChange');
  document.getElementById('sib-captcha').dispatchEvent(event);
}
`;

export default function PricingBrevoForm() {
  return (
    <>
      {/* Brevo's structural CSS — label/input/checkbox-replacement logic
          binds to this. Surface palette is overridden in globals.css under
          .rb-pricing-form-shell so the form lands on the dark site. */}
      <link
        rel="stylesheet"
        href="https://sibforms.com/forms/end-form/build/sib-styles.css"
      />

      <div
        className="rb-pricing-form-shell"
        dangerouslySetInnerHTML={{ __html: BREVO_FORM_HTML }}
      />

      <Script
        id="brevo-form-globals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: BREVO_GLOBALS_SCRIPT }}
      />
      <Script
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="afterInteractive"
        defer
      />
      <Script
        src="https://www.google.com/recaptcha/api.js?hl=en"
        strategy="afterInteractive"
      />
    </>
  );
}
