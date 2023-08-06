var Feed = function() {
	var itemElement;
	var getFeed = function(url) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) printFeedContent(xhr.responseText);
		};
		xhr.open('GET', "fetchFeed.php?url=" + url);
		xhr.send();
	};

	var printFeedContent = function(content) {
		var div = document.createElement("div");
		div.innerHTML = content;
		itemElement.appendChild(div);
	};

	var fetchUrl = function(el, url) {
		itemElement = el;
		getFeed(url);
	};

	return {
		fetchUrl : fetchUrl
	};
}();