/**
 * dissector for amazon cloudfront v1.0 acess log files
 * @author jujhars13
 * @link http://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html#LogFileFormat
 */
//Fields: date time x-edge-location sc-bytes c-ip cs-method cs(Host) cs-uri-stem sc-status cs(Referer) cs(User-Agent) cs-uri-query cs(Cookie) x-edge-result-type x-edge-request-id x-host-header cs-protocol cs-bytes time-taken
//eg
//2015-01-28	18:41:47	LHR5	4082	195.214.31.26	GET	e3lkfdfzknjs2t.cloudfront.net	/buto/europe/videos/Ft5xk/1/BFSdb/BFSdb_thumbnail_large_50.jpg	200	-	curl/7.35.0	-	-	Hit	gq6qEMK_nqhjDM4mXDZWGgoh_xxOClMJIwlGbGJt9TmZSIjOJmxLWg==	e3lkfdfzknjs2t.cloudfront.net	https	154	0.001
var regex = /(\S+?) (\S+?) (\S+? \+\S+?\]) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) "(\S+?) (\S+?) (\S+?)" (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) "(.*?)" (\S+?)/

var map = {
    1: 'date',
    2: 'time',
    3: 'x_edge_location',
    4: 'bytes_sent',
    5: 'client_ip',
    6: 'http_method',
    7: 'server_host',
    8: 'uri',
    9: 'status_code',
    10: 'referrer',
    11: 'user_agent',
    12: 'uri_query',
    13: 'cookie',
    14: 'x_edge_result_type',
    15: 'x_edge_request_id',
    16: 'x_host_headers',
    17: 'protocol',
    18: 'bytes_recieved',
    19: 'time_taken'
};

var type = 'cloudfront';

module.exports = {
    regex: regex,
    map: map,
    type: type
};
