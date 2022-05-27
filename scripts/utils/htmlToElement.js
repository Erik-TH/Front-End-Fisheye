/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
	let template = document.createElement('template');
	html = html.trim(); // txt node white space
	template.innerHTML = html;
	return template.content.firstChild;
}
