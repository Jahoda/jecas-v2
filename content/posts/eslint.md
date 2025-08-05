---
title: "Jak lintovat JavaScript pomocí ESLintu"
headline: "Lintování JS pomocí ESLintu"
description: "Pro dosažení vyšší kvality a jednotnosti kódu je dobré používat nástroj k tzv. lintování."
date: "2019-02-19"
last_modification: "2019-02-19"
status: 0
tags: []
format: "html"
---

<p>Při programování v JavaScriptu existuje řada způsobů, jak tutéž funkcionalitu zapsat kódem v různém stylu:</p>

<pre><code>if (a) alert(1)

if ( a )
    alert( 1 )
    
if (a) {
    alert(1)
}

if (a)
{
    alert(1);
}</code></pre>

















<p>Díky nástroji <a href="https://eslint.org"><b>ESLint</b></a> jde potom automaticky odhalit a často i <b>automaticky opravit</b> odlišnosti oproti domluvené podobě kódu (anglicky <i lang="en">code style</i>).</p>

<p>Proč to dělat?</p>

<ol>
  <li>
    <p><b>Pohodlí</b> – autor kódu nemusí řešit, jestli kód odsazovat taby nebo mezerami, jestli psát jednoduché nebo dvojité uvozovky, jestli psát na konce řádků středníky, jestli psát názvy proměnných ve stylu <i>lowerCamelCase</i> či <i>snake_case</i> apod.</p>
    
    <p>Kód se automaticky upraví, aby vyhovoval nastavenému code stylu.</p>
    
    <p>ESLint je hodně rozšířen a podporován v editorech, takže konfigurace je součástí projektu a při jeho otevření se může nastavení automaticky promítnout v editoru.</p>
  </li>
  
  <li>
    <p><b>Kvalitnější kód</b> – ESLint není jen o odsazování a odstraňování středníků. Dokáže třeba i upozornit na nedefinované proměnné, zoptimalisovat importy, nahradit <a href="/js-var-let"><code>let</code></a> za <code>const</code> na místech, kde to dává smysl a další…</p>
  </li>
  
  <li>
    <p><b>Jednotný styl</b> – bez automatického formátování je dost těžké udržet jednotný styl kódu, natož potom při práci ve více lidí.</p>
    
    <p>Jednotný styl napomáhá lepší čitelnosti / orientaci v kódu.</p>
  </li>
  
  <li>
    <p><b>Přeformátování</b> – bez stanoveného a vyžadovaného code stylu se často stává, že různí lidé v různých editorech mají nastavené různé formátování, které automaticky aplikují.</p>
    
    <p>Ve versovacích systémech (Git) je potom nepořádek kvůli změnám řádků kvůli formátování.</p>
  </li>
</ol>


<h2 id="standard">Jaký standard zvolit?</h2>

<p>První pravidlo zní, že <b>jakýkoliv jednotný code style je lepší než nic</b>. </p>

<p>Osobně preferuji <a href="https://standardjs.com">JavaScript Standard Style</a>.</p>

<p>Jediné, co mi na něm vadí, je zakázání místo vynucení čárky za posledním prvkem víceřádkového pole (pravidlo <a href="https://eslint.org/docs/rules/comma-dangle"><code>comma-dangle</code></a>):</p>

<pre><code>let pole = [
  'první',
  'druhá',
  'třetí'<b>,</b>
]</code></pre>








<p>Psát čárku za poslední položkou je výhodné kvůli versování v Gitu, protože při přidání nové položky do pole se nemění nesouvisející řádek.</p>

<p>Proto ho instaluji s podporou konfigurace.</p>



<h2 id="instalace">Instalace</h2>

<p>Nainstalovat lintování ESLintem s konfigurací JavaScript Standard Style a možností nějaké nastavení změnit jde následovně:</p>

<pre><code>npm install --save-dev eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node
</code></pre>



<p>Pro konfiguraci se potom vytvoří soubor <code>.eslintrc</code> ve stejné složce jako je <code>package.json</code> s následujícím obsahem:</p>

<pre><code>{
  "extends": "standard",
  "env": {
    "browser": true
  },
  "rules": {
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  }
}</code></pre>

















<p>Pro pohodlné spuštění nad všemi <code>*.js</code> soubory ze složky <code>./src</code> (+ podsložek) se ještě přidá skript do <code>package.json</code>:</p>

<pre><code>"scripts": {
  "eslint": "eslint \"src/**/*.js\"",
  "eslint-fix": "eslint \"src/**/*.js\" --fix"
},</code></pre>







<p>Spustit kontrolu a kontrolu s opravou jde spustit přes <code>npm run eslint</code>, respektive <code>npm run eslint-fix</code>.</p>

<h3 id="react">React</h3>

<p>Při lintování aplikace v <b>Reactu</b> se hodí ještě nainstalovat <code>eslint-plugin-react</code>:</p>

<pre><code>npm install --save-dev eslint-plugin-react</code></pre>

<p>A do konfigurace přidat následující:</p>

<pre><code>{
  "extends": "standard",
  <b>"plugins": ["react"],</b>
  "env": {
    "browser": true
  },
  "rules": {
    <b>"react/jsx-uses-react": "error",</b>
    <b>"react/jsx-uses-vars": "error",</b>
    "comma-dangle": [
      "error",
      "always-multiline"
    ]
  }
}
</code></pre>


















<h2 id="kontrola">Automatická kontrola</h2>

<p>Přidat do projektu lint je hezké, ale pokud se nijak nevynucuje, aby jeho pravidly kód prošel, může to být skoro zbytečné. Protože to nikdo nebude pouštět a dodržovat.</p>

<p>Existují následující možnosti, které správnost kontrolovat:</p>

<ol>
  <li>
    <p><b>Editor/IDE</b> – lepší editory (třeba <a href="/phpstorm-vs-webstorm">Php/WebStorm</a>) dokáží upozorňovat na prohřešky oproti ESLint konfiguraci. A například správnost zkontrolovat před commitnutím.</p>
  </li>
  
  <li>
    <p><b>Git hooky</b> – jedná se o možnost, jak při různých akcích s Gitem pouštět skripty. Při commitnutí se tak může provést kontrola a třeba i automatické opravení kódu podle pravidel.</p>
  </li>
  
  <li>
    <p><b>CI</b> (<i lang="en">Continuous Integration</i>) – pro pohodlný vývoj je fajn používat nějakou službu pro <i>průběžnou integraci</i> (např. GitHub nebo GitLab).</p>
    
    <p>Ta při pushnutí (<code>git push</code>) do vzdáleného repositáře může automaticky pustit kontrolu nad kódem (tj. <code>npm run eslint</code>) a vyžadovat bezchybný výsledek pro umožnění dostat kód do hlavní (<code>master</code>) větve.</p>
  </li>
</ol>





<p>Co z toho si vybrat? Nejneprůstřelnější je <b>vyžadovat správnost v CI</b> – to jediné zaručí, že se do hlavní větve projektu nedostane špatný kód. Ostatní řešení může vývojář obejít.</p>

<p>Upozorňování v editoru je dobré pro pohodlí, protože je okmažité.</p>

<p>Použít Git hooky se hodí, pokud není možné/chtěné používat CI.</p>



<h2 id="jak-zacit">Jak začít s ESLintem</h2>

<p>Nejrychlejší postup je následovný.</p>

<ol>
  <li>Nainstalovat a nakonfigurovat lint.</li>
  <li>Automaticky opravit, co půjde (tj. pustit s parametrem <code>--fix</code>).</li>
  <li>Vypnout všechna neprocházející pravidla, až lint lokálně projde v pořádku.</li>
  <li>Dostat automaticky opravený kód a konfiguraci do hlavní větve projektu.</li>
  <li>Upravit CI, aby vyžadovalo úspěšně lintem projít.</li>
  <li>Následně odstraňovat vypnutá pravidla a opravovat kód.</li>
</ol>


<p>Výsledek prvního spuštění nad nelintovaným projektem může vypadat nějak následovně:</p>

<pre><code>640 problems (640 errors, 0 warnings)</code></pre>






<p>Většina věcí by měla jít vyřešit automaticky:</p>

<pre><code>64 problems (64 errors, 0 warnings)</code></pre>

<p>Jednotlivé chyby se zobrazují nějak takto:</p>

<pre><code>C:\messenger\src\components\messages\reducer.js
373:13  error  Identifier 'GA_Callback' is not in camel case  <b>camelcase</b>
</code></pre>






<p>Na konci řádku je typ pravidla, které neprošlo. Jde ho tedy vypnout v <code>.eslintrc</code> v sekci <code>rules</code>:</p>

<pre><code>"rules": {
  "<b>camelcase</b>": "off"
}</code></pre>


<h2 id="html">Lintování JS v HTML</h2>

<p>Kontrolovat JS jde i v HTML souborech, pokud se tam nachází. Umí to následující plugin.</p>

<div class="external-content">
  <ul>
    <li><a href="https://github.com/BenoitZugmeyer/eslint-plugin-html">eslint-plugin-html</a> – plugin pro lintování JS v HTML souborech</li>
  </ul>
</div>
