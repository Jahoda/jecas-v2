---
title: "Všechny HTML značky"
headline: "Seznam všech HTML značek"
description: "Abecední seznam všech 144 HTML značek."
date: "2014-05-30"
last_modification: "2014-05-31"
status: 1
tags: ["HTML", "HTML značky"]
---

- [`&lt;a>`](/odkaz)

  - [`&lt;abbr>`](/dfn#abbr)

- `&lt;acronym>`

  - [`&lt;address>`](/adresa-mapa)

- `&lt;applet>`

- `&lt;area>`

  - [`&lt;article>`](/html-kostra#article)

  - [`&lt;aside>`](/html-kostra#aside)

- [`&lt;audio>`](/audio)

- `&lt;b>`

  - [`&lt;base>`](/base)

  - [`&lt;basefont>`](/font#basefont)

  - [`&lt;bdi>`](/zprava-doleva#bdi)

  - [`&lt;bdo>`](/zprava-doleva#bdo)

- [`&lt;bgsound>`](/audio#bgsound)

- `&lt;big>`

- `&lt;blink>`

  - [`&lt;blockquote>`](/citace#blockquote)

  - [`&lt;body>`](/html-kostra#body)

  - [`&lt;br>`](/odradkovani#br)

  - [`&lt;button>`](/button)

- [`&lt;canvas>`](/canvas)

- [`&lt;caption>`](/html-tabulky#caption)

- `&lt;center>`

  - [`&lt;cite>`](/citace#cite)

  - [`&lt;code>`](/vypis-kodu#code)

- [`&lt;col>`](/html-tabulky#col)

- [`&lt;colgroup>`](/html-tabulky#colgroup)

- `&lt;command>`

- `&lt;comment>`

- `&lt;content>`

  - [`&lt;data>`](/data)

  - [`&lt;datalist>`](/datalist)

  - [`&lt;dd>`](/seznamy#dd)

- `&lt;decorator>`

  - [`&lt;del>`](/s#rozdil)

  - [`&lt;details>`](/details)

  - [`&lt;dfn>`](/dfn)

  - [`&lt;dialog>`](/dialog)

  - [`&lt;dir>`](/seznamy#dir)

  - [`&lt;div>`](/div-span#div)

  - [`&lt;dl>`](/seznamy#dl)

  - [`&lt;dt>`](/seznamy#dt)

- `&lt;element>`

- `&lt;em>`

- `&lt;embed>`

- `&lt;fieldset>`

- `&lt;figcaption>`

- `&lt;figure>`

  - [`&lt;font>`](/font#font)

  - [`&lt;footer>`](/html-kostra#footer)

- `&lt;form>`

  - [`&lt;frame>`](/ramy#frameset)

  - [`&lt;frameset>`](/ramy#frameset)

  - [`&lt;h1>`](/nadpisy)

  - [`&lt;h2>`](/nadpisy)

  - [`&lt;h3>`](/nadpisy)

  - [`&lt;h4>`](/nadpisy)

  - [`&lt;h5>`](/nadpisy)

  - [`&lt;h6>`](/nadpisy)

  - [`&lt;head>`](/html-kostra#head)

  - [`&lt;header>`](/html-kostra#header)

  - [`&lt;hgroup>`](/nadpisy#hgroup)

- `&lt;hr>`

  - [`&lt;html>`](/html-kostra#html)

- `&lt;i>`

  - [`&lt;iframe>`](/ramy#iframe)

- `&lt;image>`

- `&lt;img>`

  - [`&lt;input>`](/input)

- `&lt;ins>`

- `&lt;isindex>`

- `&lt;kbd>`

- `&lt;keygen>`

  - [`&lt;label>`](/label-for)

- `&lt;legend>`

  - [`&lt;li>`](/seznamy#li)

- `&lt;link>`

  - [`&lt;listing>`](/vypis-kodu#listing)

  - [`&lt;main>`](/html-kostra#main)

- `&lt;map>`

  - [`&lt;mark>`](/mark)

- `&lt;marquee>`

  - [`&lt;menu>`](/seznamy#menu)

  - [`&lt;menuitem>`](/menuitem)

- `&lt;meta>`

  - [`&lt;meter>`](/meter)

  - [`&lt;nav>`](/html-kostra#nav)

- `&lt;nobr>`

  - [`&lt;noframes>`](/ramy#noframes)

- `&lt;noembed>`

  - [`&lt;noscript>`](/vypnuty-js#noscript)

- `&lt;object>`

  - [`&lt;ol>`](/seznamy#ol)

  - [`&lt;optgroup>`](/select)

  - [`&lt;option>`](/select)

  - [`&lt;output>`](/output)

  - [`&lt;p>`](/odstavec)

- `&lt;param>`

  - [`&lt;plaintext>`](/vypis-kodu#plaintext)

  - [`&lt;pre>`](/vypis-kodu#pre)

  - [`&lt;progress>`](/progress)

  - [`&lt;q>`](/citace#q)

  - [`&lt;rb>`](/ruby#rb)

  - [`&lt;rp>`](/ruby#rp)

  - [`&lt;rt>`](/ruby#rt)

  - [`&lt;rtc>`](/ruby#rtc)

  - [`&lt;ruby>`](/ruby)

  - [`&lt;s>`](/s)

  - [`&lt;samp>`](/vypis-kodu#samp)

- `&lt;script>`

  - [`&lt;section>`](/html-kostra#section)

  - [`&lt;select>`](/select)

- `&lt;shadow>`

- `&lt;small>`

- `&lt;source>`

- `&lt;spacer>`

  - [`&lt;span>`](/div-span#span)

- `&lt;strike>`

- `&lt;strong>`

  - [`&lt;style>`](/css-zaklady#style)

  - [`&lt;sub>`](/horni-dolni-index)

  - [`&lt;summary>`](/details)

  - [`&lt;sup>`](/horni-dolni-index)

  - [`&lt;svg>`](/svg)

- [`&lt;table>`](/html-tabulky#table)

- [`&lt;tbody>`](/html-tabulky#tbody)

- [`&lt;td>`](/html-tabulky#td)

  - [`&lt;template>`](/template)

  - [`&lt;textarea>`](/textarea)

- [`&lt;tfoot>`](/html-tabulky#tfoot)

- [`&lt;th>`](/html-tabulky#th)

- [`&lt;thead>`](/html-tabulky#thead)

  - [`&lt;time>`](/time)

  - [`&lt;title>`](/html-kostra#title)

- [`&lt;tr>`](/html-tabulky#tr)

- `&lt;track>`

  - [`&lt;tt>`](/vypis-kodu#tt)

- `&lt;u>`

  - [`&lt;ul>`](/seznamy#ul)

  - [`&lt;var>`](/vypis-kodu#var)

- `&lt;video>`

- `&lt;wbr>`

  - [`&lt;xmp>`](/vypis-kodu#xmp)

  var znacky = document.getElementById("znacky");
  vypis.innerHTML = "Popsáno je **" + znacky.getElementsByTagName("a").length + " značek**.";