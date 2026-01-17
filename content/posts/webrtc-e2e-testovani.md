---
title: "E2E testování WebRTC aplikací"
headline: "E2E testování WebRTC aplikací"
description: "Jak efektivně testovat WebRTC aplikace pomocí Playwright a Puppeteer. Praktické příklady, mockování médií a řešení běžných problémů."
date: "2025-12-29"
last_modification: "2025-12-29"
status: 1
tags: ["testovani", "js", "hotova-reseni"]
format: "html"
---

<p><b>WebRTC</b> (Web Real-Time Communication) umožňuje real-time komunikaci přímo v prohlížeči – videohovory, sdílení obrazovky či přenos dat mezi peer-to-peer spojeními. Testování těchto aplikací je ale výrazně složitější než u běžných webových stránek.</p>

<h2 id="proc-je-testovani-slozite">Proč je testování WebRTC složité</h2>

<p>WebRTC aplikace přináší několik unikátních výzev:</p>

<ul>
  <li><b>Přístup k hardwaru</b> – aplikace potřebuje přístup ke kameře a mikrofonu</li>
  <li><b>Peer-to-peer spojení</b> – komunikace probíhá mezi dvěma (nebo více) účastníky</li>
  <li><b>Síťové podmínky</b> – kvalita spojení závisí na síti</li>
  <li><b>Asynchronní povaha</b> – signaling, ICE candidates, media streams</li>
  <li><b>Různé prohlížeče</b> – implementace se může lišit</li>
</ul>

<h2 id="nastroje">Nástroje pro testování</h2>

<p>Pro E2E testování WebRTC se nejčastěji používají:</p>

<ul>
  <li><a href="https://playwright.dev"><b>Playwright</b></a> – moderní nástroj od Microsoftu s výbornou podporou pro WebRTC</li>
  <li><a href="https://pptr.dev"><b>Puppeteer</b></a> – nástroj od Google pro automatizaci Chrome</li>
</ul>

<p>Playwright má oproti Puppeteer výhodu v nativní podpoře více prohlížečů a lepším API pro práci s permissions.</p>

<h2 id="zakladni-nastaveni">Základní nastavení Playwright pro WebRTC</h2>

<p>Nejdůležitější je správně nastavit permissions pro přístup k médiím:</p>

<pre><code>import { test, chromium } from '@playwright/test'

test('WebRTC video hovor', async () => {
  const browser = await chromium.launch({
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ]
  })

  const context = await browser.newContext({
    permissions: ['camera', 'microphone'],
  })

  const page = await context.newPage()
  await page.goto('https://example.com/video-call')

  // ... test logic

  await browser.close()
})</code></pre>

<p>Klíčové jsou dva Chrome argumenty:</p>

<ul>
  <li><code>--use-fake-ui-for-media-stream</code> – automaticky povolí přístup k médiím bez dialogu</li>
  <li><code>--use-fake-device-for-media-stream</code> – použije fake video/audio stream místo skutečné kamery</li>
</ul>

<h2 id="vlastni-video">Použití vlastního videa jako vstupu</h2>

<p>Pro konzistentní testy je užitečné použít vlastní video soubor:</p>

<pre><code>const browser = await chromium.launch({
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--use-file-for-fake-video-capture=/path/to/test-video.y4m',
    '--use-file-for-fake-audio-capture=/path/to/test-audio.wav',
  ]
})</code></pre>

<p>Video musí být ve formátu <code>.y4m</code> (YUV4MPEG2). Lze jej vytvořit pomocí FFmpeg:</p>

<pre><code>ffmpeg -i input.mp4 -pix_fmt yuv420p output.y4m</code></pre>

<h2 id="testovani-dvou-ucastniku">Testování spojení dvou účastníků</h2>

<p>Pro testování skutečného hovoru potřebujeme dvě instance prohlížeče:</p>

<pre><code>import { test, chromium } from '@playwright/test'

test('dva účastníci videohovoru', async () => {
  const browser = await chromium.launch({
    args: [
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
    ]
  })

  // První účastník
  const context1 = await browser.newContext({
    permissions: ['camera', 'microphone'],
  })
  const page1 = await context1.newPage()

  // Druhý účastník
  const context2 = await browser.newContext({
    permissions: ['camera', 'microphone'],
  })
  const page2 = await context2.newPage()

  // Oba se připojí do stejné místnosti
  const roomId = 'test-room-' + Date.now()

  await Promise.all([
    page1.goto(`https://example.com/room/${roomId}`),
    page2.goto(`https://example.com/room/${roomId}`),
  ])

  // Počkáme na navázání spojení
  await page1.waitForSelector('[data-testid="remote-video"]')
  await page2.waitForSelector('[data-testid="remote-video"]')

  // Ověříme, že video streamy běží
  const isPage1VideoPlaying = await page1.evaluate(() => {
    const video = document.querySelector('[data-testid="remote-video"]')
    return video && !video.paused && video.readyState >= 2
  })

  expect(isPage1VideoPlaying).toBe(true)

  await browser.close()
})</code></pre>

<h2 id="cekani-na-ice">Čekání na ICE connection state</h2>

<p>Pro spolehlivé testy je dobré čekat na správný stav ICE spojení:</p>

<pre><code>// Počkáme až bude spojení navázáno
await page.waitForFunction(() => {
  const pc = window.peerConnection // reference na RTCPeerConnection
  return pc && pc.iceConnectionState === 'connected'
}, { timeout: 30000 })</code></pre>

<p>Možné stavy <code>iceConnectionState</code>:</p>

<ul>
  <li><code>new</code> – právě vytvořeno</li>
  <li><code>checking</code> – probíhá vyjednávání</li>
  <li><code>connected</code> – spojení navázáno</li>
  <li><code>completed</code> – všechny ICE kandidáti zpracováni</li>
  <li><code>disconnected</code> – dočasně odpojeno</li>
  <li><code>failed</code> – spojení selhalo</li>
  <li><code>closed</code> – spojení ukončeno</li>
</ul>

<h2 id="mockovani-getusermedia">Mockování getUserMedia</h2>

<p>Někdy je užitečné plně mockovat <code>getUserMedia</code>:</p>

<pre><code>await page.addInitScript(() => {
  // Vytvoříme fake MediaStream
  const canvas = document.createElement('canvas')
  canvas.width = 640
  canvas.height = 480
  const ctx = canvas.getContext('2d')

  // Animovaný obsah
  let hue = 0
  setInterval(() => {
    hue = (hue + 1) % 360
    ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
    ctx.fillRect(0, 0, 640, 480)
  }, 100)

  const fakeStream = canvas.captureStream(30)

  // Přepíšeme getUserMedia
  navigator.mediaDevices.getUserMedia = async () => fakeStream
})</code></pre>

<h2 id="testovani-sdileni-obrazovky">Testování sdílení obrazovky</h2>

<p>Pro <code>getDisplayMedia</code> (sdílení obrazovky) je situace složitější:</p>

<pre><code>const browser = await chromium.launch({
  args: [
    '--auto-select-desktop-capture-source=Entire screen',
    '--enable-usermedia-screen-capturing',
  ]
})</code></pre>

<p>Nebo lze mockovat <code>getDisplayMedia</code> podobně jako <code>getUserMedia</code>:</p>

<pre><code>await page.addInitScript(() => {
  navigator.mediaDevices.getDisplayMedia = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = 1920
    canvas.height = 1080
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#333'
    ctx.fillRect(0, 0, 1920, 1080)
    ctx.fillStyle = '#fff'
    ctx.font = '48px sans-serif'
    ctx.fillText('Fake Screen Share', 100, 100)
    return canvas.captureStream(30)
  }
})</code></pre>

<h2 id="sitove-podminky">Simulace síťových podmínek</h2>

<p>Playwright umožňuje simulovat pomalou síť:</p>

<pre><code>const context = await browser.newContext()

// Pomalé 3G
await context.route('**/*', async route => {
  await new Promise(resolve => setTimeout(resolve, 100))
  await route.continue()
})

// Nebo pomocí CDP pro přesnější kontrolu
const client = await context.newCDPSession(page)
await client.send('Network.emulateNetworkConditions', {
  offline: false,
  downloadThroughput: 500 * 1024 / 8, // 500 Kbps
  uploadThroughput: 500 * 1024 / 8,
  latency: 200,
})</code></pre>

<h2 id="debugging">Debugging WebRTC testů</h2>

<p>Pro ladění je užitečné:</p>

<pre><code>// Logování WebRTC událostí
await page.addInitScript(() => {
  const originalRTCPeerConnection = window.RTCPeerConnection

  window.RTCPeerConnection = function(...args) {
    const pc = new originalRTCPeerConnection(...args)

    pc.addEventListener('iceconnectionstatechange', () => {
      console.log('ICE state:', pc.iceConnectionState)
    })

    pc.addEventListener('connectionstatechange', () => {
      console.log('Connection state:', pc.connectionState)
    })

    return pc
  }
})</code></pre>

<p>A zachycení konzole v testu:</p>

<pre><code>page.on('console', msg => {
  console.log('BROWSER:', msg.text())
})</code></pre>

<h2 id="ci-cd">Spouštění v CI/CD</h2>

<p>Pro běh v headless prostředí (GitHub Actions, GitLab CI):</p>

<pre><code># playwright.config.ts
export default {
  use: {
    headless: true,
    launchOptions: {
      args: [
        '--use-fake-ui-for-media-stream',
        '--use-fake-device-for-media-stream',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    }
  }
}</code></pre>

<h2 id="tipy">Praktické tipy</h2>

<ul>
  <li><b>Timeouty</b> – WebRTC operace trvají déle, používejte delší timeouty (30+ sekund)</li>
  <li><b>Stabilita</b> – přidejte retry logiku pro flaky testy způsobené síťovými podmínkami</li>
  <li><b>Izolace</b> – každý test by měl používat unikátní room ID</li>
  <li><b>Video záznamy</b> – ukládejte záznamy testů pro snadnější debugging</li>
  <li><b>WebRTC internals</b> – v Chrome lze použít <code>chrome://webrtc-internals</code> pro diagnostiku</li>
</ul>

<h2 id="zaver">Závěr</h2>

<p>E2E testování WebRTC vyžaduje specifický přístup, ale s moderními nástroji jako Playwright je to zvládnutelné. Klíčem je správné nastavení fake media streams, pochopení životního cyklu WebRTC spojení a trpělivost s asynchronní povahou těchto aplikací.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://playwright.dev/docs/api/class-browser#browser-new-context">Playwright: Browser Context</a></li>
  <li><a href="https://webrtc.org/">WebRTC.org</a></li>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API">MDN: WebRTC API</a></li>
</ul>
