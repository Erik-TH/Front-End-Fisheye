import { htmlToElement } from "../utils/htmlToElement.js";

export class PhotographerModel {
	constructor(data) {
		this.city = data.city;
		this.country = data.country;
		this.id = data.id;
		this.name = data.name;
		this.portrait = data.portrait;
		this.price = data.price;
		this.tagline = data.tagline;
		
		// 
		this.totalLikes = 0;

		this.picture = `public/assets/photographers/Photographers%20ID%20Photos/${this.portrait}`;
	}

	getUserCardDOM () {
		return htmlToElement(`
		<article class="photographerCard">
        	<a class="photographerCard__link" href="photographer.html?id=${this.id}" title="Lien vers le photographe ${this.name}" aria-label="Lien vers le photographe ${this.name}">
				<img class="photographerCard__portrait" src="${this.picture}" alt="${this.name}">
          		<h2 class="photographerCard__title">${this.name}</h2>
        	</a>
        	<div class="photographerCard__infos">
          		<p class="photographerCard__infos photographerCard__infos--location">${this.city}, ${this.country}</p>
          		<p class="photographerCard__infos photographerCard__infos--tagline">${this.tagline}</p>
          		<p class="photographerCard__infos photographerCard__infos--price">${this.price}€/jour</p>
        	</div>
      	</article>
    	`);
	}

	getPhotographerInfos () {
		return `
		<div class="photographer-profil__infos">
			<h1 class="photograph-profil__infos photograph-profil__infos--title">${this.name}</h1>
			<p class="photograph-profil__infos photograph-profil__infos--location">${this.city}, ${this.country}</p>
			<p class="photograph-profil__infos photograph-profil__infos--tagline">${this.tagline}</p>
		</div>
		`;
	}

	getPhotographerPortrait () {
		return `
		<div class="photograph-profil__portrait">
			<img class="photograph-profil__portrait" src="${this.picture}" alt="${this.name}">
		</div>
		`;
	}

	getPhotographerContact () {
		return `
		<div class="photograph-profil__contact">
			<button id="modal_btn--contact" class="btn btn--contact" aria-label="Contactez-moi">Contactez-moi</button>
	  	</div>
	  	`;
	}

	getPhotographerProfilDOM () {
		return document.createRange().createContextualFragment(
			this.getPhotographerInfos() + this.getPhotographerContact() + this.getPhotographerPortrait()
		);
	}

	// Advertising Insert - bottom page
	getAdvertisingInsertDOM () {
		return document.createRange().createContextualFragment(`
		  <p class="advertisingInsert_infos">
		  	<span id="advertisingInsert__totalLikes">${this.totalLikes}</span>
		  	<span class="fa-solid fa-heart"></span>
		  </p>
		  <p>${this.price}€ / jour</p>
		`);
	}
	
	
	// add or remove like count
	addLike () {
		this.totalLikes++;
		this.advertisingInsertDOM ();
	}
	
	removeLike () {
		this.totalLikes--;
		this.advertisingInsertDOM ();
	}
	
	// to add
	advertisingInsertDOM () {
		const totalPhotographerLikesElement = document.querySelector('#advertisingInsert__totalLikes');
		totalPhotographerLikesElement.textContent = this.totalLikes;
	}

	getPhotographerModalDOM () {
		return htmlToElement(`
		  <dialog class="modal" id="contact_modal" aria-labelledby="modalTitle">
			  <header>
				<h2 id="modalTitle">Contactez-moi<br>${this.name}</h2>
				<img class="close_modal" src="public/assets/icons/close.svg" alt="Fermez la modale" tabindex="0" />
			  </header>
			  <form id="form" method="dialog">
				<div>
				  <label id="label_first" for="first">Prénom</label>
				  <input type="text" id="first" name="first" aria-labelledby="label_first" />
				</div>
				<div>
				  <label id="label_last" for="last">Nom</label>
				  <input type="text" id="last" name="last" aria-labelledby="label_last" />
				</div>
				<div>
				  <label id="label_email" for="email">Email</label>
				  <input type="email" id="email" name="email" aria-labelledby="label_email" />
				</div>
				<div>
				  <label id="label_message" for="message">Votre message</label>
				  <textarea id="message" name="message" aria-labelledby="label_message"></textarea>
				</div>
				<button class="btn btn--contact" aria-label="Envoyer">Envoyer</button>
			  </form>
		  </dialog>
		`);
	}
}