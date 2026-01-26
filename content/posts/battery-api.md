---
title: "JavaScript Battery API"
headline: "JavaScript Battery API"
description: "Jak v JS zjistit stav baterie, co dnes funguje a kdy API nepoužívat."
date: "2016-01-19"
last_modification: "2025-08-16"
status: 1
tags: ["js", "webove-prohlizece"]
format: "html"
---

<p>Některé operace a efekty na webové stránce mohou být náročné na hardware a následně lidově řečeno <i>žrát baterku</i>. Pomocí Battery Status API lze zjistit aktuální stav baterie a podle toho upravit chování aplikace (např. snížit frekvenci animací, odložit náročné výpočty, omezit synchronisace).</p>


<h2 id="podpora">Podpora</h2>
  <p>Kvůli risikům pro soukromí byla podpora Battery Status API v některých prohlížečích omezena nebo odstraněna. <b>Firefox</b> jej odstranil od verze 52, <b>Safari</b> nepodporuje. V <b>Chrome</b> je dostupné pouze v <b>secure contextu</b> (HTTPS) a podpora se může měnit. API používejte jen tehdy, když přináší jasný užitek.</p>
  <p>Prohlížeče: Chrome/Edge/Opera – omezeně podporováno, Firefox – odstraněno, Safari – nepodporováno.</p>

  <div class="external-content"> 
  <ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API">MDN: Battery Status API</a></li>
  <li><a href="https://caniuse.com/battery-status">Can I use: Battery Status</a></li>
  </ul></div>

<h2 id="jak-funguje">Jak funguje</h2>

<p>API je dostupné přes metodu <code>navigator.getBattery()</code>, která vrací objekt <code>BatteryManager</code> obsahující vlastnosti <code>level</code>, <code>charging</code>, <code>chargingTime</code> a <code>dischargingTime</code> a související události.</p>

<pre><code>navigator.getBattery().then((battery) =&gt; {
  console.log(Math.round(battery.level * 100) + "%");
  console.log(battery.charging ? "Nabíjí se" : "Na baterii");
});</code></pre>

<h2 id="ziva-ukazka">Živá ukázka</h2>

<p>Ukázka bezpečně detekuje podporu API a průběžně zobrazuje stav. V nepodporovaných prohlížečích zobrazí informaci o nepodpoře.</p>

<div class="live">
  <div id="batteryDemo" class="p-2 border rounded">
    <p id="batterySupport">Detekuji podporu…</p>
    <div id="batteryInfo" style="display:none">
      <p>Úroveň: <span id="batteryLevel"></span></p>
      <p>Stav: <span id="batteryCharging"></span></p>
      <p>Nabito za: <span id="batteryChargingTime"></span></p>
      <p>Vybití za: <span id="batteryDischargingTime"></span></p>
    </div>
  </div>
  <script>
  ;(() => {
    const support = document.getElementById("batterySupport");
    const info = document.getElementById("batteryInfo");
    const level = document.getElementById("batteryLevel");
    const charging = document.getElementById("batteryCharging");
    const chargingTime = document.getElementById("batteryChargingTime");
    const dischargingTime = document.getElementById("batteryDischargingTime");

    const formatSeconds = (s) => {
      if (s === Infinity || s < 0) return "—";
      const h = Math.floor(s / 3600);
      const m = Math.round((s % 3600) / 60);
      if (h === 0) return m + " min";
      return h + " h " + (m < 10 ? "0" + m : m) + " min";
    };

    if (!("getBattery" in navigator)) {
      support.textContent = "Váš prohlížeč nepodporuje Battery Status API.";
      return;
    }

    navigator.getBattery().then((battery) => {
      const update = () => {
        level.textContent = Math.round(battery.level * 100) + " %";
        charging.textContent = battery.charging ? "Nabíjí se" : "Na baterii";
        chargingTime.textContent = formatSeconds(battery.chargingTime);
        dischargingTime.textContent = formatSeconds(battery.dischargingTime);
      };

      update();

      battery.addEventListener("levelchange", update);
      battery.addEventListener("chargingchange", update);
      battery.addEventListener("chargingtimechange", update);
      battery.addEventListener("dischargingtimechange", update);

      support.style.display = "none";
      info.style.display = "";
    }).catch(() => {
      support.textContent = "Nelze získat stav baterie. Zkuste jiný prohlížeč.";
    });
  })();
  </script>
  </div>
  