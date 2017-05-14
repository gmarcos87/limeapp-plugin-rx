import { h, render } from 'preact'; /** @jsx h */
import chai, { expect } from 'chai';
import assertJsx from 'preact-jsx-chai';

chai.use(assertJsx);

import { Rx, mapDispatchToProps, mapStateToProps } from '../src/rxPage';
import * as c from '../src/rxConstants';
import { initialState } from '../src/rxReducer';
