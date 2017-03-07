---
date: 2017-02-12T09:57:54-0500
title: Productivity and Programming Tools
layout: basic
---

*Note to the very few people who read this immediately after I posted it: I've edited this article
significantly, the first version was mainly a draft to motivate myself to continue editing. You can
easily review the git history if you feel so inclined.*

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

Before diving wholly into vim I experimented with more full-featured IDEs, in particular I remember
having an unpleasant impression of Eclipse. I believe typing felt unresponsive enough that I
was consistently preoccupied wondering if the characters on the screen would catch up to the keys
I had typed.

Automatically mirrored characters also felt more like an annoyance since I was already used to
typing them. I seem to recall the input mechanism failing to recognize when you typed the second
character of a pair so suddenly you had an extra quote that's jarringly disrupting the syntax
highlighting for the rest of the file.

This onslaught of features seemed overwhelming. I was constantly running into things that seemed
useful but since I struggled to focus on learning a technique while doing real coding I didn't
internalize their use. By contrast vim felt minimally intrusive but became steadily more useful as
I slowly expanded my repertoire of command incantations.

I realize I have long harbored a mistrust of those more active features, unfairly equating them
with slowness or awkward interfaces, but the available tools have shown themselves to be greatly
improved. So I'm planning to reevaluate them with fresh eyes, trying out vim plugins that allow me
to get used to having them available.

However the experience of learning so much from just a few editors has left me thinking I should be
willing to try several and see what each did well. Ultimately most modern editors are tending
towards configurability and extensibility that will allow you emulate any interface you desire.
With that in mind, below are a few of the areas that seem promising and worth setting up on any
editor I expect to spend time in.

## Install Vim From Source

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
harder task than it first might sound. Early on in my vim career I encountered NERDTree and marveled
at its apparent sophistication. Browsing the code visually felt natural since it refreshed my memory
of the code structure, but I sensed I was doing a lot of extra typing since most of the time there's
only one file by the name I'm interested in.

At work on the recommendation of a coworker I started experimenting with the more modern editor
PyCharm and immediately loved the easy-by-default setup of the file search. I realized I had always
relied on tab complete as a crutch when typing long paths when subsequence searching was much more
powerful.

I have heard of [CtrlP] for a while now and it seems to be the preeminent option for this
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
should help you maintain your context as you write.

[YouCompleteMe] needs vim 7.4.143+, and the plugin itself requires an installation from source after
using your preferred plugin manager to download the package:

    sudo apt-get install build-essential cmake
    sudo apt-get install python-dev
    cd ~/.vim/bundle/YouCompleteMe
    ./install.py --clang-completer --tern-completer

YouCompleteMe seems like a complicated tool, but this [YCM Overview] does a good job of summarizing
its useful features and how to use it.

## Snippet Generation

For generating idiomatic language constructs more complex than a single identifier there are engines
that provide support for "snippets". Tools like [UltiSnips] would allow me to perform my editing on
a higher conceptual level by automating the generation of repetitive code constructs like loops,
class declarations and docstrings. The scaffold is generated instantly and you simply fill in the
various key terms.

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
sizes has been enough that this experience is usually unsatisfactorily time-consuming.

It also might provide a more seamless experience to figure out how to integrate
the status of some continuous build server and integrate it with plugins like [Airline] to craft a
terse status line that is context aware.

Similar to a status flag, it would be useful to learn how to seamlessly read the ocntents of
external commands into temporary scratch buffers, and there are also plugins like [Syntastic] for
general purpose syntax checking.

It was a frequently useful having most of this functionality for free when working with PyCharm,
so I've been pondering how I can make this a universal experience on all the projects I
work on without having to a do a lot of work per project.

## Vanilla Vim

It seems like it would be unfair to vim to not acknowledge that it has a ton of useful features that
I haven't bothered to learn properly. Vim will likely be burned into my muscle memory for as long
as I can clutch a keyboard so it will probably be worthwhile to examine these utilities in
particular:

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
[Syntastic]: https://github.com/vim-syntastic/syntastic
