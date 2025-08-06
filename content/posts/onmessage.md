---
title: "Onmessage"
headline: "Onmessage"
description: ""
date: "2015-10-12"
last_modification: "2015-10-12"
status: 0
tags: []
format: "html"
---

<li><a href="http://www.w3schools.com/html/html5_serversentevents.asp">HTML5 Server-Sent Events</a></li>

<div id="received-message"></div>


<script>
  function displayMessage (evt) {
	var message;
	if (evt.origin !== "http://robertnyman.com") {
		message = "You are not worthy";
	}
	else {
		
	}	
    message = "I got " + evt.data + " from " + evt.origin;
	document.getElementById("received-message").innerHTML = message;
}

if (window.addEventListener) {
	// For standards-compliant web browsers
	window.addEventListener("message", displayMessage, false);
}
else {
	window.attachEvent("onmessage", displayMessage);
}
</script>

<iframe src="https://kod.djpw.cz/ggrb-" frameborder="0"></iframe>


<pre><code>var CSSReload = {
    head: null,
    init: function() {
        this._storeHead(), this._listenToPostMessages()
    },
    _storeHead: function() {
        this.head = document.head || document.getElementsByTagName("head")[0]
    },
    _listenToPostMessages: function() {
        var e = this;
        window[this._eventMethod()](this._messageEvent(), function(t) {
            try {
                var s = JSON.parse(t.data);
                "string" == typeof s.css && e._refreshCSS(s)
            } catch (n) {}
        }, !1)
    },
    _messageEvent: function() {
        return "attachEvent" === this._eventMethod() ? "onmessage" : "message"
    },
    _eventMethod: function() {
        return window.addEventListener ? "addEventListener" : "attachEvent"
    },
    _refreshCSS: function(e) {
        var t = this._findPrevCPStyle(),
            s = document.createElement("style");
        s.type = "text/css", s.className = "cp-pen-styles", s.styleSheet ? s.styleSheet.cssText = e.css : s.appendChild(document.createTextNode(e.css)), this.head.appendChild(s), t && t.parentNode.removeChild(t), "prefixfree" === e.css_prefix && StyleFix.process()
    },
    _findPrevCPStyle: function() {
        for (var e = document.getElementsByTagName("style"), t = e.length - 1; t >= 0; t--)
            if ("cp-pen-styles" === e[t].className) return e[t];
        return !1
    }
};
CSSReload.init();</code></pre>