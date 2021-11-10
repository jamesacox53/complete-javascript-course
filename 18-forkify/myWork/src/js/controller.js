import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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
  recipeView.render(model.state.recipe);
}


const init = function () {

  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

init();