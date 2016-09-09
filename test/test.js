/**
 * Created by linyong on 9/7/16.
 */
import assert from 'assert';
import MongoModels from '../src';

describe('hapi-plugin-mongo', () => {
  it('isArray', done => {
    assert.equal('function',typeof MongoModels);
    done()
  });
});