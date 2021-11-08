import { async } from 'regenerator-runtime';

export const state = {

    recipe: {},
}

export const loadRecipe = async function (recipeId) {

    try {
        const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);

        const data = await res.json();

        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        state.recipe = _createRecipeObject(data);

    } catch (error) {
        alert(error);
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

