---
title: Installing a SFTP server on an Azure Windows VM
published: true
description: Installing a SFTP server on an Azure Windows VM
tags: #azure #sftp
date: '2019-07-31'
canonicalURL: 'https://lfalck.se/installing-a-windows-sftp-server'
noPage: false
---
I recently got the task to add SFTP support to an existing Windows Server machine running on an Azure VM and thought i would share the steps.

There is a [great guide at winscp.net](https://winscp.net/eng/docs/guide_windows_openssh_server) which gets us most of the way, paraphrased here:

* [Download](https://github.com/PowerShell/Win32-OpenSSH/releases/latest/download/OpenSSH-Win64.zip) the latest OpenSSH for Windows binaries
* Extract to C:\Program Files\OpenSSH
* Run **install-sshd.ps1** as admin
* Allow inbound traffic to port 22 (or a custom port): 

 ```powershell
 New-NetFirewallRule -Name sshd -DisplayName 'OpenSSH SSH Server' `
  -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
 ```

* Add the same firewall rule to the Azure VM
*  Start the Windows service **OpenSSH SSH Server** and configure automatic start

We are now up and running and you should be able to connect with an existing Windows account. However, you end up in the users home directory and you can browse to e.g. **C:** which is probably not what you want.

To restrict access to a folder for the group sftpusers, we can add the following to **C:\ProgramData\ssh\sshd_config** 

```shell
Match Group sftpusers
    ChrootDirectory c:/sftp
    AllowTCPForwarding no
    X11Forwarding no
    ForceCommand internal-sftp`
```

In case we want to restrict each user to a subfolder  we can instead add this:

```shell
Match User sftpuser
    ChrootDirectory c:/sftp/user
    AllowTCPForwarding no
    X11Forwarding no
    ForceCommand internal-sftp
```
Thanks to Falko Timme for [the tutorial](https://www.howtoforge.com/restricting-users-to-sftp-plus-setting-up-chrooted-ssh-sftp-debian-squeeze) where this is described.

If you want to use a port other than 22, you also need to uncomment and change this line in **sshd_config**
`# Port 22`

That is all, have a good day!