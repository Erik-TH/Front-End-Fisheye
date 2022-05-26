class MediaVideo extends Media {
	constructor (mediaData, photographerFolder) {
		super(mediaData, photographerFolder);

		this.video = mediaData.video;
	}

	// getTargetDOM () {
	// 	return `
    //   <i class="fa-solid fa-video"></i>
    //   <video id="${this.id}" class="mediaCard__media open_lightbox" src="public/assets/photographers/${this.photographerFolder}/${this.video}">
    //   </video>
    // `;
	// }

	getTargetDOM () {
		return `
			<video id="${this.id}"
			class="mediaCards__media"
			src="public/assets/photographers/${this.photographerFolder}/${this.video}"
			alt="${this.video}"/>
			</video>
			`;
	}
	
}