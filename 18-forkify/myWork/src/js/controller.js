import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

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

    resultsView.render(model.getSearchResultsPage());

  } catch (error) {

  }
}

const init = function () {

  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}

init();