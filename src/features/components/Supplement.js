import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import './Header.css';

import {
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentHeaderSection,
  EuiTitle,
  EuiCallOut,
  EuiPageContentBody,
  EuiGlobalToastList,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLoadingSpinner
} from '@elastic/eui';
import { errorShown, fetchSupplements } from '../../reducers/supplementsSlice';
import Content from './Content';

export function Supplement() {
  const [toasts, setToasts] = useState([]);
  const dispatch = useDispatch();

  const errorToast = {
    title: 'Ooops, looks like an error occurred',
    text: 'Something went wrong. Please try again.',
    color: 'danger',
    iconType: 'alert',
    id: 'error'
  };

  const { selection, supplements } = useSelector(state => {
    return {
      selection: state.selection.selection,
      supplements: state.supplements.supplements[state.selection.selection]
    };
  }, shallowEqual);

  const { supplementsLoading, isError, shouldStopFetching } = useSelector(
    state => {
    return {
      supplementsLoading: state.supplements.fetching,
      isError: state.supplements.error,
      shouldStopFetching: state.supplements.shouldStopFetching,
    };
  }, shallowEqual);

  const removeToast = () => {
    setToasts([]);
  };

  useEffect(() => {
    if (supplements.length === 0 && !supplementsLoading && !isError && !shouldStopFetching) {
      dispatch(fetchSupplements(selection));
    }
  }, [dispatch, supplements, selection, isError]);

  const showErrorToast = () => {
    setToasts([errorToast]);
    dispatch(errorShown());
  };

  if (isError) {
    showErrorToast();
  }

  const renderLoadingSpinner = () => {
    return (
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiFlexItem grow={false}>
          <EuiLoadingSpinner size="l" />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  const renderContent = () => {
    return (
      <EuiFlexGroup direction="row">
        <EuiFlexItem className="flex-item">
          <Content items={supplements} count={0} />
        </EuiFlexItem>
        <EuiFlexItem className="flex-item">
          <Content items={supplements} count={1} />
        </EuiFlexItem>
        <EuiFlexItem className="flex-item">
          <Content items={supplements} count={2} />
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  return (
    <EuiPageContent>
      <EuiPageContentHeader>
        <EuiPageContentHeaderSection>
          <EuiTitle>
            <h2>Choose Supplements Below</h2>
          </EuiTitle>
        </EuiPageContentHeaderSection>
        <EuiPageContentHeaderSection>
          <EuiCallOut title="Disclaimer" color="warning" iconType="alert">
            <p>
              Information displayed is best to our abilities, but may not be
              100% accurate.
              <br />
              Use as a guideline only. We are an independent service and do not
              promote any brands.
            </p>
          </EuiCallOut>
        </EuiPageContentHeaderSection>
      </EuiPageContentHeader>
      <EuiPageContentBody>
        {supplementsLoading ? renderLoadingSpinner() : renderContent()}
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={6000}
        />
      </EuiPageContentBody>
    </EuiPageContent>
  );
}

export default Supplement;
