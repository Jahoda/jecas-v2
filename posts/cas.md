---
title: "Časem"
headline: "Čas"
description: "Jak pracovat s časem, časovými pásmy či změnou na letní čas."
date: "2014-11-17"
last_modification: "2014-11-17"
status: 0
tags: []
---

#cas {
    font: 600% 'Segoe UI';
    text-align: center;
}

setInterval("cas.innerHTML = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()", 500)

```
$dateTimeZoneTaipei = new DateTimeZone("Europe/Prague");
$dateTimeZoneJapan = new DateTimeZone("Chile/EasterIsland");

$time = "08.09.2014 03:10";
$dateTimeTaipei = new DateTime($time, $dateTimeZoneTaipei);
$dateTimeJapan = new DateTime($time, $dateTimeZoneJapan);

$timeOffset = $dateTimeZoneJapan->getOffset($dateTimeTaipei);

echo $timeOffset / 60 / 60;
```

## Letní čas

[letní čas na Wikipedii](http://cs.wikipedia.org/wiki/Letní_čas) v [jednotlivých zemích](http://en.wikipedia.org/wiki/Daylight_saving_time_by_country)

- [Detekce letního času v JS](http://javascript.about.com/library/bldst.htm)

  - [tz database / Olson database](http://en.wikipedia.org/wiki/Tz_database)

  - [IANA — Time Zone Database](http://www.iana.org/time-zones)

    - [Rozšíření PHP s aktuálními časovými zónami](http://pecl.php.net/package/timezonedb)

  - [jsTimezoneDetect](https://bitbucket.org/pellepim/jstimezonedetect/) – detekce časové zóny v JavaScriptu

  - Seznam časových pásem v [HTML](https://gist.github.com/ykessler/3349954) / [JSONu](https://gist.github.com/ykessler/3349960)

  - SO: [Daylight saving time and time zone best practices](http://stackoverflow.com/questions/2532729/daylight-saving-time-and-time-zone-best-practices?rq=1)

  - Swizec Telle: [A day is not 60*60*24 seconds long](http://swizec.com/blog/a-day-is-not-606024-seconds-long/swizec/6755)