import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

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
    alert(error);
  }
}

// Lecture: Rendering the Recipe

// Lecture: Listening For load and hashchange Events

const events = ['hashchange', 'load']

events.forEach(ev => window.addEventListener(ev, controlRecipes));
