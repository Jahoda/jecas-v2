---
title: "Generátor bezpečných hesel"
headline: "Generátor hesla online"
description: "Online generátor silných hesel. Vytvořte si bezpečné heslo s nastavitelnou délkou a znaky."
date: "2013-06-22"
last_modification: "2026-01-19"
status: 1
tags: ["hesla", "zabezpeceni", "hotova-reseni"]
format: "html"
---

<div class="live">
<style>
.password-generator {
  max-width: 500px;
}
.password-generator .password-output {
  font-family: monospace;
  font-size: 1.4em;
  padding: 1em;
  background: #1e293b;
  color: #22c55e;
  border-radius: 8px;
  word-break: break-all;
  min-height: 1.5em;
  margin: 1em 0;
  text-align: center;
  letter-spacing: 0.05em;
}
.password-generator .controls {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
.password-generator .mode-switch {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}
.password-generator .mode-switch button {
  padding: 0.5em 1em;
  border: 2px solid #334155;
  background: transparent;
  color: #94a3b8;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95em;
}
.password-generator .mode-switch button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: white;
}
.password-generator .mode-panel {
  display: none;
}
.password-generator .mode-panel.active {
  display: block;
}
.password-generator .length-control {
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
}
.password-generator .length-control input[type="range"] {
  flex: 1;
  min-width: 150px;
}
.password-generator .length-control input[type="number"] {
  width: 4em;
  text-align: center;
}
.password-generator .checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em 1.5em;
}
.password-generator .checkboxes label {
  display: flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;
}
.password-generator .separator-control {
  display: flex;
  align-items: center;
  gap: 1em;
  flex-wrap: wrap;
}
.password-generator .separator-control select {
  padding: 0.4em 0.8em;
  border-radius: 4px;
  border: 1px solid #334155;
}
.password-generator .buttons {
  display: flex;
  gap: 0.5em;
  flex-wrap: wrap;
}
.password-generator .buttons button {
  padding: 0.7em 1.2em;
  font-size: 1em;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.password-generator .btn-generate {
  background: #2563eb;
  color: white;
}
.password-generator .btn-generate:hover {
  background: #1d4ed8;
}
.password-generator .btn-copy {
  background: #059669;
  color: white;
}
.password-generator .btn-copy:hover {
  background: #047857;
}
.password-generator .btn-copy.copied {
  background: #22c55e;
}
.password-generator .strength-meter {
  margin-top: 1em;
}
.password-generator .strength-bar {
  height: 8px;
  background: #334155;
  border-radius: 4px;
  overflow: hidden;
  margin: 0.5em 0;
}
.password-generator .strength-fill {
  height: 100%;
  transition: width 0.3s, background 0.3s;
}
.password-generator .strength-text {
  font-size: 0.9em;
  display: flex;
  justify-content: space-between;
}
.password-generator .entropy {
  color: #94a3b8;
}
</style>

<form id="password-form" class="password-generator" onsubmit="return false">
  <h2 id="generator">Generátor hesla</h2>

  <p>Heslo se generuje <b>přímo v prohlížeči</b> pomocí kryptograficky bezpečného generátoru. Data se nikam neodesílají.</p>

  <div class="mode-switch">
    <button type="button" data-mode="random" class="active">Náhodné znaky</button>
    <button type="button" data-mode="passphrase">Passphrase (slova)</button>
  </div>

  <div class="password-output" id="password-output">Klikněte na Generovat</div>

  <div class="controls">
    <div class="mode-panel active" data-panel="random">
      <div class="length-control">
        <label for="password-length"><b>Délka:</b></label>
        <input type="range" id="password-length" name="length" min="4" max="64" value="16">
        <input type="number" id="password-length-num" min="4" max="128" value="16">
        <span>znaků</span>
      </div>

      <div class="checkboxes" style="margin-top: 1em;">
        <label><input type="checkbox" name="lowercase" checked> malá písmena (a-z)</label>
        <label><input type="checkbox" name="uppercase" checked> velká písmena (A-Z)</label>
        <label><input type="checkbox" name="numbers" checked> čísla (0–9)</label>
        <label><input type="checkbox" name="symbols" checked> speciální znaky (!@#…)</label>
      </div>
    </div>

    <div class="mode-panel" data-panel="passphrase">
      <div class="length-control">
        <label for="word-count"><b>Počet slov:</b></label>
        <input type="range" id="word-count" name="wordCount" min="3" max="10" value="4">
        <input type="number" id="word-count-num" min="3" max="12" value="4">
        <span>slov</span>
      </div>

      <div class="separator-control" style="margin-top: 1em;">
        <label for="separator"><b>Oddělovač:</b></label>
        <select id="separator" name="separator">
          <option value=" ">mezera</option>
          <option value="-" selected>pomlčka (-)</option>
          <option value="_">podtržítko (_)</option>
          <option value=".">tečka (.)</option>
          <option value="">bez oddělovače</option>
        </select>
      </div>

      <div class="checkboxes" style="margin-top: 1em;">
        <label><input type="checkbox" name="capitalize"> Velká počáteční písmena</label>
        <label><input type="checkbox" name="addNumber"> Přidat číslo</label>
      </div>
    </div>

    <div class="buttons">
      <button type="button" class="btn-generate" id="btn-generate">Generovat heslo</button>
      <button type="button" class="btn-copy" id="btn-copy">Kopírovat</button>
    </div>

    <div class="strength-meter">
      <div class="strength-bar">
        <div class="strength-fill" id="strength-fill"></div>
      </div>
      <div class="strength-text">
        <span id="strength-label">Síla hesla: –</span>
        <span class="entropy" id="entropy-text"></span>
      </div>
    </div>
  </div>
</form>

<script>
(function() {
  var form = document.getElementById('password-form');
  var output = document.getElementById('password-output');
  var lengthSlider = document.getElementById('password-length');
  var lengthNum = document.getElementById('password-length-num');
  var wordCountSlider = document.getElementById('word-count');
  var wordCountNum = document.getElementById('word-count-num');
  var btnGenerate = document.getElementById('btn-generate');
  var btnCopy = document.getElementById('btn-copy');
  var strengthFill = document.getElementById('strength-fill');
  var strengthLabel = document.getElementById('strength-label');
  var entropyText = document.getElementById('entropy-text');

  var currentMode = 'random';

  // Český slovník pro passphrase - 1024 běžných slov s diakritikou
  // Inspirováno českým BIP39 wordlistem, upraveno pro lepší zapamatovatelnost
  var czechWords = [
    'abeceda','advent','akcie','aktovka','album','ananas','anděl','anketa','antéka','apartmá',
    'armáda','asfalt','atlas','auto','babička','bageta','balík','balón','bambus','banán',
    'banda','banka','barva','baterka','batoh','bavlna','bažant','bazén','bedna','beran',
    'beseda','betlém','bezinka','bible','bicykl','bidlo','biftek','bílá','bizon','bláto',
    'blesk','blok','bobr','bodlák','bohatý','bomba','bonbón','borec','borovka','bota',
    'bouřka','boxer','bradka','brambor','brána','bratr','březen','briliant','bříza','brnkat',
    'broskev','brouček','brousek','brýle','brzda','bublat','buchta','budík','budova','bufet',
    'bujný','burza','bylinka','bystře','bytost','bzučet','cedulka','čekat','celer','cena',
    'cenina','centrum','česká','cesta','cibule','cihla','cíl','cirkus','číslo','citron',
    'cívka','copánek','cukr','cvičení','cyklista','daleko','dárek','datel','datum','dávat',
    'dcerka','dědeček','deka','dekor','dělat','delfín','demise','denní','deprese','design',
    'deštník','detaily','devátý','dialog','diamant','dieta','dikobraz','dílna','diplom','dirigent',
    'disketa','divadlo','dívka','dlažba','dlužit','dnešek','dobrák','docent','dodávka','dohled',
    'dojem','doktor','dokument','doleva','dolina','domácí','domek','domino','doprava','doprovod',
    'dorost','dosah','doslov','dostih','dotaz','dotknout','doufat','dovoz','dozadu','dozorce',
    'drahý','drak','drama','drápek','drážka','drobek','drogerie','drozd','druhý','družba',
    'držet','duben','dudek','důkaz','důlek','dupat','důraz','dusno','dutina','dvojče',
    'dvorana','dýchat','dynamo','džbán','ekonom','elipsa','email','emise','epocha','epizoda',
    'esence','eskimo','eskorta','etapa','etiket','euforie','evoluce','exkurze','expert','export',
    'expres','fabrika','facka','faktura','falešný','fanatik','fantom','farmář','fašovat','favorit',
    'fazole','únor','federace','fenomén','festival','figurka','fikce','filet','filozof','filtr',
    'finance','finta','firma','fixovat','fjord','flanel','flek','flétna','flip','flirt',
    'floret','flotila','fobie','fokus','folklór','fond','fontána','forma','formule','fosfor',
    'fotbal','fotka','foyer','fragment','frakce','frank','fráze','freska','frkot','fronta',
    'fumovat','funkce','fúrie','fyzika','galerie','garant','garáž','gejzír','genetik','génius',
    'geolog','gesto','glórie','gobelín','golem','gotika','grafika','granule','gratulace','gril',
    'groteska','gryfon','guláš','guma','guru','gymnastika','hádat','hadice','háj','háček',
    'halda','halenka','hamoun','hanba','hánět','harfa','harmonie','hasit','havran','hebký',
    'hejno','hejtman','helma','herbář','herec','hermelín','heslo','hezký','hibernace','historie',
    'hlad','hladina','hladký','hlasatel','hlavní','hledat','hlína','hlíva','hlodat','hloupost',
    'hltat','hlubina','hmota','hmyz','hnědý','hniloba','hnízdo','hoboj','hoch','hodina',
    'hodnota','hodovat','hojit','hokej','holínka','holka','holub','homole','honba','honit',
    'hora','hořec','hořčice','horizont','horko','hormon','hornina','horolezec','horoskop','horský',
    'hospoda','hostina','hotel','houba','houby','houpat','housenka','houska','housle','hovado',
    'hovor','hrad','hradba','hrana','hranice','hravý','hrazda','hrdina','hrnčíř','hrnec',
    'hrobař','hrobka','hroch','hrom','hromada','hrot','hrozen','hrozit','hrozný','hrst',
    'hrubý','hrůza','hryzat','hubený','hubnout','hučet','hudba','hukot','humr','humus',
    'hustý','hutník','hvězda','hvozdík','hýbat','hydrant','hymna','hysterik','chalupa','chameleón',
    'charita','chatrný','chemik','chirurg','chladný','chlap','chleba','chlouba','chlup','chmel',
    'chobotnice','chodba','chodec','chopit','choroba','choulostivý','chovat','chrapot','chřest','chřipka',
    'chromý','chroupat','chrpa','chrt','chrup','chryzantéma','chtít','chudý','chutnat','chvat',
    'chvilka','chyba','chystat','chytit','iglú','ikona','iluze','imunita','index','indicie',
    'infekce','inflace','inkoust','inovace','inspekce','internet','intuice','invalida','investor','ironie',
    'izolace','jabloň','jahoda','jakost','jalovice','jantar','jarmark','jaro','jasnit','javorový',
    'jazyk','jeden','jedle','jednatel','jednota','jelen','jelito','jemný','jenže','jepice',
    'jeskyně','ještě','jestřáb','jeviště','jezdit','ježek','jezero','jezevec','jinak','jinde',
    'jircha','jiskra','jistota','jitrnice','jízda','jizva','jmelí','jogurt','junák','jurisdikce',
    'kabaret','kabát','kabel','kabina','kachna','kacíř','kadet','kadidlo','kahanec','kajak',
    'kajuta','kakao','kaktus','kalamita','kalendář','kalich','kalina','kalný','kalorie','kaluž',
    'kamarád','kámen','kamera','kamion','kamna','kamzík','kanál','kancelář','kandidát','kánoe',
    'kantor','kapela','kapitán','kapitola','kapka','kaple','kapota','kapr','kapusta','karamel',
    'karavana','kareta','kariéra','karnet','karta','kasárna','kaše','kasino','kasta','katalog',
    'katastrofa','kategorie','katedra','katolík','kavárna','kazajka','kazatel','kazeta','kazit','kdekdo',
    'kdesi','kdyby','když','kelímek','kemp','keramik','kečup','kino','kladivo','klam',
    'klapka','klarinet','klasik','klavír','klec','klekání','klenba','klenot','kleopatra','klesnout',
    'kletba','klíče','klient','klika','klimat','klín','klinika','klobouk','klokan','klopýtat',
    'kloub','klub','kluk','kluziště','kmen','kmihat','knedlík','kníže','kniha','knihovna',
    'knoflík','knot','kobalt','koberec','kobliha','kobyla','kočka','kocour','kódovat','kohout',
    'kojenec','kokos','koktejl','koláč','kolega','kolej','koleno','kolibřík','kolize','koloběžka',
    'kolona','komár','kombajn','komediant','kometa','komfort','komik','komín','komise','komnata',
    'komora','kompas','kompliment','kompot','komunita','konat','koncert','kondice','kondor','konec',
    'konev','konfekt','konflikt','kongres','koníček','konkrét','konopí','kontakt','kontinent','kontrola',
    'konvice','konzum','kopat','kopec','kopie','kopr','kopule','korál','korbel','korek',
    'korespondent','kořice','koridor','kormidlo','koroptev','koruna','koryto','kosatec','košilka','kosit',
    'kosmonaut','kostka','kostnice','kostra','kostým','košílek','kotel','kotleta','kotník','kotoul',
    'koukat','koule','koupel','koupit','kouř','kousek','kout','kouzelník','koza','kožich',
    'kráčet','krádež','kraj','krajina','královna','král','kramle','krása','kráter','krátit',
    'kravata','kravín','kreatura','kredit','krejčí','krémrole','kresba','kreslit','kreveta','krevní',
    'kriket','kriminál','kristal','kritik','kříž','křížala','krize','krmit','krnout','kročej',
    'krocan','krok','kronika','kropit','krotit','kroupa','kroužek','krov','krtek','kruhy',
    'krupice','krupobití','krutý','krvácet','krychle','krýt','křídlo','křik','křižovat','kuchyně',
    'kudrnatý','kufr','kujný','kukačka','kukla','kukuřice','kulatý','kulečník','kulhat','kulisa',
    'kulka','kultura','kuna','kupec','kupka','kupovat','kůra','kurátor','kuráž','kurz',
    'kušovat','kuželka','kouzlo','kvákat','kvalita','kvartet','kvasit','květenství','květina','kvíz',
    'kvočna','kýbl','kýchat','kyjov','kynout','kyselina','kytara','kytice','labuť','laciný',
    'ladit','ladný','laguna','lahodný','laický','lakmus','lakomý','lampa','lano','lasice',
    'láska','látka','lavice','lavina','lázně','lebka','leccos','leckdy','ledek','lední',
    'ledovec','legenda','legie','legrační','lehátko','lehce','lehnout','lehký','lekce','leknout',
    'lektvar','lenoch','leopard','lepenka','lepidlo','lepší','lesík','lesklý','lesnický','letadlo',
    'leták','letecky','letmo','letokruh','letovat','letuška','lev','levný','lež','lhát',
    'lhostejný','lhůta','libost','libra','licence','lichotit','lidoop','lidový','liják','likér',
    'likvidovat','lilie','limonáda','linka','linoleum','lipový','liščí','literát','litina','litovat',
    'livrej','lízat','lobovat','lodička','logicky','loket','lokomotiva','lomit','lopata','lopuch',
    'los','lotr','louh','louka','loupež','loupit','louskat','loutka','lovit','ložisko',
    'lubrikant','lucerna','luh','luk','luna','lupa','lupínek','lustovat','luxus','lyra',
    'lyrika','lyžař','macek','madlo','magie','magnet','mahagon','majetek','maják','major',
    'makak','makaróny','maketa','makovice','makrela','malba','malíček','malina','malíř','malovat',
    'maminka','mamut','manažer','mandarinka','mandel','mandle','manikúra','manžety','manžel','mapa',
    'maratón','meruňka','markýza','marmeláda','marnivý','masakr','masiv','maska','máslo','masný',
    'matčin','matematik','materiál','matice','matka','matrace','matriky','mazat','mech','medaile',
    'medik','medvěd','megafon','melasa','melodie','meloun','memorovat','menší','mentol','menuet',
    'meritum','metro','mezek','mezera','migrovat','mikina','mikrofon','miláček','milión','milovat',
    'miminko','minerál','ministr','minout','minulý','mírný','mísa','mise','mistr','mísit',
    'místnost','mítink','mívat','mladost','mlha','mlít','mlok','mlsat','mluvit','mnich',
    'množit','mobil','mocný','móda','model','modlit','modrý','modul','mohyla','mokrý',
    'molekula','moment','monarcha','monitor','monokl','montáž','monument','moped','morava','morče',
    'mořský','mosaz','moskyt','most','motiv','motor','motyka','moucha','moudrý','mouka',
    'mozaika','mozek','možnost','mramor','mravenec','mráz','mrkev','mrtvý','mrzet','mrznout',
    'mstít','mučedník','mudrc','muflón','mufin','mulat','mumie','munice','muset','mutace',
    'muzeum','muzikál','mýdlit','mýdlo','mýlka','mýtus','nabírat','náboj','nabrat','nábytek',
    'nacpat','nácvik','nadace','nadávat','nádoba','nadobit','nadpis','nadutý','nafouknout','nafta',
    'nahlas','náhled','nahoru','nahradit','naivní','najevo','najít','nakládat','nakonec','nakreslit',
    'nakyprovat','nálada','nalévat','nalít','náměstí','namíchat','namořit','namotané','nandat','naoko',
    'naopak','naorat','napájet','nápis','naplnit','napnout','nápoj','naposledy','napravo','náprstek',
    'napsat','náraz','narcis','národ','narukovat','nasekat','naslepo','následek','naspat','nastoupit',
    'nástroj','našup','naťukat','natáčet','naučit','navázat','navíc','navlékat','navrhovat','nazdar',
    'náznak','názor','nebeský','nebezpečí','nebýt','nechat','nečekat','nedávno','neděle','nedostatek',
    'nefrit','nehet','nehoda','nějaký','nejdřív','nejvíce','někde','někdo','několik','nějaký',
    'nemít','nemoc','nemovitý','nenávist','neobvyklý','neon','nepřítel','nervový','nést','nestát',
    'nestor','netopýr','neutrální','nevděk','nevěsta','nevina','nezdar','ničit','nikam','nikde',
    'nikdo','nikdy','nikl','nimrod','nitka','nížina','nízký','noblesní','nocleh','noha',
    'norma','normální','norovat','nos','nosit','nota','notář','nouze','novela','noviny',
    'novinář','nový','nuda','nudle','nugát','nutit','nutnost','nůž','nýbrž','nylon'
  ];

  var charsets = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  function getCharset() {
    var charset = '';
    if (form.lowercase.checked) charset += charsets.lowercase;
    if (form.uppercase.checked) charset += charsets.uppercase;
    if (form.numbers.checked) charset += charsets.numbers;
    if (form.symbols.checked) charset += charsets.symbols;
    return charset;
  }

  function secureRandom(max) {
    var array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % max;
  }

  function generateRandomPassword(length, charset) {
    if (!charset) return '';
    var password = '';
    for (var i = 0; i < length; i++) {
      password += charset[secureRandom(charset.length)];
    }
    return password;
  }

  function generatePassphrase(wordCount, separator, capitalize, addNumber) {
    var words = [];
    for (var i = 0; i < wordCount; i++) {
      var word = czechWords[secureRandom(czechWords.length)];
      if (capitalize) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      words.push(word);
    }
    var passphrase = words.join(separator);
    if (addNumber) {
      passphrase += separator + secureRandom(1000);
    }
    return passphrase;
  }

  function calculateEntropy(length, charsetSize) {
    if (charsetSize === 0) return 0;
    return Math.floor(length * Math.log2(charsetSize));
  }

  function calculatePassphraseEntropy(wordCount, addNumber) {
    var entropy = wordCount * Math.log2(czechWords.length);
    if (addNumber) {
      entropy += Math.log2(1000);
    }
    return Math.floor(entropy);
  }

  function getStrengthInfo(entropy) {
    if (entropy < 28) return { label: 'Velmi slabé', color: '#dc2626', percent: 15 };
    if (entropy < 36) return { label: 'Slabé', color: '#f97316', percent: 30 };
    if (entropy < 60) return { label: 'Přijatelné', color: '#eab308', percent: 50 };
    if (entropy < 80) return { label: 'Silné', color: '#22c55e', percent: 75 };
    if (entropy < 128) return { label: 'Velmi silné', color: '#10b981', percent: 90 };
    return { label: 'Extrémně silné', color: '#06b6d4', percent: 100 };
  }

  function updateStrengthDisplay(entropy) {
    var info = getStrengthInfo(entropy);
    strengthFill.style.width = info.percent + '%';
    strengthFill.style.background = info.color;
    strengthLabel.textContent = 'Síla hesla: ' + info.label;
    strengthLabel.style.color = info.color;
    entropyText.textContent = entropy + ' bitů entropie';
  }

  function generate() {
    if (currentMode === 'random') {
      var length = parseInt(lengthNum.value) || 16;
      var charset = getCharset();

      if (!charset) {
        output.textContent = 'Vyberte alespoň jeden typ znaků';
        strengthFill.style.width = '0%';
        strengthLabel.textContent = 'Síla hesla: –';
        strengthLabel.style.color = '';
        entropyText.textContent = '';
        return;
      }

      var password = generateRandomPassword(length, charset);
      output.textContent = password;
      var entropy = calculateEntropy(length, charset.length);
      updateStrengthDisplay(entropy);
    } else {
      var wordCount = parseInt(wordCountNum.value) || 4;
      var separator = form.separator.value;
      var capitalize = form.capitalize.checked;
      var addNumber = form.addNumber.checked;

      var passphrase = generatePassphrase(wordCount, separator, capitalize, addNumber);
      output.textContent = passphrase;
      var entropy = calculatePassphraseEntropy(wordCount, addNumber);
      updateStrengthDisplay(entropy);
    }
  }

  function syncLength(source) {
    if (source === 'slider') {
      lengthNum.value = lengthSlider.value;
    } else {
      var val = parseInt(lengthNum.value) || 16;
      val = Math.max(4, Math.min(128, val));
      lengthNum.value = val;
      lengthSlider.value = Math.min(val, 64);
    }
  }

  function syncWordCount(source) {
    if (source === 'slider') {
      wordCountNum.value = wordCountSlider.value;
    } else {
      var val = parseInt(wordCountNum.value) || 4;
      val = Math.max(3, Math.min(12, val));
      wordCountNum.value = val;
      wordCountSlider.value = Math.min(val, 10);
    }
  }

  // Mode switching
  document.querySelectorAll('.mode-switch button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.mode-switch button').forEach(function(b) { b.classList.remove('active'); });
      document.querySelectorAll('.mode-panel').forEach(function(p) { p.classList.remove('active'); });

      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      document.querySelector('.mode-panel[data-panel="' + currentMode + '"]').classList.add('active');
      generate();
    });
  });

  lengthSlider.addEventListener('input', function() {
    syncLength('slider');
    generate();
  });

  lengthNum.addEventListener('input', function() {
    syncLength('number');
    generate();
  });

  wordCountSlider.addEventListener('input', function() {
    syncWordCount('slider');
    generate();
  });

  wordCountNum.addEventListener('input', function() {
    syncWordCount('number');
    generate();
  });

  form.querySelectorAll('input[type="checkbox"]').forEach(function(cb) {
    cb.addEventListener('change', generate);
  });

  form.separator.addEventListener('change', generate);

  btnGenerate.addEventListener('click', generate);

  btnCopy.addEventListener('click', function() {
    var password = output.textContent;
    if (password && password !== 'Klikněte na Generovat' && password !== 'Vyberte alespoň jeden typ znaků') {
      navigator.clipboard.writeText(password).then(function() {
        btnCopy.textContent = 'Zkopírováno!';
        btnCopy.classList.add('copied');
        setTimeout(function() {
          btnCopy.textContent = 'Kopírovat';
          btnCopy.classList.remove('copied');
        }, 2000);
      });
    }
  });

  // Inicialisace
  generate();
})();
</script>
</div>

<div class="live">
<style>
.password-checker {
  max-width: 500px;
}
.password-checker .password-input {
  width: 100%;
  padding: 0.8em;
  font-family: monospace;
  font-size: 1.1em;
  border: 2px solid #334155;
  border-radius: 6px;
  margin: 0.5em 0;
}
.password-checker .password-input:focus {
  outline: none;
  border-color: #2563eb;
}
.password-checker .analysis {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1em;
  margin-top: 1em;
  color: #1e293b;
}
.password-checker .analysis-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0;
  border-bottom: 1px solid #cbd5e1;
}
.password-checker .analysis-row:last-child {
  border-bottom: none;
}
.password-checker .analysis-row span:first-child {
  color: #475569;
}
.password-checker .check-icon {
  color: #22c55e;
}
.password-checker .cross-icon {
  color: #dc2626;
}
.password-checker .warning-icon {
  color: #f97316;
}
.password-checker .crack-time {
  margin-top: 1em;
  padding: 0.8em;
  background: #e2e8f0;
  border-radius: 6px;
  text-align: center;
  color: #1e293b;
}
</style>

<form id="checker-form" class="password-checker" onsubmit="return false">
  <h2 id="overeni">Ověření síly hesla</h2>

  <p>Zadejte heslo a zjistěte jeho sílu. Heslo se <b>nikam neodesílá</b> – analysa probíhá lokálně.</p>

  <p><small>Celkové hodnocení vychází z entropie hesla: <code>délka × log₂(počet typů znaků)</code>. Pokud heslo obsahuje běžné vzory (123, qwerty, rok narození), je entropie penalizována o 40 %.</small></p>

  <input type="text" class="password-input" id="check-password" placeholder="Zadejte heslo k ověření" autocomplete="off">

  <div class="analysis" id="password-analysis" style="display: none;">
    <div class="analysis-row">
      <span>Délka</span>
      <span id="check-length"></span>
    </div>
    <div class="analysis-row">
      <span>Malá písmena (a-z)</span>
      <span id="check-lower"></span>
    </div>
    <div class="analysis-row">
      <span>Velká písmena (A-Z)</span>
      <span id="check-upper"></span>
    </div>
    <div class="analysis-row">
      <span>Číslice (0–9)</span>
      <span id="check-digits"></span>
    </div>
    <div class="analysis-row">
      <span>Speciální znaky</span>
      <span id="check-special"></span>
    </div>
    <div class="analysis-row">
      <span>Běžné vzory</span>
      <span id="check-patterns"></span>
    </div>
    <div class="analysis-row" style="font-weight: bold; margin-top: 0.5em; padding-top: 0.8em; border-top: 2px solid #475569;">
      <span>Celkové hodnocení</span>
      <span id="check-rating"></span>
    </div>
    <div class="crack-time" id="crack-time"></div>
  </div>
</form>

<script>
(function() {
  var input = document.getElementById('check-password');
  var analysis = document.getElementById('password-analysis');

  var commonPatterns = [
    /^123/, /321$/, /abc/i, /qwerty/i, /password/i, /heslo/i,
    /\d{4}$/, // rok na konci
    /(.)\1{2,}/, // opakování znaků
    /^[a-z]+\d+$/i, // slovo + číslo
    /19[89]\d|20[012]\d/ // roky
  ];

  var commonWords = ['password','heslo','qwerty','letmein','admin','welcome','monkey','dragon',
    'master','login','ahoj','test','user','guest'];

  function checkPassword(pwd) {
    if (!pwd) {
      analysis.style.display = 'none';
      return;
    }
    analysis.style.display = 'block';

    var length = pwd.length;
    var hasLower = /[a-z]/.test(pwd);
    var hasUpper = /[A-Z]/.test(pwd);
    var hasDigits = /\d/.test(pwd);
    var hasSpecial = /[^a-zA-Z0-9]/.test(pwd);

    // Detekce vzorů
    var patternIssues = [];
    commonPatterns.forEach(function(p) {
      if (p.test(pwd)) patternIssues.push('běžný vzor');
    });
    commonWords.forEach(function(w) {
      if (pwd.toLowerCase().indexOf(w) !== -1) patternIssues.push('časté slovo');
    });

    // Výpočet entropie
    var charsetSize = 0;
    if (hasLower) charsetSize += 26;
    if (hasUpper) charsetSize += 26;
    if (hasDigits) charsetSize += 10;
    if (hasSpecial) charsetSize += 32;
    var entropy = Math.floor(length * Math.log2(charsetSize || 1));

    // Penalizace za vzory
    if (patternIssues.length > 0) entropy = Math.floor(entropy * 0.6);

    // Zobrazení výsledků
    document.getElementById('check-length').innerHTML = length + ' znaků ' +
      (length >= 16 ? '<span class="check-icon">✓</span>' :
       length >= 12 ? '<span class="warning-icon">⚠</span>' :
       '<span class="cross-icon">✗</span>');

    document.getElementById('check-lower').innerHTML = hasLower ?
      '<span class="check-icon">✓ ano</span>' : '<span class="cross-icon">✗ ne</span>';
    document.getElementById('check-upper').innerHTML = hasUpper ?
      '<span class="check-icon">✓ ano</span>' : '<span class="cross-icon">✗ ne</span>';
    document.getElementById('check-digits').innerHTML = hasDigits ?
      '<span class="check-icon">✓ ano</span>' : '<span class="cross-icon">✗ ne</span>';
    document.getElementById('check-special').innerHTML = hasSpecial ?
      '<span class="check-icon">✓ ano</span>' : '<span class="cross-icon">✗ ne</span>';

    document.getElementById('check-patterns').innerHTML = patternIssues.length === 0 ?
      '<span class="check-icon">✓ nenalezeny</span>' :
      '<span class="cross-icon">✗ ' + patternIssues[0] + '</span>';

    // Hodnocení
    var rating, ratingColor;
    if (entropy < 28) { rating = 'Velmi slabé'; ratingColor = '#dc2626'; }
    else if (entropy < 36) { rating = 'Slabé'; ratingColor = '#f97316'; }
    else if (entropy < 60) { rating = 'Přijatelné'; ratingColor = '#eab308'; }
    else if (entropy < 80) { rating = 'Silné'; ratingColor = '#22c55e'; }
    else if (entropy < 128) { rating = 'Velmi silné'; ratingColor = '#10b981'; }
    else { rating = 'Extrémně silné'; ratingColor = '#06b6d4'; }

    document.getElementById('check-rating').innerHTML =
      '<span style="color:' + ratingColor + '">' + rating + '</span> (' + entropy + ' bitů)';

    // Odhad času prolomení (10 miliard pokusů/s)
    var combinations = Math.pow(charsetSize || 1, length);
    var seconds = combinations / 1e10 / 2;
    var timeStr;
    if (seconds < 1) timeStr = 'okamžitě';
    else if (seconds < 60) timeStr = Math.round(seconds) + ' sekund';
    else if (seconds < 3600) timeStr = Math.round(seconds/60) + ' minut';
    else if (seconds < 86400) timeStr = Math.round(seconds/3600) + ' hodin';
    else if (seconds < 31536000) timeStr = Math.round(seconds/86400) + ' dní';
    else if (seconds < 31536000 * 1000) timeStr = Math.round(seconds/31536000) + ' let';
    else if (seconds < 31536000 * 1e6) timeStr = Math.round(seconds/31536000/1000) + ' tisíc let';
    else if (seconds < 31536000 * 1e9) timeStr = Math.round(seconds/31536000/1e6) + ' miliónů let';
    else timeStr = '> miliard let';

    document.getElementById('crack-time').innerHTML =
      'Odhadovaný čas prolomení: <b>' + timeStr + '</b><br>' +
      '<small style="color:#64748b">(při 10 miliardách pokusů/s)</small>';
  }

  input.addEventListener('input', function() {
    checkPassword(input.value);
  });
})();
</script>
</div>

<h2 id="jak-vytvorit">Jak vytvořit bezpečné heslo</h2>

<p>Bezpečné heslo by mělo splňovat několik základních pravidel:</p>

<ul>
  <li><b>Délka</b> – čím delší, tím lepší. Minimum je 12 znaků, ideálně 16 a více.</li>
  <li><b>Náhodnost</b> – heslo by nemělo obsahovat slovníková slova, jména, data narození ani jiné předvídatelné vzory.</li>
  <li><b>Rozmanitost</b> – kombinace malých a velkých písmen, číslic a speciálních znaků výrazně zvyšuje počet možných kombinací.</li>
  <li><b>Unikátnost</b> – pro každou službu používejte jiné heslo.</li>
</ul>

<h3 id="best-practices">Best practices pro hesla</h3>

<ol>
  <li><b>Používejte správce hesel</b> – nechte si generovat a ukládat unikátní hesla pro každou službu. Pamatujete si jen jedno hlavní heslo.</li>
  <li><b>Zapněte dvoufaktorové ověření (2FA)</b> – i když heslo unikne, útočník se bez druhého faktoru nepřihlásí.</li>
  <li><b>Hlavní heslo do správce hesel</b> – použijte passphrase (4–6 náhodných slov), kterou si zapamatujete. Toto jediné heslo musí být silné a unikátní.</li>
  <li><b>Neměňte hesla zbytečně</b> – pravidelná změna hesel (např. každých 90 dní) vede k volbě slabších hesel. Měňte heslo pouze při podezření na únik.</li>
  <li><b>Zkontrolujte úniky</b> – na <a href="https://haveibeenpwned.com/">Have I Been Pwned</a> ověřte, zda vaše e-maily nefigurují v únicích. Pokud ano, změňte hesla na dotčených službách.</li>
  <li><b>Pozor na phishing</b> – ani silné heslo nepomůže, pokud ho zadáte na podvodné stránce. Vždy kontrolujte URL.</li>
  <li><b>Neposílejte hesla e-mailem ani chatem</b> – používejte správce hesel se sdílením nebo jednorázové odkazy.</li>
</ol>

<h2 id="entropie">Co je entropie hesla</h2>

<p>Entropie měří „náhodnost" hesla v bitech. Čím vyšší entropie, tím déle by trvalo heslo prolomit hrubou silou.</p>

<table class="wikitable">
  <tr>
    <th>Entropie (bity)</th>
    <th>Hodnocení</th>
    <th>Příklad použití</th>
  </tr>
  <tr>
    <td>&lt; 28</td>
    <td>Velmi slabé</td>
    <td>Nevhodné pro jakékoli použití</td>
  </tr>
  <tr>
    <td>28–35</td>
    <td>Slabé</td>
    <td>Pouze pro nepodstatné účty</td>
  </tr>
  <tr>
    <td>36–59</td>
    <td>Přijatelné</td>
    <td>Běžné webové služby</td>
  </tr>
  <tr>
    <td>60–79</td>
    <td>Silné</td>
    <td>E-mail, sociální sítě</td>
  </tr>
  <tr>
    <td>80–127</td>
    <td>Velmi silné</td>
    <td>Bankovnictví, šifrování</td>
  </tr>
  <tr>
    <td>≥ 128</td>
    <td>Extrémně silné</td>
    <td>Kryptografické klíče</td>
  </tr>
</table>

<p>Entropie se počítá jako <code>délka × log₂(počet možných znaků)</code>. Například heslo o 16 znacích ze sady 94 znaků (malá + velká písmena + číslice + symboly) má entropii přibližně 105 bitů.</p>

<h2 id="spravce-hesel">Správce hesel</h2>

<p>Pamatovat si desítky náhodných hesel je prakticky nemožné. Proto je doporučeno používat <b>správce hesel</b> (password manager):</p>

<ul>
  <li><b><a href="https://support.apple.com/cs-cz/guide/passwords/welcome/mac">Apple Hesla</a></b> – integrováno v iOS/macOS, synchronisace přes iCloud, zdarma pro uživatele Apple</li>
  <li><a href="https://bitwarden.com/">Bitwarden</a> – open-source, zdarma, multiplatformní</li>
  <li><a href="https://1password.com/">1Password</a> – placený, vynikající UX</li>
  <li><a href="https://keepassxc.org/">KeePassXC</a> – offline, open-source</li>
</ul>

<p>Správce hesel vám umožní mít pro každou službu unikátní silné heslo a pamatovat si pouze jedno hlavní heslo (master password).</p>

<h3 id="apple-hesla">Apple Hesla (iCloud Klíčenka)</h3>

<p>Od macOS Sequoia a iOS 18 má Apple samostatnou aplikaci <b>Hesla</b> (Passwords), která nahrazuje dřívější správu hesel v Nastavení. Nabízí:</p>

<ul>
  <li>Automatické generování silných hesel při registraci</li>
  <li>Synchronisaci přes iCloud mezi všemi Apple zařízeními</li>
  <li>Podporu passkeys (přihlašování bez hesla)</li>
  <li>Detekci uniklých hesel (upozornění pokud se heslo objevilo v úniku dat)</li>
  <li>Sdílení hesel s rodinou nebo skupinou</li>
  <li>Import/export hesel (CSV)</li>
</ul>

<p>Pro uživatele v Apple ekosystému je to nejpohodlnější volba – hesla se automaticky vyplňují v Safari i aplikacích a jsou chráněna Face ID / Touch ID.</p>

<h2 id="passphrase">Passphrase – heslo ze slov</h2>

<p>Alternativou k náhodným znakům je <b>passphrase</b> – heslo složené z několika náhodných slov. Takové heslo je snazší zapamatovat a přitom může mít vysokou entropii.</p>

<p>Příklad: <code>spravne kun svorka baterky</code> (inspirováno <a href="https://xkcd.com/936/">XKCD #936</a>)</p>

<p><img class="border" src="/files/bezpecne-heslo/sila-hesla.png" alt="Vymýšlení bezpečného hesla snadného na zapamatování"></p>
<p><i>Přeloženo z <a href="http://imgs.xkcd.com/comics/password_strength.png">originálu</a>.</i></p>

<p>Při použití slovníku o 7776 slovech (jako v metodě <a href="https://www.eff.org/dice">Diceware</a>) poskytuje každé slovo přibližně 12,9 bitů entropie. Čtyři slova = ~51 bitů, šest slov = ~77 bitů.</p>

<p><b>Poznámka k entropii passphrase:</b> Entropie se počítá jako <code>počet slov × log₂(velikost slovníku)</code>. Diakritika v českých slovech nemá vliv na entropii – útočník provádějící slovníkový útok zná velikost slovníku bez ohledu na to, jaké znaky slova obsahují. Síla passphrase pochází z počtu možných kombinací slov, nikoli ze složitosti jednotlivých znaků.</p>

<h2 id="dvoufaktorove">Dvoufaktorové ověření (2FA)</h2>

<p>I silné heslo může být kompromitováno (phishing, únik databáze). Proto je důležité používat <b>dvoufaktorové ověření</b>:</p>

<ul>
  <li><b>TOTP aplikace</b> – Google Authenticator, Authy, Microsoft Authenticator</li>
  <li><b>Hardwarové klíče</b> – YubiKey, Google Titan</li>
  <li><b>SMS</b> – nejslabší varianta, ale lepší než nic</li>
</ul>

<h2 id="uniky-hesel">Úniky hesel a proč nepoužívat stejné heslo</h2>

<p><b>Největší bezpečnostní riziko není slabé heslo, ale používání stejného hesla na více službách.</b> Úniky databází jsou běžné – každý rok uniknou miliardy přihlašovacích údajů. Na webu <a href="https://haveibeenpwned.com/">Have I Been Pwned</a> si můžete ověřit, zda vaše e-mailová adresa figuruje v některém známém úniku.</p>

<p>Problém je, že mnoho služeb neukládá hesla bezpečně:</p>

<ul>
  <li><b>Žádné hashování</b> – hesla uložena v čitelné podobě (ano, stále se to děje)</li>
  <li><b>Slabé hashování</b> – MD5 nebo SHA1 bez soli, lze prolomit slovníkovým útokem během sekund</li>
  <li><b>Rychlé hashovací funkce</b> – i SHA-256 je příliš rychlý; moderní GPU zvládne miliardy pokusů za sekundu</li>
</ul>

<p>Bezpečné služby používají <b>pomalé hashovací funkce</b> jako bcrypt, scrypt nebo Argon2, které záměrně zpomalují ověření hesla. I při úniku databáze pak trvá prolomení jednoho hesla hodiny až roky místo milisekund.</p>

<p>Když útočník získá vaše heslo z jedné služby, zkusí ho automaticky na desítkách dalších – e-mail, sociální sítě, banky. Tomuto se říká <b>credential stuffing</b> a je to jeden z nejúspěšnějších typů útoků.</p>

<p><b>Řešení:</b> Pro každou službu používejte unikátní heslo. S desítkami účtů je to bez správce hesel nemožné – proto je správce hesel nutností, ne luxusem.</p>

<h2 id="caste-chyby">Časté chyby</h2>

<ul>
  <li>Používání stejného hesla na více službách (viz výše)</li>
  <li>Hesla založená na osobních údajích (jméno, datum narození)</li>
  <li>Jednoduchá substituce (p4ssw0rd místo password)</li>
  <li>Příliš krátká hesla (&lt; 8 znaků)</li>
  <li>Zapisování hesel na papírky u monitoru</li>
</ul>

<h2 id="generator-kod">Kód generátoru v JavaScriptu</h2>

<p>Generátor na této stránce používá <code>crypto.getRandomValues()</code> pro kryptograficky bezpečnou náhodnost. Zde je zjednodušená verse:</p>

<pre><code>function generatePassword(length, charset) {
  var array = new Uint32Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, n =&gt; charset[n % charset.length]).join('');
}

var charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&amp;*';
var password = generatePassword(16, charset);
</code></pre>
