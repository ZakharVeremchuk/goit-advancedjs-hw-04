// Функція для створення HTML-картки зображення
export function createImageCard(hit) {
  return `
    <li class="card">
      <a href="${hit.largeImageURL}" class="image-link" target="_blank" rel="noopener">
        <img 
          src="${hit.webformatURL}" 
          alt="${hit.tags}"
          class="image"/>
      </a>
      <div class="info">
        <div class="likes">
          <p class="title">Likes</p>
          <p class="value">${hit.likes}</p>
        </div>
        <div class="views">
          <p class="title">Views</p>
          <p class="value">${hit.views}</p>
        </div>
        <div class="comments">
          <p class="title">Comments</p>
          <p class="value">${hit.comments}</p>
        </div>
        <div class="downloads">
          <p class="title">Downloads</p>
          <p class="value">${hit.downloads}</p>
        </div>
      </div>
    </li>
  `;
}

// Функція для рендеру масиву карток у галерею
export function renderGallery(galleryElement, hits) {
  galleryElement.innerHTML = hits.map(createImageCard).join('');
}