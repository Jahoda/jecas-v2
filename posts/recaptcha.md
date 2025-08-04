---
title: "Nová Google reCAPTCHA"
headline: "Nová Google reCAPTCHA"
description: "Google vytvořil novou podobu nástroje chránícího před roboty reCAPTCHA."
date: "2014-12-10"
last_modification: "2014-12-10"
status: 1
tags: ["Google", "Spam"]
---

U rozšířených systémů je poměrně složité se [bránit proti spamu](/spam). Jednoduché ochrany **vyžadující JavaScript** nebo řešení typu vytvoření **speciálního lákavého políčka**, které uživatel nesmí vyplnit, ale robot se nachytá, sice u **méně významných webů** fungují poměrně spolehlivě.

U větších služeb, kde se už vyplatí **hromadný útok**, je ale taková ochrana nedostatečná. Proto se zpravidla používají různé **obrázky** obsahující slova nebo čísla a je vyžadováno, aby je uživatel rozluštil – tzv. **obrázková CAPTCHA**.

S tou ale mají postupem času větší problém **uživatelé** než roboti.

## No CAPTCHA reCAPTCHA

Google se nyní pokusil vytvořit řešení, které by mělo dokázat ověřit, že člověk **není robot**, pomocí kliknutí do políčka *Nejsem robot*.

    - [Google reCAPTCHA](https://www.google.com/recaptcha/)

## Použití na stránce

    Správce webu si do reCAPTCHA systému **přidá svou doménu**, čímž získá veřejný klíč stránky (*Site key*) a tajný klíč (*Secret key*).

          Google reCAPTCHA: [Register a new site](https://www.google.com/recaptcha/admin)

    Na stránku se **připojí skript** od Google:

    ```
&lt;script src='https://www.google.com/recaptcha/api.js'>&lt;/script>
```

    Na požadovaném místě formuláře se **vykreslí políčko** pro ověření.

    ```
&lt;div class="g-recaptcha" data-sitekey="**klíč stránky**">&lt;/div>
```

    Při ověření, že člověk není robot, se vyplní formulářový prvek `g-recaptcha-response`, který se následně běžným odesláním formuláře **odešle na server**.

    Na straně serveru se při zpracování zavolá stránka, které se přidá tajný klíč (*Secret key*) a hodnota políčka `g-recaptcha-response`.

    ```
https://www.google.com/recaptcha/api/siteverify?secret=**tajný klíč**&amp;response=**obsah políčka**
```

    Výsledkem je potom objekt v **[JSONu](/json) se stavem ověření** (více v [dokumentaci](https://developers.google.com/recaptcha/docs/verify)).

    ```
{
  "success": true|false,
  "error-codes": [...]   // optional
}
```

    Na základě toho **ve své aplikaci** určíme, jestli se jedná o robota nebo ne.

[Živá ukázka](http://kod.djpw.cz/rmib)

## Jak to funguje

Celé **rozhodování robot/uživatel** funguje na základě **sledování chování uživatele** na stránce. Pomocí JavaScriptu je možné získat spoustu informací o prohlížeči, rozlišení a podobně, navíc potom sledovat každý **pohyb myši nebo mačkání kláves**.

Kromě toho může **Google** použít informace, co o daném návštěvníkovi má z jiných svých služeb.

Skript od Google tedy **šmíruje uživatele** a při kliknutí na *Nejsem robot* tato data pošle k ověření na svůj server. Odpověď ze serveru Google se přidá do formuláře na stránce, z něho se odešle na server dané aplikace, odkud se pošle na server Google k ověření.

## Možná úskalí

    Jako vždy – vložením cizího skriptu získává jeho majitel nad stránkou **obrovskou moc**.

    Uživatelé přihlášení ke svému **Google účtu** budou na webu používající reCAPTCHA ochranu **automaticky identifikovatelní** (podobně jako tomu je u Facebooku a jeho *Like* boxů a tlačítek).

    Při **nerozpoznání** uživatele se stále zobrazí nečitelná **změť znaků**.

    Proto by nasazení **reCAPTCHA** mělo nastat až v případě, kdy selžou pro uživatele přívětivější metody.

    **Spolehlivost ochrany** před roboty na základě monitorování chování na stránce je diskutabilní. Je nejspíš jen otázkou času, kdy se roboti dokáží při vyplňování chovat více „jako člověk“ než živí návštěvníci.

## Mobilní zařízení

Na mobilních zařízeních není možné **monitorovat pohyby kursorem**, takže zde opisování textu nahrazuje určování zvířat.