export class TooltipComponent {
  constructor() {
    this.el = document.getElementById('tooltip1');
    this.tooltipTitle = document.querySelector('.tooltip-header-title');

    this.isHovered = true;
    this.hideTimeout = null;

    const range = document.querySelector('.custom-range');
    this.input = document.querySelector('.custom-input');

    this.calculatedPoint = document.querySelector('.points');
    this.star = document.querySelector('.star-icon');

    const group = document.getElementById('radio-group');

    group.addEventListener('change', (e) => {
      if (e.target.matches('input[name="configuration"]')) {
        this.recalc();
      }
    });

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
      this.input.value = range.value;
      this.recalc();
    });

    // при вводе текста обновляем ползунок (в пределах 0–300)
    this.input.addEventListener('input', () => {
      let value = parseInt(this.input.value, 10);

      if (isNaN(value)) value = 0;
      if (value < 0) value = 0;
      if (value > 300) value = 300;

      this.input.value = value;
      range.value = value;

      const sliderValue =
        ((range.value - range.min) / (range.max - range.min)) * 100;
      range.style.setProperty('--value', `${sliderValue}%`);

      this.recalc();
    });

    this.recalc();
    this.tooltipTitle.textContent = 'Kartochka'; // TODO: delete
  }

  show(target, data) {
    this.position(target);
    this.el.style.opacity = 1;
    this.el.style.transform = 'translateY(-12px)';
    this.tooltipTitle.textContent = data.title;

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

  recalc() {
    const inp = parseFloat(this.input.value) || 0;

    const selectedRadio = document.querySelector(
      'input[name="configuration"]:checked'
    );

    let result = 0;
    const base = inp * 3;

    switch (selectedRadio?.value) {
      case 'standard':
        result = base;
        break;
      case 'elite':
        result = base + Math.ceil(base * 0.1);
        break;
      case 'premium':
        result = base + Math.ceil(base * 0.2);
        break;
    }

    this.calculatedPoint.textContent = `${result}`;
    this.calculatedPoint.classList.remove('pulse');
    this.star.classList.remove('pulse');
    void this.calculatedPoint.offsetWidth; // перезапускаем анимацию
    void this.star.offsetWidth; // перезапускаем анимацию
    this.calculatedPoint.classList.add('pulse');
    this.star.classList.remove('pulse');
  }
}
