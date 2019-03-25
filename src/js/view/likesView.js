import {element} from "./base";
import {limitRecipeTitle} from './searchView';
export const toggleLikeBtn = isLiked => {

    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#${iconString}`);
    //icons.svg#icon-heart-outlined
};

export const toggleLikeMenu = noOfLikes => {

element.likeMenu.style.visibility = noOfLikes > 0 ? 'visible' : 'hidden';

};

export const renderLike = like => {

    const markup = `
         <li>
                            <a class="likes__link" href="#${like.id}">
                                <figure class="likes__fig">
                                    <img src="${like.img}" alt="${like.title}">
                                </figure>
                                <div class="likes__data">
                                    <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                                    <p class="likes__author">${like.author}</p>
                                </div>
                            </a>
                        </li>   
    `;

element.likesList.insertAdjacentHTML('beforeend',markup);
};

export const deleteLike = id => {
  const el = document.querySelector(`.likes__link[href*="${id}"]`).parentElement;

  //deleting entire list element

    if(el) el.parentElement.removeChild(el);


};