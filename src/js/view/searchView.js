// Multiple file Export
/*
export const add = (a,b) => a+b;
export const multiply = (a,b) => a*b;
export const ID = 23;
*/
// Reading input from input form


import {element} from './base';

export const clearInput = () => {
    element.searchInput.value ='';
};
export const getInput = () => element.searchInput.value; //implicit return

export const clearPreviousResults = () => {
    element.searchResultList.innerHTML = '';
    element.searchResultPages.innerHTML ='';
};

export const highlightedSelected  = id => {

    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
  document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

export const limitRecipeTitle = (title, limit = 17) => {
const newTitle = [];
    if(title.length  > limit)
    {
        title.split(' ').reduce((acc, curr) => {

            if(acc + curr.length <= limit){
    newTitle.push(curr);
            }
    return acc + curr.length;
        },0);
        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;

};

const renderRecipe = recipe => {

    const markup = `
<li>
                    <a class="results__link" href="#${recipe.recipe_id}">
                        <figure class="results__fig">
                            <img src="${recipe.image_url}" alt="${recipe.title}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                            <p class="results__author">${recipe.publisher}</p>
                        </div>
                    </a>
                </li>
    `;
    element.searchResultList.insertAdjacentHTML('beforeend',markup);
};
//TYPE: NEXT OR PREV
const createButton = (page, type) => `

                <button class="btn-inline results__btn--${type}" data-goto="${type === 'prev' ? page-1:page+1}">
                  <span>Page ${type === 'prev' ? page-1:page+1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left':'right'}"></use>
                    </svg>
                </button>
`;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let button;
    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, 'prev');
    }

    element.searchResultPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};