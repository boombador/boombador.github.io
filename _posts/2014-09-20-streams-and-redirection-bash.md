---
date: "2014-09-20T15:31:41-04:00"
title: "Streams and Redirection in Bash"
layout: basic
---

A densely packed command line invocation can accomplish a great deal, but the meaning is often
difficult to predict for all but the author. Even then, it can be difficult to modify a command that
has grown from repeated extensions. The following is intended to give a brief overview of the
symbols used for input/output redirection.

## Streams

A program executed from the command line is given references to three special buffers of data
known as streams. These are usually referred to as some variants of `stdin`, `stdout`, `stderr` to
signify that they are the standard places for the program to look for its input and write its
output and error messages.

A stream is common concept in computing, here it describes a data channel that different
applications can read from or write to as a means of communication. By default the standard input is
wired to receive signals from your keyboard while the standard output/error streams will write to
the terminal displaying your active shell, but it is possible to overwrite the file descriptors that
are used to point to those streams to process the output otherwise.

Bash executes the programs left to right and redirects the standard I/O streams according to the
directives of several operators.

## Output Redirection

It's common to redirect the `stdout` of a file in order to save a program's output in a file, useful
for monitoring server logs or recording the output of a long running program.  A good tool for
demonstrating output redirection is the Unix tool `cat`, which concatenates and prints the files
passed to it as arguments.

```bash
cat ~/.bashrc
```

If we want to save the `stdout` of the cat command to a file we put the `>` operator between the
command invocation and the name of the file we want to write to:

```bash
cat ~/.bashrc > bashrc.backup
```

This will overwrite whatever file contents exists for `bashrc.backup` with the output of the cat
command, and creating a new file if one doesn't already exist. In the case you'd prefer to append to
the file if it already exists, you can double the angle bracket:

```bash
cat ~/.bashrc >> bashrc.history
```

## Input Redirection

In addition to having a standard place to write program output, a program can read from the `stdin`
stream throughout its execution which by default is mapped to the input from the keyboard. Unless it
takes command line arguments, the `cat` command reads from stdin until it reaches an EOF (end of
file) token, which can be simulated with `ctrl+d`:

```bash
$ cat
a
a
asdf
asdf
$ 
```

You are able to place the contents of a file into the `stdin` stream for consumption with use of the
`<` operator, which is the preferred method of consumption for some programs.

```bash
$ svn diff > ~/local.patch
$ svn revert -R . # revert all local changes
$ patch -p0 < ~/local.patch # changes restored
```

The real power of the command line is unlocked once you begin chaining commands together with the
`|` operator, which feeds the output of the first program to the input of the following.

```bash
grep "username" transactions.txt | awk -f summarize.awk > user-summary.txt
```

## File Descriptors and Redirects

You may have noticed that we have not yet learned how to redirect the error stream, but in order to
do so we must talk about file descriptors, the reference handles used by the operating system to
refer to the stream.

File descriptors are indices into a table of file objects maintained by the operating system that
underly the streams that are used for inter-process communication. A summary of the default streams,
with their included customary file descriptor values, follows:

    0 stdin - input for the program to process, read from terminal
    1 stdout - messages or information generated during processing, printed to terminal
    2 stderr - error messages or crash dumps, also printed to terminal

It turns out the `>` operator can take parameters for more fine-tuned control of file descriptor
updating. It can take a file descriptor argument on its left side to specify what stream to redirect.
When omitted, it defaults to `1` giving us the normal output redirection, but passing `2` will write
the error messages to a file:

```bash
pacman -Syu 2> full-upgrade-errors.txt

# the append operator behaves the same
pacman -Syu 2>> full-upgrade-errors.log 
```

You can supply the file descriptor for any file resource.

As a shortcut you redirect both streams to the same destination using the ampersand:

```bash
# introduced in bash 4
find / -name "php.ini" &> search-results.txt
```

## Temporary Environment Varibales

`export` makes the defined environment var available to sub-processes.

Defining a variable on the same line as a command makes only available for that command process.

```bash
HELLO='Hello World' bash -c 'echo $HELLO'
# outputs: Hello World
```

## Resources Consulted

http://www.tldp.org/LDP/abs/html/io-redirection.html
http://wiki.bash-hackers.org/howto/redirection_tutorial#pipes
http://stackoverflow.com/questions/1158091/defining-a-variable-with-or-without-export
