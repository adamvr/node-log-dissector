var regex = /(\S+ \S+ \S+) (\S+) sshd\[(\S+)\]: Invalid user (\S+) from (\S+)/

var map = {
  1: 'date'
, 2: 'locahost'
, 3: 'pid'
, 4: 'invaliduser'
, 5: 'remotehost'
};

var type = 'ssh-invalid-user'

module.exports = {
  regex: regex
, map: map
, type: type
}
