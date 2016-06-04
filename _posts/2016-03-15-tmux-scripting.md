---
layout: basic
---

You can start a tmux session

    $ tmux

Then create a file with a list of tmux commands, minus the tmux command itself:

    rename-session blog
    rename-window build
    send "jekyll serve --watch --host 0.0.0.0" C-m
    split-window -h
    send "ifconfig | grep 'inet addr'" C-m
    new-window -n vim
    send "vim" C-m

From within a tmux shell you can source the file and run the commands:

    $ tmux source-file /path/to/.tmuxrc

probably makes more sense to init with a bash script, just as easy to send
commands to the tmux server but you can perform setup if necessary

```bash
tmux start-server
tmux new-session -d -s blog build
tmux send "jekyll serve --watch --host 0.0.0.0" C-m
tmux split-window -h
tmux send "ifconfig | grep 'inet addr'" C-m
tmux new-window -n vim
```

Interesting fact from (whiteboardcoder site), format of the `-t` flag is [session]:[window].[pane],
so to create a new session with two horizontal panes on the first window and send a command to tbe
bottom pane would look like:

```
    tmux new -s tail_log -d
    tmux split-window -v -t tail_log
    tmux send-keys -t tail_log:0.1 'echo "pane 1"' C-m
```

https://spin.atomicobject.com/2015/03/08/dev-project-workspace-tmux/
source a tmux config file once you've attached to the server

http://toastdriven.com/blog/2009/oct/09/scripting-tmux/
full example, minimal explanation of bash based tmux scripting

https://gist.github.com/swaroopch/728896
bash tmux scripting with alternate addressing method

http://www.whiteboardcoder.com/2015/01/tmux-scripting.html
a more gradual introduction to tmux commands and general window manipulation
