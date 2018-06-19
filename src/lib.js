export default function library(userOptions) {

	this.options = userOptions !== undefined ? userOptions : {};

	const initLibrary = () => {
		this.setProperties();
		// set isAllSelected true or false
		this.isAllSelected();
		this.createSelect();
		this.createDropdown();
	};

	this.setProperties = () => {
		this.options.isOpen = this.options.isOpen === undefined ? false : this.options.isOpen;
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

	// get item with selector
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
				label = '',
				selected = optionHtml[0].textContent;
			for (let i = 0; i < optionHtml.length; i++) {
				let attachEvent = document.createElement('div');
				attachEvent.addEventListener('click', this.changeSelected);
				html += `<li class="tchapi-select__item" data-value='${optionHtml[i].value}' >${optionHtml[i].textContent}</li>`;
				if (item.parentNode.querySelector('label'))
					label = this.hasLabel(item);
				if (optionHtml[i].getAttribute('selected'))
					selected = optionHtml[i].textContent;

			}
			let selectHtml = `
			<div class="tchapi-select ${label.class}">
				<div class="tchapi-select__head">
					${label.text}
					<p class="tchapi-select__selected">${selected}</p>
				</div>
				<div class="tchapi-select__menu"> 
					<div class="tchapi-select__menuSize">
						<ul class="tchapi-select__list">${html}</ul>
					</div>
				</div>
			</div>`;
			let fragment = this.createDomSelect(selectHtml);
			let parentNode = item.parentNode;
			parentNode.insertBefore(fragment, item);
		});
	};

	// return value of label if select has label attached with name and for
	this.hasLabel = (item) => {
		const labels = [...item.parentNode.querySelectorAll('label')];
		let content = {};
		labels.forEach((label) => {
			if (label.getAttribute('for') === item.getAttribute('name')) {
				content.text = `<span class="tchapi-select__label">${label.textContent}</span>`;
				content.class = 'tchapi-select--activeSelected';
			}
			else if (item.previousElementSibling.nodeName === 'LABEL') {
				content.text = `<span class="tchapi-select__label">${item.previousElementSibling.textContent}</span>`;
				content.class = 'tchapi-select--activeSelected';
			}
		});
		return content;
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

	this.createDropdown = () => {
		const menus = [...document.querySelectorAll('.tchapi-select__menu')];
		for (let i = 0; i < menus.length; i++) {
			let menuSize = menus[i].querySelector('.tchapi-select__menuSize');
			this.setSize(false, menus[i], menuSize);
			this.setEvents(menus[i], i, menuSize);
		}
	};

	// query all selects and add a listener on each. Toggle classactive of select call function set size
	this.setEvents = (menu, i, menuSize) => {
		const select = document.querySelectorAll('.tchapi-select');
		select[i].addEventListener('click', () => {
			if (menu.style.height === '0px') {
				this.setSize(true, menu, menuSize);
				select[i].classList.toggle('tchapi-select--active', true);
			}
			else {
				this.setSize(false, menu, menuSize);
				select[i].classList.toggle('tchapi-select--active', false);
			}
		});
	};

	// set the size of menu params open : true (open), false (close)  menu : nodeItem ''
	this.setSize = (open, menu, menuSize) => {
		if (open) {
			menu.style.height = menuSize.offsetHeight + 'px';
		}
		else {
			menu.style.height = '0px';
		}
	};

	//

	this.setSelected = (e) => {
		e.preventDefault();

	};


	initLibrary();
	console.log('option zer', this.options);
};