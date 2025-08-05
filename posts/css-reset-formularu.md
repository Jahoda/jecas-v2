---
title: "CSS reset formulářů"
headline: "Formuláře a CSS reset"
description: "Dopad <code>* {margin: 0; padding: 0}</code> na formulářové prvky."
date: "2013-10-18"
last_modification: "2013-10-18"
status: 1
tags: ["css", "formulare", "webove-prohlizece"]
format: "html"
---

<p>V dávných dobách pramenilo z použití <i>hvězdičkového resetu</i> (<code>* {margin: 0; padding: 0}</code>) risiko, že se <b>nenávratně rozbije vzhled formulářových prvků</b> — hlavně ve smyslu <b>vertikálního zarovnání formulářových prvků vůči jejich popisku</b>.  V současných prohlížečích (<b>IE7+</b>) ale nebezpečí nejspíš nehrozí.</p>
<div class="live reset" style="position: relative; height: 25em"><style>
  .reset:hover #reset {left: .5em}
  fieldset {width: 40%; position: absolute; left: .5em; top: .5em}
  fieldset#reset {left: 45%; transition: .5s left; top: .5em}  
fieldset#reset * {margin: 0!important; padding: 0!important}
</style>

<form action="#" method="post">
      <fieldset id="bez">
        <legend>Výchozí styly</legend>

        <label for=jedna><input type="radio" id=jedna> Položka</label><br>
        <label for=dva><input type="radio" id=dva> Položka</label><br>
        <label for=tri><input type="radio" id=tri> Položka</label><br>
        
        <label for=jedna1><input type="checkbox" id=jedna1> Položka</label><br>
        <label for=dva1><input type="checkbox" id=dva1> Položka</label><br>
        <label for=tri1><input type="radio" id=tri1> Položka</label><br>
        
        <input type="text"> text<br> 
            <input type="submit"> text<br> 
            <input type="checkbox"> text<br> 
            <input type="radio"> text<br> 
            <select> 
                <option>test</option> 
            </select> test<br> 

      </fieldset>
      
      <fieldset id="reset">
        <legend>* {margin: 0; padding: 0}</legend>

        <label for=jedna2><input type="radio" id=jedna2> Položka</label><br>
        <label for=dva2><input type="radio" id=dva2> Položka</label><br>
        <label for=tri2><input type="radio" id=tri2> Položka</label><br>
        
        <label for=jedna3><input type="checkbox" id=jedna3> Položka</label><br>
        <label for=dva3><input type="checkbox" id=dva3> Položka</label><br>
        <label for=tri3><input type="radio" id=tri3> Položka</label><br>
        
        <input type="text"> text<br> 
            <input type="submit"> text<br> 
            <input type="checkbox"> text<br> 
            <input type="radio"> text<br> 
            <select> 
                <option>test</option> 
            </select> test<br> 

      </fieldset>
</form>
  <div style="clear: both"></div>
</div>