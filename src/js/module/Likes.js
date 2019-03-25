//Similar to List Class
//Subclassing is used here
export default  class Likes {
    constructor(){
        this.likes = [];
    }
    addLikes(id,title,author,img){
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);

        //persist the data in local storage
        this.persistData();
        return like;
    }

    deleteLike(id){
        const index = this.likes.findIndex(el => el.id === id);
         this.likes.splice(index,1);

         //Persist
        this.persistData();
    }

    isLiked(id)
    {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumbeOfLikes(){
        return this.likes.length;
    }

    persistData(){
        localStorage.setItem('Likes',JSON.stringify(this.likes));
    }

    readStorage(){
        const storage = JSON.parse(localStorage.getItem('Likes'));
        //Restoring from the local storage
        if(storage) this.likes = storage;
    }
}