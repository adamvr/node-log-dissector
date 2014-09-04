/*
 * to test s3 log parser
 * using the mocha test framework 
 * 2013-10-09
 * jujhars13
 */
var _ = require('lodash');
var dissector = require('../index').dissectors['s3'];


//test data
var valid_log_lines = {
    1: '89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 buto-s3-cdn-origin [07/May/2013:19:01:44 +0000] 91.229.127.20 - 0B7A7459271E19B0 REST.GET.OBJECT live/videos/Bbgwg/1/2pgGq/1byte.txt "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 200 - 1 1 1 12 "-" "curl/7.29.0" -',
    100: '89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 buto-s3-cdn-origin [07/May/2013:19:01:44 +0000] 91.229.127.20 - 0B7A7459271E19B0 REST.GET.OBJECT live/videos/Bbgwg/1/2pgGq/1byte.txt "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 200 - 100 1 100 12 "-" "curl/7.29.0" -',
    1000: '89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 buto-s3-cdn-origin [07/May/2013:19:01:44 +0000] 91.229.127.20 - 0B7A7459271E19B0 REST.GET.OBJECT live/videos/Bbgwg/1/2pgGq/1byte.txt "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 200 - 1000 1 1000 12 "-" "curl/7.29.0" -',
    10000: '89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 buto-s3-cdn-origin [07/May/2013:19:01:44 +0000] 91.229.127.20 - 0B7A7459271E19B0 REST.GET.OBJECT live/videos/Bbgwg/1/2pgGq/1byte.txt "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 200 - 10000 1 1000 12 "-" "curl/7.29.0" -',
    100000: '89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 buto-s3-cdn-origin [07/May/2013:19:01:44 +0000] 91.229.127.20 - 0B7A7459271E19B0 REST.GET.OBJECT live/videos/Bbgwg/1/2pgGq/1byte.txt "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 200 - 100000 1 1000 12 "-" "curl/7.29.0" -'
};

describe('s3', function () {
    //define our data and objects for the tests

    describe('.dissect', function () {
        it('should return a suitable array for valid log lines', function () {

            //foreach over our test data array and test
            _(valid_log_lines).forEach(function (line, key) {
                var data_should_be = {
                    timestamp: '[07/May/2013:19:01:44 +0000]',
                    verb: 'GET',
                    uri: '/butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg',
                    protocol: 'HTTP/1.1',
                    client_ip: '91.229.127.20',
                    bytes_sent: key,
                    'status_code': '200',
                    'user-agent': 'curl/7.29.0',
                    type: 's3'
                };
                //parse the record

                var data = dissector.dissect(line);

                //iterate over our data array and compare values with what's returned
                _(data_should_be).forEach(function (value, data_key) {
                    (value).should.equal(data[data_key]);
                });

            });
        });

        it("should dissect all values from logs without failure", function () {
            var testData = '04db613bd000d07badc32d16138efc3eba3e96c6c3ca19365997ba468a6ac850 test.repo.io [10/Apr/2013:18:27:38 +0000] 54.225.77.116 arn:aws:iam::581309990414:user/test-registry 4981BCEDE3870133 REST.PUT.OBJECT incompatible-version/incompatible-version-1.0.0.zip "PUT /test.repo.io/incompatible-version/incompatible-version-1.0.0.zip HTTP/1.1" 200 - - 504 89 32 "-" "aws-sdk-nodejs/v0.9.7-pre.8 linux/v0.8.22" -';

            var data_should_be = {
                owner: '04db613bd000d07badc32d16138efc3eba3e96c6c3ca19365997ba468a6ac850',
                bucket: 'test.repo.io',
                timestamp: '[10/Apr/2013:18:27:38 +0000]',
                client_ip: '54.225.77.116',
                requester: 'arn:aws:iam::581309990414:user/test-registry',
                request_id: '4981BCEDE3870133',
                operation: 'REST.PUT.OBJECT',
                key: 'incompatible-version/incompatible-version-1.0.0.zip',
                verb: 'PUT',
                uri: '/test.repo.io/incompatible-version/incompatible-version-1.0.0.zip',
                protocol: 'HTTP/1.1',
                'status_code': '200',
                'error_code': '-',
                'bytes_sent': '-',
                'object_size': '504',
                'time_total': '89',
                'time_turn_around': '32',
                'referrer': '"-"',
                'user-agent': 'aws-sdk-nodejs/v0.9.7-pre.8 linux/v0.8.22',
                type: 's3'
            };

            //parse the record
            var data = dissector.dissect(testData);

            //iterate over our data array and compare values with what's returned
            _(data_should_be).forEach(function (value, data_key) {
                (value).should.equal(data[data_key]);
            });
        });
    });
});