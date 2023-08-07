export function toggleClass(el: HTMLElement, class1: string, class2: string) {
	if (el) {
		el.className = el.className == class2 ? class1 : class2;
	}
}

export function toggle(el: HTMLElement, cname: string) {
	if (el.className.match(cname)) {
		el.className = el.className.replace(cname, '');
	} else {
		el.className += ' ' + cname;
	}
}
