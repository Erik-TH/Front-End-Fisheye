import { MediaImage } from "../models/MediaModelImage.js";
import { MediaVideo } from "../models/MediaModelVideo.js";

export class MediaFactory {
  constructor(mediaData, photographerFolder) {
    const type = "image" in mediaData ? "image" : "video";
    if (type === "image") {
      return new MediaImage(mediaData, photographerFolder);
    } else if (type === "video") {
      return new MediaVideo(mediaData, photographerFolder);
    }
  }
}
