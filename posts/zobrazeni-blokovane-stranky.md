---
title: "Zobrazení blokované stránky v této zemi"
headline: "Zobrazení blokované stránky v této zemi"
description: "Jak zobrazit obsah stránky, která je blokovaná v určité zemi nebo pro určité IP adresy."
date: "2016-01-19"
last_modification: "2016-01-19"
status: 0
tags: []
---

## Simulace skutečného prohlížeče

Nastavením vhodných HTTP hlaviček jde při použití CURL simulovat skutečný prohlížeč.

Může to znít překvapivě, ale pro stažení obsahu některých webů je naprosto podstatné nastavit [cookies](/cookie):

```
curl_setopt($ch, CURLOPT_COOKIEFILE, "cookie.txt");
```

```
$header = array();
$header[] = 'Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5';
$header[] = 'Cache-Control: max-age=0';
$header[] = 'Connection: keep-alive';
$header[] = 'Keep-Alive: 300';
$header[] = 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7';
$header[] = 'Accept-Language: en-us,en;q=0.5';
$header[] = 'Pragma: ';
$ch = curl_init(); 
curl_setopt($ch, CURLOPT_URL, 'http://www.neobux.com/rel/bl/?o=D4B44A9F3179942FCED0E440FF71F64F828DC2990AD18F9E');
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows; U; Windows NT 6.0; en-US; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11 (.NET CLR 3.5.30729)');
curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
curl_setopt($ch, CURLOPT_AUTOREFERER, true); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_ENCODING, '');
curl_setopt($ch, CURLOPT_TIMEOUT, 20);
$result = curl_exec($ch);
curl_close ($ch);
echo $result;
```

```
   /**
     * Get a web file (HTML, XHTML, XML, image, etc.) from a URL.  Return an
     * array containing the HTTP server response header fields and content.
     */
    function get_web_page( $url )
    {
        $user_agent='Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0';

        $options = array(

            CURLOPT_CUSTOMREQUEST  =>"GET",        //set request type post or get
            CURLOPT_POST           =>false,        //set to GET
            CURLOPT_USERAGENT      => $user_agent, //set user agent
            CURLOPT_COOKIEFILE     =>"cookie.txt", //set cookie file
            CURLOPT_COOKIEJAR      =>"cookie.txt", //set cookie jar
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
        );

        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        $err     = curl_errno( $ch );
        $errmsg  = curl_error( $ch );
        $header  = curl_getinfo( $ch );
        curl_close( $ch );

        $header['errno']   = $err;
        $header['errmsg']  = $errmsg;
        $header['content'] = $content;
        return $header;
    }
```

  Browser Simulator/Emulator Tool,
Web Page Tester, URL Source/Headers Viewer