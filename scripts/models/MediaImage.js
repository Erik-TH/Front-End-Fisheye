class MediaImage extends Media {
	constructor (mediaData, photographerFolder) {
		super(mediaData, photographerFolder);

		this.image = mediaData.image;
	}
	getTargetDOM () {
		return`
        <img id="${this.id}"
        class="mediaCards__media"
        src="public/assets/photographers/${this.photographerFolder}/${this.image}
        alt="${this.title}"
        />`;
	}
}