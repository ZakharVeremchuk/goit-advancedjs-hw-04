import iziToast from "izitoast";
import { lightbox } from './js/simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';

const inputField = document.querySelector(".searchfield");
const form = document.querySelector(".inputform");
const customLoader = document.getElementById('custom-loader');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const loadingMessage = document.getElementById('loading-message');
    const query = event.target.elements.searchfield.value.trim();
    const gallery = document.querySelector('.gallery');
    customLoader.style.display = 'block';

    if (!query) {
        customLoader.style.display = 'none';
        iziToast.warning({
            message: 'Please enter a search query!',
            position: 'topRight'
        });
        loadingMessage.style.display = 'none';
        return;
    }

    loadingMessage.style.display = 'block';
    gallery.innerHTML = '';

    fetchImages(query)
        .then((data) => {
            customLoader.style.display = 'none';
            loadingMessage.style.display = 'none';
            if(data.hits.length == 0) {
                event.target.elements.searchfield.value = '';
                iziToast.error({
                    message: 'Sorry, there are no images mathcing your search query. Please try again!',
                    position: 'topRight'
                })
            } else {
                renderGallery(gallery, data.hits);
                lightbox.refresh();
            }
        })
        .catch(() => {
            customLoader.style.display = 'none';
            loadingMessage.style.display = 'none';
        });
})


