import React, { useState } from 'react';

import { EuiIcon, EuiSideNav } from '@elastic/eui';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { setSelection } from '../../reducers/selectionSlice';
import logoSvg from './logo.svg';

export function NavBar() {
  const [isSideNavOpenOnMobile, setIsSideNavOpenOnMobile] = useState(false);
  const { selection } = useSelector(state => {
    return {
      selection: state.selection.selection
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const toggleOpenOnMobile = () => {
    setIsSideNavOpenOnMobile(!isSideNavOpenOnMobile);
  };

  const selectItem = name => {
    if (!name) return;
    dispatch(setSelection(name));
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
        selectItem(selectionNames[name]);
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
      mobileTitle="Navigate within $APP_NAME"
      toggleOpenOnMobile={toggleOpenOnMobile}
      isOpenOnMobile={isSideNavOpenOnMobile}
      items={sideNav}
      style={{ width: 192, marginTop: '60px' }}
    />
  );
}

export default NavBar;
