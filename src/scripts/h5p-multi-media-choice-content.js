/** Class representing the content */
export default class MultiMediaChoiceContent {
  /**
   * @constructor
   * @param {object} params Parameters.
   * @param {number} contentId Content's id.
   * @param {object} [callbacks = {}] Callbacks.
   */
  constructor(params = {}, contentId, callbacks = {}) {
    this.params = params;
    this.contentId = contentId;

    this.content = document.createElement('div');
    this.content.classList.add('h5p-multi-media-choice-content');

    // Build n options
    this.options = params.options.map((option, index) =>
      this.buildOption(option, index)
    );
    this.content = this.buildOptionList(this.options);
  }

  /**
   * Return the DOM for this class.
   * @return {HTMLElement} DOM for this class.
   */
  getDOM() {
    return this.content;
  }

  /**
   * Build options.
   * @param {MultiMediaChoiceOption[]} options List of option objects.
   * @return {HTMLElement} List view of options.
   */
  buildOptionList(options) {
    const optionList = document.createElement('div');
    optionList.classList.add('h5p-multi-media-choice-options');
    options.forEach((option) => {
      optionList.appendChild(option); // option.getDOM();
    });
    return optionList;
  }

  /**
   * Build option.
   * @param {object} option Option object from the editor.
   * @param {number} key Option object from the editor.
   * @return {MultiMediaChoiceOption} Option. //TODO: not correct
   */
  buildOption(option, key) {
    const {
      alt,
      title,
      file: { path },
    } = option.media.params;

    const image = document.createElement('img');
    image.setAttribute('src', H5P.getPath(path, this.contentId));
    image.setAttribute('alt', alt);
    image.setAttribute('title', title);
    image.setAttribute('tabindex', key);
    image.src = H5P.getPath(path, this.contentId);

    return image;
  }

  /**
   * Counts options marked as correct
   * @returns {number} Number of options marked as correct in the editor.
   */
  getNumberOfCorrectOptions() {
    return params.options.filter((option) => option.correct).length;
  }
}