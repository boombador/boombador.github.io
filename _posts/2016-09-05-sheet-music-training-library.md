---
title: "Sheet Music Training Library"
date: "2016-09-05T23:07:24-04:00"
layout: basic
---

A while ago I was at informal hackathon and took the opportunity to prototype a tool for
learning the notes of sheet music via an interactive canvas application.

In the original form it did little more than draw random musical notes on staves while
highlighting one note at time for you to identify with the press of a letter key, but I took an
opportunity to clean up the code a bit and make it a bit more dynamic.

<img src="/assets/img/sheet-music-trainer.gif">

The code is available on [Github](https://github.com/boombador/knowthesheets), though there are
still many potential improvements:

- add sounds, tried with MIDI.js but ran into difficulties
- generate exercise performance summary
- add ability to restrict notes to one hand (and only render appropriate staff)
- rendering cleanup, fix off-center staff 

I made this because I thought it might make it easier to learn sheet music without having to get
out an unwieldy piano for some tactile feedback. After playing with it for a while I think it
would be more useful to map the notes to the keys on the home row so the finger motions more
closely resemble those on a piano, or adding a render of the piano keys so you can get visual
feedback in that way.

Still, it was helpful for my understanding of music timing in absolute terms. Hopefully I will
have time to come back to this and make some of the above mentioned improvements.

