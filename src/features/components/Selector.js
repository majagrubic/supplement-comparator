import React, { Component } from 'react';
import { EuiComboBox } from '@elastic/eui';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: []
    };
  }

  onChange = selectedOptions => {
    this.setState({
      selectedOptions
    });
    const option = selectedOptions[0];
    if (!option) return;
    const item = option.value;
    this.props.onItemSelected(item);
  };

  render() {
    const { selectedOptions } = this.state;
    const options = this.props.items.map(item => {
      return { label: item.name_to_display, value: { ...item } };
    });
    return (
      <EuiComboBox
        placeholder="Select a supplement"
        options={options}
        selectedOptions={selectedOptions}
        onChange={this.onChange}
        singleSelection={true}
        fullWidth={true}
      />
    );
  }
}
