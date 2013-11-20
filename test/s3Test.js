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

        it('should return a suitable array for the extra log line text', function () {
            var line = 'b76db5b6c51be22bbd71688bf652a29846f08d1bc0951494a42849e234c2f988 origin.buto.tv [20/Nov/2013:09:00:00 +0000] 4.26.231.155 - BAC4680ACF3162A8 REST.GET.OBJECT butotv/live/players/test_files/mediumtest.swf "GET /butotv/live/players/test_files/mediumtest.swf?94179.54538948834 HTTP/1.1" 200 - 199825 199825 17 12 "https://embed.buto.tv/vgS95" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36" -';
            var data = dissector.dissect(line);
            (data).should.not.empty;
        });

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
                    status_code: '200',
                    'user-agent': 'curl/7.29.0',
                    type: 's3'
                };
                //parse the record

                var data = dissector.dissect(line);
                //iterate over our data array and compare values with what's returned
                _(data_should_be).forEach(function (value, data_key) {
                    (data[data_key]).should.equal(value);
                });

            });
        });
    });
})
;