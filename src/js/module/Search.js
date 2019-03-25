
// Data Model for the Search
import axios from 'axios';
import {key,proxy} from '../config';
export default class Search{
    constructor(query){
        this.query = query;

    }
    async getSearchResult() {

          // installng axios - http
        try{
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`); //automatically return json
            this.result = res.data.recipes;
            //console.log(this.result);
        }
        catch(error){
           alert(error);
        }

    }
}






