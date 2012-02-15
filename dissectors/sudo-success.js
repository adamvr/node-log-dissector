var regex = /(\S+ \S+ \S+) (\S+) sudo: (\S+) : TTY=(\S+) ; PWD=(\S+) ; USER=(\S+) ; COMMAND=(.*$)/

var map = {
  1: 'date'
, 2: 'localhost'
, 3: 'currentuser'
, 4: 'tty'
, 5: 'pwd'
, 6: 'superuser'
, 7: 'command'
};

var type = 'sudo-success';

module.exports = {
  regex: regex
, map: map
, type: type
};
