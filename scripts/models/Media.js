class Media {
	constructor (mediaData, photographerFolder) {
		this.date = mediaData.date;
		this.id = mediaData.id;
		this.likes = mediaData.likes;
		this.photographerId = mediaData.photographerId;
		this.price = mediaData.price;
		this.title = mediaData.title;

		this.photographerfolder =  photographerFolder;
	}

	getMediaCardsDOM () {
		return HTMLOListElement(`
        ${this.getTargetDOM}
        <div class="mediaCards__infos">
            <p class="mediaCards__infos--title">${this.title}</p>
        </div>
        `);
	}
}