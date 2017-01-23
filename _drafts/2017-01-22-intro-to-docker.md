---
date: 2017-01-22 10:39:14-04:00
---

Getting started with Docker: https://docs.docker.com/engine/getstarted/step_one/

The difference between 'docker for mac' and 'docker toolbox', basically the toolbox consists of the actual utilities and the mac app is a separate management tool.

https://docs.docker.com/docker-for-mac/docker-toolbox/

# Install

Use the download link to install Docker for Mac. This should also set up the low level docker commands `docker`, `docker-compose`, and `docker-machine` which are respectively referred to as Docker Engine, Docker Compose, and Docker Machine.

https://www.docker.com/products/docker#/mac

# Uninstall

## Docker Toolbox

List your machines (which are boot2docker linux guest vms serving as kernel for multiple containers)

    docker-machine ls

Remove your machines before uninstalling the toolbox:

    docker-machine rm default


## Docker for Mac

https://docs.docker.com/docker-for-mac/#/uninstall-or-reset

    /Applications/Docker.app/Contents/MacOS/Docker --uninstall

# Docker Compose

https://docs.docker.com/compose/gettingstarted/

# General Docker Concepts

https://docs.docker.com/engine/reference/glossary/#union-file-system
