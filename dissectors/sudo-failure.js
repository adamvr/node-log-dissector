var regex = /(\S+ \S+ \S+) (\S+) sudo: pam_unix(sudo:auth): authentication failure; logname=(\S+) uid=(\S+) euid=(\S+) tty=(\S+) ruser= rhost=  user=(\S+)/

var map = {
  1: 'date'
, 2: 'localhost'
, 3: 'logname'
, 4: 'uid'
, 5: 'euid'
, 6: 'tty'
, 7: 'user'
};

var type = 'sudo-failure';

module.exports = {
  regex: regex
, map: map
, type: type
};
