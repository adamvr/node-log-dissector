/**
 * dissector for amazon s3 log files
 * @author jujhars13
 * @link http://docs.aws.amazon.com/AmazonS3/latest/dev/LogFormat.html
 */
//89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 pluto-s3-cbn-origin [04/Jan/2013:11:41:11 +0000] 93.129.127.20 arn:aws:iam::433473615199:user/plbuto-s3sync 86E1F0C27251C5C6 REST.DELETE.OBJECT Bbgwg/1/2LVQj/2LVQj_500.flv "DELETE /BbgwGg/1/2LVQq/2LVQq_500.flv HTTP/1.1" 204 - - 10428478 12 - "-" "Transmit/680 neon/0.29.3" ~
//b76db5b6c51be22bbd71688bf652a29846f08d1bc0951494a42849e234c2f988 origin.buto.tv [20/Nov/2013:09:00:00 +0000] 4.26.231.155 - BAC4680ACF3162A8 REST.GET.OBJECT butotv/live/players/test_files/mediumtest.swf "GET /butotv/live/players/test_files/mediumtest.swf?94179.54538948834 HTTP/1.1" 200 - 199825 199825 17 12 "https://embed.buto.tv/vgS95" "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36" -
var regex = /(\S+) (\S+) (\S+ \+\S+\]) (\S+) (\S+) (\S+) (\S+) (\S+) "(\S+) (\S+) (\S+)" (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) "(.+)" "(.+)" (\S+)/;

var map = {
    1: 'owner',
    2: 'bucket',
    3: 'timestamp',
    4: 'client_ip',
    5: 'requester',
    6: 'request_id',
    7: 'operation',
    8: 'key',
    9: 'verb',
    10: 'uri',
    11: 'protocol',
    12: 'status_code',
    13: 'error_code',
    14: 'bytes_sent',
    15: 'object_size',
    16: 'time_total',
    17: 'time_turn_around',
    18: 'referrer',
    19: 'user-agent',
    20: 'version_id'
};

var type = 's3';

module.exports = {
    regex: regex,
    map: map,
    type: type
};
