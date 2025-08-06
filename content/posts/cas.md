---
title: "Časem"
headline: "Čas"
description: "Jak pracovat s časem, časovými pásmy či změnou na letní čas."
date: "2014-11-17"
last_modification: "2014-11-17"
status: 0
tags: []
format: "html"
---

<style>
#cas {
    font: 600% 'Segoe UI';
    text-align: center;
}
</style>
<div id="cas"></div>
<script>
setInterval("cas.innerHTML = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()", 500)
</script>



<pre><code>$dateTimeZoneTaipei = new DateTimeZone("Europe/Prague");
$dateTimeZoneJapan = new DateTimeZone("Chile/EasterIsland");

$time = "08.09.2014 03:10";
$dateTimeTaipei = new DateTime($time, $dateTimeZoneTaipei);
$dateTimeJapan = new DateTime($time, $dateTimeZoneJapan);

$timeOffset = $dateTimeZoneJapan->getOffset($dateTimeTaipei);

echo $timeOffset / 60 / 60;</code></pre>

<h2 id="letni">Letní čas</h2>



<a href="http://cs.wikipedia.org/wiki/Letní_čas">letní čas na Wikipedii</a> v <a href="http://en.wikipedia.org/wiki/Daylight_saving_time_by_country">jednotlivých zemích</a>

<li><a href="http://javascript.about.com/library/bldst.htm">Detekce letního času v JS</a></li>

<ul>
  <li><a href="http://en.wikipedia.org/wiki/Tz_database">tz database / Olson database</a></li>
   
  <li><a href="http://www.iana.org/time-zones">IANA — Time Zone Database</a></li>
  
    <li><a href="http://pecl.php.net/package/timezonedb">Rozšíření PHP s aktuálními časovými zónami</a></li>
  <li><a href="https://bitbucket.org/pellepim/jstimezonedetect/">jsTimezoneDetect</a> – detekce časové zóny v JavaScriptu</li>
  
  <li>Seznam časových pásem v <a href="https://gist.github.com/ykessler/3349954">HTML</a> / <a href="https://gist.github.com/ykessler/3349960">JSONu</a></li>
  
  <li>SO: <a href="http://stackoverflow.com/questions/2532729/daylight-saving-time-and-time-zone-best-practices?rq=1">Daylight saving time and time zone best practices</a></li>
  
  <li>Swizec Telle: <a href="http://swizec.com/blog/a-day-is-not-606024-seconds-long/swizec/6755">A day is not 60*60*24 seconds long</a></li>
</ul>