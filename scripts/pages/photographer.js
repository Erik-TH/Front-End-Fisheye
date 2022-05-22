// variables

let currentPhotographer = null;
let currentPhotographerMedias = null;
let currentFilter = 'filter_popular';
// Code for action (enter (keyCode = 13) espace (keyCode = 32))
const codeAction = ['Enter', 'Space'];

// selectors

const lightbox = document.querySelector('#lightbox');
const closeLightbox = document.querySelector('.close_lightbox');
const lightboxMediaLeftContent = document.querySelector('.lightbox__content--leftColumn');
const filterSelectedElement = document.querySelector('.photograph-medias__filters--menu');
const filterListElement = document.querySelector('.photographMedias__filters--menu__list');
const filterItemsElement = document.querySelectorAll('.photographMedias__filters--menu__list > li');

// display functions

function displayPhotographerData () {
	const photographerSection = document.querySelector('.photograph-profil');
	const photographerProfilDOM = currentPhotographer.getPhotographerProfilDOM();
	photographerSection.appendChild(photographerProfilDOM);
}

async function init () {
	// Get id from URL
	const photographerId = parseInt(new URL(document.location).searchParams.get('id'));
	// Get photographers and medias
	// eslint-disable-next-line no-undef
	const photographerApi = new PhotographerApi('../../data/photographers.json');
	const { photographers, media } = await photographerApi.get();
	// Filter to get the currentPhotographer and his medias
	const photographer = photographers.filter(elt => elt.id === photographerId)[0];
	const medias = media.filter(elt => elt.photographerId === photographerId);
  
	// eslint-disable-next-line no-undef
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
}
  
init();