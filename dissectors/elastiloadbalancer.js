/**
 * dissector for amazon ELB log files
 * @author Welington Sampaio <webmaster.lelo@gmail.com>
 * @link http://docs.aws.amazon.com/pt_br/elasticloadbalancing/latest/classic/enable-access-logs.html
 */
// 2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817   10.0.0.1:80     0.000086 0.001048 0.001337 200    200    0      100000 "GET    https://www.example.com:443    /        HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2
// (\S+?)                      (\S+?)          ([^:]+?)      :(\S+?) ([^:]+?):(\S+?) (\S+?)   (\S+?)   (\S+?)   (\S+?) (\S+?) (\S+?) (\S+?) "(\S+?) (\S+:\/\/[^:]+)        :(\S+?) (\/\S+?) (\S+?)"   "(\S+?)"      (\S+?)             (\S+?)

// 2015-05-13T23:39:43.945958Z my-loadbalancer 192.168.131.39:2817 10.0.0.1:80 0.000086 0.001048 0.001337 200 200 0 100000 "GET https://www.example.com:443/ HTTP/1.1" "curl/7.38.0" DHE-RSA-AES128-SHA TLSv1.2
var regex = /(\S+?) (\S+?) ([^:]+?):(\S+?) ([^:]+?):(\S+?) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) (\S+?) "(\S+?) (\S+:\/\/[^:]+):([^\/]+?)(\/\S*?) (\S+?)" "(.*?)" (\S+?) (\S+?)$/;

var map = {
    1: 'timestamp',
    2: 'elb',
    3: 'client_ip',
    4: 'client_port',
    5: 'backend_ip',
    6: 'backend_port',
    7: 'request_processing_time',
    8: 'backend_processing_time',
    9: 'response_processing_time',
    10: 'elb_status_code',
    11: 'backend_status_code',
    12: 'received_bytes',
    13: 'sent_bytes',
    14: 'method',
    15: 'request_host',
    16: 'request_port',
    17: 'request_path',
    18: 'protocol',
    19: 'user_agent',
    20: 'ssl_cipher',
    21: 'ssl_protocol'
};

var type = 'elasticloadbalancer';

module.exports = {
    regex: regex,
    map: map,
    type: type
};
