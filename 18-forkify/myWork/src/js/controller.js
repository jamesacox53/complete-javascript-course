import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Lecture: Loading a Recipe from API

const controlRecipes = async function () {

  try {

    const recipeId = window.location.hash.slice(1);

    if (!recipeId) return;

    recipeView.renderSpinner();

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    bookmarksView.update(model.state.bookmarks);

    // loading recipe
    await model.loadRecipe(recipeId);

    recipeView.render(model.state.recipe);

  } catch (error) {
    recipeView.renderError();
  }
}

// Lecture: Rendering the Recipe

// Lecture: Listening For load and hashchange Events

const controlSearchResults = async function () {

  try {

    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if (!query) return;

    await model.loadSearchResults(query);

    // Render search results and Pagination Buttons

    _renderSearchResultsPage(1);

  } catch (error) {

  }
}

// Implementing Pagination - Part 2

const controlPagination = function (goToPage) {

  _renderSearchResultsPage(goToPage);

}

const _renderSearchResultsPage = function (goToPage) {
  // Render search results

  resultsView.render(model.getSearchResultsPage(goToPage));

  // Render initial Pagination buttons

  paginationView.render(model.state.search);

}

// Updating Recipe Servings

const controlServings = function (newServings) {

  // Update the recipe servings (in state),
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {

  // Add/Remove Bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);

  } else {

    model.deleteBookmark(model.state.recipe.id);
  }

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const controlBookmarks = function () {

  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {

  try {
    console.log(newRecipe);

    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe data
    await model.uploadRecipe(newRecipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Display success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);


    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (error) {
    // console.error(error);
    addRecipeView.renderError(error.message);
  }
}

const init = function () {

  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}

init();