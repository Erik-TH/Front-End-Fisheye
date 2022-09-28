export class PhotographerApi {
  constructor(url) {
    this._url = url;
  }

  async get() {
    return fetch(this._url)
      .then((res) => res.json())
      .catch((err) => console.log("error", err));
  }
}
