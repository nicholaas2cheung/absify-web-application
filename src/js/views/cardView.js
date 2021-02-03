class cardView {
  curCard = 0;
  benefitCard = document.querySelectorAll('.benefit-card');
  arrowLeft = document.querySelector('.arrow-left');
  arrowRight = document.querySelector('.arrow-right');

  addArrowRightHandler(handler) {
    this.arrowRight.addEventListener('click', handler);
  }

  addArrowLeftHandler(handler) {
    this.arrowLeft.addEventListener('click', handler);
  }
}

export default new cardView();
