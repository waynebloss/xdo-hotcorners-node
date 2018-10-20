# xdo-hotcorners

Hot corners for XFCE

## Proof of Concept

There is currently only support for one hot corner (lower-left) at this time
and when the mouse activates it, it only runs one hard-coded action:
`xfce4-popup-whiskermenu`.

The code uses a simple `setTimeout` loop to run
`xdotools getmouselocation --shell` every half second. Although my machine is
fast and this tactic causes no real load, I'd rather be notified when the
mouse position changes via some native hooks. If I stay with Node.js at
all for this program, I'll probably look for something like 
[iohook](https://www.npmjs.com/package/iohook) in the future.

## How to install

Right now I just add an entry in `Session and Startup` settings to run:
`node /path/to/this/repo/index.js`

## Motivation

I was just hacking around on my Manjaro XFCE workstation today decided to write
a very simple implementation of hot corners. One thing that annoys me about XFCE
is that clicks in the lower left corner are not always recognized, so 
`whiskermenu` does not always activate.

I think this could be because of
[another bug](https://bugs.launchpad.net/ubuntu/+source/gtk+3.0/+bug/1798861)
or because of my theme or my theme customizations. Not sure yet.

There is
[xfce4-hotcorner-plugin](https://aur.archlinux.org/packages/xfce4-hotcorner-plugin)
but it allegedly doesn't work anymore, isn't maintained and I don't know C/GTK
that well. After reading that source code though, I see
that he's just polling mouse position too.

So for now, a hot corners feature is easier to create than trying to find out
whats wrong with XFCE...
