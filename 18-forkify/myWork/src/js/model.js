import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE, KEY } from './config.js';
import { getJSON, sendJSON } from './helpers.js';

export const state = {

    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: RESULTS_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
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

    if (state.bookmarks.some(bookmarkedRecipe => bookmarkedRecipe.id === recipe.id)) {
        recipe.bookmarked = true;
    } else {
        recipe.bookmarked = false;
    }

    if (recipeData.key) {
        recipe.key = recipeData.key;
    }

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

// Lecture: Implementing Bookmarks - Part 1

export const addBookmark = function (recipe) {

    // Add bookmark
    state.bookmarks.push(recipe);

    // Mark current recipe as bookmark
    if (recipe.id === state.recipe.id) {
        state.recipe.bookmarked = true;
    }
    _persistBookmarks();
}

export const deleteBookmark = function (recipeId) {

    // Delete bookmark
    const index = state.bookmarks.findIndex(bookmarkedRecipe => bookmarkedRecipe.id === recipeId);

    state.bookmarks.splice(index, 1);

    // Mark current recipe as NOT bookmarked
    if (recipeId === state.recipe.id) {
        state.recipe.bookmarked = false;
    }

    _persistBookmarks();
}

// Lecture: Storing Bookmarks With localStorage

const _persistBookmarks = function () {

    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

const clearBookmarks = function () {

    localStorage.clear('bookmarks');
}


const init = function () {

    const storage = localStorage.getItem('bookmarks');

    if (storage) {
        state.bookmarks = JSON.parse(storage);
    }
}

// Lecture: Uploading a New Recipe - Part 2

export const uploadRecipe = async function (newRecipe) {
    try {
        const recipe = _createRecipeForAPI(newRecipe);
        console.log(recipe);

        const data = await sendJSON(`${API_URL}/?key=${KEY}`, recipe);

        state.recipe = _createRecipeObject(data);

        addBookmark(state.recipe);

        console.log(state.recipe);

    } catch (error) {
        throw error;
    }

}

const _createRecipeForAPI = function (newRecipe) {

    const recipe = {

        title: newRecipe.title,
        source_url: newRecipe.sourceUrl,
        image_url: newRecipe.image,
        publisher: newRecipe.publisher,
        cooking_time: +(newRecipe.cookingTime),
        servings: +(newRecipe.servings),
        ingredients: _getIngredientsFromUser(newRecipe),
    }
    return recipe;
}

const _getIngredientsFromUser = function (newRecipe) {

    const ingredients = []

    let i = 1;
    let hasIngredientI;

    do {

        const ingredient = newRecipe[`ingredient-${i}`];

        if (ingredient) {

            hasIngredientI = true;
            const ingredientParts = ingredient.replaceAll(' ', '').split(',');

            if (ingredientParts.length !== 3) {

                throw new Error('Wrong ingredient format! Please use the correct format :)');
            }

            const ingredientObject = {
                quantity: ingredientParts[0] ? +(ingredientParts[0]) : null,
                unit: ingredientParts[1],
                description: ingredientParts[2],
            };

            ingredients.push(ingredientObject);
            i++;
        } else {

            hasIngredientI = false;
        }

    } while (hasIngredientI)

    return ingredients;
}

init();

// clearBookmarks();