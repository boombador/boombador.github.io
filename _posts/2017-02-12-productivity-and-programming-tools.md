---
date: 2017-02-12T09:57:54-0500
title: Productivity and Programming Tools
layout: basic
---

Stumbling through the intimidating experience of vimtutor for the first time was an
extremely formative experience for me. When I grasped the expressive power of the interface
it felt like a world opened up before me: previously even my relatively strong typing skills
hadn't saved me from a feeling trapped by the ungainliness of whatever minimally-featured editor
had been provided for my teaching environment in school.

But with vim I felt a fluid interface for navigating text in ways that mapped to their logical
structure. The ability to edit quickly enough to not lose my train of thought made a dramatic
difference in the very experience of coding, leading to a virtuous cycle of it being more
enjoyable and thus something that I found myself practicing naturally.

For years afterward I admit I was a blind vim devotee. I loved sharing chunks of unintelligble
vimscript with colleagues, took zero convincing to ditch the arrow keys, and in general emitted a
constant stream of normal mode commands just to remind myself that I could.

Especially during college people I would pair with would occasionally be in awe of the adroitness
with which I could navigate the codebase and switch to modifying it and back without grabbing for a
mouse. This contributed to a feeling of being fast enough that led to stalled improvement in my
editing process.

## Time to Improve

Before diving wholly into vim I had experimented with full-featured IDEs, in particular I remember
having a distinctly negative impression of Eclipse. The program felt unresponsive. When it
inserted parentheses or quotation marks it would occasionally be useful but would often interfere
with other existing text.

But the toolset available for development has improved greatly since I started to develop, and
increased hardware capacity allows intensive computation to be performed in a reasonably short
amount of time. I would often get discouraged by the 'some assembly required' approach of vim
plugins and wouldn't know take the time to get them functioning as advertised.

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

Creating an interface that allows you to search for files quickly and with minimal typing is a
harder task than it first might sound. Early on in my vim career I encountered NERDTree and was
impressed by its elaborate visual representation of the file structure.

I enjoyed using NERDTree, which makes sense because I have always preferred to consume information
visually. Browsing through the code on the filesystem felt natural since it would remind me of the
logical structure of the code, but I sensed that I was doing a lot of typing.

At work I started experimenting with the more modern editor PyCharm on the recommendation of
a coworker, and immediately loved the easy-by-default setup of the file search. I realized I usually
would often have type out `:tabe dir/file` using tab as a way to partially sidestep typing
out a potentially long fle path.

I have heard of [ctrlp.vim] for a while now and it seems to be the preeminent option for this
problem in vim these days. I have installed it and begun using it sparingly but with the default
configuration the file search doesn't seem to include the directories I would expect. I will at some
point attempt to delve into this configuration, but this may be another tally for upgrading to a
modern editor.

## Code Completion

Providing smart suggestions for completing an identifier you are typing can be one of the most
useful features an editor can provide. Even the simplest version that looks for identifiers in the
source text based on some regular expression for a word boundary can significantly cut down on
typing.

If the completion engine is plugged into a static code analysis tool it can provide suggestions of
dramatically improved quality, and more advanced UIs for showing suggestions can also include
contextual information like the parameters a suggested function expects. Good code completion
should help you reason about code as you write it.

[YouCompleteMe] needs vim 7.4.143+, and the plugin itself requires an installation from source after
using your preferred plugin manager to download the package:

    sudo apt-get install build-essential cmake
    sudo apt-get install python-dev
    cd ~/.vim/bundle/YouCompleteMe
    ./install.py --clang-completer --tern-completer

YouCompleteMe is a complicated tool, but this [YCM Overview] does a good job of summarizing its
useful features and how to use it.

## Snippet Generation

For generating idiomatic language constructs more complex than a single identifier there are engines
that provide support for "snippets". Tools like [UltiSnips] allow me to perform my editing on a higher
conceptual level by automating the generation of elements with repetitive elements like in loop
iterations, class declarations and docstrings. The scaffold of the code is generated instantly and
you simply fill in the various specifics.

Another option specific to HTML is [Sparkup], a library for expanding a terse, css-like definition
string into fully-formed markup. To take an example from their readme you could type
`#header > h1{Welcome to our site}` in normal mode then use a configurable command replace that text
with:

    <div id="header">
        <h1>Welcome to our site</h1>
    </div>

## Dynamic Feedback

I've tended to rely on tools like tmux to keep relevant build logs adjacent to my main editing
session, but I'm frustrated by the amount of screen space this takes up and the difficulty of
configuring a window layout that is reasonable on a range of screen sizes.

I've been considering how it might provide a more seamless experience to figure out how to integrate
the status of some continuous build server and integrate it with plugins like [Airline] to craft a
terse status line that is context aware.

It was a pleasure having this functionality when working with IntelliJ and PyCharm projects, and
I've been pondering how I can make this a universal experience on all the projects I work on without
having to a do a lot of work per project.

Learn how to read results of external commands either as a
status message or fed into a buffer as appropriate.  Also signal errors in the side gutter, but make it optional.

## Vanilla Vim

There's no escaping that at times when I need to get code written quickly, I still by far am most
productive in vim so I gravitate towards using it by muscle memory. I could investigate using some
of the powerful features I've become aware of but never delved into.

- Registers
- Quickfix/Location List
- External Commands (eg triggering a build)
- Scratch Buffers
- Vimscript
- Help

There are tons of good resources on learning vim, not least among them the included help manual.
Unfortunately I haven't even invested in learning the syntax for looking up general types of
commands in vim, but part of me resents that I have to learn how to learn quite so explicitly when
PyCharm [has][PyCharm Shortcuts] a command (ctrl+shift+a) that lets you search for arbitrary
commands by name.

Some of these, like vimscript or the quickfix error format, might require more investment than they
return on. At least it would make more sense to reserve those efforts for a more modern editor since
there likely won't be much transferrable knowledge.

[CtrlP]: https://github.com/ctrlpvim/ctrlp.vim
[NERDTree]: https://github.com/scrooloose/nerdtree
[mru.vim]: https://github.com/yegappan/mru
[YouCompleteMe]: https://github.com/Valloric/YouCompleteMe
[YCM Overview]: http://www.alexeyshmalko.com/2014/youcompleteme-ultimate-autocomplete-plugin-for-vim/
[UltiSnips]: https://github.com/SirVer/ultisnips
[Sparkup]: https://github.com/rstacruz/sparkup
[LVTHW]: http://learnvimscriptthehardway.stevelosh.com
[PyCharm Shortcuts]: https://www.jetbrains.com/help/pycharm/2016.3/keyboard-shortcuts-you-cannot-miss.html
