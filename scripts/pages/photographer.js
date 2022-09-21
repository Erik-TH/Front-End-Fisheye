// variables

let currentPhotographer = null;
let currentPhotographerMedias = null;
let lightboxCurrentMediaId = null;
// set to popular by default
let currentFilter = 'filter_popular';
// Code for action (enter (keyCode press = 13) espace (keyCode press = 32))
const keyboardAction = ['Enter', 'Space'];

// selectors

// select button filter
const selectFilter = document.querySelector('.photographMedias__filtersMenu__active');
// button filter ul
const selectFilterList = document.querySelector('.photographMedias__filtersMenu__active--list');
// button filter li
const selectFilterListLink = document.querySelectorAll('.photographMedias__filtersMenu__active--list > li');

const lightbox = document.querySelector('#lightbox');
const lightboxClose = document.querySelector('.lightboxClose');
const lightboxMediaLeftContent = document.querySelector('.lightbox__content--leftColumn');

// display functions

function displayPhotographerData () {
	const photographerSection = document.querySelector('.photograph-profil');
	const photographerProfilDOM = currentPhotographer.getPhotographerProfilDOM();
	photographerSection.appendChild(photographerProfilDOM);
}

// bottom advertising insert
function displayInsertData () {
	const advertisingInsertSection = document.querySelector('.advertisingInsert');

	// Count total media likes and assign to photographer
	let totalPhotographerLikes = 0;
	currentPhotographerMedias.forEach(media => {
		totalPhotographerLikes += media.likes;
	});
	currentPhotographer.totalLikes = totalPhotographerLikes;
	const advertisingInsertDOM = currentPhotographer.getAdvertisingInsertDOM();
	advertisingInsertSection.appendChild(advertisingInsertDOM);
}

// display medias section cards grid
function displayMediaCards () {
	const mediaSection = document.querySelector('.mediaCards');

	mediaSection.textContent = '';
	currentPhotographerMedias.forEach(media => {
		const mediaCardsDOM = media.getMediaCardsDOM();
		mediaSection.appendChild(mediaCardsDOM);
		likesCounter (media.id);
		// 
		addEventListenersToCard (mediaCardsDOM);
	});
}

// display media in lightbox
function displayMediaLightbox (media) {
	const lightboxMediaContent = document.querySelector('.lightbox__content--middleColumn');
	if (document.body.contains(lightboxMediaContent)) lightboxMediaContent.remove();
	const mediaDOMElement = media.getMediaLightboxDOM();
	lightboxMediaLeftContent.after(mediaDOMElement);
	lightboxCurrentMediaId = media.id;
}

function lightboxMediaId (mediaId) {
	const selectedMedia = currentPhotographerMedias.filter((media) => media.id === mediaId)[0];
	displayMediaLightbox(selectedMedia);
	lightbox.showModal();
}

function addEventListenersToCard (card) {

	card.addEventListener('click', (e) => {
		const stringId = e.target.id;
		const mediaId = Number(stringId.replace('media--', ''));
		if (!e.target.classList.contains('fa-heart') && !e.target.classList.contains('media__infos--title') && !e.target.classList.contains('media__infos--likes') && !e.target.classList.contains('fillLike') && !e.target.classList.contains('media__infos')) lightboxMediaId (mediaId);
	});
	
	// Add eventListener on enter/space to display media
	card.addEventListener('keydown', (e) => {
		const stringId = e.target.id;
		const mediaId = Number(stringId.replace('media--', ''));
		if (keyboardAction.includes(e.code) && !e.target.classList.contains('fa-heart') && !e.target.classList.contains('media__infos--title')) lightboxMediaId (mediaId);
	});

}

function insertPhotographerModalDOM () {
	const mainSection = document.querySelector('main');
	const modalDOM = currentPhotographer.getPhotographerModalDOM();
	mainSection.after(modalDOM);
}

function modalUtilities () {
	insertPhotographerModalDOM ();
	const modal = document.querySelector('#contact_modal');
	const openModal = document.querySelector('#modal_btn--contact');
	const closeModal = document.querySelector('.close_modal');
	const form = document.querySelector('#form');
  
	openModal.addEventListener('click', () => {
		modal.showModal();
	});
  
	closeModal.addEventListener('click', () => {
		modal.close();
	});
  
	form.addEventListener('submit', (e) => {
	// Can use 'form' or 'e.target'
		const formData = new FormData(e.target);
		// Using reduce with object decomposition
		console.log(
			[...formData.entries()].reduce(
				(previousValue, currentValue) => {
					previousValue[currentValue[0]] = currentValue[1];
					return previousValue;
				},
				{}
			)
		);
		form.reset();
	});
}

function lightboxUtilities () {
	const nextSlideButton = document.querySelector('.lightbox__rightButton');
	const previousSlideButton = document.querySelector('.lightbox__leftButton');
	const lightbox = document.querySelector('#lightbox');
  
	const displayNewMedia = (button, newMediaIndex) => {
		let media = currentPhotographerMedias[newMediaIndex];
		// Display new item
		displayMediaLightbox(media);
		// Define current item
		lightboxCurrentMediaId = media.id;
		// Focus
		button.focus();
	};
	
	const nextSlide = () => {
	// Check if current item is last and define next item
		const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lightboxCurrentMediaId);
		let nextMediaIndex;
		if (lighboxCurrentMediaIndex === currentPhotographerMedias.length - 1) {
			nextMediaIndex = 0;
		} else {
			nextMediaIndex = lighboxCurrentMediaIndex + 1;
		}
		displayNewMedia (nextSlideButton, nextMediaIndex);
	};
  
	const previousSlide = () => {
	// Check if current item is first and define next item
		const lighboxCurrentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === lightboxCurrentMediaId);
		let nextMediaIndex;
		if (lighboxCurrentMediaIndex === 0) {
			nextMediaIndex = currentPhotographerMedias.length - 1;
		} else {
			nextMediaIndex = lighboxCurrentMediaIndex - 1;
		}
		displayNewMedia (previousSlideButton, nextMediaIndex);
	};
  
	nextSlideButton.addEventListener('click', nextSlide);
	previousSlideButton.addEventListener('click', previousSlide);
	nextSlideButton.addEventListener('keydown', e => {
		if (keyboardAction.includes(e.code)) nextSlide ();
	});
	previousSlideButton.addEventListener('keydown', e => {
		if (keyboardAction.includes(e.code)) previousSlide ();
	});
	lightbox.addEventListener('keydown', e => {
		if (lightbox.hasAttribute('open')) {
			if (e.code === 'ArrowLeft') previousSlide ();
			if (e.code === 'ArrowRight') nextSlide ();
		}
	});
	lightboxClose.addEventListener('click', () => {
		lightbox.close();
	});
	lightboxClose.addEventListener('keydown', (e) => {
		if (keyboardAction.includes(e.code)) {
			lightbox.close();
		}
	});
}

function filterActions () {

	selectFilterListLink.forEach(element => {
		
		element.addEventListener('click', (e) => {
			activeFilter (e);
		});

		// keydown event is fired for all keys unlike keypress
		element.addEventListener('keydown', (e) => {
			if (keyboardAction.includes(e.code)) {
				e.preventDefault();
				activeFilter (e);
			}
		});

		element.addEventListener('focus', (e) => {
			selectFilterList.setAttribute('aria-activedescendant', e.target.id);
		});
	});

	// menu drop down
	selectFilter.addEventListener('click', () => {
		toggleFilterMenu();
	});

	// close menu by click or escape key

	// click outside menu to close
	document.addEventListener('click', () => {
		// if open : === true
		if (selectFilter.getAttribute('aria-expanded') === 'true' && !(e.target.getAttribute('role') === 'listbox') && !(e.target.getAttribute('id') === 'sortingButton')) {
			toggleFilterMenu ();
		}
	});

	// escape key to close

	document.addEventListener('keydown', (e) => {
		if (selectFilter.getAttribute('aria-expanded') === 'true') {
			if (e.code === 'Escape') {
				toggleFilterMenu();
			}
		}
	});
}

function activeFilter (event) {
	let currentFilter = event.target;
	sortMedias (currentFilter.id);

	// inject icon FA chevron down in dropped down menu
	selectFilter.innerHTML - `${currentFilter.textContent}<i class="fa-solid fa-chevron-down"></i>`;

	// remove current sorting - criteria aria-current
	selectFilterListLink.forEach(element => element.removeAttribute('aria-current'));
	
	// add new selection
	currentFilter.setAttribute('aria-current', true);

	toggleFilterMenu();
	displayMediaCards();
	// add focus()
	selectFilter.focus();
}

// toggle filter menu
function toggleFilterMenu () {
	selectFilter.classList.toggle('displaNone');
	selectFilterList.classList.toggle('displayNone');


	// add attribute to element - expend
	selectFilter.setAttribute(

		'aria-expended',
		// set opposite value
		selectFilter.getAttribute('aria-expended') === 'false'

	);
}


// display by filter
function sortMedias (filter) {
	currentPhotographerMedias.sort((a, b) => {
		if (filter === 'filter_popular') return b.likes - a.likes;
		if (filter === 'filter_date') return b.date.localeCompare(a.date);
		if (filter === 'filter_title') return a.title.localeCompare(b.title);
	});
	currentFilter = filter;
}

// 
function likesCounter (mediaId) {
	const likeButton = document.querySelector(`#likes--${mediaId}`);
	likeButton.addEventListener('click', () => {
		heartFilledMedia (mediaId);
	});
	likeButton.addEventListener('keydown', e => {
		const keyboardAction = e.code;
		if (keyboardAction.includes(keyboardAction)) heartFilledMedia (mediaId);
	});
}


function heartFilledMedia (mediaId) {
	const currentMediaIndex = currentPhotographerMedias.findIndex((media) => media.id === mediaId);
	const currentMediaCardNode = document.querySelector(`#media--${mediaId}`);
	const currentMedia = currentPhotographerMedias[currentMediaIndex];
	// heartFilled
	currentMedia.heartFilled ();
	if (currentMedia.isLiked) {     
		currentPhotographer.addLike ();
		if (currentFilter !== 'filter_popular') return;
		// If first element, no need to swap it will keep first
		if (currentMediaIndex > 0) {
			const previousMedia = currentPhotographerMedias[currentMediaIndex - 1];
			if (previousMedia.likes < currentMedia.likes) {
				swapNodeFilter (currentMediaCardNode, currentMediaCardNode.previousElementSibling);
			}
		}
	} else {
		currentPhotographer.removeLike ();
		if (currentFilter !== 'filter_popular') return;
		// If last element, no need to swap it will keep last
		if (currentMediaIndex < currentPhotographerMedias.length - 1) {
			const nextMedia = currentPhotographerMedias[currentMediaIndex + 1];
			if (nextMedia.likes > currentMedia.likes) {
				swapNodeFilter (currentMediaCardNode, currentMediaCardNode.nextElementSibling);
			}
		}
	}
}

function swapNodeFilter (nodeA, nodeB) {
	sortMedias ('filter_popular');
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
	// Move `nodeA` to before the `nodeB`
	nodeB.parentNode.insertBefore(nodeA, nodeB);
	// Move `nodeB` to before the sibling of `nodeA`
	parentA.insertBefore(nodeB, siblingA);
}

async function init () {
	// Get id from URL
	const photographerId = parseInt(new URL(document.location).searchParams.get('id'));
	// Get photographers and medias
	const photographerApi = new PhotographerApi('../../data/photographers.json');
	const { photographers, media } = await photographerApi.get();
	// Filter to get the currentPhotographer and their medias
	const photographer = photographers.filter(elt => elt.id === photographerId)[0];
	const medias = media.filter(elt => elt.photographerId === photographerId);
  
	currentPhotographer = new PhotographerFactory(photographer);
	const photographersFolders = {
		243: 'Mimi',
		930: 'Ellie Rose',
		82:  'Tracy',
		527: 'Nabeel',
		925: 'Rhode',
		195: 'Marcel'
	};
	console.log(photographersFolders);

	currentPhotographerMedias = medias.map(elt => new MediaFactory(elt, photographersFolders[photographerId]));
  
	displayPhotographerData ();
	sortMedias(currentFilter);
	displayMediaCards();
	displayInsertData();
	lightboxUtilities();
	modalUtilities();
	filterActions();
}
  
init();