import React from 'react';
import './Main.css';
import { Switch, Route } from 'react-router-dom';

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

export function Main() {
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
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <ContactUs />
          </Route>
          <Route path="/">
            <Supplement />
          </Route>
        </Switch>
      </EuiPageBody>
    </EuiPage>
  );
}

export default Main;
