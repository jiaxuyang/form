/* eslint-disable no-undef */

import React from 'react';
import ReactDOM from 'react-dom';
import { Simulate } from 'react-dom/test-utils';
import createForm from '../src/createForm';

let Test = React.createClass({
  propTypes: {
    form: React.PropTypes.object,
  },
  upper(v) {
    return v && v.toUpperCase();
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (<div>
      <input {...getFieldProps('normal', {
        normalize: this.upper,
      })}
      />
    </div>);
  },
});

Test = createForm({
  withRef: true,
})(Test);

describe('normalize usage', () => {
  let container;
  let component;
  let form;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    component = ReactDOM.render(<Test />, container);
    component = component.refs.wrappedComponent;
    form = component.props.form;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  it('works', () => {
    form.getFieldInstance('normal').value = 'a';
    Simulate.change(form.getFieldInstance('normal'));
    expect(form.getFieldValue('normal')).toBe('A');
    expect(form.getFieldInstance('normal').value).toBe('A');
  });
});
