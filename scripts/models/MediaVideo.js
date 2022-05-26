class MediaVideo extends Media {
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
	
}