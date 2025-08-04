---
title: "WAMP"
headline: "WAMP"
description: "Wamp-"
date: "2014-05-09"
last_modification: "2014-05-09"
status: 0
tags: []
---

http://i.snag.gy/Y2cPU.jpg

```
; Maximum size of POST data that PHP will accept.
; http://php.net/post-max-size
post_max_size = 80M
```

```
; Maximum allowed size for uploaded files.
; http://php.net/upload-max-filesize
upload_max_filesize = 200M
```

## WAMP nejde spustit

Může se stát, že z ničeho nic nepůjde WAMP spustit. Na vině bývá typicky obsazení portu `80`, na kterém běží Apache.

Pro ověření, zda je vše v pořádku, je k disposici funkce dostupná z tray ikony (*Apache → Service → Test port 80*):

Pokud se tam neobjeví, že na daném portu běží Apache, je problém.

### Microsoft IIS

Často při instalaci nějakého programu od Microsoftu port 80 obsadí IIS (Internetová informační služba).

Řešení je ji vypnout ve *Funkcích systému*. Do následujícího dialogu je ve [Windows 10](/windows-10) nejsnazší přístup přes hledání v nabídce start (napsat tam „Funkce systému“).

Po vypnutí IIS a restartování systému by již měl Apache opět fungovat.