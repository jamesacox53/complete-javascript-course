import View from './View.js';

import icons from 'url:../../img/icons.svg';

const iconsPath = icons.split('?')[0];

// Lecture: Refactoring for MVC

class PaginationView extends View {

    _parentElement = document.querySelector('.pagination');

    _generateMarkup() {

        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

        const currentPage = this._data.page;

        let markup = '';

        // render back
        if (1 < currentPage && currentPage <= numPages) {
            markup += this._getPreviousButtonHTML(currentPage);
        }

        // render forward
        if (0 < currentPage && currentPage < numPages) {
            markup += this._getNextButtonHTML(currentPage);
        }

        return markup;
    }

    _getPreviousButtonHTML(currentPage) {

        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${iconsPath}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>`;
    }

    _getNextButtonHTML(currentPage) {

        return `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${iconsPath}#icon-arrow-right"></use>
            </svg>
          </button>`
    }

    addHandlerClick(handler) {

        this._parentElement.addEventListener('click', (eventElem) => this._paginationClicked(eventElem, handler));
    }

    _paginationClicked(eventElem, handler) {

        const button = eventElem.target.closest('.btn--inline');

        if (!button) return;

        const goToPage = +(button.dataset.goto);

        handler(goToPage);
    }
}

export default new PaginationView();