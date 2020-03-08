import React from 'react';
import './Header.css';

import {
  EuiText,
  EuiPageContent,
  EuiPageContentHeader,
  EuiTitle,
  EuiPageContentBody,
  EuiCallOut
} from '@elastic/eui';

export function About() {
  return (
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiTitle>
          <h2>About Us</h2>
        </EuiTitle>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        <EuiText>
          <p>
            Here at Supplements DB we believe fitness should be easily
            accessible to anyone. There are hundreds of supplements out there
            and sometimes it's hard to navigate which one would be the best you.
            We are attempting to solve that problem by providing an extensive
            supplements database which aims at helping you make the right
            decision.
          </p>
          <p>We don't sell anything. You will never see any price tags here.</p>
          <p>
            {' '}
            We do not promote any brands. The order in which supplements appear
            is purely random.
          </p>

          <EuiCallOut title="Disclaimer" color="warning">
            <p>
              {' '}
              We aim to provide the data best to our abilities, but it may not
              be 100% accurate. Use at your own risk.{' '}
            </p>
          </EuiCallOut>
        </EuiText>
      </EuiPageContentBody>
    </EuiPageContent>
  );
}

export default About;
