import LoadMoreBtn from './loadMoreBtn';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';

const API_KEY = '24134300-00541668bcca34b3aaf1e0ab3'
const BASE_URL = `https://pixabay.com/api/`

export const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

export default class ImgApiService{
    constructor() {
        this.searchQuery = ''
        this.page = 1
    }

   async fetchImages() {
        const params = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`
       const URL = BASE_URL + params

       try {
        const result = await fetch(URL)
           const { hits } = await result.json()
            this.incrementPage();
                if (hits.length === 0) {
                    error({
                        title: 'Not found',
                        delay: 500,
                    })
                    loadMoreBtn.hide()
                    return []
                }
            return hits;
       } catch (error) {
           console.log(error); 
       }
       
    }

     incrementPage() {
    this.page += 1;
  }

    resetPages() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
}