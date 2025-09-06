---
title: "CSS Scroll Spy – zvýraznění při rolování"
headline: "Zvýraznění aktivní sekce při rolování"
description: "Moderní způsoby zvýraznění aktivní položky navigace podle aktuální sekce – CSS i IntersectionObserver."
date: "2025-09-06"
last_modification: "2025-09-06"
status: 1
tags: ["css", "js", "scroll", "selektory-css"]
format: "html"
---

<p><i>Scroll Spy</i> je technika, která zvýrazňuje položku navigace podle toho, která sekce stránky je právě ve viewportu. Hodí se u jednostránkových layoutů, dokumentace i delších článků s <a href="/toc">obsahem</a>.</p>


<h2 id="kdy">Kdy použít</h2>

<ul>
  <li>Zpřehlednění dlouhých stránek a rychlá orientace v obsahu.</li>
  <li>Automatické zvýraznění odpovídající položky menu při scrollování.</li>
  </ul>


<h2 id="css">CSS řešení (<code>:target-current</code>)</h2>

<p>V <b>Chrome 140+</b> je možné zvýrazňovat aktuální odkaz čistě v CSS. Navigaci stačí nastavit <code>scroll-target-group: auto</code> a stylovat <code>:target-current</code>.</p>

<pre><code>.menu {scroll-target-group: auto}
.menu a:target-current {font-weight: bold}</code></pre>

<p>V ostatních prohlížečích se toto zvýraznění neprojeví.</p>

<div class="live">
  <style>
    .menu-ct {position: sticky; top: .5rem; align-self: start; padding: .5rem; background: #fff; border: 1px solid #ddd}
    .menu-ct a {display: block; padding: .25rem .5rem; text-decoration: none}
    .menu-ct {scroll-target-group: auto}
    .menu-ct a:target-current {background: #0D6AB7!important; color: #fff}
    .ct section {padding-block: 2rem; border-bottom: 1px solid #eee}
    .ct section {scroll-margin-top: 3.5rem}
  </style>
  <div class="scroll-area" style="height: 16rem; overflow: auto">
    <div style="display: grid; grid-template-columns: .5fr 1fr; gap: 1rem">
      <nav class="menu-ct">
      <strong>Obsah</strong>
      <a href="#x1">Sekce A</a>
      <a href="#x2">Sekce B</a>
      <a href="#x3">Sekce C</a>
      </nav>
      <article class="ct">
      <section id="x1"><h3>Sekce A</h3><p style="height: 16rem"></p></section>
      <section id="x2"><h3>Sekce B</h3><p style="height: 16rem"></p></section>
      <section id="x3"><h3>Sekce C</h3><p style="height: 16rem"></p></section>
      </article>
    </div>
  </div>
</div>

<h2 id="js">Řešení v JS (IntersectionObserver)</h2>

<p>V JavaScriptu funguje ve všech prohlížečích řešení s využitím <code>IntersectionObserver</code>u, který efektivně detekuje, zda jsou části stránky ve viewportu, bez poslouchání každé události <code>scroll</code>.</p>

<div class="live">
  <style>
    .layout {display: grid; grid-template-columns: .5fr 1fr; gap: 1rem}
    .scrollspy {position: sticky; top: .5rem; align-self: start; padding: .5rem; background: #fff; border: 1px solid #ddd}
    .scrollspy a {display: block; padding: .25rem .5rem; text-decoration: none}
    .scrollspy a.active {background: #0D6AB7 !important; color: #fff}
    section {padding-block: 2rem; border-bottom: 1px solid #eee}
    section {scroll-margin-top: 3.5rem}
  </style>
  <div class="layout" style="height: 16rem; overflow: auto" id="io-root">
    <nav class="scrollspy">
      <strong>Obsah</strong>
      <a href="#a">Úvod</a>
      <a href="#b">Implementace</a>
      <a href="#c">Doporučení</a>
    </nav>
    <main id="content">
      <section id="a"><h3>Úvod</h3><p>Text.</p><p style="height: 18rem"></p></section>
      <section id="b"><h3>Implementace</h3><p>Text.</p><p style="height: 18rem"></p></section>
      <section id="c"><h3>Doporučení</h3><p>Text.</p><p style="height: 18rem"></p></section>
    </main>
  </div>
  <script>
    (function(){
    const root = document.getElementById('io-root')
    const navLinks = Array.from(root.querySelectorAll('.scrollspy a'))
    const sections = navLinks.map(link => root.querySelector(link.getAttribute('href'))).filter(Boolean)
    const setActive = targetId => {
      navLinks.forEach(anchor => anchor.classList.toggle('active', anchor.getAttribute('href') === targetId))
    }
    const computeMostVisibleSectionId = () => {
      const rootRect = root.getBoundingClientRect()
      let bestId = null
      let bestRatio = -1
      let bestTop = Infinity
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        const visibleTop = Math.max(rect.top, rootRect.top)
        const visibleBottom = Math.min(rect.bottom, rootRect.bottom)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const ratio = visibleHeight / Math.max(1, rect.height)
        if (ratio > bestRatio || (ratio === bestRatio && rect.top < bestTop)) {
          bestRatio = ratio
          bestTop = rect.top
          bestId = '#' + section.id
        }
      })
      return bestId
    }
    const updateActive = () => {
      const id = computeMostVisibleSectionId()
      if (id) setActive(id)
    }
    const observer = new IntersectionObserver(() => updateActive(), { root, rootMargin: '0px 0px -60% 0px', threshold: [0, 0.5, 1] })
    sections.forEach(section => observer.observe(section))
    root.addEventListener('scroll', updateActive)
    updateActive()
    const onClick = event => {
      if (event.target.matches('.scrollspy a')) setActive(event.target.getAttribute('href'))
    }
    root.querySelector('.scrollspy').addEventListener('click', onClick)
    })()
  </script>
</div>

<p>Je-li na stránce <strong>fixní hlavička</strong>, je dobré nastavit sekcím <code>scroll-margin-top</code> podle její výšky.</p>

<h2 id="odkazy">Odkazy</h2>

<ul>
  <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API">MDN: Intersection Observer</a></li>
  <li><a href="https://una.im/scroll-target-group/">Creating a scroll-spy with 2 lines of CSS (Una Kravets)</a></li>
  <li><a href="https://www.sarasoueidan.com/blog/css-scrollspy/?utm_source=CSS-Weekly&amp;utm_medium=newsletter&amp;utm_campaign=issue-619-august-31-2025&amp;_bhlid=bf8994c165852ae268e21b0389d527ee46f9f3f6">CSS-only scrollspy with scroll-target-group and :target-current (Sara Soueidan)</a></li>
  <li><a href="/zvyrazneni-odrolovani">Zvýraznění podle rolování</a></li>
  <li><a href="/zvyrazneni-kotvy">Zvýraznění aktivní kotvy</a></li>
</ul>


