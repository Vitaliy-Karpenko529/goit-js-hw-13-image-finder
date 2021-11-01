import refs from './refs';
import imagesCardTpl from '../templates/imagesCard.hbs'
import ImgApiService from './apiService'
import { loadMoreBtn } from './apiService'
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const imgApiService = new ImgApiService();
const { searchForm, imagesContainer } = refs;

loadMoreBtn.refs.button.addEventListener('click', fetchImgs);
searchForm.addEventListener('submit', onSearch);
imagesContainer.addEventListener('click', onGalleryClickImages)


function onSearch(e) {
    e.preventDefault();
    
    imgApiService.query = e.currentTarget.elements.query.value

    if (imgApiService.query === '') {
        return  notice({
            text: 'Enter  word',
            delay: 500
        });
    }

    loadMoreBtn.show()
    imgApiService.resetPages()
    clearImagesContainer()
    fetchImgs()
}

async function fetchImgs() {
    loadMoreBtn.disable();
    const hits = await imgApiService.fetchImages()
    appendImgMarkup(hits);
    loadMoreBtn.enable();
}

 function appendImgMarkup(hits) {
        imagesContainer.insertAdjacentHTML('beforeend', imagesCardTpl(hits));
        const elem = document.querySelector(`[src='${hits[0].webformatURL}']`)
        elem.scrollIntoView({
           block: 'start', behavior: 'smooth',
       })
    }
    
    function clearImagesContainer() {
        imagesContainer.innerHTML = ''
    }
    
    function onGalleryClickImages(e) {
        e.preventDefault();
        if (e.target.nodeName !== "IMG") {
            return;
        }
        const bigImgURL = e.target.getAttribute('data-src')
        const instance = basicLightbox.create(`<img width="1400" height="900" src= ${bigImgURL}>`)
        instance.show()
}