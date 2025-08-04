---
title: "Ochrana proti spamu"
headline: "Obrana proti spamu"
description: "Jak se na webu bránit spammerům z řad robotů i návštěvníků."
date: "2013-12-22"
last_modification: "2013-12-22"
status: 1
tags: ["Hotová řešení", "Rady a nápady", "Spam"]
---

Umožníme-li na stránku návštěvníkům přidávat obsah, dříve nebo později se **setkáme se spamem**.

## Spamovací roboti

První a méně nebezpečná skupina *škůdců* jsou **automatické nástroje**, které prochází stránky, hledají formuláře a vkládají do nich odkazy na *své* stránky.

Způsobů obrany existuje víc. Často stačí využít toho, že robot **neinterpretuje JavaScript a CSS**.

### Kontrolní otázka

Jako ochrana se vytvoří formulářové pole, kam se má odpovědět na otázku, která je u něj. Aby ochrana neotravovala běžné návštěvníky, správnou odpověď automaticky vyplní JavaScript a celý rodič `&lt;input>`u s *otázkou* se skryje.

```
&lt;p>
  Ochrana proti spamu. Napište prosím číslo dvacet-čtyři: 
  &lt;input type="text" name="robot" id="protirobotum">
&lt;/p>
&lt;script>
  var protiRobotum = document.getElementById("protirobotum");
  protiRobotum.value = "24";
  protiRobotum.parentNode.style.display = "none";
&lt;/script>
```

Na straně serveru se potom před uložením kontroluje hodnota políčka `robot`. Relativně dobře toho řešení funguje na [Diskusi JPW](http://diskuse.jakpsatweb.cz).

### Prázdné pole

Další možnost, kterou lze navíc kombinovat s předchozí, je využívat toho, že **spambot vyplní všechna možná pole**. Při vytváření formuláře tedy připravíme návnadu s popiskem „Nevyplňujte“, kterou přes CSS skryjeme:

```
&lt;label style="display: none">Nevyplňujte &lt;input type="text" name="url">&lt;/label>
```

### Spam ve známých diskusních fórech a redakčních systémech

Ačkoliv výše uvedená řešení jsou hodně účinná. V případě používání **populárních redakčních systémů** třetích stran (Wordpress, phpBB apod.) je taková ochrana **neúčinná**.

Není problém robota uzpůsobit těmto ochranám. A u masově používaných systémů se to **tvůrci spambota vyplatí**. Proto je nutné použít další praktiky, ovšem vždy je dobré myslet na to, **aby ochrana neobtěžovala návštěvníky**. Nebo jim dokonce zabránila přispívat.

### Otázka bez vyplnění JavaScriptem

Proti spamovacím robotům je i u známých systémů účinná otázka, která se ale **nepředvyplní** skriptem, **nebude tedy možné získat odpověď** ze zdrojového kódu stránky.

**Příklad**: *Kolik je pět krát pět?*

Odpověď se potom opět kontroluje na straně serveru. Je vhodné volit takovou otázku, aby na ní teoreticky nemohl robot odpovědět vrácením **prvního výsledku z Googlu**.

Otázek může být několik a náhodně se střídat. V takovém případě se do formuláře přidá skryté pole s identifikátorem otázky/odpovědi, podle kterého se provede kontrola. Vhodné je provést **zjednodušení** odpovědi, tj. převést na malá písmena, odstranit diakritiku a mezery nebo tečku na konci. [Hotové řešení](https://github.com/Jahoda/otazka-proti-spamu).

### Opsání kódu z obrázku

Často je k vidění ochrana, kterou obstarává **obrázková CAPTCHA**. Osobně toto řešení nemám moc rád, protože je značně obtěžující a skutečný člověk má často větší **problém s rozluštěním** něž robot.

Zvlášť iritující je, když špatné opsání obrázku způsobí **zahození obsahu formuláře** a nezbývá než vyplňovat znovu.

### Alternativa k opisování textu

Jelikož opisování textu z obrázku bývá často obtížnější pro živého člověka než pro robota, existují varianty, které fungují jinak.

    - [Google reCAPTCHA](/recaptcha) – sleduje chování uživatele během vyplňování formuláře

    - [RoCaptcha](http://rocaptcha.com) – pro úspěšné splnění je třeba otočit obrázek do přímé polohy

### Kontrola IP adresy

U českého webu se většina spamu objevuje z nečeských IP adres. Toto můžeme detekovat ([řešení v PHP](https://github.com/maxmind/GeoIP2-php)) a v takovém případě registraci / přidání komentáře požadovat trochu otravnější kontrolu. Třeba výše zmíněnou **kontrolní otázku** (bez JS vyplnění) nebo **obrázkovou CAPTCHU**.

## Spamující lidé

Úplně nová situace nastává v okamžiku, kdy začnou spamovat skuteční lidé. Ty těžko výše uvedené kontroly zastaví.

Ani **zabanování IP adresy** není vše spásné řešení, protože spammer může přijít přes [proxy](/php-proxy).

### Cizojazyční spammeři

Občas masivně ručně spamují cizinci. V takovém případě je někdy řešení **odříznou celý rozsah IP adres**. Nebo v případě českého webu vymyslet nějaký test, kterým **cizinec neprojde**. To je při dnešních schopnostech **online překladačů** a **vyhledávačů textu i obrázků** dost obtížné.

Nicméně obrázek Karla Gotta proti [spamujícím Bangladéšanům](http://blog.havrlant.cz/post/50675743993/jak-jsme-bojovali-proti-spamujicim-bangladesanum) snad zatím stačí.

### Domácí spammeři

U českých spammerů je situace úplně nejtěžší a v podstatě rozumně neřešitelná. Lze ale škůdcům házet klacky pod nohy, bohužel většinou i slušným návštěvníkům.

  - **Zablokování IP adresy** — lze obejít přes proxy, může postihnout i slušného návštěvníka se stejnou IP.

  - **Blokování slov / URL** — když spammerovi zablokujeme vložení slov, která se nacházejí v odkazech na jeho weby, ztratí pro něj spamování smysl. Bohužel může využít v podstatě nekonečnou zásobu **zkracovačů adres**. Teoreticky by šlo dohledat případné HTTP přesměrování, ale při přesměrování JavaScriptem nebo `&lt;meta refresh>` značkou už to bude značně obtížné.

  - **Registrace/přihlášení přes Facebook, Twitter, Google** — budeme-li vyžadovat pro vkládání obsahu registraci účtem třetích stran, dost to spammerovi znesnadníme. Pro nový účet bude potřebovat identitu z některé výše uvedené služby, což je relativně pracné. Problém je, že takto odřízneme i neškodící uživatele, které zmíněné služby nechtějí používat.

  - **Ověření dopisem** — ještě extrémnější varianta předchozího. Zašle se zájemci o registraci na zadanou adresu dopis s aktivačním kódem. Odradí značné množství slušných návštěvníků. Navíc to něco to stojí.

  - **Ověření SMS zprávou** — není tolik otravné jako dopis a někdy ani tolik jako registrace na sociálních sítích. Získávat stále nová čísla je pro spammera docela pracné.

  - **Registrace na doporučení / ruční schvalování** — nový člověk se může registrovat, jen když ho někdo ze stávajících uživatelů pozve/doporučí/schválí.

  - **Moderování diskuse/komentářů** — ideální je, když častí účastníci diskuse mají oprávnění k likvidaci spamu. Pokud moderátoři konají rychle, spammera to zpravidla přestane bavit. Je vhodné, aby bylo snazší **spam vymazat** než **nový spam vytvořit**.

  - **Uživatelské úrovně** — první příspěvek musí někdo ručně schválit, tím se uživatel stane důvěryhodným a další příspěvky se zobrazují rovnou. Schvalování může být případně jen u příspěvků obsahující odkazy.

  - **Časový limit pro nové příspěvky** — v závislosti na počtu příspěvků, které člověk zaslal, má určitou minimální prodlevu mezi příspěvky. Tedy zpočátku musí po vložení komentáře čekat několik desítek minut nebo několik hodin, aby mohl přispět znovu. Není tak možné stránku hromadně zaspamovat, ale celkem to brání vstupu nových lidí do diskuse, protože je prodleva po první zprávě odradí.