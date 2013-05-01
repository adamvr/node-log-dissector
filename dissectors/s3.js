//s3 example
//89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 pluto-s3-cbn-origin [04/Jan/2013:11:41:11 +0000] 93.129.127.20 arn:aws:iam::433473615199:user/plbuto-s3sync 86E1F0C27251C5C6 REST.DELETE.OBJECT Bbgwg/1/2LVQj/2LVQj_500.flv "DELETE /BbgwGg/1/2LVQq/2LVQq_500.flv HTTP/1.1" 204 - - 10428478 12 - "-" "Transmit/680 neon/0.29.3" ~
var regex = /(\S+) (\S+) (\S+ \+\S+\]) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+) (\S+)/

var map = {
    1: 'owner',
    2: 'bucket',
    3: 'timestamp',
    4: 'client_ip',
    5: 'requester',
    6: 'request_id',
    7: 'operation',
    8: 'key',
    9: 'uri',
    10: 'status_code',
    11: 'error_code',
    12: 'bytes_sent',
    13: 'object_size',
    14: 'time_total',
    15: 'time_turn_around',
    16: 'referrer',
    17: 'user-agent',
    18: 'version_id'
};

var type = 's3';

module.exports = {
    regex: regex,
    map: map,
    type: type
};
