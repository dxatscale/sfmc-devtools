const chai = require('chai');
const chaiFiles = require('chai-files');

chai.use(chaiFiles);

const assert = chai.assert;
const cache = require('../lib/util/cache');
const testUtils = require('./utils');
const handler = require('../lib/index');

describe('type: attributeGroup', () => {
    beforeEach(() => {
        testUtils.mockSetup();
    });
    afterEach(() => {
        testUtils.mockReset();
    });
    describe('Retrieve ================', () => {
        it('Should retrieve a attributeGroup', async () => {
            // WHEN
            const retrieve = await handler.retrieve('testInstance/testBU', ['attributeGroup']);

            // THEN
            assert.equal(process.exitCode, false, 'retrieve should not have thrown an error');
            assert.equal(
                retrieve['testInstance/testBU'].attributeGroup
                    ? Object.keys(retrieve['testInstance/testBU'].attributeGroup).length
                    : 0,
                7,
                'only 7 attributeGroups expected in retrieve response'
            );

            // get results from cache
            const result = cache.getCache();
            assert.equal(
                result.attributeGroup ? Object.keys(result.attributeGroup).length : 0,
                7,
                'only 7 attributeGroups expected in cache'
            );
            assert.deepEqual(
                await testUtils.getActualJson('ETMobileConnect', 'attributeGroup'),
                await testUtils.getExpectedJson('9999999', 'attributeGroup', 'retrieve'),

                'returned metadata was not equal expected'
            );

            assert.equal(
                testUtils.getAPIHistoryLength(),
                2,
                'Unexpected number of requests made. Run testUtils.logAPIHistoryDebug() to see the requests'
            );
            return;
        });
    });
});
