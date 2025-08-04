---
title: "CSS reset formulářů"
headline: "Formuláře a CSS reset"
description: "Dopad <code>* {margin: 0; padding: 0}</code> na formulářové prvky."
date: "2013-10-18"
last_modification: "2013-10-18"
status: 1
tags: ["CSS", "Formuláře", "Prohlížeče"]
---

V dávných dobách pramenilo z použití *hvězdičkového resetu* (`* {margin: 0; padding: 0}`) risiko, že se **nenávratně rozbije vzhled formulářových prvků** — hlavně ve smyslu **vertikálního zarovnání formulářových prvků vůči jejich popisku**.  V současných prohlížečích (**IE7+**) ale nebezpečí nejspíš nehrozí.

  .reset:hover #reset {left: .5em}
  fieldset {width: 40%; position: absolute; left: .5em; top: .5em}
  fieldset#reset {left: 45%; transition: .5s left; top: .5em}  
fieldset#reset * {margin: 0!important; padding: 0!important}

        Výchozí styly

         Položka

         Položka

         Položka

         Položka

         Položka

         Položka

         text
 
             text
 
             text
 
             text

                test 
             test

        * {margin: 0; padding: 0}

         Položka

         Položka

         Položka

         Položka

         Položka

         Položka

         text
 
             text
 
             text
 
             text

                test 
             test