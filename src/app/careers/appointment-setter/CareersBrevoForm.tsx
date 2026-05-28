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
          <div class="sib-sms-field sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
            <label class="entry__label" for="SMS" data-required="*">Phone number</label>
            <div class="sib-sms-input-wrapper" style="direction:ltr">
              <div class="sib-sms-input" data-placeholder="" data-required="true" data-country-code="GB" data-value="" data-attributename="SMS">
                <div class="entry__field"><select class="input" name="SMS__COUNTRY_CODE" data-required="true">
                  <option value="+44">+44 GB</option>
                  <option value="+1">+1 US</option>
                  <option value="+1">+1 CA</option>
                  <option value="+61">+61 AU</option>
                  <option value="+353">+353 IE</option>
                  <option value="+64">+64 NZ</option>
                  <option value="+27">+27 ZA</option>
                  <option value="+33">+33 FR</option>
                  <option value="+49">+49 DE</option>
                  <option value="+34">+34 ES</option>
                  <option value="+39">+39 IT</option>
                  <option value="+31">+31 NL</option>
                  <option value="+32">+32 BE</option>
                  <option value="+41">+41 CH</option>
                  <option value="+43">+43 AT</option>
                  <option value="+45">+45 DK</option>
                  <option value="+46">+46 SE</option>
                  <option value="+47">+47 NO</option>
                  <option value="+48">+48 PL</option>
                  <option value="+351">+351 PT</option>
                  <option value="+352">+352 LU</option>
                  <option value="+354">+354 IS</option>
                  <option value="+356">+356 MT</option>
                  <option value="+357">+357 CY</option>
                  <option value="+358">+358 FI</option>
                  <option value="+359">+359 BG</option>
                  <option value="+30">+30 GR</option>
                  <option value="+36">+36 HU</option>
                  <option value="+40">+40 RO</option>
                  <option value="+420">+420 CZ</option>
                  <option value="+421">+421 SK</option>
                  <option value="+371">+371 LV</option>
                  <option value="+370">+370 LT</option>
                  <option value="+372">+372 EE</option>
                  <option value="+386">+386 SI</option>
                  <option value="+385">+385 HR</option>
                  <option value="+91">+91 IN</option>
                  <option value="+92">+92 PK</option>
                  <option value="+880">+880 BD</option>
                  <option value="+94">+94 LK</option>
                  <option value="+852">+852 HK</option>
                  <option value="+65">+65 SG</option>
                  <option value="+60">+60 MY</option>
                  <option value="+66">+66 TH</option>
                  <option value="+62">+62 ID</option>
                  <option value="+63">+63 PH</option>
                  <option value="+84">+84 VN</option>
                  <option value="+81">+81 JP</option>
                  <option value="+82">+82 KR</option>
                  <option value="+86">+86 CN</option>
                  <option value="+886">+886 TW</option>
                  <option value="+971">+971 AE</option>
                  <option value="+966">+966 SA</option>
                  <option value="+972">+972 IL</option>
                  <option value="+90">+90 TR</option>
                  <option value="+20">+20 EG</option>
                  <option value="+234">+234 NG</option>
                  <option value="+254">+254 KE</option>
                  <option value="+233">+233 GH</option>
                  <option value="+52">+52 MX</option>
                  <option value="+55">+55 BR</option>
                  <option value="+54">+54 AR</option>
                  <option value="+56">+56 CL</option>
                  <option value="+57">+57 CO</option>
                  <option value="+51">+51 PE</option>
                  <option value="+58">+58 VE</option>
                </select></div>
                <div class="entry__field" style="width: 100%"><input type="tel" class="input" id="SMS" name="SMS" autocomplete="tel" placeholder="Phone number" data-required="true" required /></div>
              </div>
              <div class="sib-sms-tooltip">
                <div class="sib-sms-tooltip__box">Enter your number without a leading + or 0 — e.g. 7700900123 for the UK.</div>
                <span class="sib-sms-tooltip__icon">?</span>
              </div>
            </div>
          </div>
          <label class="entry__error entry__error--primary"></label>
          <label class="entry__error entry__error--secondary"></label>
          </div></div>
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
            <div class="entry__field"><input maxlength="200" type="text" data-type="date" class="input" pattern="^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\\d{4}$" title="dd-mm-yyyy" data-format="dd-mm-yyyy" id="START_DATE" name="START_DATE" autocomplete="off" data-required="true" required /></div>
          </div><label class="entry__error entry__error--primary"></label><label class="entry__specification">dd-mm-yyyy</label></div></div>
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
