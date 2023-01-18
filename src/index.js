import { PixabayAPI } from './PixabayAPI.js';
import { Notify } from 'notiflix';

const searchForm = document.querySelector('.search-form');
const photosGallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();


const onSearchFormSubmit = async event => {
    event.preventDefault();
    
    pixabayAPI.query = event.currentTarget.searchQuery.value;
    pixabayAPI.page = 1;

    try {
    const { data } = await pixabayAPI.searchPhotos();

        if (!data.hits.length) {
            alert('oops!')
            event.target.reset();
            photosGallery.innerHTML = '';
            loadMoreBtn.classList.add('is-hidden');
            return;
        } else if ((data.hits.length * pixabayAPI.page) < 40) {
        //alert("We're sorry, but you've reached the end of search results");
        renderPhotos(data.hits);
        console.log(data.hits.length);
            console.log(data.totalHits);
            console.log(data.hits.length * pixabayAPI.page);
        }  else { 
        renderPhotos(data.hits);
        console.log(data);
            loadMoreBtn.classList.remove('is-hidden');  
    }

    } catch(error) {
        console.log(error);
    } 
};


const onLoadBtnClick = async event => {
    pixabayAPI.page += 1;

try {
    const { data } = await pixabayAPI.searchPhotos();
        if ((data.hits.length * pixabayAPI.page) <= 40) {
            //alert("We're sorry, but you've reached the end of search results");
            renderPhotos(data.hits);
            console.log(data.hits.length);
                console.log(data.totalHits);
                loadMoreBtn.classList.add('is-hidden');
            } 
    renderPhotos(data.hits);
    console.log(data.hits.length);
    console.log(data.totalHits);
    console.log(data.hits.length * pixabayAPI.page);
    
} catch(error) {
    console.log(error);
} 
};




function renderPhotos(arr) {

     const markup = arr.map(({ webformatURL, tags, likes, views, comments, downloads}) => {
return `<div class="photo-card">
         <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${likes}
          </p>
          <p class="info-item">
            <b>Views</b> ${views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${downloads}
          </p>
        </div>
      </div>`
    }).join('');
photosGallery.insertAdjacentHTML('beforeend', markup); 
}


searchForm.addEventListener('submit', onSearchFormSubmit);
loadMoreBtn.addEventListener('click', onLoadBtnClick);
