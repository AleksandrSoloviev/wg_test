export class TooltipComponent {
  constructor() {
    this.el = document.getElementById('tooltip1');

    this.isHovered = true;
    this.hideTimeout = null;

    const range = document.querySelector('.custom-range');
    const input = document.querySelector('.custom-input');

    function updateGradient() {
      const value = ((range.value - range.min) / (range.max - range.min)) * 100;
      range.style.setProperty('--value', `${value}%`);
    }

    range.addEventListener('input', updateGradient);
    updateGradient();

    // this.el.addEventListener('mouseenter', () => {
    //   this.isHovered = true;
    // });
    //
    // this.el.addEventListener('mouseleave', () => {
    //   this.isHovered = true;
    //   this.scheduleHide();
    // });

    // при движении ползунка обновляем текстовое поле
    range.addEventListener('input', () => {
      input.value = range.value;
    });

    // при вводе текста обновляем ползунок (в пределах 0–300)
    input.addEventListener('input', () => {
      let value = parseInt(input.value, 10);

      if (isNaN(value)) value = 0;
      if (value < 0) value = 0;
      if (value > 300) value = 300;

      input.value = value;
      range.value = value;

      const sliderValue =
        ((range.value - range.min) / (range.max - range.min)) * 100;
      range.style.setProperty('--value', `${sliderValue}%`);
    });
  }

  show(target, data) {
    this.position(target);
    this.el.style.opacity = 1;
    this.el.style.transform = 'translateY(-12px)';

    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  hide() {
    // if (this.isHovered) return;
    // this.el.style.opacity = '0';
    // this.el.style.transform = 'translateY(-8px)';
  }

  scheduleHide() {
    this.hideTimeout = setTimeout(() => {
      if (!this.isHovered) this.hide();
      this.isHovered = false;
    }, 250);
  }

  position(target) {
    const rect = target.getBoundingClientRect();
    const ttRect = this.el.getBoundingClientRect();
    const left = rect.left + rect.width / 2 - ttRect.width / 2;
    const top = rect.top + window.scrollY - ttRect.height - 8;
    this.el.style.left = `${left}px`;
    this.el.style.top = `${top}px`;
  }
}
