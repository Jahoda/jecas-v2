---
title: "Nginx"
headline: "Nginx"
description: "Nginx"
date: "2019-06-21"
last_modification: "2019-06-21"
status: 0
tags: []
---

## Windows

  - [nginx for Windows](http://nginx.org/en/docs/windows.html)

## Gzip komprese

```
http {
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";
}
```