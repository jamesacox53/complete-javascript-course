import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {

    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1,
    },
}

export const loadRecipe = async function (recipeId) {

    try {

        const data = await getJSON(`${API_URL}/${recipeId}`);

        state.recipe = _createRecipeObject(data);

    } catch (error) {
        throw error;
    }
}

const _createRecipeObject = function (data) {

    const recipeData = data.data.recipe;

    const recipe = {

        id: recipeData.id,
        title: recipeData.title,
        publisher: recipeData.publisher,
        sourceUrl: recipeData.source_url,
        image: recipeData.image_url,
        servings: recipeData.servings,
        cookingTime: recipeData.cooking_time,
        ingredients: recipeData.ingredients,
    };

    return recipe;
}

// Lecture: Implementing Search Results - Part 1

export const loadSearchResults = async function (query) {

    try {

        const data = await getJSON(`${API_URL}?search=${query}`);

        state.search.query = query;

        state.search.results = _createRecipesQueryObject(data);

    } catch (error) {
        throw error;
    }

}

const _createRecipesQueryObject = function (data) {

    const recipesData = data.data.recipes;

    const recipes = recipesData.map(rec => {

        const recipe = {

            id: rec.id,
            title: rec.title,
            publisher: rec.publisher,
            image: rec.image_url,
        };

        return recipe;
    });

    return recipes;
}

// Lecture: Implementing Pagination - Part 1

export const getSearchResultsPage = function (page = state.search.page) {

    state.search.page = page;

    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}

export const updateServings = function (newServings) {


    const ingredients = state.recipe.ingredients;
    const oldServings = state.recipe.servings;

    ingredients.forEach(ingredient => {

        ingredient.quantity = ingredient.quantity * (newServings / oldServings);
    });

    state.recipe.servings = newServings;
}