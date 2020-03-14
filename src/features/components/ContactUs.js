import React, { useState, useEffect } from 'react';
import './Header.css';

import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
  EuiSelect,
  EuiButton,
  EuiPageContentBody
} from '@elastic/eui';

export function ContactUs() {
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [mandatoryFieldsMissing, setMandatoryFieldsMissing] = useState(true);
  const [fields, setFields] = useState({
    name: '',
    email: '',
    message: '',
    reason: ''
  });

  const validateEmail = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = re.test(String(email).toLowerCase());
    setEmailInvalid(!valid);
  };

  const validateMandatoryFields = () => {
    let hasValue = true;
    const keys = Object.keys(fields);
    keys.forEach(key => {
      if (key === 'reason') return;
      if (fields[key] === '') {
        hasValue = false;
      }
    });
    setMandatoryFieldsMissing(!hasValue);
  };

  const onTextFieldChange = (fieldName, value) => {
    const newFieldsValue = { ...fields };
    newFieldsValue[fieldName] = value;
    setFields(newFieldsValue);
    if (fieldName === 'email') {
      validateEmail(value);
    }
  };

  useEffect(() => {
    validateMandatoryFields();
  }, [fields, validateMandatoryFields]);

  const onSelectChange = e => {
    setFields({ ...fields, reason: e.target.value });
  };

  return (
    <EuiPageContent>
      <EuiPageContentHeader>
        Something wrong? Found a bug? Would you like us to add a new supplement?
        We'd love to hear from you!
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <form name="contact" method="post">
          <input type="hidden" name="form-name" value="contact" />
          <EuiForm name="contact">
            <EuiFormRow label="Name *">
              <EuiFieldText
                onChange={e => onTextFieldChange('name', e.target.value)}
                name="name"
              />
            </EuiFormRow>
            <EuiFormRow
              label="Email *"
              error={emailInvalid ? 'Wrong email format' : ''}
              isInvalid={emailInvalid}
            >
              <EuiFieldText
                name="email"
                value={fields.email}
                isInvalid={emailInvalid}
                onChange={e => onTextFieldChange('email', e.target.value)}
                aria-label="Use aria labels when no actual label is in use"
              />
            </EuiFormRow>
            <EuiFormRow label="Reason for contact">
              <EuiSelect
                name="reason"
                hasNoInitialSelection={true}
                onChange={onSelectChange}
                options={[
                  { value: 'bug', text: 'Bug report' },
                  {
                    value: 'supplement_info',
                    text: 'Supplement info is wrong'
                  },
                  { value: 'supplement_data', text: 'Add new supplement' },
                  { value: 'other', text: 'Other' }
                ]}
              />
            </EuiFormRow>
            <EuiFormRow label="Message *">
              <EuiTextArea
                name="message"
                placeholder="Tell us what you'd like us to know"
                onChange={e => {
                  onTextFieldChange('message', e.target.value);
                }}
              />
            </EuiFormRow>
            <EuiButton
              type="submit"
              fill
              color="primary"
              isDisabled={mandatoryFieldsMissing}
            >
              Submit
            </EuiButton>
            <EuiFormRow
              helpText="Fields marked with * are mandatory"
              style={{ marginTop: '10px' }}
            >
              <span />
            </EuiFormRow>
          </EuiForm>
        </form>
      </EuiPageContentBody>
    </EuiPageContent>
  );
}

export default ContactUs;
