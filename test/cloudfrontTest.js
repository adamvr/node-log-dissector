/*
 * to test s3 log parser
 * using the mocha test framework 
 * 2013-10-09
 * jujhars13
 */
var _ = require('lodash');
var dissector = require('../index').dissectors['cloudfront'];


//test data
var valid_log_lines = {
    1: '2015-01-28	18:41:47	LHR5	1	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001',
    100: '2015-01-28	18:41:47	LHR5	100	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001',
    4082: '2015-01-28	18:41:47	LHR5	4082	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001',
    1000: '2015-01-28	18:41:47	LHR5	1000	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001',
    10000: '2015-01-28	18:41:47	LHR5	10000	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001',
    100000: '2015-01-28	18:41:47	LHR5	100000	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001'
};

describe('s3', function () {
    //define our data and objects for the tests

    describe('.dissect', function () {
        it('should return a suitable array for valid log lines', function () {

            //foreach over our test data array and test
            _(valid_log_lines).forEach(function (line, key) {
                var data_should_be = {
                    date: '2015-01-28',
                    time: '18:41:47',
                    verb: 'GET',
                    uri: '/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg',
                    protocol: 'https',
                    client_ip: '195.214.31.26',
                    bytes_sent: key,
                    status_code: '200',
                    user_agent: 'curl/7.35.0',
                    type: 'cloudfront'
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
            var testData = '2015-01-28	18:50:46	LHR5	4082	191.224.31.66	GET	f3lkew8zqnjt1t.cloudfront.net	/buto/asia/videos/B9ixk/1/FFSbb/FFSbb_thumbnail_large_50.jpg	200	jujhar.com	curl/7.35.0	-	-	Hit	CFlXeIhIB_JVf6IuX3FDDSqNt0l3WIqmZBjKvwpJbYxaH1BXAwpUiA==	f3lkew8zqnjt1t.cloudfront.net	https	154	0.001';

            var data_should_be = {
                date: '2015-01-28',
                time: '18:50:46',
                x_edge_location: 'LHR5',
                bytes_sent: '4082',
                client_ip: '191.224.31.66',
                verb: 'GET',
                server_host: 'f3lkew8zqnjt1t.cloudfront.net',
                uri: '/buto/asia/videos/B9ixk/1/FFSbb/FFSbb_thumbnail_large_50.jpg',
                status_code: '200',
                referrer: 'jujhar.com',
                user_agent: 'curl/7.35.0',
                uri_query: '-',
                cookie: '-',
                x_edge_result_type: 'Hit',
                x_edge_request_id: 'CFlXeIhIB_JVf6IuX3FDDSqNt0l3WIqmZBjKvwpJbYxaH1BXAwpUiA==',
                x_host_headers: 'f3lkew8zqnjt1t.cloudfront.net',
                protocol: 'https',
                bytes_recieved: '154',
                time_taken: '0.001',
                type: 'cloudfront'
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