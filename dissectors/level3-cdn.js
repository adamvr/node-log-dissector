/**
 * dissector for level 3 cdn log files
 * @author jujhars13
 * @link http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html
 */
//LogHeader=date time cs-method cs-uri cs-version c-ip x-distributor-id x-ext-status sc-bytes time-taken sc-status cs(User-Agent) cs(Referer) cs(Cookie) time cs-uri-query cs-uri-stem
//2013-10-08 10:12:56.526 y "GET /butotv/live/videos/Bbgwg/1/2pgGq/2pgGq_frame_custom_0000.jpg HTTP/1.1" 195.224.31.66 440521 0 16110 2479 200 "curl/7.32.0" "-" "-" 371
var regex = /(\S+) (\S+) (\S+) "(\S+) (\S+) (\S+)" (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) "(\S+)" "(\S+)" "(\S+)" (\S+)/

var map = {
    1: 'date',
    2: 'time',
    3: 'random-ass-char',
    4: 'verb',
    5: 'uri',
    6: 'protocol',
    7: 'ip',
    8: 'x-distributor-id',
    9: 'x-ext-status',
    10: 'bytes',
    11: 'time-taken',
    12: 'http-status',
    13: 'user-agent',
    14: 'referer',
    15: 'cookie',
    16: 'timetaken'
};

var type = 'level3-cdn';

module.exports = {
    regex: regex,
    map: map,
    type: type
};
