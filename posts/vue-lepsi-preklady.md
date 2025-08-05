---
title: "Odstranění nepoužívaných překladů ve Vue.js"
headline: "Odstranění nepoužívaných překladů ve Vue.js"
description: "Jak ve Vue.js automaticky udržovat překlady očištěné o nepoužívané klíče."
date: "2021-08-23"
last_modification: "2021-08-23"
status: 1
tags: ["js", "lokalisace", "vue-js"]
format: "html"
---

<p>Pro vytváření vícejazyčného webu ve Vue.js je běžným postupem používat plugin <a href="https://kazupon.github.io/vue-i18n/">Vue I18n</a> (I18n je zkratka slova <b>i</b>nternationalizatio<b>n</b>, kde se <b>18</b> písmen uprostřed nahrazuje číslem).</p>

<p>Překlady se obvykle používají tak, že existuje soubor ve formátu <a href="/json">JSON</a>, kde jsou jednotlivé klíče a přeložené hodnoty.</p>

<pre><code>{
  "button": {
    "send": "Odeslat"
  }
}</code></pre>


<p>V šabloně je potom na potřebném místě překlad vyvolán přes <code>$t('button.send')</code>.</p>

<p>Při používání překladů se lze setkat s několika hlavními nešvary:</p>

<ol>
  <li>
    nepoužívané překlady,
  </li>
  <li>
    neexistující překlady,
  </li>
  <li>
    nepřeložené texty
  </li>
</ol>



<p>Důvody, proč to řešit, jsou očividné.</p>

<p>Nepoužívané překlady se <b>zbytečně stahují</b> návštěvníkům a zbytečně zaměstnávají překladatele.</p>

<p>Neexistující překlady komplikují používání, protože místo chybějícího překladu se zobrazí buď klíč, takže místo <i>Odeslat</i> bude na stránce <i>button.send</i>, nebo vůbec nic.</p>



<p><b>Nepřeložené texty</b> často vzniknou během vývoje, kdy se v rámci zjednodušení zapíše text natvrdo do šablony. Takový text potom není možné přeložit do dalších jazyků.</p>








<h2 id="eslint">ESLint plugin</h2>

<p>Zmíněné neduhy a ještě další věci dokáže hlídat ESLint plugin <a href="https://github.com/intlify/eslint-plugin-vue-i18n">eslint-plugin-vue-i18n</a>.</p>

<p>Stačí ho nainstalovat:</p>

<pre><code>npm install --save-dev eslint @intlify/eslint-plugin-vue-i18n</code></pre>


<p>A nakonfigurovat v <code>.eslintrc.js</code>:</p>

<pre><code>module.export = {
  extends: [
    'plugin:@intlify/vue-i18n/recommended'
  ],
  rules: {
    '@intlify/vue-i18n/no-dynamic-keys': 'error',
    '@intlify/vue-i18n/no-missing-keys': 'error',
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.vue']
      }
    ]
  },
  settings: {
    'vue-i18n': {
      // cesta k překladům
      localeDir: './src/localization/cs/*.json',
      // verse vue-i18n
      messageSyntaxVersion: '^9.0.0'
    }
  }
}</code></pre>

























<p>Výhoda použití ESLint pluginu je v tom, že pokud se bude správně vyžadovat před deployem aplikace, je prakticky zajištěno, že se výše uvedené problémy nedostanou do produkčního prostředí.</p>




<h2 id="dynamicke">Dynamické překlady</h2>

<p>Asi největší problém při snaze o lintování překladů bude nejspíš s dynamickými překlady.</p>

<p>O co jde?</p>

<p>O klíče překladů složené dynamicky pomocí proměnných:</p>

<pre><code>$t(`services.overview.${service.name}.title`)</code></pre>







<p>Na první pohled do ohromně šetří psaní a zkracuje kód. Na druhou stranu to bohužel <b>znemožňuje mít 100% kontrolu</b> na překlady.</p>

<p>Pokud je cílem mít neprůstřelné překlady, jde dynamické skládání klíčů považovat za <b>anti-pattern</b> a je potřeba se tomu vyvarovat i za cenu psaní více kódu.</p>





<h2 id="extrahovani">Extrahování překladů</h2>

<p>Další užitečný nástroj je <a href="https://github.com/pixari/vue-i18n-extract">vue-i18n-extract</a>, který dokáže hned několik věcí:</p>

<p>Najít chybějící, nepoužité a dynamické klíče.</p>

<p><img src="/files/vue-nepouzivane-preklady/vue-i18n-extact-report.png" alt="vue-i18n-extact report" class="border"></p>









<p>Případně je rovnou odstranit nebo naopak přidat do JSON souborů s překlady.</p>

<p>Vývojář může během tvorby psát do kódu pouze zástupné klíče, které se jedním příkazem následně přidají do JSONu s překlady.</p>



<h2 id="unused">Jednorázové odstranění</h2>

<p>Pro jednorázové odstranění nepoužívaných překladů jde dobře použít i nástroj <a href="https://github.com/mxmvshnvsk/i18n-unused">i18n-unused</a>.</p>

<p>Stačí nainstalovat:</p>

<pre><code>npm install --save-dev i18n-unused</code></pre>

<p>Přidat konfiguraci do souboru <code>i18n-unused.config.js</code>:</p>

<pre><code>module.exports = {
  localesPath: 'src/localization/default',
  srcPath: 'src',
  excludeKey: [
    'apiErrors',
    'enums',
    'faq.topics',
    'footer.items',
  ],
}</code></pre>
















<p>A pustit:</p>

<pre><code>i18n-unused remove-unused</code></pre>




<p>Šikovné je, že jde do <code>excludeKey</code> zadat klíče, které se nemají odstranit, což se hodí hlavně pro dynamické klíče, jsou-li v projektu.</p>