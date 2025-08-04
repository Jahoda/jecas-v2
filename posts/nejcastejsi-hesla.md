---
title: "40 nejčastějších hesel"
headline: "40 nejpoužívanějších hesel"
description: "Jaká hesla často používají čeští uživatelé."
date: "2014-05-11"
last_modification: "2014-10-01"
status: 1
tags: ["Bezpečnost", "Hesla"]
---

Následující seznam obsahuje **opakovaně používaná hesla** z jednoho českého webu (vzorek je několik desítek tisíc účtů).

  `123456`
  
    166 ×
    (md5: `e10adc3949ba59abbe56e057f20f883e`)

  `heslo`
  
    67 ×
    (md5: `955db0b81ef1989b4a4dfeae8061a9a6`)

  `12345`
  47 × (md5: `827ccb0eea8a706c4c34a16891f84e7b`)
  
  `123456789`
  
    39 × (md5: `25f9e794323b453885f5181f1b624d0b`)

  `martin`
  
    27 × (md5: `925d7518fc597af0e43f5606f9a51512`)

  `aaaaaa`
  23 × (md5: `594f803b380a41396ed63dca39503542`)
  
  `michal`
  22 × (md5: `06b2af75179fb94be097af182a442a4a`)
  
  `internet`
  20 × (md5: `c3581516868fb3b71746931cac66390e`)
  
  `aaaaaa`
  19 × (md5: `0b4e7a0e5fe84ad35fb5f95b9ceeac79`)
  
  `666666`
  17 × (md5: `f379eaf3c831b04de153469d1bec345e`)
  
  `159753`
  17 × (md5: `5583413443164b56500def9a533c7c70`)
  
  `hesloheslo`
  16 × (md5: `e26256d0d2e39dc4fc5f5a28c593fcae`)
  
  `111111`
  16 × (md5: `96e79218965eb72c92a549dd5a330112`)
  
  `heslo123`
  13 × (md5: `6a284155906c26cbca20c53376bc63ac`)
  
  `genius`
  13 × (md5: `5912d7bfd10f631f1715bf85bbb72d97`)
  
  `matrix`
  12 × (md5: `21b72c0b7adc5c7b4a50ffcb90d92dd6`)
  
  `hovno`
  12 × (md5: `785bb1e5e77a14325fd31ebeae836fff`)

  `12345678`
  12 × (md5: `25d55ad283aa400af464c76d713c07ad`)

  `000000`
  12 × (md5: `670b14728ad9902aecba32e22fa4f6bd`)

  `ahojky`
  12 × (md5: `b743dad84bb13b5d5963cdad531a3f70`)

  `password`
  11 × (md5: `5f4dcc3b5aa765d61d8327deb882cf99`)

  `slunicko`
  11 × (md5: `6853c3b5badca78171fd498ce7094cbf`)

  `tomas`
  11 × (md5: `4b506c2968184be185f6282f5dcac238`)  
  
  `tunning`
  10 × (md5: `8700ed4820c703ee62c092f05901ecfc`)  

  `000000`
  10 × (md5: `dad3a37aa9d50688b5157698acfd7aee`)  

  `nevim`
  10 × (md5: `85fcc0d1859e289c51407e98ec2b293e`)  

  `killer`
  10 × (md5: `b36d331451a61eb2d76860e00c347396`)  

  `lopata`
  10 × (md5: `c813006a9d4feb92df26b9f97ca8b285`)  

  `pavel`
  9 × (md5: `ef1652b79c940145b600de7a2fe0288e`)    
  
  `monika`
  9 × (md5: `6f3fc039bfe1efdb272111f276a0e84a`)    

  `lukasek`
  9 × (md5: `384abdfba435036d3be4acdba1830a0b`)    

  `qwerty`
  9 × (md5: `d8578edf8458ce06fbc5bb76a58c5ca4`)    

  `poklop`
  9 × (md5: `22545275bfec74f768156d5c2dfef996`)    

  `11111`
  9 × (md5: `b0baee9d279d34fa1dfd71aadb908c3f`)    

  `asdfgh`
  9 × (md5: `a152e841783914146e4bcd4f39100686`)      
  
  `asdasd`
  9 × (md5: `a8f5f167f44f4964e6c998dee827110c`)      

  `nasrat`
  8 × (md5: `0f837ae5d0ed640dfd615c4ea21d5f5c`)      

  `qwert`
  8 × (md5: `a384b6463fc216a5f8ecb6670f86456a`)      

  `jahoda`
  8 × (md5: `61c0a0d7ab1ee0d8d8dd9d7ab26ce81b`)      

  `lucinka`
  8 × (md5: `e072c93da1778077823c6b190f6d94e7`)      

  `sparta`
  8 × (md5: `3354bc123e420ccd341842be1e8e8241`)        

  var json = "";
  var hesla = document.getElementById("seznam-hesel");
  var delka = hesla.getElementsByTagName("dd").length;
  for (var i = 0; i 

## Využití

Při procesu registrace můžeme zkontrolovat, zda heslo nepatří mezi **často používaná**.

### Seznam pro použití v JS/PHP skriptu

```
document.write(json.substr(0, json.length-2))
```

## Jak zjistit nečastější hesla?

Vypsat si **10 nejčastějších hesel** z tabulky uživatelů je možné jenoduchým SQL dotazem:

```
SELECT **heslo**, COUNT(**heslo**) *cetnost*
FROM uzivatele
GROUP by **heslo**
ORDER BY *cetnost* DESC
LIMIT 10
```

Pokud se na hesla používá **nedostatečná ochrana** funkcí `md5`, lze takový *hash* často rozluštit napsáním do **Google** nebo použitím následujících nástrojů:

  - [MD5-hash.com](http://www.md5-hash.com/)

  - [md5.gromweb.com](http://md5.gromweb.com/)

  - [MD5.ZNAET.ORG](http://md5.znaet.org)

  - [CrackStation](https://crackstation.net/)

## Odkazy jinam

  - [Today I Am Releasing Ten Million Passwords](https://xato.net/passwords/ten-million-passwords/) – 10 milionů uživatelských jmen a hesel, ke stažení jako 180MB textový soubor