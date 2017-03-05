---
date: 2017-02-12T09:57:54-0500
title: Productivity and Programming Tools
layout: basic
---

Stumbling through the intimidating experience of vimtutor for the first time was an
extremely formative experience for me. When I grasped the expressive power of the interface
it felt like a world opened up before me: previously even my relatively strong typing skills
hadn't saved me from a feeling trapped by the ungainliness of whatever editor had been
suggested for my teaching environment in school classes.

But vim for the first time felt fluid, allowing natural motion across common paths relative to the
cursor such as the counterpart for a parenthesis or the next location of an identifier. The ability to
quickly jump to the code I wanted to change, make an edit, and resume analyzing quickly enough to
maintain my train of thought made a dramatic difference in the very experience of coding, leading
to a virtuous cycle of the process being more enjoyable and thus something that I found myself
practicing freely.

For years afterward I admit I was a blind vim devotee. I loved sharing chunks of unintelligble
vimscript with colleagues, ditched the arrow keys without a hint of trepidation, and in general
entered a furious stream of commands mostly just to remind myself that I could.

## Time to Reflect

Before diving wholly into vim I had experimented with full-featured IDEs, in particular I remember
having a distinctly negative impression of Eclipse. It felt unresponsive due to the weight of code
analysis and the elaborate gui, and the vaunted features like code completion tended to break my
concentration as it disrupted ingrained muscle memory.

It was minor, but it always felt supremely frustrating to get tripped up by a couple of
automatically inserted parentheses or quotation marks while cruising along on the keyboard and
having to slow down and untangle a jumble of characters.

But as I've noticed the available development tools have improved since I first surveyed the
landscape, and increased available computation should reduce the lagginess that bothered me even
when performing demanding analysis in the background. Below is a general overview of some my initial
thoughts on these areas and why I want to investigate them.

## Long Time Vimmer

When I first started writing this article I planned to outline some general areas where my editing
process could stand particular improvement and investigate plugins to address those weaknesses in
my native vim. However after opening my mind to alternative editing solutions I find it may be time
to take what I've learned and try to replicate the good parts in a modern editor.

I still want to be familiar with vim because I think it still offers incredible flexibility due to
its being available for almost any environment, but this article began to tend more towards a
general discussion of the some higher level editor features that I hope to soon enjoy without
going through several weekends of configuration pain.

I won't be giving up on my first favorite editor totally, in general I think I could most quickly
improve my vim efficiency by being being more willing to customize it so it works for my particular
preferences. Too often I gave excessive deference to the default bindings because I liked the idea
of being effective without dependence on additional configuration.

To that end I needed to build vim from source in order to support YouCompleteMe, I followed the guide
[here][Building Vim] but I only enabled python2 to get around the issue with vim being incompatible
with both versions in debian systems, explained [here][SO 2 Python Versions]. My version of the
`./configure` invocation looked like the following:

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
`#header > h1{Welcome to our site}` in insert mode then use a configurable command replace that text
with:

    <div id="header">
        <h1>Welcome to our site</h1>
    </div>

## Dynamic Feedback

I've tended to rely on tools like tmux to keep relevant build logs adjacent to my main editing
session, but the difficulty of configuring a window layout that works for multiple display device
sizes has been enough that this experience is either unsatisfactory or time-consuming.

I've been considering how it might provide a more seamless experience to figure out how to integrate
the status of some continuous build server and integrate it with plugins like [Airline] to craft a
terse status line that is context aware. Several existing plugins can visually indicate where in the
file an error has been detected.

It was a pleasure having this functionality when working with IntelliJ and PyCharm projects, and
I've been pondering how I can make this a universal experience on all the projects I work on without
having to a do a lot of work per project.

Related to analyzing build output to compute some easy to understand and actionable status flag, I
think it would be useful to learn how to seamlessly read the ocntents of external commands into
temporary scratch buffers for easier interaction.

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

[Airline]: https://github.com/vim-airline/vim-airline
[CtrlP]: https://github.com/ctrlpvim/ctrlp.vim
[NERDTree]: https://github.com/scrooloose/nerdtree
[mru.vim]: https://github.com/yegappan/mru
[YouCompleteMe]: https://github.com/Valloric/YouCompleteMe
[YCM Overview]: http://www.alexeyshmalko.com/2014/youcompleteme-ultimate-autocomplete-plugin-for-vim/
[UltiSnips]: https://github.com/SirVer/ultisnips
[Sparkup]: https://github.com/rstacruz/sparkup
[LVTHW]: http://learnvimscriptthehardway.stevelosh.com
[PyCharm Shortcuts]: https://www.jetbrains.com/help/pycharm/2016.3/keyboard-shortcuts-you-cannot-miss.html
[SO 2 Python Versions]: http://stackoverflow.com/questions/23023783/vim-compiled-with-python-support-but-cant-see-sys-version
[Building Vim]: https://github.com/Valloric/YouCompleteMe/wiki/Building-Vim-from-source
