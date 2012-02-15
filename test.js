var d = require('.').dissectors;

var login = d['ssh-login']
  , logout = d['ssh-logout']
  , sudos = d['sudo-success']
  , sudof = d['sudo-failure']
  , baduser = d['ssh-invalid-user'];

console.dir(d);

console.dir(login.dissect('Feb 15 09:00:07 somewhere sshd[2470]: Accepted publickey for somebody from 1.1.1.1 port 46410 ssh2'));
console.dir(logout.dissect('Feb 14 15:38:18 summer sshd[31962]: Received disconnect from 1.1.1.1: 11: disconnected by user'));
console.dir(sudos.dissect('Feb 15 11:13:43 summer sudo: noone : TTY=pts/4 ; PWD=/home/noone ; USER=root ; COMMAND=/bin/vi /something'));
console.dir(sudof.dissect('Feb 15 11:30:56 summer sudo: pam_unix(sudo:auth): authentication failure; logname=noone uid=0 euid=0 tty=/dev/pts/4 ruser= rhost=  user=noone'));
console.dir(baduser.dissect('Feb 13 10:51:35 summer sshd[27435]: Invalid user lolo from 1.1.1.1'));
