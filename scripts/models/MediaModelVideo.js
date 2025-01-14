import { MediaModel } from "./MediaModel.js";

export class MediaVideo extends MediaModel {
	constructor (mediaData, photographerFolder) {
		super(mediaData, photographerFolder);

		this.video = mediaData.video;
	}

	getTargetDOM () {
		return `
			<video id="${this.id}"
			class="mediaCard__media"
			src="public/assets/photographers/${this.photographerFolder}/${this.video}"
			alt="${this.video}"/>
			</video>
			`;
	}

	getTargetLightboxDOM () {
		return `
		  <video 
			class="lightbox__media"
			controls
			src="public/assets/photographers/${this.photographerFolder}/${this.video}">
		  </video>
		`;
	}
	
}