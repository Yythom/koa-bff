/* eslint-disable no-undef */
const assert = require('assert');
const { expect } = require('chai');
const api = require('../src/api');

describe('Array', () => {
    describe('#indexOf()', () => {
        it('检测登入请求', (done) => {
            const qs = {
                order_id: '476715970279375872',
                type: '1',
            };
            api.login.loginApi(qs, 'test').then((res) => {
                if (res?.code === 0) {
                    assert(res.code === 0);
                    done();
                } else {
                    // expect(res.code).to.be.equal(0);
                    expect({ msg: res.msg, code: res.code }).to.be.equal({ code: 0 });
                    done('code error');
                }
            }).catch((err) => {
                done(err);
            });
        });
    });
});
