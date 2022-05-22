class Photographer {
	constructor(data) {
		this.city = data.city;
		this.country = data.country;
		this.id = data.id;
		this.name = data.name;
		this.portrait = data.portrait;
		this.price = data.price;
		this.tagline = data.tagline;
		this.picture = `public/assets/photographers/Photographers%20ID%20Photos/${this.portrait}`;
	}
  
	getUserCardDOM () {
		return htmlToElement(`
      <article class="photographerCard">
        <a class="photographerCard__link" href="photographer.html?id=${this.id}" title="Lien vers le photographe ${this.name}" aria-label="Lien vers le photographe ${this.name}">
          <img class="photographerCard__img" src="${this.picture}" alt="${this.name}">
          <h2 class="photographerCard__title">${this.name}</h2>
        </a>
        <div class="photographerCard__infos">
          <p class="photographerCard__infos--location">${this.city}, ${this.country}</p>
          <p class="photographerCard__infos--tagline">${this.tagline}</p>
          <p class="photographerCard__infos--price">${this.price}€/jour</p>
        </div>
      </article>
    `);
	}

	getPhotographerInfo () {
		return `
		  <div class="photograph-profil__infos">
			<h1 class="photograph-profil__infos photograph-profil__infos--title">${this.name}</h1>
			<p class="photograph-profil__infos photograph-profil__infos--location">${this.city}, ${this.country}</p>
			<p class="photograph-profil__infos photograph-profil__infos--tagline">${this.tagline}</p>
		  </div>
		`;
	}

	getPhotographerImg () {
		return `
		  <div class="photograph-profil__portrait">
			<img class="photograph-profil__portrait" src="${this.picture}" alt="${this.name}">
		  </div>
		`;
	}

	getPhotographerContact () {
		return `
	  <div class="photograph-profil__contact">
		<button id="modal_btn--contact" class="btn--contact" aria-label="Contactez-moi">Contactez-moi</button>
	  </div>
	  `;
	}

	getPhotographerProfilDOM () {
		return document.createRange().createContextualFragment(
			this.getPhotographerInfo() + this.getPhotographerContact() + this.getPhotographerImg()
		);
	}

}