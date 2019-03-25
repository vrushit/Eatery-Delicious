

import Search from './module/Search';

import Recipe from './module/Recipe';

import List from './module/List';
import * as listView from './view/listView';
import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as likeView from './view/likesView';

import {element,renderLoader,clearLoader} from './view/base';
import Likes from "./module/Likes";

//State Library //==Global State
/*
-Search Object
-Current Recipe Object
-Shopping list object
-Liked Recipe
All of the above things are stored in state variable
 */

const state = {};
//-----------Search Controller ----///

const controlSearch= async () =>{
    // 1. Get the Query from the view
    const query = searchView.getInput(); // TODO later

console.log(query);

    if(query){
        // 2. Create new Search Object and add to state

        state.search = new Search(query);

        // 3. Preparing UI and Clearing user for rrsults
    searchView.clearInput();
    searchView.clearPreviousResults();
    renderLoader(element.searchResult);

    try{
        // 4. Search for recipes
        await state.search.getSearchResult();
       // state.recipe.parseIngredients();

        // 5. Render Results on UI
        //console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
    }
    catch(error)
    {
        alert(error);
    }

    }

};

element.searchForm.addEventListener('submit',e =>{
e.preventDefault();
controlSearch();
});

// event eligation
element.searchResultPages.addEventListener('click',e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn)
    {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearPreviousResults();
        searchView.renderResults(state.search.result, goToPage);

    }
});


const controlRecipe = async() =>{
    // Get ID from url
  const id = window.location.hash.replace('#','');
  console.log(id);

  if(id)
  {
      // Prepare the UI for the Changes
      recipeView.clearRecipe();
        renderLoader(element.recipe);

        //Highlight selected search item
      if(state.search) searchView.highlightedSelected(id);

      //Create new recipe object
      state.recipe = new Recipe(id);

      try{
          // CGet Recipe data
          await state.recipe.getRecipe();
          state.recipe.parseIngredients();
          // Calculate servings and time
          state.recipe.calcTime();
          state.recipe.calcServings();

          //Render recipe
          clearLoader();
          recipeView.renderRecipe(
              state.recipe,
              state.likes.isLiked(id));
          //console.log(state.recipe);


      }
      catch (error) {
          alert(error);
      }
  }
};


/*
    List Controller
 */

const controlList = () => {
    if(!state.list) state.list = new List();

    //Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count,el.unit,el.ingredient);
    listView.renderItem(item);
    });
};

// Handle delete and update list item events
element.shopping.addEventListener('click',e => {

    const id = e.target.closest('.shopping__item').dataset.itemid;


    //Handle Button or event
    if(e.target.matches('.shopping__delete,.shopping__delete *')){
        //Delete from state
        state.list.deleteItem(id);
        //Delete from UI
        listView.deleteItem(id);
    }

    //handle the count update
    else if(e.target.matches('.shopping__count-value')){
    const val = parseFloat(e.target.value, 10);

    state.list.updateCount(id,val);
    }
});


/*
    Like Controller
 */
const controlLike = () => {

    if(!state.likes) state.likes  = new Likes();
    const currId = state.recipe.id;


    //User has not yet liked Current Recipe
    if(!state.likes.isLiked(currId)){
        //Add likes to State
        const newLike = state.likes.addLikes(
            currId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img);
        //Toggle The Like button
        likeView.toggleLikeBtn(true);
        //Add like to the UI List
        likeView.renderLike(newLike);
    }
    //User did liked the Current recipe
    else{
        //Remove likes to State
        state.likes.deleteLike(currId);
        //Toggle The Like button
        likeView.toggleLikeBtn(false);
        //Remove like to the UI List
        likeView.deleteLike(currId);
    }
    likeView.toggleLikeMenu(state.likes.getNumbeOfLikes());

};

// Restore Like recipes on page load

window.addEventListener('load', () => {
state.likes = new Likes();

// Restore like
    state.likes.readStorage();

    //Toggle like menu button
likeView.toggleLikeMenu(state.likes.getNumbeOfLikes());

    //Render the existing likes
    state.likes.likes.forEach(like => likeView.renderLike(like))
});


['hashchange','load'].forEach(event => window.addEventListener(event,controlRecipe));


//handling recipe btn clicks
element.recipe.addEventListener('click',e => {
   if(e.target.matches('.btn-decrease, .btn-decrease *')){
       // Decrease Button is Clicked
       if(state.recipe.servings > 1){
           state.recipe.updatesServings('dec');
           recipeView.updateServingsIngredeints(state.recipe);
       }
   }
   else if(e.target.matches('.btn-increase, .btn-increase *')){
       // Increase Button is Clicked
       state.recipe.updatesServings('inc');
       recipeView.updateServingsIngredeints(state.recipe);

   }
   else if(e.target.matches('.recipe__btn--add,.recipe__btn--add *'))
   {
       //Add
       controlList();

   }
   else if(e.target.matches('.recipe__love,.recipe__love *')){
       //Like Controller
       controlLike();
   }
});

