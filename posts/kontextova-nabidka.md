---
title: "Kontextová nabídka"
headline: "Vlastní kontextová nabídka"
description: "Jak po stisknutí pravého tlačítka myši zobrazit vlastní nabídku."
date: "2013-10-22"
last_modification: "2013-11-15"
status: 1
tags: ["JavaScript", "Hotová řešení"]
---

Ve **složitější webové aplikaci** často bývá problém najít volné místo pro umístění potřebných funkcí. Řešením může být právě **vlastní kontextová nabídka**, která se objeví po **stisknutí pravého tlačítka myši**.

Ta bude fungovat tak, že *vystornuje* výchozí nabídku prohlížeče a zobrazí vlastní kolekci vhodně nastylovaných elementů. Proto je třeba vlastní nabídku pravého tlačítka zavádět s rozmyslem, neboť to je významný zásah do **výchozího chování prohlížeče**.

## Řešení v čistém JavaScriptu

Zachytit **stisknutí pravého tlačítka myši** na požadovaném elementu je možné přes událost `oncontextmenu`, potom jen stačí vytvořit příslušné elementy (`document.createElement`), [zjistit souřadnice](/souradnice-mysi), kde se má nabídka objevit. A zajistit zrušení nabídky po kliknutí mimo (je třeba řešit [probublávání](/klikaci-menu#bubble)).

Nakonec přihodit trochu CSS, aby nabídka trochu vypadala ([živá ukázka](http://kod.djpw.cz/cwq)).

    .nabidka {border: 1px solid #ccc; width: 150px; position: absolute; z-index: 10; background: #fff;}
    .nabidka a {text-decoration: none; display: block; cursor: pointer; padding: .1em .5em;}
    .nabidka a:hover {background: #1081DD; color: #fff}

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
      for (var i = 0; i 
  Text s **kontextovou nabídkou** po kliknutí pravým tlačítkem.

  Text s jinou **kontextovou nabídkou**.

Položky se předávají jako **JS objekt**, ze kterého se automaticky nastaví všechny parametry:

```
[
  {innerHTML: 'Zpět', href: 'http://jecas.cz'},
  {innerHTML: 'Bafnout', onclick: function() {alert('Baf')}}
]

```

Není proto problém po kliknutí přejít na **odkaz**, vyvolat **další JS funkci** nebo třeba položce přidat třídu (`className`) nebo popisek (`title`).

## ContextJS

Také existují hotová řešení v jQuery — třeba ContextJS.

[Web](http://lab.jakiestfu.com/contextjs/#)

Nástroj **ContextJS** je na jQuery založené hotové řešení usnadňující tvorbu kontextových menu. Tvorba takových nabídek je podobná (ale nepoužívá přímo vlastnosti HTML objektů):

```
context.attach('.trida-elementu-kde-se-bude-menu-objevovat', [
    {header: 'Záhlaví'},
    {text: 'Popis položky', href: '#cil-odkazu'},
    {divider: true},
    {text: 'Další položka po oddělovači', href: '#'},
    {text: 'Vyvolá vlastní JS akci', action: function(e){
      alert("Baf");
    }}
]);
```

## Zakázat pravé tlačítko myši

Kromě nabídky výše uvedený postup i **blokuje** pravé tlačítko / kontextovou nabídku. V žádném případě není vhodné pravé tlačítko blokovat z důvodů jako je **kopírování textu nebo obrázků**.

Takový zákaz stejně nebude účinný, protože znalejší návštěvník ho snadno obejde prostým [vypnutím JavaScriptu](/vyvojarske-nastroje#zakazani).