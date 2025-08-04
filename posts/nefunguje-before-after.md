---
title: "Before a after u inputu"
headline: "Before a after u <code>&lt;input></code>u"
description: "Funguje, nebo nefunguje použití <code>:before</code> a <code>:after</code> u <code>&lt;input></code>ů?"
date: "2015-04-07"
last_modification: "2015-04-07"
status: 1
tags: ["CSS", "CSS selektory", "Formuláře"]
---

Tzv. pseudo-elementy `:before` a `:after` se hodí v situacích, kdy je potřeba vytvořit nějaký obsah bez úprav HTML kódu.

Této vlastnosti se hojně využívá při [kreslení pomocí CSS](/css-kresleni) / [CSS ikon](/css-ikony), kde se díky tomu z jediného HTML elementu dají vytvořit velké věci.

Využívat `:before` a `:after` se zdálo být nemožné u elementů, které „nemají obsah“. To je:

  - většina [nepárových značek](/html-znacky#koncova-zakazana) (`&lt;img>`, `&lt;br>`) – výjimka je většinou značka `&lt;hr>`,

  - formulářové prvky ([`&lt;input>`](/input), [`&lt;textarea>`](/textarea), [`&lt;select>`](/select))

## Pseudo-elementy u některých typů `&lt;input>`u

Se zajímavým zjištěním přišel **Pepa Linha** – prohlížeče vycházející z **Webkitu** (**Opera 15+**, **Chrome**, **Safari**) umí vykreslit pseudo-elementy u `&lt;input type=checkbox>`, `&lt;input type=radio>` nebo `&lt;input type=range>`.

To by při podpoře napříč prohlížeči byla užitečná věc, protože by šlo jednodušeji vytvářet vlastní styl přepínačů a zaškrtávacích políček.

    - [Pokročilé stylování checkboxu](/stylovani-checked)

Test `:after` u některých `&lt;input>`ů:

.live input:after
{
    content: "funguje";
    margin-left: 8em;
    padding: .2em;
    color: #fff;
    background: #000;
}

     checkbox

     radio

Pokud u políček výše ↑ funguje `:before`/`:after`, objeví se to vedle nich popis *funguje*.

Příklad pseudo-elementu u více HTML značek:

    - [Test pseudo-elementů u různých značek](http://kod.djpw.cz/afmb)

## Stará Opera

**Opera** do verse **12** umí pseudo-elementy u značky `&lt;br>` a naopak je neumí u vodorovné čáry `&lt;hr>`.

Víte ještě o nějakých výjimkách? Dejte mi prosím vědět do komentářů.