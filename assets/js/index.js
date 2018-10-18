/* ================== */
// Config Area
/* ================== */
let icon_config = {
	tag: 'label',
	about: 'person',
	author: 'person',
	lab: 'school'
}


document.addEventListener('DOMContentLoaded', () => {
	// Test area



	// replace icon
	{
		document.querySelectorAll('.material-icons').forEach(el => {
			const key = el.textContent
			if (key in icon_config) el.textContent = icon_config[key]
		})
	}

	// To top & Head Bar & Ribbon & Footer
	{
		const to_top = document.querySelector('#to-top')
		const head_bar = document.querySelector('#head-bar')
		to_top.addEventListener('click', () => {
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth'
			})
		})
		window.onscroll = () => {
			if (this.scrollY > 200) {
				head_bar.classList.add('head-bar-scrolled')
				to_top.classList.add('to-top-show')
			}
			else {
				head_bar.classList.remove('head-bar-scrolled')
				to_top.classList.remove('to-top-show')
			}
		}
		const cpr_year = document.querySelector('.copyright-year')
		const now = new Date()
		cpr_year.innerText = cpr_year.innerText.slice(0, 5) + now.getFullYear() + cpr_year.innerText.slice(5, cpr_year.innerText.length)
	}

	// Ripple
	{
		let ripple_el = document.querySelectorAll('.mdc-ripple-surface')
		ripple_el.forEach(el => {
			window.mdc.ripple.MDCRipple.attachTo(el)
		})
	}

	// Sort card
	if (document.querySelector('.waterfall')) {
		let waterfall = document.querySelector('.waterfall')
		let column = getComputedStyle(waterfall).columnCount
		let cards = [...waterfall.children]
		let size = cards.length
		let new_cards = Array(cards.length)
		let get_pos = (x, sz, col) => {
			const r = Math.floor(x / col)
			const c = x % col
			const c_x = Math.floor(sz / col)
			const c_y = sz % col
			if (c < c_y) return c * c_x + c + r
			else return c * c_x + c_y + r
		}
		for (let i = 0; i < size; i++) {
			const pos = get_pos(i, cards.length, column)
			new_cards[pos] = i
		}
		new_cards.reverse()
		new_cards.forEach(i => {
			waterfall.insertBefore(cards[i], waterfall.firstChild)
		})
	}


	// Drawer
	{
		const menu = document.querySelector('#menu-button')
		const nav = document.querySelector('.mdc-drawer')
		const listEl = document.querySelector('.mdc-drawer .mdc-list')
		menu.addEventListener('click', () => {
			nav.MDCDrawer.open = true
		})
		listEl.addEventListener('click', () => {
			nav.MDCDrawer.open = false
		})

		// fix tag current help
		const tag_list = document.querySelectorAll('.drawer-tag')
		tag_list.forEach((el) => {
			if (el.getAttribute('href') === window.location.href)
				el.classList.add('mdc-list-item--activated')
		})

		// Fix situation where no elements are activated
		const activated = document.querySelectorAll('.mdc-list-item--activated')
		if (!activated.length) {
			listEl.firstElementChild.classList.add('mdc-list-item--activated')
		}
	}

	// Article
	{
		const article = document.querySelector('.post-article-content')
		const add_class = (els, name) => {
			els.forEach(el => {
				el.classList.add(name)
			})
		}
		if (article) {
			for (let i = 1; i < 5; i++) {
				const h = article.querySelectorAll('h' + i)
				h.forEach(el => {
					el.classList.add('mdc-typography--headline' + i)
				})
			}
			const p = article.querySelectorAll('p')
			add_class(p, 'mdc-typography--body1')

			const img = article.querySelectorAll('img')
			add_class(img, 'img-zoomable')
			const wide_figure = article.querySelectorAll('.kg-width-wide, .kg-width-full')
			add_class(wide_figure, 'mdc-elevation--z4')

		}

	}

	/*=============================*/
	// HighLight Function
	/*=============================*/

	window.mdc.autoInit()
})


