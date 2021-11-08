// Lecture: Implementing Search Results - Part 1

class SearchView {
    _parentElement = document.querySelector('.search');

    getQuery() {

        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {

        this._parentElement.querySelector('.search__field').value = '';
    }

    addHandlerSearch(handler) {

        this._parentElement.addEventListener('submit', function (eventElem) {
            eventElem.preventDefault();
            handler();
        });
    }
}

export default new SearchView();