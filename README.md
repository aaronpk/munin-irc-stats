Munin IRC Stats
===============

A plugin for Munin which graphs the number of connected clients and channels on an
IRC server.

Configure the IRC server settings in config.json, and symlink as `/etc/munin/plugins/irc`
and Munin will begin drawing graphs.

Sample config:

    {
      "server": "irc.freenode.net",
      "port": 6667,
      "nick": "munin",
      "username": "munin",
      "serverPassword": ""
    }

