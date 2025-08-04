---
title: "Obchod"
headline: "Obchod"
description: "Nabízím k prodeji hotové ukázky a jejich nasazení na váš web."
date: "2014-08-05"
last_modification: "2014-08-05"
status: 0
tags: []
---

Chcete mít na svých stránkách zde uvedená řešení a nechcete tím **ztrácet čas** nebo se vlastnoručně **trápit spoustu hodin** s nejistým výsledkem? **Udělám to za vás**.

Běžná doba vyhotovení je **do 2 dní**.

    Do košíku
    ## Fixní boční banner

    890 Kč

      Skript zajišťuje **zafixování** postranního panelu při odrolování a následné *zaseknutí* o patičku / jiný blok.

      Vhodné pro **reklamní bannery**, důležité informace na stránce a podobně.

    Do košíku
    ## Přepínání záložek

    590 Kč

      Přepínání obsahu pomocí *karet* s možností na jednotlivé části odkázat.

    Do košíku    
    ## Lightboxová galerie

    690 Kč

      Vytvoření obrázkové galeriie pomocí lightboxu.

    Do košíku
    ## Odkrývání textu

    390 Kč

      Dynamické rozklikávání textu.

    Do košíku
    ## Živý tutorial na webu

    890 Kč

      Potřebujete vytvořit pro návštěvníky **průvodce** jednotlivými části webu/aplikace?

      Nabízím hotové řešení, které je snadno upravitelné.

    Do košíku
    ## Odpočítávání

    390 Kč

      Dynamické odpočítávání typu „proběhne za X dní / hodin / minut“.

      Plně přizpůsobené pro české stránky včetně **správného skloňování**.

    Do košíku
    ## Efektní tooltip

    390 Kč

      Efektní popisek po najetí myši na daný element.

      Může obsahovat i HTML značky, obrázky a podobně.

    Do košíku
    ## Sdílení na sociálních sítích

    290 Kč

      Vložení tlačítek pro sdílení na nejznámnějších sociálních sítích.

        - Facebook

        - Twitter

        - Google Plus

## Jak to funguje?

  - Sdělíte mi adresu webu, **přístup k FTP** a já provedu změny.

  - **Nechcete-li sdělovat údaje k FTP**, připravím okomentovanou funkční ukázku **na základě vaší stránky**, kde bude popsáno, co se má kam vložit.

## Doba vyhotovení

Standardní doba vyhotovení je **do 48 hodin**. V případě **nadstandarních úprav** se může prodloužit.

      ## Dokončit objednávku

          Váš email
                    
          *Zadejte email, kam vám mohu odepsat.*

          Zpráva
          
          *Komentář k objednávce.*

        Odeslat objednávku
          [Zrušit](javascript:Obchod.prepnoutDokoncit();//Zrušit)

    ## Košík

      *(košík je prázdný)* 
 Potřebujete-li něco, co tu není,
 napište mi.

      Objednat za ? Kč

        Bohumil Jahoda (k disposici)
 
        IČ: 02649497

        *[jahoda&#064;jecas.cz](mailto:jahoda&#064;jecas.cz)*

Obchod.init(document.getElementById("produkty"), document.getElementById("kosik"));

.produkt .ukazka {
    position: relative;
    min-height: 150px;
    background: #fff;
    display: inline-block;
    border: 1px solid #ccc;
    padding: 5px;
    cursor: pointer
}

.produkt .ukazka a {
    position: absolute;
    content: " ►";
    background: rgba(0, 0, 0, .4);
    top: 50%;
    left: 50%;
    width: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 50%;
    margin: -25px;
    font-size: 20px;
    transition: all .2s;
    box-shadow: 0px 0px 5px 0px #fff;
    border: 0;
    color: #fff
}

.produkt .ukazka img {
    border: 0
}

.ukazka:hover a {
    background: #000;
    color: #fff;
    width: 70px;
    height: 70px;
    margin: -35px;
    line-height: 70px;
    font-size: 30px;
}

.obal-formulare[data-zobrazit] .formular {
    animation: pruhlednost 1s linear;
}

.obal-formulare[data-zobrazit] {
    display: block;
}

.obal-formulare {
    display: none;
    position: absolute;
    right: 100%;
    top: 0;
    width: 315px;
}

.formular {
    text-align: center;
    width: 315px;
    background: #fff;
    position: fixed;
    font-family: Segoe UI, sans-serif;
}

.formular .hlaska {
    background: #F9F16A;
    border: 1px solid #DECE0C;
    padding: .5em;
    display: none;
}

.formular .hlaska[data-zobrazit] {
    display: block;
}

.formular input, .formular textarea, .formular label {
    width: 100%;
    display: block;
    padding: .8em;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-width: 1px 0;
}

.formular label {
    background: #efefef;
    border-bottom: 0;
    font-weight: bold;
    padding: .2em;
    text-align: center;
    cursor: pointer;
}

.polozka b {
    padding: 0 .4em;
    display: inline-block;
    margin-left: .5em;
    float: right;
}

.polozky .polozka:hover b {
    background: #333;
    color: #fff;
}

.kosik > div .cena {
    background-image: none;
    padding: 0 .3em;
    margin-right: .5em
}

.polozky > .polozka {
    cursor: pointer;
    border-bottom: 1px solid #ccc;
    padding: .2em;
}

.polozka:first-child {
    border-top: 1px solid #ccc;
}

.polozky > div:hover {
    background: #F9EEA2
}

.polozky > .polozka.celkem {
    border-bottom: 1px solid #000;
    border-top: 1px solid #000;
}

.kosik .nabidka {
    display: block;
}

.kosik-obal {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    margin-left: 1em;
}

.kosik h2, .formular h2 {
    margin: .5em;
    text-align: center;
}

.kosik, .formular {
    box-shadow: 0px 0px 11px 0px #7f7f7f;
    position: fixed;
    width: 300px;
    background: #fff;
}

.toc-content, #nabidka {
    display: none !important;
}

.produkt[data-vybrano] {
    background: #96F991;
    border-color: #18800D;
}

.produkt[data-vybrano] > button {
    background-color: #FE5A5A;
    width: 11em;
}

.produkt[data-vybrano] > button:hover {
    background-color: #FE2525;
}

.produkt > button {
    transition: background-color, width .3s;

    position: relative;
    right: -1px;
    top: -1px;
    margin: 0;
}

.produkt h2 {
    margin: 0;
}

.produkty .cena, .kosik .cena {
    background: red url('files/obchod/tag.png') 5px center no-repeat;
    color: #fff;
    display: inline-block;
    padding: 0 .5em;
    padding-left: 2em;
    font-weight: bold;
    font-family: Consolas, Courier, monospace;
}

.produkt {
    transition: background-color .5s;
    background: #efefef;
    border: 1px solid #ccc;
    padding: 1em;
    padding-bottom: 0;
    position: relative;
    margin-bottom: 1em;
}

.produkt > button, .celkem button, .formular button {
    background: #20A811 url('/files/obchod/shop.png') no-repeat 10px center;
    padding: .7em 1.5em .7em 4em;
    border-color: #18800D;
    font-size: 110%;
    font-weight: bold;
    float: right;
    transition: background .2s;
}

.produkt > button:hover {
    background-color: #18800D;
}

.celkem {
    text-align: center;
}

.celkem button, .formular button {
    float: none;
    display: block;
    background-image: none;
    padding: .7em;
    margin: 1em auto;
}

@media (max-width: 1020px) {
    .kosik, .formular, .obal-formulare, .kosik-obal {
        position: static;
    }
}

@media (max-width: 560px) {
    .produkt > button {
        font-size: 100%;
        width: auto;
    }
}

.meta, .obchod-box-obal {
    display: none;
}

.nabidka {
    border: 1px solid #33E83D;
    background: #72EF78;
    padding: 0 .6em;
    display: none;
    font-size: 90%;
    font-family: "Segoe UI"
}

.nabidka ul, .nabidka li {
    margin: 0
}

.nabidka p {
    margin: .5em 0
}

.nabidka {
    line-height: 140%
}

.nabidka img {
    width: 50px;
    border-radius: 50%;
    float: left;
    margin-right: 1em;
}

.nabidka img + p {
    margin-bottom: 1.2em
}

/* odkaz na obchod */
@media (min-width: 910px) {
    .homepage-cover .search {
        float: none;
    }

    .homepage-cover ~ .obchod-box-obal {
        display: none;
    }

    .homepage-cover ~ .obchod-box-obal .obchod-box {
        position: static;
        padding-top: 1px;
    }

    .content {
        position: relative;
    }

    .obchod-box-obal {
        position: absolute;
        bottom: -.81em;
        right: 0;
        width: 200px;
    }

    .obchod-box p a {
        color: #8ECCF0;
        text-decoration: underline;
    }

    .obchod-box {
        width: 200px;
        position: fixed;
        background: #8ECCF0;
        bottom: .1em;
        color: #000;
        font-family: segoe ui, sans-serif;
        text-align: center;
        cursor: pointer;
    }

    .obchod-box p {
        padding: 0;
    }

    .obchod-box .button {
        background: #98F38D url('/files/obchod/shop_cart.png') no-repeat 10px center;
        color: #20A811;
        padding: .7em 0 .7em 2.2em;
        margin: 0 auto;
        display: block;
        width: 200px;
        border-color: #20A811;
        font-size: 110%;
        font-weight: bold;
        transition: background .2s;
        box-sizing: border-box;
        border: 0;
    }

    .obchod-box .cena {
        background: red url('/files/obchod/tag.png') 5px center no-repeat;
        color: #fff;
        display: inline-block;
        padding: 0 .5em;
        padding-left: 1.7em;
        font-weight: bold;
        font-family: Consolas, Courier, monospace;
        font-size: 100%;
    }

    .obchod-box .button:hover {
        background-color: #20A811;
    }
}

/* objednávkové formuláře */

.formular .hlaska {
    background: #F9F16A;
    border: 1px solid #DECE0C;
    padding: .5em;
    display: none;
}

.formular .hlaska[data-zobrazit] {
    display: block;
}