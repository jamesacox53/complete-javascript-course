import View from './View.js';
import icons from 'url:../../img/icons.svg';

const iconsPath = icons.split('?')[0];

// Implementing Search Results - Part 2

class ResultsView extends View {

    _parentElement = document.querySelector('.results');
    _errorMessage = 'No recipes found for your query! Please try again.';
    _message = '';

    _generateMarkup() {

        const id = window.location.hash.slice(1);

        return this._data.map(recipe => {

            const activeRecipeClass = recipe.id == id ? 'preview__link--active' : '';

            return `
            <li class="preview">
            <a class="preview__link ${activeRecipeClass}" href="#${recipe.id}">
            <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
            </div>
        </a>
        </li>`
        }).join('');
    }
}

export default new ResultsView();