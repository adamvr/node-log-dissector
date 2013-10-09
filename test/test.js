var d = require('../').dissectors;
var login = d['ssh-login']
  , logout = d['ssh-logout']
  , sudos = d['sudo-success']
  , sudof = d['sudo-failure']
  , baduser = d['ssh-invalid-user']
  , s3 = d['s3'];

//console.dir(d);
//
//console.dir(login.dissect('Feb 15 09:00:07 somewhere sshd[2470]: Accepted publickey for somebody from 1.1.1.1 port 46410 ssh2'));
//console.dir(logout.dissect('Feb 14 15:38:18 summer sshd[31962]: Received disconnect from 1.1.1.1: 11: disconnected by user'));
//console.dir(sudos.dissect('Feb 15 11:13:43 summer sudo: noone : TTY=pts/4 ; PWD=/home/noone ; USER=root ; COMMAND=/bin/vi /something'));
//console.dir(sudof.dissect('Feb 15 11:30:56 summer sudo: pam_unix(sudo:auth): authentication failure; logname=noone uid=0 euid=0 tty=/dev/pts/4 ruser= rhost=  user=noone'));
//console.dir(baduser.dissect('Feb 13 10:51:35 summer sshd[27435]: Invalid user lolo from 1.1.1.1'));
//console.dir(s3.dissect('89db1f87ef900402d4ec4678ec2d46ef9c503f28438eeaeb3a8409ee06106660 pluto-s3-cbn-origin [04/Jan/2013:11:41:11 +0000] 93.129.127.20 arn:aws:iam::433473615199:user/plbuto-s3sync 86E1F0C27251C5C6 REST.DELETE.OBJECT Bbgwg/1/2LVQj/2LVQj_500.flv "DELETE /BbgwGg/1/2LVQq/2LVQq_500.flv HTTP/1.1" 204 - - 10428478 12 - "-" "Transmit/680 neon/0.29.3" ~'));