import { Component, h } from 'preact';

const globalTranslate = (value) => {
  if (window.I18n === undefined) {
    return value;
  }
  return window.I18n(value);
};

export class RxMenu extends Component {
  render() {
    return (<a href={'#/rx'}>{globalTranslate('Status')}</a>);
  }
}