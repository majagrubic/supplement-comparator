import React from 'react';
import { useDispatch } from 'react-redux';
import './Header.css';

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderLink,
  EuiBetaBadge
} from '@elastic/eui';

import logoSvg from './logo.svg';

import { setSelection } from '../../reducers/selectionSlice';

export function Header() {
  const dispatch = useDispatch();

  const setContactSelection = () => {
    dispatch(setSelection('contact'));
  };

  const setAboutSelection = () => {
    dispatch(setSelection('about'));
  };

  return (
    <EuiHeader size="l">
      <EuiHeaderSection style={{ flexGrow: '1' }}>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLogo href="wheys" iconType={logoSvg}>
            Supplements Comparator &nbsp;
            <EuiBetaBadge
              label="Beta"
              tooltipContent="This app is still in beta. Please help us by reporting any bugs."
            />
          </EuiHeaderLogo>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
      <EuiHeaderSection side="right" style={{ flexGrow: '0 !important' }} id='contactSection'>
        <EuiHeaderSectionItem border="right">
          <EuiHeaderLink iconType="user" onClick={setAboutSelection}>
            About
          </EuiHeaderLink>
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem border="none">
          <EuiHeaderLink iconType="pencil" onClick={setContactSelection}>
            Contact
          </EuiHeaderLink>
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
}

export default Header;
