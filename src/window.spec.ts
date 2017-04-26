import { expect, use } from 'chai';

import { IWindow, IWindowQueryFn, WindowClient } from './window';

// tslint:disable-next-line:no-require-imports no-var-requires
use(require('sinon-chai'));
// tslint:disable-next-line:no-require-imports import-name
import chaip = require('chai-as-promised');
use(<any>chaip);

describe('window querying', () => {
    function setup(fn: IWindowQueryFn): WindowClient {
        return new WindowClient(fn);
    }

    it('resolves with an app name', () => {
        const title = 'test';
        const success = (callback: Function) => {
            callback(<IWindow>{title: title});
        };
        const client = setup(success);
        return expect(client.getWindowAppName()).to.be.eventually.equal(title);
    });

    it('rejects with an error', () => {
        const err = new Error('no');
        const failure = () => {
            throw err;
        };
        const client = setup(failure);
        return expect(client.getWindowAppName()).to.be.eventually.rejectedWith(err);
    });
});



