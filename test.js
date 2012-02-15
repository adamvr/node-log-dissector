var d = require('.').dissectors;

var login = d['ssh-login']
  , logout = d['ssh-logout']
  , sudos = d['sudo-success']
  , sudof = d['sudo-failure']
  , baduser = d['ssh-invalid-user'];

console.dir(d);

console.dir(login.dissect('Feb 15 09:00:07 summer sshd[2470]: Accepted publickey for chris_rieger from 130.102.70.13 port 46410 ssh2'));
console.dir(logout.dissect('Feb 14 15:38:18 summer sshd[31962]: Received disconnect from 130.102.70.70: 11: disconnected by user'));
console.dir(sudos.dissect('Feb 15 11:13:43 summer sudo: aabhushan : TTY=pts/4 ; PWD=/home/aabhushan ; USER=root ; COMMAND=/bin/vi /var/www/html/test/ledon.xml'));
console.dir(sudof.dissect('Feb 15 11:30:56 summer sudo: pam_unix(sudo:auth): authentication failure; logname=aabhushan uid=0 euid=0 tty=/dev/pts/4 ruser= rhost=  user=aabhushan'));
console.dir(baduser.dissect('Feb 13 10:51:35 summer sshd[27435]: Invalid user adam from 172.18.65.144'));
