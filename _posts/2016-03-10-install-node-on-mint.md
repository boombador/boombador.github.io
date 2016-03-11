---
title: Installing nodejs v0.12 on Linux Mint and similar
layout: basic
---

Nodejs is pretty cool, so here are some simple instructions for setting it up. Honestly I had
reservations about conceptually infecting the server with the laxness of javascript, but it was
pretty easy to throw an api together. Plus trying to figure out a non-awkward design pattern is a
satisfying if eternal challenge.

## Setup

Of course it's wiser to inspect any scripts you execute first, but my computer hasn't melted yet:

    curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
    sudo apt-get install -y nodejs

## Troubleshooting

I encountered this following error while accidentally installing the wrong version of node, if you get this message:

    Unable to parse package file /var/lib/dpkg/status

Try running this command to restore a backup version if it exists.

    sudo cp /var/lib/dpkg/status-old /var/lib/dpkg/status
