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
    });
});