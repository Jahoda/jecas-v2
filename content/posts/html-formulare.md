---
title: "Formulářové prvky v HTML"
headline: "Kompletní přehled formulářových prvků"
description: "Přehled všech formulářových prvků v HTML - od základních po pokročilé HTML 5 prvky s validací, experimentálními funkcemi a novinkami."
date: "2013-05-27"
last_modification: "2024-12-19"
status: 0
tags: []
format: "html"
---

<p>Formuláře jsou základním prvkem webových stránek pro komunikaci s uživateli. HTML poskytuje širokou škálu formulářových prvků - od základních textových polí po pokročilé HTML 5 prvky s automatickou validací a nativními ovládacími prvky.</p>

<h2 id="zakladni-prvky">Základní formulářové prvky</h2>

<h3>Text input</h3>
<p>Základní textové pole pro zadávání krátkých textů:</p>
<pre><code>&lt;input type="text" name="username" placeholder="Uživatelské jméno"&gt;</code></pre>

<div class="live">
<input type="text" name="username" placeholder="Uživatelské jméno">
</div>

<h3>Password input</h3>
<p>Pole pro zadávání hesel s maskovaným textem:</p>
<pre><code>&lt;input type="password" name="password" placeholder="Heslo"&gt;</code></pre>

<div class="live">
<input type="password" name="password" placeholder="Heslo">
</div>

<h3>Textarea</h3>
<p>Víceřádkové textové pole pro delší texty:</p>
<pre><code>&lt;textarea name="message" rows="4" cols="50" placeholder="Vaše zpráva..."&gt;&lt;/textarea&gt;</code></pre>

<div class="live">
<textarea name="message" rows="4" cols="50" placeholder="Vaše zpráva..."></textarea>
</div>

<h3>Select</h3>
<p>Rozbalovací seznam pro výběr z předdefinovaných možností:</p>
<pre><code>&lt;select name="country"&gt;
  &lt;option value=""&gt;Vyberte zemi&lt;/option&gt;
  &lt;option value="cz"&gt;Česká republika&lt;/option&gt;
  &lt;option value="sk"&gt;Slovensko&lt;/option&gt;
  &lt;option value="de"&gt;Německo&lt;/option&gt;
&lt;/select&gt;</code></pre>

<div class="live">
<select name="country">
  <option value="">Vyberte zemi</option>
  <option value="cz">Česká republika</option>
  <option value="sk">Slovensko</option>
  <option value="de">Německo</option>
</select>
</div>

<h3>Checkbox</h3>
<p>Zaškrtávací políčka pro výběr více možností:</p>
<pre><code>&lt;input type="checkbox" name="interests" value="sport" id="sport"&gt;
&lt;label for="sport"&gt;Sport&lt;/label&gt;
&lt;input type="checkbox" name="interests" value="music" id="music"&gt;
&lt;label for="music"&gt;Hudba&lt;/label&gt;</code></pre>

<div class="live">
<input type="checkbox" name="interests" value="sport" id="sport">
<label for="sport">Sport</label>
<input type="checkbox" name="interests" value="music" id="music">
<label for="music">Hudba</label>
</div>

<h3>Radio button</h3>
<p>Přepínače pro výběr jedné možnosti ze skupiny:</p>
<pre><code>&lt;input type="radio" name="gender" value="male" id="male"&gt;
&lt;label for="male"&gt;Muž&lt;/label&gt;
&lt;input type="radio" name="gender" value="female" id="female"&gt;
&lt;label for="female"&gt;Žena&lt;/label&gt;</code></pre>

<div class="live">
<input type="radio" name="gender" value="male" id="male">
<label for="male">Muž</label>
<input type="radio" name="gender" value="female" id="female">
<label for="female">Žena</label>
</div>

<h3>Button</h3>
<p>Tlačítka pro akce v formuláři:</p>
<pre><code>&lt;button type="submit"&gt;Odeslat&lt;/button&gt;
&lt;button type="reset"&gt;Vymazat&lt;/button&gt;
&lt;button type="button"&gt;Akce&lt;/button&gt;</code></pre>

<div class="live">
<button type="submit">Odeslat</button>
<button type="reset">Vymazat</button>
<button type="button">Akce</button>
</div>

<h2 id="dalsi-prvky">Další formulářové prvky</h2>

<h3>Hidden input</h3>
<p>Skryté pole pro předání dat, která uživatel nevidí:</p>
<pre><code>&lt;input type="hidden" name="session_id" value="abc123"&gt;</code></pre>

<h3>File input</h3>
<p>Pole pro nahrávání souborů:</p>
<pre><code>&lt;input type="file" name="upload" accept="image/*"&gt;</code></pre>

<div class="live">
<input type="file" name="upload" accept="image/*">
</div>

<h3>Image input</h3>
<p>Tlačítko ve formě obrázku:</p>
<pre><code>&lt;input type="image" src="submit-button.png" alt="Odeslat"&gt;</code></pre>

<h3>Reset input</h3>
<p>Tlačítko pro vymazání formuláře:</p>
<pre><code>&lt;input type="reset" value="Vymazat formulář"&gt;</code></pre>

<div class="live">
<input type="reset" value="Vymazat formulář">
</div>

<h3>Submit input</h3>
<p>Tlačítko pro odeslání formuláře:</p>
<pre><code>&lt;input type="submit" value="Odeslat"&gt;</code></pre>

<div class="live">
<input type="submit" value="Odeslat">
</div>

<h3>Multiple select</h3>
<p>Select s možností výběru více položek:</p>
<pre><code>&lt;select name="skills" multiple size="4"&gt;
  &lt;option value="html"&gt;HTML&lt;/option&gt;
  &lt;option value="css"&gt;CSS&lt;/option&gt;
  &lt;option value="js"&gt;JavaScript&lt;/option&gt;
  &lt;option value="php"&gt;PHP&lt;/option&gt;
&lt;/select&gt;</code></pre>

<div class="live">
<select name="skills" multiple size="4">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
  <option value="js">JavaScript</option>
  <option value="php">PHP</option>
</select>
</div>

<h3>Optgroup</h3>
<p>Seskupení možností v select elementu:</p>
<pre><code>&lt;select name="location"&gt;
  &lt;optgroup label="Evropa"&gt;
    &lt;option value="cz"&gt;Česká republika&lt;/option&gt;
    &lt;option value="de"&gt;Německo&lt;/option&gt;
  &lt;/optgroup&gt;
  &lt;optgroup label="Amerika"&gt;
    &lt;option value="us"&gt;USA&lt;/option&gt;
    &lt;option value="ca"&gt;Kanada&lt;/option&gt;
  &lt;/optgroup&gt;
&lt;/select&gt;</code></pre>

<div class="live">
<select name="location">
  <optgroup label="Evropa">
    <option value="cz">Česká republika</option>
    <option value="de">Německo</option>
  </optgroup>
  <optgroup label="Amerika">
    <option value="us">USA</option>
    <option value="ca">Kanada</option>
  </optgroup>
</select>
</div>

<h2 id="specialni-prvky">Speciální a méně známé prvky</h2>

<h3>Label</h3>
<p>Popisek pro formulářové prvky - zlepšuje přístupnost:</p>
<pre><code>&lt;label for="username"&gt;Uživatelské jméno:&lt;/label&gt;
&lt;input type="text" id="username" name="username"&gt;</code></pre>

<div class="live">
<label for="username">Uživatelské jméno:</label>
<input type="text" id="username" name="username">
</div>

<h3>Fieldset a Legend</h3>
<p>Seskupení souvisejících formulářových prvků:</p>
<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Kontaktní údaje&lt;/legend&gt;
  &lt;label&gt;Email: &lt;input type="email" name="email"&gt;&lt;/label&gt;
  &lt;label&gt;Telefon: &lt;input type="tel" name="phone"&gt;&lt;/label&gt;
&lt;/fieldset&gt;</code></pre>

<div class="live">
<fieldset>
  <legend>Kontaktní údaje</legend>
  <label>Email: <input type="email" name="email"></label>
  <label>Telefon: <input type="tel" name="phone"></label>
</fieldset>
</div>

<h3>Form</h3>
<p>Kontejner pro formulářové prvky:</p>
<pre><code>&lt;form action="/submit" method="post" enctype="multipart/form-data"&gt;
  &lt;!-- formulářové prvky --&gt;
&lt;/form&gt;</code></pre>

<h3>Input s různými typy</h3>
<p>Další méně používané typy input elementů:</p>

<h4>Week input</h4>
<pre><code>&lt;input type="week" name="vacation"&gt;</code></pre>
<div class="live">
<input type="week" name="vacation">
</div>

<h4>Month input</h4>
<pre><code>&lt;input type="month" name="birthmonth"&gt;</code></pre>
<div class="live">
<input type="month" name="birthmonth">
</div>

<h4>Datetime input</h4>
<pre><code>&lt;input type="datetime" name="event"&gt;</code></pre>
<div class="live">
<input type="datetime" name="event">
</div>

<h3>Output element</h3>
<p>Pro zobrazení výsledků výpočtů (již zmíněno dříve):</p>
<pre><code>&lt;form oninput="result.value = a.valueAsNumber + b.valueAsNumber"&gt;
  &lt;input type="number" id="a" value="0"&gt; +
  &lt;input type="number" id="b" value="0"&gt; =
  &lt;output for="a b" name="result"&gt;0&lt;/output&gt;
&lt;/form&gt;</code></pre>

<div class="live">
<form oninput="result.value = a.valueAsNumber + b.valueAsNumber">
  <input type="number" id="a" value="0"> +
  <input type="number" id="b" value="0"> =
  <output for="a b" name="result">0</output>
</form>
</div>

<h3>Progress a Meter</h3>
<p>Pro zobrazení průběhu a hodnot (již zmíněno dříve):</p>

<h4>Progress</h4>
<pre><code>&lt;progress value="70" max="100"&gt;70%&lt;/progress&gt;</code></pre>
<div class="live">
<progress value="70" max="100">70%</progress>
</div>

<h4>Meter</h4>
<pre><code>&lt;meter value="6" min="0" max="10"&gt;6 z 10&lt;/meter&gt;</code></pre>
<div class="live">
<meter value="6" min="0" max="10">6 z 10</meter>
</div>

<h3>Datalist</h3>
<p>Seznam možností pro input pole (již zmíněno dříve):</p>
<pre><code>&lt;input type="text" list="browsers"&gt;
&lt;datalist id="browsers"&gt;
  &lt;option value="Chrome"&gt;
  &lt;option value="Firefox"&gt;
  &lt;option value="Safari"&gt;
&lt;/datalist&gt;</code></pre>

<div class="live">
<input type="text" list="browsers" placeholder="Vyberte prohlížeč">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
</datalist>
</div>

<h2 id="historicke-prvky">Historické a zastaralé prvky</h2>

<h3>Keygen element</h3>
<p>Generátor kryptografických klíčů (zastaralý v HTML 5.2):</p>
<pre><code>&lt;keygen name="key" challenge="challenge-string"&gt;</code></pre>
<p><em>Poznámka: Tento prvek byl odstraněn z HTML specifikace kvůli bezpečnostním problémům.</em></p>

<h3>Isindex element</h3>
<p>Jednoduché vyhledávací pole (zastaralý):</p>
<pre><code>&lt;isindex prompt="Zadejte hledaný text:"&gt;</code></pre>
<p><em>Poznámka: Nahrazen moderními input elementy.</em></p>

<h3>Menu element</h3>
<p>Kontextové menu (původně pro formuláře, nyní jiné použití):</p>
<pre><code>&lt;menu type="context"&gt;
  &lt;menuitem label="Kopírovat"&gt;&lt;/menuitem&gt;
  &lt;menuitem label="Vložit"&gt;&lt;/menuitem&gt;
&lt;/menu&gt;</code></pre>

<h3>Input type="button" vs Button</h3>
<p>Historicky se používal input type="button" místo button elementu:</p>
<pre><code>&lt;!-- Zastaralý způsob --&gt;
&lt;input type="button" value="Klikni" onclick="alert('Ahoj')"&gt;

&lt;!-- Moderní způsob --&gt;
&lt;button type="button" onclick="alert('Ahoj')"&gt;Klikni&lt;/button&gt;</code></pre>

<div class="live">
<input type="button" value="Zastaralý způsob" onclick="alert('Zastaralý input button')">
<button type="button" onclick="alert('Moderní button')">Moderní způsob</button>
</div>

<h3>Input type="image"</h3>
<p>Historicky používaný pro grafická tlačítka:</p>
<pre><code>&lt;input type="image" src="submit.png" alt="Odeslat" name="submit"&gt;</code></pre>
<p><em>Poznámka: Stále funkční, ale doporučuje se používat button s CSS.</em></p>

<h3>Zastaralé atributy</h3>
<p>Některé atributy jsou dnes zastaralé:</p>

<h4>Align atribut</h4>
<pre><code>&lt;!-- Zastaralé --&gt;
&lt;input type="text" align="left"&gt;

&lt;!-- Moderní --&gt;
&lt;input type="text" style="text-align: left;"&gt;</code></pre>

<h4>Border atribut</h4>
<pre><code>&lt;!-- Zastaralé --&gt;
&lt;input type="text" border="1"&gt;

&lt;!-- Moderní --&gt;
&lt;input type="text" style="border: 1px solid #ccc;"&gt;</code></pre>

<h4>Size atribut pro input</h4>
<pre><code>&lt;!-- Zastaralé použití --&gt;
&lt;input type="text" size="20"&gt;

&lt;!-- Moderní --&gt;
&lt;input type="text" style="width: 200px;"&gt;</code></pre>

<h3>Historické form metody</h3>
<p>Některé způsoby odesílání formulářů jsou dnes zastaralé:</p>

<h4>GET s velkými daty</h4>
<pre><code>&lt;!-- Zastaralé pro velké formuláře --&gt;
&lt;form method="get" action="/search"&gt;
  &lt;textarea name="longtext"&gt;Velký text...&lt;/textarea&gt;
  &lt;input type="submit"&gt;
&lt;/form&gt;</code></pre>

<h4>Frames pro formuláře</h4>
<pre><code>&lt;!-- Zastaralé --&gt;
&lt;frameset rows="50%,50%"&gt;
  &lt;frame src="form.html"&gt;
  &lt;frame src="result.html"&gt;
&lt;/frameset&gt;</code></pre>

<h3>Netscape specifické prvky</h3>
<p>Historické prvky specifické pro Netscape Navigator:</p>
<pre><code>&lt;!-- Netscape specifické (již nepodporováno) --&gt;
&lt;input type="password" maxlength="8"&gt;
&lt;input type="text" wrap="soft"&gt;</code></pre>

<h3>IE specifické prvky</h3>
<p>Historické prvky specifické pro Internet Explorer:</p>
<pre><code>&lt;!-- IE specifické (již nepodporováno) --&gt;
&lt;input type="text" hidefocus="true"&gt;
&lt;input type="text" unselectable="on"&gt;</code></pre>

<h2 id="moderni-prvky">Moderní a experimentální prvky</h2>

<h3>Nové HTML 5.3 a experimentální prvky</h3>
<p>Nejnovější specifikace HTML přinášejí další pokročilé formulářové prvky a atributy:</p>

<h4>Input type="search" s pokročilými atributy</h4>
<p>Vyhledávací pole s experimentálními atributy (podporováno jen v některých prohlížečích):</p>
<pre><code>&lt;input type="search" name="q" results="10" autosave="search-history"&gt;</code></pre>
<div class="live">
<input type="search" name="q" placeholder="Vyhledat..." autosave="search-history">
</div>

<h4>Input type="file" s novými atributy</h4>
<p>Moderní file input s pokročilými možnostmi:</p>
<pre><code>&lt;input type="file" name="photos" accept="image/*" multiple capture="environment"&gt;</code></pre>
<div class="live">
<input type="file" name="photos" accept="image/*" multiple capture="environment">
</div>

<h4>Input s novými autocomplete hodnotami</h4>
<p>Rozšířené možnosti automatického doplňování podle specifikace WHATWG:</p>
<pre><code>&lt;input type="text" name="cc-number" autocomplete="cc-number"&gt;
&lt;input type="text" name="cc-name" autocomplete="cc-name"&gt;
&lt;input type="text" name="cc-exp" autocomplete="cc-exp"&gt;
&lt;input type="text" name="cc-csc" autocomplete="cc-csc"&gt;</code></pre>
<div class="live">
<input type="text" name="cc-number" autocomplete="cc-number" placeholder="Číslo karty">
<input type="text" name="cc-name" autocomplete="cc-name" placeholder="Jméno na kartě">
<input type="text" name="cc-exp" autocomplete="cc-exp" placeholder="MM/RR">
<input type="text" name="cc-csc" autocomplete="cc-csc" placeholder="CVC">
</div>

<h4>Input s novými inputmode hodnotami</h4>
<p>Rozšířené módy klávesnice pro lepší UX na mobilních zařízeních:</p>
<pre><code>&lt;input type="text" name="decimal" inputmode="decimal" placeholder="Desetinné číslo"&gt;
&lt;input type="text" name="url" inputmode="url" placeholder="URL adresa"&gt;
&lt;input type="text" name="search" inputmode="search" placeholder="Vyhledávání"&gt;</code></pre>
<div class="live">
<input type="text" name="decimal" inputmode="decimal" placeholder="Desetinné číslo">
<input type="text" name="url" inputmode="url" placeholder="URL adresa">
<input type="text" name="search" inputmode="search" placeholder="Vyhledávání">
</div>

<h3>Skutečně experimentální prvky</h3>
<p>Tyto prvky jsou ve vývoji nebo mají omezenou podporu:</p>

<h4>Input type="search" s results atributem</h4>
<p>Atribut <code>results</code> pro vyhledávací pole (podporováno jen v některých prohlížečích):</p>
<pre><code>&lt;input type="search" name="q" results="10"&gt;</code></pre>
<div class="live">
<input type="search" name="q" results="10" placeholder="Vyhledat...">
</div>

<h4>Input type="file" s webkitdirectory</h4>
<p>Výběr celých složek (experimentální):</p>
<pre><code>&lt;input type="file" name="folder" webkitdirectory multiple&gt;</code></pre>
<div class="live">
<input type="file" name="folder" webkitdirectory multiple>
</div>

<h4>Input type="file" s capture</h4>
<p>Přímé zachycení z kamery/mikrofonu (experimentální):</p>
<pre><code>&lt;input type="file" name="photo" accept="image/*" capture="camera"&gt;</code></pre>
<div class="live">
<input type="file" name="photo" accept="image/*" capture="camera">
</div>

<h4>Form s autocomplete</h4>
<p>Pokročilé automatické doplňování (experimentální):</p>
<pre><code>&lt;form autocomplete="on"&gt;
  &lt;input type="text" name="name" autocomplete="name"&gt;
  &lt;input type="email" name="email" autocomplete="email"&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form autocomplete="on">
  <input type="text" name="name" autocomplete="name" placeholder="Jméno">
  <input type="email" name="email" autocomplete="email" placeholder="Email">
</form>
</div>

<h4>Input s datalist a pokročilými možnostmi</h4>
<p>Datalist s pokročilými atributy (experimentální):</p>
<pre><code>&lt;input type="text" name="city" list="cities" autocomplete="off"&gt;
&lt;datalist id="cities"&gt;
  &lt;option value="Praha" label="Hlavní město"&gt;
  &lt;option value="Brno" label="Morava"&gt;
  &lt;option value="Ostrava" label="Slezsko"&gt;
&lt;/datalist&gt;</code></pre>
<div class="live">
<input type="text" name="city" list="cities" autocomplete="off" placeholder="Zadejte město">
<datalist id="cities">
  <option value="Praha" label="Hlavní město">
  <option value="Brno" label="Morava">
  <option value="Ostrava" label="Slezsko">
</datalist>
</div>

<h4>Input s formaction a formmethod</h4>
<p>Pokročilé odesílání formulářů (experimentální):</p>
<pre><code>&lt;form id="myform"&gt;
  &lt;input type="text" name="data"&gt;
  &lt;input type="submit" value="Uložit" formaction="/save" formmethod="post"&gt;
  &lt;input type="submit" value="Odeslat" formaction="/send" formmethod="get"&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form id="myform">
  <input type="text" name="data" placeholder="Zadejte data">
  <input type="submit" value="Uložit" formaction="/save" formmethod="post">
  <input type="submit" value="Odeslat" formaction="/send" formmethod="get">
</form>
</div>

<h4>Input s formenctype</h4>
<p>Pokročilé kódování formulářů (experimentální):</p>
<pre><code>&lt;form id="uploadform"&gt;
  &lt;input type="text" name="title"&gt;
  &lt;input type="file" name="file"&gt;
  &lt;input type="submit" value="Upload" formenctype="multipart/form-data"&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form id="uploadform">
  <input type="text" name="title" placeholder="Název souboru">
  <input type="file" name="file">
  <input type="submit" value="Upload" formenctype="multipart/form-data">
</form>
</div>

<h4>Input s formtarget</h4>
<p>Pokročilé cílení formulářů (experimentální):</p>
<pre><code>&lt;form id="targetform"&gt;
  &lt;input type="text" name="data"&gt;
  &lt;input type="submit" value="Nové okno" formtarget="_blank"&gt;
  &lt;input type="submit" value="Stejné okno" formtarget="_self"&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form id="targetform">
  <input type="text" name="data" placeholder="Zadejte data">
  <input type="submit" value="Nové okno" formtarget="_blank">
  <input type="submit" value="Stejné okno" formtarget="_self">
</form>
</div>

<h4>Input s formnovalidate</h4>
<p>Vypnutí validace pro konkrétní tlačítka (experimentální):</p>
<pre><code>&lt;form id="validform"&gt;
  &lt;input type="email" name="email" required&gt;
  &lt;input type="submit" value="Odeslat"&gt;
  &lt;input type="submit" value="Uložit koncept" formnovalidate&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form id="validform">
  <input type="email" name="email" required placeholder="Email (povinný)">
  <input type="submit" value="Odeslat">
  <input type="submit" value="Uložit koncept" formnovalidate>
</form>
</div>

<h4>Input s form</h4>
<p>Připojení inputu k formuláři mimo form element (experimentální):</p>
<pre><code>&lt;form id="externalform"&gt;
  &lt;input type="text" name="name"&gt;
  &lt;input type="submit"&gt;
&lt;/form&gt;

&lt;input type="email" name="email" form="externalform"&gt;</code></pre>
<div class="live">
<form id="externalform">
  <input type="text" name="name" placeholder="Jméno">
  <input type="submit">
</form>

<input type="email" name="email" form="externalform" placeholder="Email (mimo form)">
</div>

<h4>Input s inputmode</h4>
<p>Pokročilé módy klávesnice (experimentální):</p>
<pre><code>&lt;input type="text" name="phone" inputmode="tel" placeholder="Telefon"&gt;
&lt;input type="text" name="number" inputmode="numeric" placeholder="Číslo"&gt;
&lt;input type="text" name="email" inputmode="email" placeholder="Email"&gt;</code></pre>
<div class="live">
<input type="text" name="phone" inputmode="tel" placeholder="Telefon">
<input type="text" name="number" inputmode="numeric" placeholder="Číslo">
<input type="text" name="email" inputmode="email" placeholder="Email">
</div>

<h4>Input s enterkeyhint</h4>
<p>Pokročilé nápovědy pro Enter klávesu (experimentální):</p>
<pre><code>&lt;input type="text" name="search" enterkeyhint="search" placeholder="Vyhledat"&gt;
&lt;input type="text" name="next" enterkeyhint="next" placeholder="Další"&gt;
&lt;input type="text" name="done" enterkeyhint="done" placeholder="Hotovo"&gt;</code></pre>
<div class="live">
<input type="text" name="search" enterkeyhint="search" placeholder="Vyhledat">
<input type="text" name="next" enterkeyhint="next" placeholder="Další">
<input type="text" name="done" enterkeyhint="done" placeholder="Hotovo">
</div>

<h4>Input s dirname</h4>
<p>Pokročilé směrování textu (experimentální):</p>
<pre><code>&lt;input type="text" name="message" dirname="message.dir" placeholder="Zpráva"&gt;</code></pre>
<div class="live">
<input type="text" name="message" dirname="message.dir" placeholder="Zpráva">
</div>

<h4>Nové experimentální atributy pro validaci</h4>
<p>Pokročilé validace a omezení (experimentální podpora):</p>
<pre><code>&lt;input type="text" name="username" minlength="3" maxlength="20" 
       pattern="[a-zA-Z0-9_]+" title="Pouze písmena, číslice a podtržítka"&gt;
&lt;input type="number" name="price" min="0" max="9999.99" step="0.01"&gt;
&lt;input type="email" name="email" multiple placeholder="více emailů oddělených čárkou"&gt;</code></pre>
<div class="live">
<input type="text" name="username" minlength="3" maxlength="20" 
       pattern="[a-zA-Z0-9_]+" title="Pouze písmena, číslice a podtržítka" placeholder="Uživatelské jméno">
<input type="number" name="price" min="0" max="9999.99" step="0.01" placeholder="Cena">
<input type="email" name="email" multiple placeholder="více emailů oddělených čárkou">
</div>

<h4>Experimentální file input atributy</h4>
<p>Nové možnosti pro nahrávání souborů (omezená podpora):</p>
<pre><code>&lt;input type="file" name="documents" accept=".pdf,.doc,.docx" 
       webkitdirectory multiple&gt;
&lt;input type="file" name="camera" accept="image/*" capture="user"&gt;
&lt;input type="file" name="microphone" accept="audio/*" capture="microphone"&gt;</code></pre>
<div class="live">
<input type="file" name="documents" accept=".pdf,.doc,.docx" 
       webkitdirectory multiple>
<input type="file" name="camera" accept="image/*" capture="user">
<input type="file" name="microphone" accept="audio/*" capture="microphone">
</div>

<h4>Nové experimentální form atributy</h4>
<p>Pokročilé možnosti pro formuláře (experimentální):</p>
<pre><code>&lt;form autocomplete="on" novalidate&gt;
  &lt;input type="text" name="name" autocomplete="given-name"&gt;
  &lt;input type="text" name="surname" autocomplete="family-name"&gt;
  &lt;input type="email" name="email" autocomplete="email"&gt;
  &lt;input type="tel" name="phone" autocomplete="tel"&gt;
  &lt;input type="text" name="address" autocomplete="street-address"&gt;
  &lt;input type="text" name="city" autocomplete="address-level2"&gt;
  &lt;input type="text" name="zip" autocomplete="postal-code"&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form autocomplete="on" novalidate>
  <input type="text" name="name" autocomplete="given-name" placeholder="Jméno">
  <input type="text" name="surname" autocomplete="family-name" placeholder="Příjmení">
  <input type="email" name="email" autocomplete="email" placeholder="Email">
  <input type="tel" name="phone" autocomplete="tel" placeholder="Telefon">
  <input type="text" name="address" autocomplete="street-address" placeholder="Adresa">
  <input type="text" name="city" autocomplete="address-level2" placeholder="Město">
  <input type="text" name="zip" autocomplete="postal-code" placeholder="PSČ">
</form>
</div>

<h4>Input s list a pokročilými možnostmi</h4>
<p>Datalist s pokročilými atributy (experimentální):</p>
<pre><code>&lt;input type="range" name="volume" min="0" max="100" step="1" list="volumemarks"&gt;
&lt;datalist id="volumemarks"&gt;
  &lt;option value="0" label="0%"&gt;
  &lt;option value="25" label="25%"&gt;
  &lt;option value="50" label="50%"&gt;
  &lt;option value="75" label="75%"&gt;
  &lt;option value="100" label="100%"&gt;
&lt;/datalist&gt;</code></pre>
<div class="live">
<input type="range" name="volume" min="0" max="100" step="1" list="volumemarks">
<datalist id="volumemarks">
  <option value="0" label="0%">
  <option value="25" label="25%">
  <option value="50" label="50%">
  <option value="75" label="75%">
  <option value="100" label="100%">
</datalist>
</div>

<h3>Nejnovější experimentální funkce (2024+)</h3>
<p>Tyto funkce jsou ve vývoji nebo mají velmi omezenou podporu:</p>

<h4>Input type="datetime-local" s pokročilými možnostmi</h4>
<p>Rozšířené možnosti pro výběr data a času:</p>
<pre><code>&lt;input type="datetime-local" name="event" 
       min="2024-01-01T00:00" max="2024-12-31T23:59" 
       step="900"&gt;</code></pre>
<div class="live">
<input type="datetime-local" name="event" 
       min="2024-01-01T00:00" max="2024-12-31T23:59" 
       step="900">
</div>

<h4>Experimentální autocomplete hodnoty</h4>
<p>Nové hodnoty pro autocomplete atribut (experimentální):</p>
<pre><code>&lt;input type="text" name="organization" autocomplete="organization"&gt;
&lt;input type="text" name="organization-title" autocomplete="organization-title"&gt;
&lt;input type="text" name="bday" autocomplete="bday"&gt;
&lt;input type="text" name="sex" autocomplete="sex"&gt;
&lt;input type="text" name="url" autocomplete="url"&gt;</code></pre>
<div class="live">
<input type="text" name="organization" autocomplete="organization" placeholder="Organizace">
<input type="text" name="organization-title" autocomplete="organization-title" placeholder="Pozice">
<input type="text" name="bday" autocomplete="bday" placeholder="Datum narození">
<input type="text" name="sex" autocomplete="sex" placeholder="Pohlaví">
<input type="text" name="url" autocomplete="url" placeholder="Webová stránka">
</div>

<h4>Experimentální inputmode hodnoty</h4>
<p>Nové módy klávesnice (velmi omezená podpora):</p>
<pre><code>&lt;input type="text" name="none" inputmode="none" placeholder="Žádná klávesnice"&gt;
&lt;input type="text" name="text" inputmode="text" placeholder="Textová klávesnice"&gt;</code></pre>
<div class="live">
<input type="text" name="none" inputmode="none" placeholder="Žádná klávesnice">
<input type="text" name="text" inputmode="text" placeholder="Textová klávesnice">
</div>

<h4>Experimentální enterkeyhint hodnoty</h4>
<p>Nové nápovědy pro Enter klávesu (experimentální):</p>
<pre><code>&lt;input type="text" name="send" enterkeyhint="send" placeholder="Odeslat"&gt;
&lt;input type="text" name="go" enterkeyhint="go" placeholder="Jít"&gt;
&lt;input type="text" name="enter" enterkeyhint="enter" placeholder="Enter"&gt;
&lt;input type="text" name="previous" enterkeyhint="previous" placeholder="Předchozí"&gt;</code></pre>
<div class="live">
<input type="text" name="send" enterkeyhint="send" placeholder="Odeslat">
<input type="text" name="go" enterkeyhint="go" placeholder="Jít">
<input type="text" name="enter" enterkeyhint="enter" placeholder="Enter">
<input type="text" name="previous" enterkeyhint="previous" placeholder="Předchozí">
</div>

<h4>Experimentální form atributy</h4>
<p>Nové možnosti pro formuláře (experimentální):</p>
<pre><code>&lt;form autocomplete="on" spellcheck="true"&gt;
  &lt;input type="text" name="spellcheck" spellcheck="true"&gt;
  &lt;input type="text" name="no-spellcheck" spellcheck="false"&gt;
  &lt;textarea name="message" spellcheck="true"&gt;&lt;/textarea&gt;
&lt;/form&gt;</code></pre>
<div class="live">
<form autocomplete="on" spellcheck="true">
  <input type="text" name="spellcheck" spellcheck="true" placeholder="S kontrolou pravopisu">
  <input type="text" name="no-spellcheck" spellcheck="false" placeholder="Bez kontroly pravopisu">
  <textarea name="message" spellcheck="true" placeholder="Textarea s kontrolou pravopisu"></textarea>
</form>
</div>

<h3>Budoucí vývoj a experimentální prvky</h3>
<p>Tyto funkce jsou ve fázi návrhu nebo mají velmi omezenou podporu:</p>

<h4>Input type="datetime-local" s pokročilými omezeními</h4>
<p>Rozšířené možnosti pro časové vstupy:</p>
<pre><code>&lt;input type="datetime-local" name="meeting" 
       min="2024-01-01T09:00" max="2024-12-31T17:00" 
       step="1800"&gt;</code></pre>
<div class="live">
<input type="datetime-local" name="meeting" 
       min="2024-01-01T09:00" max="2024-12-31T17:00" 
       step="1800">
</div>

<h4>Experimentální input type="file" s novými možnostmi</h4>
<p>Pokročilé možnosti pro nahrávání souborů:</p>
<pre><code>&lt;input type="file" name="images" accept="image/*" 
       multiple capture="environment"&gt;
&lt;input type="file" name="audio" accept="audio/*" 
       capture="microphone"&gt;
&lt;input type="file" name="video" accept="video/*" 
       capture="camera"&gt;</code></pre>
<div class="live">
<input type="file" name="images" accept="image/*" 
       multiple capture="environment">
<input type="file" name="audio" accept="audio/*" 
       capture="microphone">
<input type="file" name="video" accept="video/*" 
       capture="camera">
</div>

<h4>Experimentální autocomplete pro platební údaje</h4>
<p>Rozšířené možnosti pro platební formuláře:</p>
<pre><code>&lt;input type="text" name="cc-number" autocomplete="cc-number"&gt;
&lt;input type="text" name="cc-name" autocomplete="cc-name"&gt;
&lt;input type="text" name="cc-exp-month" autocomplete="cc-exp-month"&gt;
&lt;input type="text" name="cc-exp-year" autocomplete="cc-exp-year"&gt;
&lt;input type="text" name="cc-csc" autocomplete="cc-csc"&gt;
&lt;input type="text" name="cc-type" autocomplete="cc-type"&gt;</code></pre>
<div class="live">
<input type="text" name="cc-number" autocomplete="cc-number" placeholder="Číslo karty">
<input type="text" name="cc-name" autocomplete="cc-name" placeholder="Jméno na kartě">
<input type="text" name="cc-exp-month" autocomplete="cc-exp-month" placeholder="Měsíc">
<input type="text" name="cc-exp-year" autocomplete="cc-exp-year" placeholder="Rok">
<input type="text" name="cc-csc" autocomplete="cc-csc" placeholder="CVC">
<input type="text" name="cc-type" autocomplete="cc-type" placeholder="Typ karty">
</div>

<h4>Experimentální inputmode pro speciální případy</h4>
<p>Nové módy klávesnice pro specifické použití:</p>
<pre><code>&lt;input type="text" name="none" inputmode="none" placeholder="Žádná klávesnice"&gt;
&lt;input type="text" name="text" inputmode="text" placeholder="Textová klávesnice"&gt;
&lt;input type="text" name="decimal" inputmode="decimal" placeholder="Desetinná čísla"&gt;
&lt;input type="text" name="numeric" inputmode="numeric" placeholder="Číslice"&gt;
&lt;input type="text" name="tel" inputmode="tel" placeholder="Telefon"&gt;
&lt;input type="text" name="search" inputmode="search" placeholder="Vyhledávání"&gt;
&lt;input type="text" name="email" inputmode="email" placeholder="Email"&gt;
&lt;input type="text" name="url" inputmode="url" placeholder="URL"&gt;</code></pre>
<div class="live">
<input type="text" name="none" inputmode="none" placeholder="Žádná klávesnice">
<input type="text" name="text" inputmode="text" placeholder="Textová klávesnice">
<input type="text" name="decimal" inputmode="decimal" placeholder="Desetinná čísla">
<input type="text" name="numeric" inputmode="numeric" placeholder="Číslice">
<input type="text" name="tel" inputmode="tel" placeholder="Telefon">
<input type="text" name="search" inputmode="search" placeholder="Vyhledávání">
<input type="text" name="email" inputmode="email" placeholder="Email">
<input type="text" name="url" inputmode="url" placeholder="URL">
</div>

<h4>Experimentální enterkeyhint pro různé akce</h4>
<p>Rozšířené nápovědy pro Enter klávesu:</p>
<pre><code>&lt;input type="text" name="enter" enterkeyhint="enter" placeholder="Enter"&gt;
&lt;input type="text" name="done" enterkeyhint="done" placeholder="Hotovo"&gt;
&lt;input type="text" name="go" enterkeyhint="go" placeholder="Jít"&gt;
&lt;input type="text" name="next" enterkeyhint="next" placeholder="Další"&gt;
&lt;input type="text" name="previous" enterkeyhint="previous" placeholder="Předchozí"&gt;
&lt;input type="text" name="search" enterkeyhint="search" placeholder="Vyhledat"&gt;
&lt;input type="text" name="send" enterkeyhint="send" placeholder="Odeslat"&gt;</code></pre>
<div class="live">
<input type="text" name="enter" enterkeyhint="enter" placeholder="Enter">
<input type="text" name="done" enterkeyhint="done" placeholder="Hotovo">
<input type="text" name="go" enterkeyhint="go" placeholder="Jít">
<input type="text" name="next" enterkeyhint="next" placeholder="Další">
<input type="text" name="previous" enterkeyhint="previous" placeholder="Předchozí">
<input type="text" name="search" enterkeyhint="search" placeholder="Vyhledat">
<input type="text" name="send" enterkeyhint="send" placeholder="Odeslat">
</div>

<h2 id="html5-prvky">HTML 5 formulářové prvky</h2>

<h3>Email input</h3>
<p>Pro zadávání emailových adres s automatickou validací:</p>
<pre><code>&lt;input type="email" name="email" placeholder="vas@email.cz"&gt;</code></pre>

<div class="live">
<input type="email" name="email" placeholder="vas@email.cz">
</div>

<h3>URL input</h3>
<p>Pro zadávání webových adres:</p>
<pre><code>&lt;input type="url" name="website" placeholder="https://example.com"&gt;</code></pre>

<div class="live">
<input type="url" name="website" placeholder="https://example.com">
</div>

<h3>Number input</h3>
<p>Pro zadávání čísel s možností nastavení rozsahu:</p>
<pre><code>&lt;input type="number" name="age" min="0" max="120" step="1"&gt;</code></pre>

<div class="live">
<input type="number" name="age" min="0" max="120" step="1" placeholder="Zadejte věk">
</div>

<h3>Range input</h3>
<p>Posuvník pro výběr hodnoty v určitém rozsahu:</p>
<pre><code>&lt;input type="range" name="volume" min="0" max="100" value="50"&gt;</code></pre>

<div class="live">
<script>
function updateRange(value) {
  document.getElementById('rangeValue').textContent = value;
}
</script>
<input type="range" name="volume" min="0" max="100" value="50" oninput="updateRange(this.value)"> Hodnota: <span id="rangeValue">50</span>
</div>

<h3>Date input</h3>
<p>Výběr data s nativním kalendářem:</p>
<pre><code>&lt;input type="date" name="birthdate"&gt;</code></pre>

<div class="live">
<input type="date" name="birthdate">
</div>

<h3>Time input</h3>
<p>Výběr času:</p>
<pre><code>&lt;input type="time" name="meeting-time"&gt;</code></pre>

<div class="live">
<input type="time" name="meeting-time">
</div>

<h3>Datetime-local input</h3>
<p>Výběr data a času:</p>
<pre><code>&lt;input type="datetime-local" name="event-datetime"&gt;</code></pre>

<div class="live">
<input type="datetime-local" name="event-datetime">
</div>

<h3>Color input</h3>
<p>Výběr barvy s nativním color pickerem:</p>
<pre><code>&lt;input type="color" name="theme-color"&gt;</code></pre>

<div class="live">
<script>
function updateColor(color) {
  document.getElementById('colorPreview').style.backgroundColor = color;
}
</script>
<input type="color" name="theme-color" value="#007bff" onchange="updateColor(this.value)"> <span id="colorPreview" style="display: inline-block; width: 20px; height: 20px; background-color: #007bff; border: 1px solid #000; vertical-align: middle;"></span>
</div>

<h3>Search input</h3>
<p>Vyhledávací pole s optimalizovaným chováním:</p>
<pre><code>&lt;input type="search" name="q" placeholder="Hledat..."&gt;</code></pre>

<div class="live">
<input type="search" name="q" placeholder="Hledat...">
</div>

<h3>Tel input</h3>
<p>Pro zadávání telefonních čísel (na mobilních zařízeních zobrazuje numerickou klávesnici):</p>
<pre><code>&lt;input type="tel" name="phone" pattern="[0-9]{9}"&gt;</code></pre>

<div class="live">
<input type="tel" name="phone" pattern="[0-9]{9}" placeholder="123456789">
</div>

<h2 id="validace">Validace formulářů</h2>

<p>HTML 5 poskytuje vestavěnou validaci pomocí různých atributů:</p>

<h3>Required atribut</h3>
<pre><code>&lt;input type="text" name="username" required&gt;</code></pre>

<div class="live">
<form onsubmit="alert('Formulář je validní!'); return false;">
<input type="text" name="username" required placeholder="Povinné pole"> 
<button type="submit">Odeslat</button>
</form>
</div>

<h3>Pattern atribut</h3>
<p>Pro validaci pomocí regulárních výrazů:</p>
<pre><code>&lt;input type="text" name="postal-code" pattern="[0-9]{5}" title="Zadejte 5místné PSČ"&gt;</code></pre>

<div class="live">
<form onsubmit="alert('PSČ je validní!'); return false;">
<input type="text" name="postal-code" pattern="[0-9]{5}" title="Zadejte 5místné PSČ" placeholder="12345"> 
<button type="submit">Odeslat</button>
</form>
</div>

<h3>Min/Max atributy</h3>
<pre><code>&lt;input type="number" name="age" min="18" max="65"&gt;</code></pre>

<div class="live">
<form onsubmit="alert('Věk je validní!'); return false;">
<input type="number" name="age" min="18" max="65" placeholder="18-65"> 
<button type="submit">Odeslat</button>
</form>
</div>

<h3>Minlength/Maxlength atributy</h3>
<pre><code>&lt;input type="text" name="description" minlength="10" maxlength="500"&gt;</code></pre>

<div class="live">
<form onsubmit="alert('Popis je validní!'); return false;">
<input type="text" name="description" minlength="10" maxlength="500" placeholder="Minimálně 10 znaků, maximálně 500"> 
<button type="submit">Odeslat</button>
</form>
</div>

<h2 id="datalist">Datalist element</h2>

<p>Umožňuje vytvořit seznam možností pro input pole:</p>

<pre><code>&lt;input type="text" name="country" list="countries"&gt;
&lt;datalist id="countries"&gt;
  &lt;option value="Česká republika"&gt;
  &lt;option value="Slovensko"&gt;
  &lt;option value="Polsko"&gt;
  &lt;option value="Německo"&gt;
&lt;/datalist&gt;</code></pre>

<div class="live">
<input type="text" name="country" list="countries" placeholder="Začněte psát název země...">
<datalist id="countries">
  <option value="Česká republika">
  <option value="Slovensko">
  <option value="Polsko">
  <option value="Německo">
  <option value="Rakousko">
  <option value="Francie">
  <option value="Itálie">
  <option value="Španělsko">
</datalist>
</div>

<h2 id="output">Output element</h2>

<p>Pro zobrazení výsledků výpočtů nebo jiných dynamických hodnot:</p>

<pre><code>&lt;form oninput="result.value = parseInt(a.value) + parseInt(b.value)"&gt;
  &lt;input type="number" id="a" value="0"&gt; +
  &lt;input type="number" id="b" value="0"&gt; =
  &lt;output name="result" for="a b"&gt;0&lt;/output&gt;
&lt;/form&gt;</code></pre>

<div class="live">
<form oninput="result.value = parseInt(a.value) + parseInt(b.value)">
  <input type="number" id="a" value="0"> + <input type="number" id="b" value="0"> = <output name="result" for="a b">0</output>
</form>
</div>

<h2 id="progress-meter">Progress a Meter elementy</h2>

<h3>Progress</h3>
<p>Pro zobrazení průběhu operace:</p>
<pre><code>&lt;progress value="70" max="100"&gt;70%&lt;/progress&gt;</code></pre>

<div class="live">
<progress value="70" max="100">70%</progress>
</div>

<h3>Meter</h3>
<p>Pro zobrazení hodnoty v určitém rozsahu:</p>
<pre><code>&lt;meter value="0.6" min="0" max="1" low="0.3" high="0.8" optimum="0.5"&gt;60%&lt;/meter&gt;</code></pre>

<div class="live">
<meter value="0.6" min="0" max="1" low="0.3" high="0.8" optimum="0.5">60%</meter>
</div>

<h2 id="fieldset-legend">Fieldset a Legend</h2>

<p>Pro logické seskupení formulářových prvků:</p>

<pre><code>&lt;fieldset&gt;
  &lt;legend&gt;Osobní údaje&lt;/legend&gt;
  &lt;label&gt;Jméno: &lt;input type="text" name="firstname"&gt;&lt;/label&gt;
  &lt;label&gt;Příjmení: &lt;input type="text" name="lastname"&gt;&lt;/label&gt;
&lt;/fieldset&gt;</code></pre>

<div class="live">
<fieldset>
  <legend>Osobní údaje</legend>
  <label>Jméno: <input type="text" name="firstname" placeholder="Vaše jméno"></label><br>
  <label>Příjmení: <input type="text" name="lastname" placeholder="Vaše příjmení"></label>
</fieldset>
</div>

<h2 id="practical-example">Praktický příklad</h2>

<p>Zde je kompletní příklad formuláře využívajícího HTML 5 prvky:</p>

<pre><code>&lt;form action="/submit" method="post" novalidate&gt;
  &lt;fieldset&gt;
    &lt;legend&gt;Registrace uživatele&lt;/legend&gt;
    
    &lt;label for="email"&gt;Email:&lt;/label&gt;
    &lt;input type="email" id="email" name="email" required&gt;
    
    &lt;label for="password"&gt;Heslo:&lt;/label&gt;
    &lt;input type="password" id="password" name="password" 
           minlength="8" required&gt;
    
    &lt;label for="age"&gt;Věk:&lt;/label&gt;
    &lt;input type="number" id="age" name="age" min="13" max="120"&gt;
    
    &lt;label for="birthdate"&gt;Datum narození:&lt;/label&gt;
    &lt;input type="date" id="birthdate" name="birthdate"&gt;
    
    &lt;label for="phone"&gt;Telefon:&lt;/label&gt;
    &lt;input type="tel" id="phone" name="phone" 
           pattern="[0-9]{9}" title="Zadejte 9místné číslo"&gt;
    
    &lt;label for="website"&gt;Webová stránka:&lt;/label&gt;
    &lt;input type="url" id="website" name="website"&gt;
    
    &lt;label for="country"&gt;Země:&lt;/label&gt;
    &lt;input type="text" id="country" name="country" list="countries"&gt;
    &lt;datalist id="countries"&gt;
      &lt;option value="Česká republika"&gt;
      &lt;option value="Slovensko"&gt;
      &lt;option value="Polsko"&gt;
      &lt;option value="Německo"&gt;
      &lt;option value="Rakousko"&gt;
    &lt;/datalist&gt;
    
    &lt;label for="experience"&gt;Zkušenosti (1-10):&lt;/label&gt;
    &lt;input type="range" id="experience" name="experience" 
           min="1" max="10" value="5"&gt;
    &lt;output for="experience"&gt;5&lt;/output&gt;
    
    &lt;label for="theme"&gt;Barva tématu:&lt;/label&gt;
    &lt;input type="color" id="theme" name="theme" value="#0000ff"&gt;
    
    &lt;button type="submit"&gt;Registrovat&lt;/button&gt;
  &lt;/fieldset&gt;
&lt;/form&gt;</code></pre>

<h2 id="browser-support">Podpora prohlížečů</h2>

<p>Nové HTML 5 formulářové prvky jsou podporovány ve všech moderních prohlížečích:</p>

<ul>
  <li><strong>Chrome:</strong> Plná podpora všech prvků</li>
  <li><strong>Firefox:</strong> Plná podpora všech prvků</li>
  <li><strong>Safari:</strong> Plná podpora všech prvků</li>
  <li><strong>Edge:</strong> Plná podpora všech prvků</li>
  <li><strong>Internet Explorer:</strong> Částečná podpora (IE 10+)</li>
</ul>

<p>Pro starší proglížeče je možné použít polyfilly nebo fallback řešení.</p>

<h3>Podpora experimentálních prvků</h3>
<p>Experimentální prvky mají různou úroveň podpory:</p>

<ul>
  <li><strong>Autocomplete atributy:</strong> Dobrá podpora ve všech moderních prohlížečích</li>
  <li><strong>Inputmode atributy:</strong> Dobrá podpora na mobilních zařízeních</li>
  <li><strong>Enterkeyhint atributy:</strong> Omezená podpora, hlavně na mobilních zařízeních</li>
  <li><strong>Capture atributy:</strong> Omezená podpora, závisí na zařízení</li>
  <li><strong>Webkitdirectory:</strong> Chrome a Safari, omezená podpora v ostatních</li>
  <li><strong>Spellcheck atributy:</strong> Dobrá podpora ve všech moderních prohlížečích</li>
</ul>

<h3>Budoucí vývoj</h3>
<p>Vývoj HTML formulářů pokračuje s novými návrhy:</p>

<ul>
  <li><strong>Input type="datetime-local" vylepšení:</strong> Lepší podpora pro různé časové zóny</li>
  <li><strong>Rozšířené autocomplete hodnoty:</strong> Nové možnosti pro automatické doplňování</li>
  <li><strong>Pokročilé validace:</strong> Nové způsoby validace formulářů</li>
  <li><strong>Mobilní optimalizace:</strong> Lepší podpora pro dotyková zařízení</li>
  <li><strong>Přístupnost:</strong> Vylepšená podpora pro asistivní technologie</li>
</ul>

<h2 id="css-styling">Stylování</h2>

<p>HTML 5 formulářové prvky lze stylovat pomocí CSS. Některé prohlížeče však mají vlastní styly, které je třeba resetovat:</p>

<pre><code>/* Resetování výchozích stylů */
input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;
}

/* Vlastní styly pro range input */
input[type="range"]::-webkit-slider-track {
  background: #ddd;
  height: 8px;
  border-radius: 4px;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  background: #007bff;
  height: 20px;
  width: 20px;
  border-radius: 50%;
}</code></pre>

<h2 id="javascript-enhancement">JavaScript rozšíření</h2>

<p>JavaScript lze použít pro pokročilou validaci a interaktivitu:</p>

<pre><code>// Validace formuláře
document.querySelector('form').addEventListener('submit', function(e) {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  
  if (!email.checkValidity()) {
    e.preventDefault();
    alert('Zadejte platný email');
    return;
  }
  
  if (password.value.length < 8) {
    e.preventDefault();
    alert('Heslo musí mít alespoň 8 znaků');
    return;
  }
});

// Dynamické aktualizování output elementu
document.getElementById('experience').addEventListener('input', function(e) {
  document.querySelector('output[for="experience"]').textContent = e.target.value;
});</code></pre>

<h2 id="accessibility">Přístupnost</h2>

<p>HTML 5 formulářové prvky poskytují lepší přístupnost:</p>

<ul>
  <li>Automatické označování chyb pro screen readery</li>
  <li>Lepší navigace pomocí klávesnice</li>
  <li>Nativní validace s hlasovým výstupem</li>
  <li>Semanticky správné značky</li>
</ul>

<p>Pro maximální přístupnost vždy používejte:</p>
<ul>
  <li>Elementy <code>&lt;label&gt;</code> pro všechny inputy</li>
  <li>Atribut <code>for</code> pro propojení labelu s inputem</li>
  <li>Významné <code>name</code> atributy</li>
  <li>Popisné <code>placeholder</code> texty</li>
</ul>

<h2 id="conclusion">Závěr</h2>

<p>HTML poskytuje bohatou sadu formulářových prvků pro vytváření interaktivních webových aplikací. Od základních textových polí po pokročilé HTML 5 prvky s automatickou validací - každý prvek má své specifické použití a výhody.</p>

<p>Klíčové výhody moderních formulářů:</p>
<ul>
  <li><strong>Lepší uživatelská zkušenost</strong> - nativní ovládací prvky a validace</li>
  <li><strong>Automatická validace</strong> - méně JavaScript kódu pro kontrolu dat</li>
  <li><strong>Mobilní optimalizace</strong> - správné klávesnice na mobilních zařízeních</li>
  <li><strong>Lepší přístupnost</strong> - semantické značky a screen readery</li>
  <li><strong>Flexibilita</strong> - kombinace základních a pokročilých prvků</li>
</ul>

<p>Pro nejlepší výsledky kombinujte základní HTML prvky s novými HTML 5 funkcemi a vždy myslete na přístupnost a uživatelskou zkušenost.</p>

<h2 id=zdroje>Zdroje a odkazy</h2>
<ol>
<li><a href='http://viget.com/inspire/making-infield-form-labels-suck-less'>Making Infield Form Labels Suck Less</a>, <a href='http://viget.com/inspire/making-infield-form-labels-suck-less-2'>pokračování</a>
  <li><a href="http://firstopinion.github.io/formatter.js/demos.html">Formátování čísla karty, telefonního čísla apod.</a></li>
  
  <li><a href="http://www.sitepoint.com/html5-forms-javascript-constraint-validation-api/">Validace HTML 5 formulářů</a></li>
  
  <li><a href="http://html5doctor.com/lets-talk-about-semantics/">HTML 5 značky</a></li>
  
</ol>

<img src="http://html5doctor.com/downloads/h5d-sectioning-flowchart.png" alt="">