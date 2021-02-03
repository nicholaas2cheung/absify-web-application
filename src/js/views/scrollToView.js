class scrollToView {
  _navBar = document.getElementById('navID');
  addScrollToHandler(handler) {
    this._navBar.addEventListener('click', handler);
  }
}

export default new scrollToView();
