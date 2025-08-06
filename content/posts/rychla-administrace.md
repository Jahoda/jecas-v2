---
title: "Rychlá administrace pomocí Admineru"
headline: "Rychlá administrace pomocí Admineru"
description: "Pomocí Adminer Editoru jde automaticky vytvořit administraci k SQL tabulkám."
date: "2015-11-07"
last_modification: "2015-11-07"
status: 0
tags: []
format: "html"
---

<h2 id="views">Zobrazení pohledů</h2>

<pre><code>    function tablesPrint($tables) {
      echo "&lt;p id='tables' onmouseover='menuOver(this, event);' onmouseout='menuOut(this);'>\n";
      foreach ($tables as $row) {
        $name = $this->tableName($row);
        if (empty($row["Engine"]) || $name != "") { // ignore views and tables without name
          $name = empty($name) ? $row["Name"] : $name;
          echo "&lt;a href='" . h(ME) . 'select=' . urlencode($row["Name"]) . "'"
            . bold($_GET["select"] == $row["Name"] || $_GET["edit"] == $row["Name"], "select")
            . " title='" . lang('Select data') . "'>" . $name . "&lt;/a>&lt;br>\n"
          ;
        }
      }
    }

    // function fieldName($field, $order = 0) {
    //   // only columns with comments will be displayed and only the first five in select
    //   return (!preg_match('~_(md5|sha1)$~', $field["field"]) ? h($field["comment"]) : "");
    // }</code></pre>