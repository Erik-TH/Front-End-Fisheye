// function displayModal() {
//     const modal = document.getElementById("contact_modal");
// 	modal.style.display = "block";
// }

// function closeModal() {
//     const modal = document.getElementById("contact_modal");
//     modal.style.display = "none";
// }


class contactForm {
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