"use client";

import Script from "next/script";

/**
 * Brevo-hosted application form for the Appointment Setter role.
 *
 * Mirrors the PricingBrevoForm pattern — Brevo's markup is embedded
 * via dangerouslySetInnerHTML so their main.js can bind to the exact
 * class + data-attribute contract for validation, multiselect,
 * checkbox group, SMS country dropdown, date input, and reCAPTCHA v3.
 *
 * The inline <style> block + external sib-styles.css from Brevo's
 * embed are intentionally NOT loaded — they fight our dark palette
 * with !important rules. All form styling lives in globals.css under
 * .rb-pricing-form-shell and its extension rules.
 *
 * Form action posts to c83c7e6a.sibforms.com — Brevo's hosted endpoint.
 * No application data flows through our own server.
 */
const BREVO_FORM_HTML = `
<div class="sib-form" style="text-align: center; background-color: #EFF2F7;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-color:#ff4949; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z"/></svg>
        <span class="sib-form-message-panel__inner-text">Your application couldn&#39;t be submitted. Please try again, or email contact@rosebud.global if it keeps happening.</span>
      </div>
    </div>
    <div></div>
    <div id="success-message" class="sib-form-message-panel" style="font-family:Helvetica, sans-serif; font-size:16px; text-align:left; color:#085229; background-color:#e7faf0; border-color:#13ce66; border-radius:3px; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z"/></svg>
        <span class="sib-form-message-panel__inner-text">Thanks for applying. We&#39;ve received your application and will be in touch if it&#39;s a fit.</span>
      </div>
    </div>
    <div></div>
    <div id="sib-container" class="sib-container--large sib-container--vertical" style="max-width:540px; text-align:center; background-color:rgba(255,255,255,1); border-width:1px; border-style:solid; border-color:#C0CCD9; border-radius:3px; direction:ltr">
      <form id="sib-form" method="POST" action="https://c83c7e6a.sibforms.com/serve/MUIFALYPi4eaQPyMOFFiq9Aqfd0RbbSeSLR6AQOWAx2UU9uNj5R8Mya8eQI2bkpvcjqvMa2YiBOcqS8MKWvhHE9uvHGF4sYm2kHrLFWIrwqdba55yiUzONvSwaYaRrgA3ja6aTo-wwKpYD8tMxvycXX1KInMY262m_cAG8R29zvUOVoUTJWvsynEDuL-z5NjF9NT6KSiZ1SAyrIyYw==" data-type="subscription">

        <div style="padding: 8px 0;"><div class="sib-form-block rb-careers-section-h"><p>Section 1 · About you</p></div></div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="FIRSTNAME" data-required="*">First name</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autocomplete="given-name" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="LASTNAME" data-required="*">Last name</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="LASTNAME" name="LASTNAME" autocomplete="family-name" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="EMAIL" data-required="*">Email address</label>
            <div class="entry__field"><input class="input" type="text" id="EMAIL" name="EMAIL" autocomplete="email" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" data-required="*">Phone number</label>
            <div class="entry__field rb-phone-row">
              <select class="input rb-phone-cc" id="SMS__COUNTRY_CODE" name="SMS__COUNTRY_CODE" data-required="true" required>
                <option value="+44">United Kingdom (+44)</option>
                <option value="+1US">United States (+1)</option>
                <option value="+1CA">Canada (+1)</option>
                <option value="+61">Australia (+61)</option>
                <option value="+353">Ireland (+353)</option>
                <option value="+64">New Zealand (+64)</option>
                <option value="+27">South Africa (+27)</option>
                <option value="+33">France (+33)</option>
                <option value="+49">Germany (+49)</option>
                <option value="+34">Spain (+34)</option>
                <option value="+39">Italy (+39)</option>
                <option value="+31">Netherlands (+31)</option>
                <option value="+32">Belgium (+32)</option>
                <option value="+41">Switzerland (+41)</option>
                <option value="+43">Austria (+43)</option>
                <option value="+45">Denmark (+45)</option>
                <option value="+46">Sweden (+46)</option>
                <option value="+47">Norway (+47)</option>
                <option value="+48">Poland (+48)</option>
                <option value="+351">Portugal (+351)</option>
                <option value="+352">Luxembourg (+352)</option>
                <option value="+30">Greece (+30)</option>
                <option value="+36">Hungary (+36)</option>
                <option value="+40">Romania (+40)</option>
                <option value="+420">Czech Republic (+420)</option>
                <option value="+421">Slovakia (+421)</option>
                <option value="+372">Estonia (+372)</option>
                <option value="+371">Latvia (+371)</option>
                <option value="+370">Lithuania (+370)</option>
                <option value="+386">Slovenia (+386)</option>
                <option value="+385">Croatia (+385)</option>
                <option value="+358">Finland (+358)</option>
                <option value="+91">India (+91)</option>
                <option value="+92">Pakistan (+92)</option>
                <option value="+880">Bangladesh (+880)</option>
                <option value="+94">Sri Lanka (+94)</option>
                <option value="+852">Hong Kong (+852)</option>
                <option value="+65">Singapore (+65)</option>
                <option value="+60">Malaysia (+60)</option>
                <option value="+66">Thailand (+66)</option>
                <option value="+62">Indonesia (+62)</option>
                <option value="+63">Philippines (+63)</option>
                <option value="+84">Vietnam (+84)</option>
                <option value="+81">Japan (+81)</option>
                <option value="+82">South Korea (+82)</option>
                <option value="+86">China (+86)</option>
                <option value="+886">Taiwan (+886)</option>
                <option value="+971">United Arab Emirates (+971)</option>
                <option value="+966">Saudi Arabia (+966)</option>
                <option value="+972">Israel (+972)</option>
                <option value="+90">Turkey (+90)</option>
                <option value="+20">Egypt (+20)</option>
                <option value="+234">Nigeria (+234)</option>
                <option value="+254">Kenya (+254)</option>
                <option value="+233">Ghana (+233)</option>
                <option value="+52">Mexico (+52)</option>
                <option value="+55">Brazil (+55)</option>
                <option value="+54">Argentina (+54)</option>
                <option value="+56">Chile (+56)</option>
                <option value="+57">Colombia (+57)</option>
              </select>
              <input class="input rb-phone-num" type="tel" id="SMS_NUMBER" autocomplete="tel-national" placeholder="Phone number" data-required="true" required />
            </div>
            <input type="hidden" name="SMS" id="SMS" />
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="CITY" data-required="*">Country and city of residence</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="CITY" name="CITY" autocomplete="address-level2" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="TIMEZONE" data-required="*">Timezone, and the hours you can reliably work Monday to Friday</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="TIMEZONE" name="TIMEZONE" autocomplete="off" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="LINKEDIN">LinkedIn profile URL</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="LINKEDIN" name="LINKEDIN" autocomplete="url" /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block sib-divider-form-block"><div></div></div>
        </div>

        <div style="padding: 8px 0;"><div class="sib-form-block rb-careers-section-h"><p>Section 2 · Experience</p></div></div>

        <div style="padding: 8px 0;">
          <div class="sib-multiselect sib-multiselect-multichoice sib-form--blockPosition sib-form-block" data-required="true">
            <div class="form__entry"><div class="form__label-row">
              <label class="entry__label" for="lists" data-required="*">B2B sales, SDR, or setter experience</label>
              <div class="entry__field"><div class="input input_display input--multiselect input--centerText">0 selected</div><input id="lists" class="input" name="EXPERIENCE[]" type="hidden" value="[]" /></div>
            </div><label class="entry__error entry__error--primary"></label></div>
            <div class="sib-menu">
              <div class="sib-menu__select sib-menu__selectTextAlign"><button type="button" class="clickable_link sib-menu__select-all-button">Select all</button><span class="sib-menu__separator">/</span><button type="button" class="clickable_link sib-menu__clear-button">Clear</button></div>
              <ul class="sib-menu__item-list">
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="None"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">None</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Under 6 months"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Under 6 months</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="6–18 months"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">6–18 months</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="18 months – 3 years"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">18 months – 3 years</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="3+ years"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">3+ years</span></label></div></li>
              </ul>
              <div class="sib-menu__apply"><button type="button" class="sib-menu__cancel-button clickable_link">Cancel</button><button type="button" class="sib-menu__apply-button clickable_button">Apply</button></div>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq"><div class="form__label-row">
              <label class="entry__label" data-required="*">Have you worked a 100% commission role before?</label>
              <div>
                <div class="entry__choice"><label class="checkbox__label"><input type="checkbox" class="input_replaced" name="COMMISSION_ROLE[]" data-value="Yes" value="Yes" data-required="true" /><span class="checkbox checkbox_tick_positive"></span><span class="rb-careers-choice-label">Yes</span></label></div>
                <div class="entry__choice"><label class="checkbox__label"><input type="checkbox" class="input_replaced" name="COMMISSION_ROLE[]" data-value="No" value="No" data-required="true" /><span class="checkbox checkbox_tick_positive"></span><span class="rb-careers-choice-label">No</span></label></div>
              </div>
            </div><label class="entry__error entry__error--primary"></label></div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="COMMISSION_ROLE_IF_YES" data-required="*">If yes, for how long, and what were your average monthly earnings?</label>
            <div class="entry__field"><input class="input" maxlength="200" type="text" id="COMMISSION_ROLE_IF_YES" name="COMMISSION_ROLE_IF_YES" autocomplete="off" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-multiselect sib-multiselect-multichoice sib-form--blockPosition sib-form-block" data-required="true">
            <div class="form__entry"><div class="form__label-row">
              <label class="entry__label" for="lists" data-required="*">Industry experience</label>
              <div class="entry__field"><div class="input input_display input--multiselect input--centerText">0 selected</div><input id="lists" class="input" name="INDUSTRY_INTEREST[]" type="hidden" value="[]" /></div>
            </div><label class="entry__error entry__error--primary"></label></div>
            <div class="sib-menu">
              <div class="sib-menu__select sib-menu__selectTextAlign"><button type="button" class="clickable_link sib-menu__select-all-button">Select all</button><span class="sib-menu__separator">/</span><button type="button" class="clickable_link sib-menu__clear-button">Clear</button></div>
              <ul class="sib-menu__item-list">
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Dental, Aesthetic &amp; Private Healthcare"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Dental, Aesthetic &amp; Private Healthcare</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Mortgage &amp; Lending"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Mortgage &amp; Lending</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Insurance"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Insurance</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Real Estate"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Real Estate</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Recruitment"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Recruitment</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Enterprise"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Enterprise</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Other"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Other</span></label></div></li>
              </ul>
              <div class="sib-menu__apply"><button type="button" class="sib-menu__cancel-button clickable_link">Cancel</button><button type="button" class="sib-menu__apply-button clickable_button">Apply</button></div>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block sib-divider-form-block"><div></div></div>
        </div>

        <div style="padding: 8px 0;"><div class="sib-form-block rb-careers-section-h"><p>Section 3 · Setup</p></div></div>

        <div style="padding: 8px 0;">
          <div class="sib-multiselect sib-multiselect-multichoice sib-form--blockPosition sib-form-block" data-required="true">
            <div class="form__entry"><div class="form__label-row">
              <label class="entry__label" for="lists" data-required="*">Equipment check — tick all that apply</label>
              <div class="entry__field"><div class="input input_display input--multiselect input--centerText">0 selected</div><input id="lists" class="input" name="EQUIPMENT[]" type="hidden" value="[]" /></div>
            </div><label class="entry__error entry__error--primary"></label></div>
            <div class="sib-menu">
              <div class="sib-menu__select sib-menu__selectTextAlign"><button type="button" class="clickable_link sib-menu__select-all-button">Select all</button><span class="sib-menu__separator">/</span><button type="button" class="clickable_link sib-menu__clear-button">Clear</button></div>
              <ul class="sib-menu__item-list">
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Computer or laptop"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Computer or laptop</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Headset with microphone"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Headset with microphone</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Wired or stable Wi-Fi internet"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Wired or stable Wi-Fi internet</span></label></div></li>
                <li class="sib-menu__item"><div class="entry__choice"><label class="sib-multiselect__label"><input type="checkbox" class="input_replaced" data-value="Quiet calling environment"><span class="checkbox checkbox_tick_positive"></span><span class="sib-multiselect__label-text">Quiet calling environment</span></label></div></li>
              </ul>
              <div class="sib-menu__apply"><button type="button" class="sib-menu__cancel-button clickable_link">Cancel</button><button type="button" class="sib-menu__apply-button clickable_button">Apply</button></div>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="HOURLY_COMMITMENT" data-required="*">Hours per week you can commit</label>
            <div class="entry__field"><input maxlength="200" type="text" data-numeric="true" class="input" id="HOURLY_COMMITMENT" name="HOURLY_COMMITMENT" autocomplete="off" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block"><div class="form__entry"><div class="form__label-row">
            <label class="entry__label" for="START_DATE" data-required="*">Earliest possible start date</label>
            <div class="entry__field"><input class="input" type="date" id="START_DATE" name="START_DATE" autocomplete="off" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block rb-careers-data-h"><div class="sib-text-form-block"><p><strong>Data protection</strong></p></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block rb-careers-data-body"><div class="sib-text-form-block"><p>Rosebud Global Ltd (trading as Rosebud Solutions) is the data controller for the information you provide. We use it to assess your suitability for this role and to contact you about your application. Full details on how we handle your data, how long we keep it, and your rights are in our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.<span class="rb-tip" tabindex="0" role="button" aria-label="Verification notice"><span class="rb-tip-icon" aria-hidden="true">i</span><span class="rb-tip-content" role="tooltip">This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> apply.</span></span></p></div></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-optin sib-form-block" data-required="true">
            <div class="form__entry entry_mcq"><div class="form__label-row">
              <div class="entry__choice"><label><input type="checkbox" class="input_replaced" value="1" id="GDPR_CONSENT" name="GDPR_CONSENT" required /><span class="checkbox checkbox_tick_positive"></span><span class="rb-careers-optin-label"><p>I have read and understood how Rosebud Solutions will use my data, as set out in the Privacy Policy.</p><span data-required="*" class="entry__label entry__label_optin"></span></span></label></div>
            </div><label class="entry__error entry__error--primary"></label></div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-optin sib-form-block" data-required="true">
            <div class="form__entry entry_mcq"><div class="form__label-row">
              <div class="entry__choice"><label><input type="checkbox" class="input_replaced" value="1" id="CONSENT" name="CONSENT" required /><span class="checkbox checkbox_tick_positive"></span><span class="rb-careers-optin-label"><p>I understand this is a 100% commission, independent contractor role. There is no base salary. I have at least three months of financial runway and I&#39;m not depending on this role to cover my immediate cost of living.</p><span data-required="*" class="entry__label entry__label_optin"></span></span></label></div>
            </div><label class="entry__error entry__error--primary"></label></div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-optin sib-form-block" data-required="true">
            <div class="form__entry entry_mcq"><div class="form__label-row">
              <div class="entry__choice"><label><input type="checkbox" class="input_replaced" value="1" id="LOCATION_CONSENT" name="LOCATION_CONSENT" required /><span class="checkbox checkbox_tick_positive"></span><span class="rb-careers-optin-label"><p>I confirm I have the right to work as a self-employed contractor in my country of residence.</p><span data-required="*" class="entry__label entry__label_optin"></span></span></label></div>
            </div><label class="entry__error entry__error--primary"></label></div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="g-recaptcha-v3" data-sitekey="6LdRteosAAAAAPepehV4G1MENSbkoE-y_yckJSMV" style="display: none"></div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align: left">
            <button class="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512"><path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"/></svg>
              Submit application
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
window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "Some details don't look right. Please check the highlighted fields and try again.";
window.REQUIRED_ERROR_MESSAGE = "This field is required. ";
window.GENERIC_INVALID_MESSAGE = "Some details don't look right. Please check the highlighted fields and try again.";
window.INVALID_NUMBER = "Some details don't look right. Please check the highlighted fields and try again.";
window.INVALID_DATE = "Please enter a valid date";
window.REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';
window.translation = { common: { selectedList: '{quantity} list selected', selectedLists: '{quantity} lists selected', selectedOption: '{quantity} selected', selectedOptions: '{quantity} selected' } };
window.AUTOHIDE = Boolean(0);
`;

// Combine the custom country-code select + plain phone input into the
// hidden Brevo SMS field. Both visible fields fire this on every change,
// so the hidden SMS attribute is always in sync before the form submits.
// Country code values carry a trailing country marker for entries that
// share a dial code (+1 US / +1 CA) — strip it before concat.
const SMS_COMBINE_SCRIPT = `
(function() {
  function sync() {
    var cc = document.getElementById('SMS__COUNTRY_CODE');
    var num = document.getElementById('SMS_NUMBER');
    var sms = document.getElementById('SMS');
    if (!cc || !num || !sms) return;
    var code = (cc.value || '').replace(/[A-Z]+$/, '');
    var n = (num.value || '').replace(/[^0-9]/g, '').replace(/^0+/, '');
    sms.value = n ? (code + n) : '';
  }
  function bind() {
    var cc = document.getElementById('SMS__COUNTRY_CODE');
    var num = document.getElementById('SMS_NUMBER');
    if (!cc || !num) return false;
    cc.addEventListener('change', sync);
    num.addEventListener('input', sync);
    num.addEventListener('blur', sync);
    sync();
    return true;
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    if (!bind()) setTimeout(bind, 300);
  }
})();
`;

export default function CareersBrevoForm() {
  return (
    <>
      <div className="rb-pricing-form-shell rb-careers-form-shell">
        <div dangerouslySetInnerHTML={{ __html: BREVO_FORM_HTML }} />
      </div>
      <Script
        id="careers-brevo-globals"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: BREVO_GLOBALS_SCRIPT }}
      />
      <Script
        id="careers-sms-combine"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: SMS_COMBINE_SCRIPT }}
      />
      <Script
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="afterInteractive"
        defer
      />
      <Script
        src="https://www.google.com/recaptcha/api.js?render=6LdRteosAAAAAPepehV4G1MENSbkoE-y_yckJSMV&hl=en"
        strategy="afterInteractive"
        async
        defer
      />
    </>
  );
}
