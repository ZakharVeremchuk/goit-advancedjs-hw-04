import iziToast from "izitoast";
import { lightbox } from './js/simplelightbox';
import { fetchImages } from './js/pixabay-api';
import { addPage, renderGallery } from './js/render-functions';

const inputField = document.querySelector(".searchfield");
const form = document.querySelector(".inputform");
const customLoader = document.getElementById('custom-loader');
const loadMoreBtn = document.querySelector('.load-more-button')
const gallery = document.querySelector('.gallery');
const loadingMessage = document.getElementById('loading-message');
let lastQuery = '';
let totalHits = 0;
let loadedHits = 0;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = event.target.elements.searchfield.value.trim();
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
    lastQuery = query;

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
                loadMoreBtn.style.display = 'none';
            } else {
                renderGallery(gallery, data.hits);
                lightbox.refresh();
                totalHits = data.totalHits;
                loadedHits = data.hits.length;
                loadMoreBtn.style.display = loadedHits < totalHits ? 'block' : 'none';
            }
        })
        .catch(() => {
            customLoader.style.display = 'none';
            loadingMessage.style.display = 'none';
            loadMoreBtn.style.display = 'none'
            iziToast.error({
                message: 'Something went wrong. Please try again later.',
                position: 'topRight'
            });
        });
})


loadMoreBtn.addEventListener("click", async() => {
    event.preventDefault();
    loadMoreBtn.style.display = 'none';
    customLoader.style.display = 'block';

    try {
        const data = await fetchImages(lastQuery);
        customLoader.style.display = 'none';
        addPage(gallery, data.hits);
        lightbox.refresh();
        loadedHits += data.hits.length;
        loadMoreBtn.style.display = loadedHits < totalHits ? 'block' : 'none';
        if(loadedHits == totalHits){
            iziToast.info({
                message: 'We are sorry, but you have reached the end of search results.',
                position: 'topRight'
            })
        }

        const firstCard = gallery.querySelector('.card');
        if (firstCard) {
            const cardHeight = firstCard.getBoundingClientRect().height;
            window.scrollBy({
                top: cardHeight * 2,
                behavior: 'smooth'
            });
        }
        
    } catch (error) {
        loadMoreBtn.style.display = 'none';
        customLoader.style.display = 'none';
        iziToast.error({
            message: 'Something went wrong. Please try again later.',
            position: 'topRight'
        });
    }
})


