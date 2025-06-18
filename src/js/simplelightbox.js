import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export const lightbox = new SimpleLightbox('.gallery .image-link', {
  captionsData: 'alt',
  captionDelay: 250,
});