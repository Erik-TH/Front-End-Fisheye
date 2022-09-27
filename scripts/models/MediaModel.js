import { displayTemplate } from "../utils/displayTemplate.js";

export class MediaModel {
	constructor (mediaData, photographerFolder) {
		this.date = mediaData.date;
		this.id = mediaData.id;
		this.likes = mediaData.likes;
		this.photographerId = mediaData.photographerId;
		this.price = mediaData.price;
		this.title = mediaData.title;

		this.photographerFolder = photographerFolder;
	}

	// Heart on/off
	heartFilled () {
		this.isLiked = !this.isLiked;
		if (this.isLiked) {
			this.likes++;
		} else {
			this.likes--;
		}
		this.mediaCardLikesDOM ();
	}
	
	mediaCardLikesDOM () {
		const likeButton = document.querySelector(`#likes--${this.id}`);
		const totalMediaLikesElement = document.querySelector(`#totalMedialikes--${this.id}`);
		totalMediaLikesElement.textContent = this.likes;
		if (likeButton.classList.contains('fa-solid')) {
			likeButton.classList.remove('fa-solid');
			likeButton.classList.add('fa-regular');
		} else {
			likeButton.classList.add('fa-solid');
			likeButton.classList.remove('fa-regular');
		}
	}

	getGalleryDOM () {

		const heartLikeCount = this.isLiked ? 'fa-solid' : 'fa-regular';

		return displayTemplate(`
		<article class="mediaCard" id="media--${this.id}" tabindex="0">
			
		${this.getTargetDOM()}

			<div class="mediaCard__infos">

				<p class="mediaCard__infos--title">${this.title}</p>

				<p class="mediaCard__infos--likes">
					<span class="fillLike"
						id="totalMedialikes--${this.id}"
						aria-label="Total likes">${this.likes}
					</span>
					<span id="likes--${this.id}"
						class="${heartLikeCount} fa-heart"
						aria-label="like" tabindex="0">
					</span>
				</p>

			</div>
        </article>
        `);
	}

	getMediaLightboxDOM () {
		return displayTemplate(`
		  <div class="lightbox__content--middleColumn">
			<div class="lightbox__mediaContent" aria-label="${this.title}, vue rapprochée">
			  ${this.getTargetLightboxDOM()}
			</div>
			<h2 class"ligthbox__mediatitle>${this.title}</h2>
		  </div>
		`);
	}
}