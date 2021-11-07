const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// Lecture: Loading a Recipe from API

const showRecipe = async function () {

  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc958`);
    // const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const recipe = _createRecipeObject(data);

    console.log(recipe);

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

showRecipe();