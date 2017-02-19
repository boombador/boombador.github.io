---
date: 2017-02-12T09:57:54-0500
title: Productivity and Programming Tools
---

Recently it was somewhat unceremoniously pointed out to me by a coworker that I had several obvious
inefficiencies in my code editing workflow. I'm grateful for the reality check, as it didn't take
much reflection to realize that he was totally right.

I discovered vim soon after declaring a computer science major and remember feeling exhilarated by
the feeling of incresed adroitness at effecting changes to structured text. For a while I was eager
to explore the features of vim attempt to incorporate them into my daily practice.

But I specifically struggled with daily practice. I would identify some hard corner in using vim but
be unsuccessful in figuring out how to apply a seemingly relevant feature to get around it. I
adopted a cost benefit analysis approach to considering whether to figure out how to do something
the proper way or just muddle through it somewhat manually.

I had a vague sense that I was content with poor performance because I felt proficient using the
features I had already learned, but I seemed to run into a wall whenever I tried to pursue
improvements.  Plugins that promised to solve my problems often took more time to setup than I ever
seemed to have available for the task. Once I did get them working they often seemed to introduce
lag times into my editor that felt extremely frustrating after my long experience with a snappy
editor. 

I realize I can take a more focused approach to optimizing my editor workflow by identifying
code editing activities that I perform often and embark on a project to evaluate relevant options in
that domain over an arbitrary time period. I need to be a little more persistent if it's obvious
other people are getting a lot of value out of it.

So here are some areas that I think I could look into:

## General Approach

Need to install the plugin and understand basic usage and configuration. If this isn't trivial then
the process may need to be broken up into discrete tasks so that I can have a well defined work item
when I only have a short period to focus.

After that I need to start regularly using the plugin. If I can't remember to use it when
opportunites arise I may need to figure out a way to script a reminder to prompt me to use it,
perhaps withholding the instructions unless I can't rememebr them. If opportunities don't arise,
then either I need to reconsider the feature's utility or whether my workflow is fundamentally
flawed such that it doesn't leverage available tools.

## Installing Vim from source

Had to do this to get a recent enough version of vim for YouCompleteMe, followed guide
[here](https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source) but I only enabled
python2 to get around the issue with vim being incompatible with both versions in debian systems,
explained [here](http://stackoverflow.com/questions/23023783/vim-compiled-with-python-support-but-cant-see-sys-version).

```bash
./configure --with-features=huge \
            --enable-multibyte \
            --enable-rubyinterp=yes \
            --enable-pythoninterp=yes \
            --with-python-config-dir=/usr/lib/python2.7/config-x86_64-linux-gnu \
            --enable-python3interp=no \
            --enable-perlinterp=yes \
            --enable-luainterp=yes \
            --enable-gui=gtk2 \
            --enable-cscope \
            --prefix=/usr
```

## Fuzzy Find 

Needing to open a file where you may know the name but not necessarily the path is an extremely
common situation in programming. Early on I discovered [NERDTree] and found it simple to setup so it
quickly became my default method of doing this sort of operation. I also tended to prefer visual
systems for anaylyzing information, so it felt like NERDTree was an aid.

However NERDTree has several problems that have taken me a while to perceive because I couldn't
imagine another way. Navigating through the file system was a slow process, though later it was
slightly improved with [easymotion]. Also occasionally I ran into problems where opening multiple
NERDTree windows in different tabs seemed to cause a crash, and it keeping the trees in sync was
something that I needed often enough but not always that configuring it felt fruitless.

I have heard of [ctrlp.vim] for a while now but it seems to be the preeminent option for this
situation these days. I work to install this 

(https://github.com/ctrlpvim/ctrlp.vim)
(https://github.com/scrooloose/nerdtree)

## Code Completion

Code completion is intimately tied to static analysis, but I consider it to be a more a matter of
the interface for surfacing non-intrusive hints from that anaylsis and allowing an optional command
to trigger it. Good code completion should help you reason about code as you write it.

It's unclear if this would obviate the need for separate syntax checking systems like syntastic.

YouCompleteMe needs a later vim, install from source.

sudo apt-get install build-essential cmake
sudo apt-get install python-dev python3-dev
cd ~/.vim/bundle/YouCompleteMe
./install.py --clang-completer --tern-completer

https://github.com/Valloric/YouCompleteMe
http://www.alexeyshmalko.com/2014/youcompleteme-ultimate-autocomplete-plugin-for-vim/

## Smart Code Generation

This feels like it may solve a similar problem to code completion of quickly writing code according
to some pre-defined structure, though generating code through more advanced snippets like UltiSnips
may allow me to perform my editing on a higher conceptual level.

Generating code is more general, for starting out new files and defining high level concepts like
iterations, class and function definitions, and docstrings.

Vim has registers, which are a low barrier method to start experimenting with this concept earlier.
It would probably be better to look at more advanced options like UltiSnips.

https://github.com/SirVer/ultisnips

Another option is sparkup, a library for expanding a terse, css-like definition string into
fully-formed markup. jsdf

https://github.com/rstacruz/sparkup

## Status Reports

Work on using plugins like Airline to craft a terse status line that is context aware. Learn how to
read results of external commands either as a status message or fed into a buffer as appropriate.
Also signal errors in the side gutter, but make it optional.

## Vanilla Vim

There are several features I'm vaguely aware of that seem like they would be extremely useful, or
are relied on heavily by other plugins.

Registers
Quickfix/Location List
External Commands (eg triggering a build)


