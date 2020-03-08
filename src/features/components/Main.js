import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import './Main.css';

import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiPageSideBar
} from '@elastic/eui';
import NavBar from './NavBar';
import Header from './Header';
import ContactUs from './ContactUs';
import About from './About';
import Supplement from './Supplement';

const supplements = [
  'wheys',
  'creatines',
  'preworkouts',
  'wheyIsolates',
  'caseins'
];

export function Main() {
  const { selection } = useSelector(state => {
    return {
      selection: state.selection.selection
    };
  }, shallowEqual);

  const isSupplementSelection = supplements.includes(selection);

  return (
    <EuiPage>
      <EuiPageSideBar>
        <NavBar />
      </EuiPageSideBar>
      <EuiPageBody className="page-body">
        <EuiPageHeader>
          <EuiPageHeaderSection style={{ width: '100%' }}>
            <Header />
          </EuiPageHeaderSection>
        </EuiPageHeader>
        {isSupplementSelection ? <Supplement /> : null}
        {selection === 'about' ? <About /> : null}
        {selection === 'contact' ? <ContactUs /> : null}
      </EuiPageBody>
    </EuiPage>
  );
}

export default Main;
