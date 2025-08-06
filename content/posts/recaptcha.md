---
title: "Nová Google reCAPTCHA"
headline: "Nová Google reCAPTCHA"
description: "Google vytvořil novou podobu nástroje chránícího před roboty reCAPTCHA."
date: "2014-12-10"
last_modification: "2014-12-10"
status: 1
tags: ["google", "spam-ochrana"]
format: "html"
---

<p>U rozšířených systémů je poměrně složité se <a href="/spam">bránit proti spamu</a>. Jednoduché ochrany <b>vyžadující JavaScript</b> nebo řešení typu vytvoření <b>speciálního lákavého políčka</b>, které uživatel nesmí vyplnit, ale robot se nachytá, sice u <b>méně významných webů</b> fungují poměrně spolehlivě.</p>

<p>U větších služeb, kde se už vyplatí <b>hromadný útok</b>, je ale taková ochrana nedostatečná. Proto se zpravidla používají různé <b>obrázky</b> obsahující slova nebo čísla a je vyžadováno, aby je uživatel rozluštil – tzv. <b>obrázková CAPTCHA</b>.</p>

<p>S tou ale mají postupem času větší problém <b>uživatelé</b> než roboti.</p>





<h2 id="no-captcha">No CAPTCHA reCAPTCHA</h2>

<p><img src="/files/recaptcha/overeni.gif" alt="Ověření, že nejsem robot" class="border"></p>







<p>Google se nyní pokusil vytvořit řešení, které by mělo dokázat ověřit, že člověk <b>není robot</b>, pomocí kliknutí do políčka <i>Nejsem robot</i>.</p>

<div class="external-content">
  <ul>
    <li><a href="https://www.google.com/recaptcha/">Google reCAPTCHA</a></li>
  </ul>
</div>



<h2 id="pouziti">Použití na stránce</h2>

<ol>
  <li>
    <p>Správce webu si do reCAPTCHA systému <b>přidá svou doménu</b>, čímž získá veřejný klíč stránky (<i>Site key</i>) a tajný klíč (<i>Secret key</i>).</p>
    
    <div class="external-content">
      <ul>
        <li>
          <p>Google reCAPTCHA: <a href="https://www.google.com/recaptcha/admin">Register a new site</a></p>
        </li>
      </ul>
    </div>
  </li>
  
  <li>
    <p>Na stránku se <b>připojí skript</b> od Google:</p>
    
    <pre><code>&lt;script src='https://www.google.com/recaptcha/api.js'>&lt;/script></code></pre>
  </li>
  
  <li>
    <p>Na požadovaném místě formuláře se <b>vykreslí políčko</b> pro ověření.</p>
    
    <pre><code>&lt;div class="g-recaptcha" data-sitekey="<b>klíč stránky</b>">&lt;/div></code></pre>
  </li>
  
  <li>
    <p>Při ověření, že člověk není robot, se vyplní formulářový prvek <code>g-recaptcha-response</code>, který se následně běžným odesláním formuláře <b>odešle na server</b>.</p>
  </li>
  
  <li>
    <p>Na straně serveru se při zpracování zavolá stránka, které se přidá tajný klíč (<i>Secret key</i>) a hodnota políčka <code>g-recaptcha-response</code>.</p>
    
    <pre><code>https://www.google.com/recaptcha/api/siteverify?secret=<b>tajný klíč</b>&amp;response=<b>obsah políčka</b></code></pre>
    
    <p>Výsledkem je potom objekt v <b><a href="/json">JSONu</a> se stavem ověření</b> (více v <a href="https://developers.google.com/recaptcha/docs/verify">dokumentaci</a>).</p>
    
    <pre><code>{
  "success": true|false,
  "error-codes": [...]   // optional
}</code></pre>
    
    <p>Na základě toho <b>ve své aplikaci</b> určíme, jestli se jedná o robota nebo ne.</p>
  </li>
</ol>

<p><a href="https://kod.djpw.cz/rmib">Živá ukázka</a></p>



<h2 id="jak">Jak to funguje</h2>

<p>Celé <b>rozhodování robot/uživatel</b> funguje na základě <b>sledování chování uživatele</b> na stránce. Pomocí JavaScriptu je možné získat spoustu informací o prohlížeči, rozlišení a podobně, navíc potom sledovat každý <b>pohyb myši nebo mačkání kláves</b>.</p>

<p>Kromě toho může <b>Google</b> použít informace, co o daném návštěvníkovi má z jiných svých služeb.</p>

<p><img src="/files/recaptcha/nejsem-robot.png" alt="Nejsem robot" class="border"></p>







<p>Skript od Google tedy <b>šmíruje uživatele</b> a při kliknutí na <i>Nejsem robot</i> tato data pošle k ověření na svůj server. Odpověď ze serveru Google se přidá do formuláře na stránce, z něho se odešle na server dané aplikace, odkud se pošle na server Google k ověření.</p>

<p><img src="/files/recaptcha/diagram.png" alt="Postup ověřování robota/uživatele" class="border"></p>















<h2 id="uskali">Možná úskalí</h2>

<ol>
  <li>
    <p>Jako vždy – vložením cizího skriptu získává jeho majitel nad stránkou <b>obrovskou moc</b>.</p>
  </li>
  
  <li>
    <p>Uživatelé přihlášení ke svému <b>Google účtu</b> budou na webu používající reCAPTCHA ochranu <b>automaticky identifikovatelní</b> (podobně jako tomu je u Facebooku a jeho <i>Like</i> boxů a tlačítek).</p>
  </li>
  
  <li>
    <p>Při <b>nerozpoznání</b> uživatele se stále zobrazí nečitelná <b>změť znaků</b>.</p>
    
    <p><img src="/files/recaptcha/mozna-jsem.png" alt="Opisování nečitelných obrázků" class="border"></p>
    
    

    
    
    
    
    
    
    <p>Proto by nasazení <b>reCAPTCHA</b> mělo nastat až v případě, kdy selžou pro uživatele přívětivější metody.</p>
  </li>
  
  <li>
    <p><b>Spolehlivost ochrany</b> před roboty na základě monitorování chování na stránce je diskutabilní. Je nejspíš jen otázkou času, kdy se roboti dokáží při vyplňování chovat více „jako člověk“ než živí návštěvníci.</p>
  </li>
</ol>



<h2 id="mobily">Mobilní zařízení</h2>

<p>Na mobilních zařízeních není možné <b>monitorovat pohyby kursorem</b>, takže zde opisování textu nahrazuje určování zvířat.</p>

<p><img src="/files/recaptcha/cat-captcha.png" alt="Určování koček" class="border"></p>