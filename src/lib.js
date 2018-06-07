export default function library(userOptions) {

	this.options = userOptions !== undefined ? userOptions : {};

	const initLibrary = () => {
		// set isAllSelected true or false
		this.isAllSelected();
		this.createSelect();
	};

	// check if user pass selector or not
	this.isAllSelected = () => {
		if (this.options.selector) {
			this.initSelectors();
		}
		else {
			this.options.items = [...document.querySelectorAll('select')];
		}
	};

	// recup item with selector
	this.initSelectors = () => {
		if (Array.isArray(this.options.selector)) {
			this.options.items = [...document.querySelectorAll([...this.options.selector])];
		}
		else if (typeof this.options.selector === 'string') {
			this.options.items = [...document.querySelectorAll(this.options.selector)];
		}
		else {
			console.log('wrong type in \'selector\' section');
		}
	};

	this.createSelect = () => {
		this.options.items.forEach((item) => {
			const optionHtml = [...item.querySelectorAll('option')];
			let html = '',
				selected = optionHtml[0].value;
			for (let i = 0; i < optionHtml.length; i++) {
				html += `<li>${optionHtml[i].value}</li>`;
				if (optionHtml[i].getAttribute('selected')) {
					selected = optionHtml[i].value;
				}
			}
			let selectHtml = `<p>${selected}</p><div><ul>${html}</ul></div>`;
			let fragment = this.createDomSelect(selectHtml);
			// You can use native DOM methods to insert the fragment:
			console.log('item', item);
			document.body.insertBefore(fragment, item);
		});
	};

	this.createDomSelect = (htmlStr) => {
		let frag = document.createDocumentFragment(),
			temp = document.createElement('div');
		temp.innerHTML = htmlStr;
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	};


	initLibrary();
	console.log('option zer', this.options);
};