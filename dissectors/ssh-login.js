var regex = /(\S+ \S+ \S+) (\S+) sshd\[(\S+)\]: Accepted (\S+) for (\S+) from (\S+) port (\S+) ssh2/

var map = {
  1: 'date'
, 2: 'localhost'
, 3: 'pid'
, 4: 'authMethod'
, 5: 'user'
, 6: 'remotehost'
, 7: 'port'
};

var type = 'ssh-login';

module.exports = {
  regex: regex
, map: map
, type: type
};
