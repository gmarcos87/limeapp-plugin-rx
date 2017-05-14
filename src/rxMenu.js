import { Component, h } from 'preact';

export class RxMenu extends Component {
  render() {
    return (<a href={'#/rx'}>{window.I18n.t('Status')}</a>);
  }
}