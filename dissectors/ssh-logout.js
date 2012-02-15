var regex = /(\S+ \S+ \S+) (\S+) sshd\[(\S+)\]: Received disconnect from (\S+): \S+: (.*$)/

var map = {
  1: 'date'
, 2: 'localhost'
, 3: 'pid'
, 4: 'remotehost'
, 5: 'reason'
};

var type = 'ssh-logout';

module.exports = {
  regex: regex
, map: map
, type: type
};
