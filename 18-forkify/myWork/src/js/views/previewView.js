import View from './View.js';
import icons from 'url:../../img/icons.svg';

const iconsPath = icons.split('?')[0];

// Implementing Bookmarks - Part 2

class PreviewView extends View {

    _generateMarkup() {

        const id = window.location.hash.slice(1);

        return this._data.map(recipe => {

            const activeRecipeClass = recipe.id == id ? 'preview__link--active' : '';
            const userCreatedRecipe = recipe.key ? '' : 'hidden';

            return `
            <li class="preview">
            <a class="preview__link ${activeRecipeClass}" href="#${recipe.id}">
            <figure class="preview__fig">
                <img src="${recipe.image}" alt="${recipe.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recipe.title}</h4>
                <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${userCreatedRecipe}">
            <svg>
              <use href="${iconsPath}#icon-user"></use>
            </svg>
          </div>
          </div>
        </a>
        </li>`
        }).join('');
    }
}

export default PreviewView;