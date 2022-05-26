// variables

let currentPhotographer = null;
let currentPhotographerMedias = null;
// set to popular by default
let currentFilter = 'filter_popular';
// Code for action (enter (keyCode = 13) espace (keyCode = 32))
const keyboardAction = ['Enter', 'Space'];

// selectors

const lightbox = document.querySelector('#lightbox');
const closeLightbox = document.querySelector('.close_lightbox');
const lightboxMediaLeftContent = document.querySelector('.lightbox__content--leftColumn');
const filterSelectedElement = document.querySelector('.photograph-medias__filters--menu');
const filterListElement = document.querySelector('.photograph-medias__filters--menu__list');
const filterItemsElement = document.querySelectorAll('.photograph-medias__filters--menu__list > li');

// display functions

function displayPhotographerData () {
	const photographerSection = document.querySelector('.photograph-profil');
	const photographerProfilDOM = currentPhotographer.getPhotographerProfilDOM();
	photographerSection.appendChild(photographerProfilDOM);
}

function displayMediasCards () {
	const mediaSection = document.querySelector('.mediaCards');

	mediaSection.textContent = '';
	currentPhotographerMedias.forEach(media => {
		const mediaCardsDOM = media.getMediaCardsDOM();
		mediaSection.appendChild(mediaCardsDOM);
	})
}

function sortMedias (filter) {
	currentPhotographerMedias.sort((a, b) => {
		if (filter === 'filter_popular') return b.likes - a.likes;
		if (filter === 'filter_date') return b.date.localeCompare(a.date);
		if (filter === 'filter_title') return a.title.localeCompare(b.title);
	});
	currentFilter = filter;
}

async function init () {
	// Get id from URL
	const photographerId = parseInt(new URL(document.location).searchParams.get('id'));
	// Get photographers and medias
	const photographerApi = new PhotographerApi('../../data/photographers.json');
	const { photographers, media } = await photographerApi.get();
	// Filter to get the currentPhotographer and his medias
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
  
	displayPhotographerData ();
	sortMedias(currentFilter);
	displayMediasCards();
}
  
init();