import axios from 'axios';

export class PixabayAPI {

constructor() {
    this.page = 1;
    this.query = null;
  }

searchPhotos() {
    return axios.get(`https://pixabay.com/api/?key=32917411-0bf5fafbdbcee2600446b2252&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`);

}
}