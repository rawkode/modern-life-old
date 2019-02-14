---
template: post
title: 'SRE Playbook: Freeing Up Disk Space'
slug: sre-playbook-freeing-up-disk-space
draft: true
date: 2018-09-13T17:39:06.416Z
description: >-
  As a Site Reliability Engineer, I need to perform maintenance of machines a
  whole lot. The task I perform most often? Recovering disk space from bad
  actors.
category: Site Reliability Engineering
tags:
  - disk-space
  - journald
---
As a Site Reliability Engineer, I need to perform maintenance of machines a whole lot. The task I perform most often? Recovering disk space from bad actors.

![OpsGenie Alert for Disk Usage Warning](/media/opsgenie.png "OpsGenie Alert for Disk Usage Warning")



I'll skip the redundant "SSH onto your machine" crap, and we'll get to the good stuff.

## Step One: Get the Facts

```
df -h
```

If you're in a Docker or Kubernetes environment, I tend to use the following. It omits duplicate entries and lets you focus on what's important.

```
df -h -x tmpfs -x overlay
```

This will return something like:

```
Filesystem             Size  Used Avail Use% Mounted onudev                   126G     0  126G   0% /dev/dev/mapper/data-root  350G  165G   12M 100% //dev/mapper/data-tmp   970M   34M  937M   4% /tmp/dev/rbd0               45G   15G   28G  34% /var/lib/kubelet/pods/200c016b-90b1-11e8-b5afaa0000796b37/volumes/kubernetes.io~rbd/pvc-187593b3-42c3-11e8-942a-aa00005b1520
```

Right away, we can see that our root partition only has 12M left. Ouch.

## Step Two: Investigate the Crime Scene

Now that we know it's our root partition, we can begin to work out what's using up all our disk. We can use du to get some stats about which directories and files are using up the space.

```
du -a | sort -n -r | head -n 5
```

In this instance, we're looking for the 5 largest culprits.

## Step Three: Cleaning Up

Once you've found what you need to clean up, there's a few different ways to proceed.

**Single Massive File**

This is by far the easiest. You've got a rogue log file that's grown to many many GB's.

The best thing you can do is truncate the file.

```
truncate -s 0 rogue-log-file
```

**Why Truncate and Not Delete?**

You may be surprised that after executing the delete, your disk usage hasn't corrected. That's usually because there's a process hanging on to the file descriptor.

```
lsof -a +L1
```

This will output something like:

```
COMMAND     PID USER   FD   TYPE DEVICE SIZE/OFF NLINK NODE NAMEredis-ser 39492 root    9wW  REG 252,48      701     0   13 /data/nodes.conf (deleted)
```

Now you can find the process 39492 and safely restart it to free up the disk space.

**Journal Logs**

```
root@minion3:/# du -d0 -h /var/log/journal153M	/var/log/journal
```

If \`/var/log/journal\` is your culprit, then you need to vacuum some of your logging.

```
journalctl --vacuum-time=30djournalctl --vacuum-time=7djournalctl --vacuum-time=1h
```

Vacuum with whatever your comfortable losing. Word of warning though:

**Warning:**

If you need to vacuum to an hour to free up enough space, you've probably got something writing crazy logs and that needs addressed right away.

What About inodes?

We'll talk about them in the next article ...

That's all! I hope you find this useful. If you've got a tip that I've not included, get in touch.

Have a great day,\
David
