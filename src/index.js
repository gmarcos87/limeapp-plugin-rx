import  epics from './rxEpics';
import { reducer } from './rxReducer';
import * as selector from './rxSelectors';
import * as constants from './rxConstants';
import Rx from './rxPage';
import { RxMenu } from './rxMenu';

import i18nEs from '../i18n/translations/es.json';
import i18nEn from '../i18n/translations/en.json';

export default {
  name: 'Rx',
  page: Rx,
  menu: RxMenu,
  store: {
    name: 'rx',
    epics,
    reducer,
    selector,
    constants
  },
  translations: Object.assign(
    i18nEn,
    i18nEs
  )
};
