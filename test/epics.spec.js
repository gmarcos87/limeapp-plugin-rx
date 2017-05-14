
import limeCorePlugin from '../src/index';
import { assert } from 'chai';

import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';

const c = limeCorePlugin.store.constants;
const epics = limeCorePlugin.store.epics;

//Epic test util
const epicAssert = (epic,options,compare,done) => {
  return epic(ActionsObservable.of(options.action),options.store, options.api)
    .toArray()
    .subscribe(actualOutputActions => {
      compare(actualOutputActions, options.result);
      done();
    });
};

const epicErrorAssert = (epic,options,compare,done) => {
  return epic(ActionsObservable.of(options.action),options.store, options.api)
    .toArray()
    .subscribe(
    ()=>{},
    ()=>{},
    actualOutputActions => {
      compare(actualOutputActions, options.result);
      done();
    });
};

//TESTS
describe('Status epics', () => {
  it('Get status', (done) => {
    
    let onAction = {
      type: c.GET_NODE_STATUS
    };

    let expectedOutput = {
      type: c.GET_NODE_STATUS_SUCCESS,
      payload: {
        test: 'ok'
      }
    };

    let wsAPI = {
      call: (sid,path,opt) => Observable.of({test:'ok'})
    };

    let options = {
      action: onAction,
      result: [expectedOutput],
      store: {meta:{sid:123}},
      api: { wsAPI }
    };

    epicAssert(
      epics.nodeStatus,
      options,
      assert.deepEqual,
      done
    );
  });

});