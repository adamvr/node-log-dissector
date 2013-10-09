/* 
 * to test level3 cdn log parser
 * using the mocha test framework 
 * 2013-10-09
 * jujhars13
 */
var _ = require('lodash');
var dissector = require('../index').dissectors['level3-cdn'];


//test data
var valid_log_lines = {
    1: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 1 9 200 "curl/7.32.0" "-" "-" 347',
    100: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 100 9 200 "curl/7.32.0" "-" "-" 347',
    1000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 1000 9 200 "curl/7.32.0" "-" "-" 347',
    10000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 10000 9 200 "curl/7.32.0" "-" "-" 347',
    100000: '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 100000 9 200 "curl/7.32.0" "-" "-" 347'
};
var zero_log_line = '2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 0 9 200 "curl/7.32.0" "-" "-" 347';
var invalid_log_line = 'dodgy log line 2013-10-08 10:13:24.250 y "GET /butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg HTTP/1.1" 135.221.31.26 440521 102 16110 9 200 "curl/7.32.0" "-" "-" 347sda';

describe('Level3-cdn', function () {
    //define our data and objects for the tests

    describe('.dissect', function () {
        it('should return a suitable array for valid log lines', function () {

            //foreach over our test data array and test
            _(valid_log_lines).forEach(function (line, key) {
                var data_should_be = {
                    date: '2013-10-08',
                    time: '10:13:24.250',
                    verb: 'GET',
                    uri: '/butotv/live/1/6tYhhg1/6tYhhg1_frame_custom_0000.jpg',
                    protocol: 'HTTP/1.1',
                    client_ip: '135.221.31.26',
                    bytes_sent: key,
                    'status_code': '200',
                    'user-agent': 'curl/7.32.0',
                    type: 'level3-cdn'
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