import { expect, use } from 'chai';
import * as sinon from 'sinon';

// tslint:disable-next-line:no-require-imports no-var-requires
use(require('sinon-chai'));
// tslint:disable-next-line:no-require-imports import-name
import chaip = require('chai-as-promised');
use(<any>chaip);


import { ISlackAPI, SlackClient } from './SlackClient';

class DummySlackAPI implements ISlackAPI {
    public api(_: string, __: any, callback: (err: any, response: any) => void): void {
        callback(null, {});
    }
}

describe('client', () => {
    describe('setting status', () => {
        const api = new DummySlackAPI();
        const client = new SlackClient(api);
        let stub: sinon.SinonStub;

        function createStub(): sinon.SinonStub {
            stub = sinon.stub(api, 'api');
            return stub;
        }

        it('resolves with an api response', () => {
            createStub().yields(null, {});
            return expect(client.setStatus('emoji', 'text')).to.eventually.be.fulfilled;
        });

        it('rejects with an error', () => {
            const err = new Error('no');
            createStub().yields(err, {});
            return expect(client.setStatus('emoji', 'text')).to.eventually.be.rejectedWith(err);
        });

        afterEach(() => {
            stub.restore();
        });
    });
});
