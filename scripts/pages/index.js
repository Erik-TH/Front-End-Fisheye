// async function getPhotographers() {
// 	// Penser à remplacer par les données récupérées dans le json
// 	const photographers = [
// 		{
// 			'name': 'Ma data test',
// 			'id': 1,
// 			'city': 'Paris',
// 			'country': 'France',
// 			'tagline': 'Ceci est ma data test',
// 			'price': 400,
// 			'portrait': 'account.png'
// 		},
// 		{
// 			'name': 'Autre data test',
// 			'id': 2,
// 			'city': 'Londres',
// 			'country': 'UK',
// 			'tagline': 'Ceci est ma data test 2',
// 			'price': 500,
// 			'portrait': 'account.png'
// 		},
// 	];
// 	// et bien retourner le tableau photographers seulement une fois
// 	return ({
// 		photographers: [...photographers, ...photographers, ...photographers]});
// }

// async function displayData(photographers) {
// 	const photographersSection = document.querySelector('.photographer_section');

// 	photographers.forEach((photographer) => {
// 		// eslint-disable-next-line no-undef
// 		const photographerModel = photographerFactory(photographer);
// 		const userCardDOM = photographerModel.getUserCardDOM();
// 		photographersSection.appendChild(userCardDOM);
// 	});
// }

// async function init() {
// 	// Récupère les datas des photographes
// 	const { photographers } = await getPhotographers();
// 	displayData(photographers);
// }
    
// init();

import { PhotographerApi } from "../api/PhotographerApi.js";
import { PhotographerFactory } from "../factories/PhotographerFactory.js";

async function displayData (photographers) {
	const photographersSection = document.querySelector('.section__photographers');
  
	photographers.forEach((photographer) => {
	  const photographerModel = new PhotographerFactory(photographer);
	  const userCardDOM = photographerModel.getUserCardDOM();
	  photographersSection.appendChild(userCardDOM);
	});
}
  
async function init () {
	const photographerApi = new PhotographerApi('../data/photographers.json');
	const { photographers } = await photographerApi.get();

	displayData(photographers);
}
  
init();
  