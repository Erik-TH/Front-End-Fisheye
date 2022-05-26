class MediaImage extends Media {
	constructor (mediaData, photographerFolder) {
		super(mediaData, photographerFolder);

		this.image = mediaData.image;
	}

	// Target article media : mediaCard__media
	getTargetDOM () {
		return `
		<img id="${this.id}" class="mediaCard__media"
		src="public/assets/photographers/${this.photographerFolder}/${this.image}"
		alt="${this.title}"
		`;
	
	}
}