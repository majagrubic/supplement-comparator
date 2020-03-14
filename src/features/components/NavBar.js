import React, { useState } from 'react';

import { EuiIcon, EuiSideNav } from '@elastic/eui';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setSelection } from '../../reducers/selectionSlice';
import { removeError } from '../../reducers/supplementsSlice';
import logoSvg from './logo.svg';
import './NavBar.css';
import { useHistory } from 'react-router-dom';

export function NavBar() {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const { selection } = useSelector(state => {
    return {
      selection: state.selection.selection,
    };
  }, shallowEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = name => {
    if (!name) return;
    dispatch(setSelection(name));
    dispatch(removeError());
  };

  const selectionNames = {
    'Whey Protein': 'wheys',
    Preworkouts: 'preworkouts',
    Creatine: 'creatines',
    About: 'about',
    Contact: 'contact',
    'Whey Isolate': 'wheyIsolates',
    Casein: 'caseins'
  };

  const createItem = (name, data = {}) => {
    return {
      ...data,
      id: name,
      name,
      isSelected: selection === selectionNames[name],
      onClick: () => {
        const selectionName = selectionNames[name];
        selectItem(selectionName);
        history.push(selectionName);
      }
    };
  };

  const sideNav = [
    createItem('Supplements', {
      icon: <EuiIcon type={logoSvg} />,
      items: [
        createItem('Protein', {
          forceOpen: true,
          items: [
            createItem('Whey Protein'),
            createItem('Whey Isolate'),
            createItem('Casein')
          ]
        }),
        createItem('Preworkouts'),
        createItem('Creatine')
      ],
      forceOpen: true,
      isSelected: false
    }),
    createItem('About', {
      icon: <EuiIcon type="user" color="#00D7C1" />,
      isSelected: false
    }),
    createItem('Contact', {
      icon: <EuiIcon type="pencil" color="#00D7C1" />,
      isSelected: false
    })
  ];

  return (
    <EuiSideNav
      id="sideNav"
      mobileTitle="Click to select category"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
    />
  );
}

export default NavBar;
