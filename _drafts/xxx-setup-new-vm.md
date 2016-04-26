---
---

# Setting up a new VM

apt-cache depends ssh
sudo apt-get install ssh

Virtualbox Network Settings

Set up two network adapters, NAT and Host-Only. After booting the VM and running ifconfig in a terminal the IP
associated with the second listed device is the address you should target from the host for SSH connections (or
putty, since only windows seems to really need the vm for dev work).

Programs to install

vim
git
tmux

Setup ssh key and register for github

ssh-keygen -t rsa -b 4096 -C "<descriptive comment>"
# choose where to save it, I chose ~/.ssh/id_rsa which is the default if no other keys exist
eval $(ssh-agent -s)
ssh-add ~/.ssh/id_rsa

Go to Github > Settings > SSH keys and add the contents of ~/.ssh/id_rsa.pub to the big text box

Set up source code directory

cd
wget https://raw.githubusercontent.com/boombador/dotfiles/master/setup.sh
chmod +x setup.sh
./setup.sh
