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

Setting up Node

I always found the various incarnations of node to be pretty confusing. From what I've pieced
together the 0.12.13 style version is the oldest lineage of development, I've been using that for
my latest projects so I'm using that.

Go to https://github.com/creationix/nvm to get NVM, follow those setup instructions and
run this:

nvm install v0.12.13
