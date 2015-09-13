---
date: "2014-09-20T15:31:41-04:00"
title: "Streams and Redirection in Bash"
layout: basic
---

A complex command line passed to the shell can accomplish a great deal, but it is often difficult
for a third party to decipher the precise effects due to the terse nature of the the language.

Here I'll attempt to go over the common methods for IO redirection in bash in an attempt to clear up
the meaning of some of the symbols that might scare the uninitiated. There won't be much depth into
the underlying concepts except as is helpful to form a mental model of the operation.

## Streams

When a program is executed from the command line, it is by default granted access to three special
buffers of data known as streams. These are usually referred to as some variants of `stdin`,
`stdout`, `stderr` to signify that they are the standard places for the program to look for its
input and write its output and error messages.

A stream is common concept in computing, and it is a sequence of data that can be added to or read
from independently. When programs are exected from the command line these input is is automatically
mapped to the keyboard and output to the screen. However it is possible to redirect the output of
one program to be consumed as the input of another program, and by chaining programs together you
can compose functionality to achieve complicated goals with relatively few commands.

Bash executes the programs left to right and redirects the standard I/O streams according to the
directives of several operators.

## Output Redirection

Saving the output of a command to a file is common in tasks such as setting up logging for
long-running processes or recording the result of some processing application. Ideal for
demonstrating this capability is the `cat` command, which prints to `stdout` the contents of the
files named as command line arguments.

{% highlight bash %}
cat ~/.bashrc
{% endhighlight %}

If we want to save the `stdout` of the cat command to a file we put the `>` operator between the
command invocation and the name of the file we want to write to:

{% highlight bash %}
cat ~/.bashrc > bashrc.backup
{% endhighlight %}

This will overwrite whatever file contents exists for `bashrc.backup` with the output of the cat
command, and creating a new file if one doesn't already exist. In the case you'd prefer to append to
the file if it already exists, you can double the angle bracket:

{% highlight bash %}
cat ~/.bashrc >> bashrc.history
{% endhighlight %}

## Input Redirection

In addition to having a standard place to write program output, a program can read from the `stdin`
stream throughout its execution which by default is mapped to the input from the keyboard. Unless it
takes command line arguments, the `cat` command reads from stdin until it reaches an EOF (end of
file) token, which can be simulated with `ctrl+d`:

{% highlight bash %}
$ cat
a
a
asdf
asdf
$ 
{% endhighlight %}

You are able to place the contents of a file into the `stdin` stream for consumption with use of the
`<` operator, which is the preferred method of consumption for some programs.

{% highlight bash %}
$ svn diff > ~/local.patch
$ svn revert -R . # revert all local changes
$ patch -p0 < ~/local.patch # changes restored
{% endhighlight %}

The real power of the command line is unlocked once you begin chaining commands together with the
`|` operator, which feeds the output of the first program to the input of the following.

{% highlight bash %}
grep "username" transactions.txt | awk -f summarize.awk > user-summary.txt
{% endhighlight %}

## File Descriptors and Redirects

You may have noticed that we have not yet learned how to redirect the error stream, but in order to
do so we must understand the numerical handle used by the operating system to refer to the stream
known as file descriptors.

File descriptors are indices into a table of file objects maintained by the operating system that
underly the streams that are used for inter-process communication. A summary of the default streams,
with their included customary file descriptor values, follows:

    0 stdin - input for the program to process, read from terminal
    1 stdout - messages or information generated during processing, printed to terminal
    2 stderr - error messages or crash dumps, also printed to terminal

Now we see that the `>` output redirection operator is more versatile than we originally thought, 
optionally taking a file descriptor argument on its left side to specify what stream to redirect.
When omitted, it defaults to `1` giving us the normal output redirection, but passing `2` will write
the error messages to a file:

{% highlight bash %}
pacman -Syu 2> full-upgrade-errors.txt

# the append operator behaves the same
pacman -Syu 2>> full-upgrade-errors.log 
{% endhighlight %}

You can supply the file descriptor for any file resource.

As a shortcut you redirect both streams to the same destination using the ampersand:

{% highlight bash %}
# introduced in bash 4
find / -name "php.ini" &> search-results.txt
{% endhighlight %}

## Resources Consulted

http://www.tldp.org/LDP/abs/html/io-redirection.html

http://wiki.bash-hackers.org/howto/redirection_tutorial#pipes
