---
title: "Kontextová nabídka"
headline: "Vlastní kontextová nabídka"
description: "Jak po stisknutí pravého tlačítka myši zobrazit vlastní nabídku."
date: "2013-10-22"
last_modification: "2013-11-15"
status: 1
tags: ["hotova-reseni", "js"]
format: "html"
---

<p>Ve <b>složitější webové aplikaci</b> často bývá problém najít volné místo pro umístění potřebných funkcí. Řešením může být právě <b>vlastní kontextová nabídka</b>, která se objeví po <b>stisknutí pravého tlačítka myši</b>.</p>
<p>Ta bude fungovat tak, že <i>vystornuje</i> výchozí nabídku prohlížeče a zobrazí vlastní kolekci vhodně nastylovaných elementů. Proto je třeba vlastní nabídku pravého tlačítka zavádět s rozmyslem, neboť to je významný zásah do <b>výchozího chování prohlížeče</b>.</p>

<h2 id="reseni">Řešení v čistém JavaScriptu</h2>
<p>Zachytit <b>stisknutí pravého tlačítka myši</b> na požadovaném elementu je možné přes událost <code>oncontextmenu</code>, potom jen stačí vytvořit příslušné elementy (<code>document.createElement</code>), <a href="/souradnice-mysi">zjistit souřadnice</a>, kde se má nabídka objevit. A zajistit zrušení nabídky po kliknutí mimo (je třeba řešit <a href="/klikaci-menu#bubble">probublávání</a>).</p>
<p>Nakonec přihodit trochu CSS, aby nabídka trochu vypadala (<a href="http://kod.djpw.cz/cwq">živá ukázka</a>).</p>

<div class="live">
  <style>
    .nabidka {border: 1px solid #ccc; width: 150px; position: absolute; z-index: 10; background: #fff;}
    .nabidka a {text-decoration: none; display: block; cursor: pointer; padding: .1em .5em;}
    .nabidka a:hover {background: #1081DD; color: #fff}
  </style>
  <script>
    function zavritNabidku() {
      if (document.getElementById("nabidka")) {
        document.body.removeChild(document.getElementById("nabidka"));
      }
    }
    
    function getPosition(e) {
        e = e || window.event;
        var cursor = {x:0, y:0};
    
        if (e.pageX || e.pageY) {
            cursor.x = e.pageX;
            cursor.y = e.pageY;
        } 
        else {
            cursor.x = e.clientX + 
                (document.documentElement.scrollLeft || 
                document.body.scrollLeft) - 
                document.documentElement.clientLeft;
            cursor.y = e.clientY + 
                (document.documentElement.scrollTop || 
                document.body.scrollTop) - 
                document.documentElement.clientTop;
        }
        return cursor;
    }
    
    function nabidka(e, polozky) {
      zavritNabidku();
      var nabidka = document.createElement("div");
      nabidka.className = "nabidka";
      nabidka.id = "nabidka";
      nabidka.onclick = function(e) {
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
      }
      var cursorPos = getPosition(e); // zjištění posice kursoru
      nabidka.style.left = 5 + cursorPos.x + "px";
      nabidka.style.top = 5 + cursorPos.y + "px";
      for (var i = 0; i < polozky.length; i++) {
        var polozka = document.createElement("a");
        var atributy = polozky[i];  
        for (vlastnost in atributy) {
          polozka[vlastnost] = atributy[vlastnost];
        }
        nabidka.appendChild(polozka);
      }
      document.body.appendChild(nabidka);
      return false;
    }
    
    document.documentElement.onclick = zavritNabidku;
  </script>
  <p oncontextmenu="return nabidka(event, [
  {innerHTML: 'Hlavní strana', href: 'http://jecas.cz'},
  {innerHTML: 'Bafnout', onclick: function() {alert('Baf')}}
  ])">Text s <b>kontextovou nabídkou</b> po kliknutí pravým tlačítkem.</p>

  <p oncontextmenu="return nabidka(event, [
  {innerHTML: 'Saints Row IV', href: 'http://saintsrow.cz'},
  {innerHTML: 'Živé ukázky', href: 'http://kod.djpw.cz'}
  ])">Text s jinou <b>kontextovou nabídkou</b>.</p>
</div>
<p>Položky se předávají jako <b>JS objekt</b>, ze kterého se automaticky nastaví všechny parametry:</p>
<pre><code>[
  {innerHTML: 'Zpět', href: 'http://jecas.cz'},
  {innerHTML: 'Bafnout', onclick: function() {alert('Baf')}}
]
</code></pre>
<p>Není proto problém po kliknutí přejít na <b>odkaz</b>, vyvolat <b>další JS funkci</b> nebo třeba položce přidat třídu (<code>className</code>) nebo popisek (<code>title</code>).</p>


<h2 id="contextjs">ContextJS</h2>
<p>Také existují hotová řešení v jQuery — třeba ContextJS.</p>
<p><a href="http://lab.jakiestfu.com/contextjs/#" class="button">Web</a></p>
<p>Nástroj <b>ContextJS</b> je na jQuery založené hotové řešení usnadňující tvorbu kontextových menu. Tvorba takových nabídek je podobná (ale nepoužívá přímo vlastnosti HTML objektů):</p>
<pre><code>context.attach('.trida-elementu-kde-se-bude-menu-objevovat', [
    {header: 'Záhlaví'},
    {text: 'Popis položky', href: '#cil-odkazu'},
    {divider: true},
    {text: 'Další položka po oddělovači', href: '#'},
    {text: 'Vyvolá vlastní JS akci', action: function(e){
      alert("Baf");
    }}
]);</code></pre>

<h2 id="zakazat">Zakázat pravé tlačítko myši</h2>
<p>Kromě nabídky výše uvedený postup i <b>blokuje</b> pravé tlačítko / kontextovou nabídku. V žádném případě není vhodné pravé tlačítko blokovat z důvodů jako je <b>kopírování textu nebo obrázků</b>.</p>
<p>Takový zákaz stejně nebude účinný, protože znalejší návštěvník ho snadno obejde prostým <a href="/vyvojarske-nastroje#zakazani">vypnutím JavaScriptu</a>.</p>