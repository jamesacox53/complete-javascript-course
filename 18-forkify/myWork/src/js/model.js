import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {

    recipe: {},
}

export const loadRecipe = async function (recipeId) {

    try {

        const data = await getJSON(`${API_URL}/${recipeId}`);

        state.recipe = _createRecipeObject(data);

    } catch (error) {
        console.error(error);
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

