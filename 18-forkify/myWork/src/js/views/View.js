import icons from 'url:../../img/icons.svg';

const iconsPath = icons.split('?')[0];

export default class View {

  _parentElement;
  _data;
  _errorMessage;
  _message;

  render(data) {

    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {

    this._parentElement.innerHTML = '';
  }

  renderSpinner() {

    const markup = `
                <div class= "spinner">
                <svg>
                    <use href="${iconsPath}#icon-loader"></use>
                </svg>
            </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Lecture: Implementing Error and Success Messages

  renderError(message = this._errorMessage) {

    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${iconsPath}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {

    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${iconsPath}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Lecture: Developing a DOM Updating Algorithm 

  update(data) {

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElement, i) => {

      const currentElement = currentElements[i];

      // updates changed TEXT
      if (!newElement.isEqualNode(currentElement) && (newElement.firstChild?.nodeValue.trim())) {
        currentElement.textContent = newElement.textContent;
      }

      // updates changed ATTRIBUTES
      if (!newElement.isEqualNode(currentElement)) {
        const attributes = Array.from(newElement.attributes);

        attributes.forEach(attribute => {

          currentElement.setAttribute(attribute.name, attribute.value);
        });
      }
    });

  }
}