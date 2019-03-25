
import uniqid from 'uniqid';

export default class List {
    constructor(){

        this.items = [];


    }
    //unidid(.)
    addItem(count,unit, ingredient){
        const item = {
            id:uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }
    deleteItem(id)
    {
        const index = this.items.findIndex(el => el.id === id);
          // splice() requires a start and ending array == [2,4,8] splice(1,1) => returns 4 , original array  [2,8]
        //  above method is similar to slice() if [2,4,8] slice(1,1) it will return 4 , original array is [2,4,8]
        this.items.splice(index,1);
    }

    updateCount(id,newCount)
    {
        this.items.find(el => el.id === id).count = newCount;
    }
}