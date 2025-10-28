export class TooltipComponent {
  constructor() {
    // DOM элементы
    this.el = document.getElementById('tooltip');
    this.group = document.getElementById('radio-group');
    this.range = document.querySelector('.custom-range');
    this.input = document.querySelector('.custom-input');
    this.tooltipTitle = document.querySelector('.tooltip-header-title');
    this.calculatedPoint = document.querySelector('.points');
    this.star = document.querySelector('.star-icon');

    // Состояние
    this.isHovered = false;
    this.hideTimeout = null;

    // Подписка на события
    this.group.addEventListener('change', this.onRadioChange.bind(this));
    this.range.addEventListener('input', this.onRangeInput.bind(this));
    this.input.addEventListener('input', this.onInputChange.bind(this));
    this.el.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });

    this.el.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.scheduleHide();
    });

    // Инициализация
    this.updateGradient();
    this.recalc();
    this.tooltipTitle.textContent = 'Kartochka'; // TODO: удалить
  }

  // ==========================
  // Обработчики событий
  // ==========================
  onRadioChange(e) {
    if (e.target.matches('input[name="configuration"]')) {
      this.recalc();
    }
  }

  onRangeInput() {
    this.input.value = this.range.value;
    this.updateGradient();
    this.recalc();
  }

  onInputChange() {
    let value = parseInt(this.input.value, 10);
    if (isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 300) value = 300;

    this.input.value = value;
    this.range.value = value;
    this.updateGradient();
    this.recalc();
  }

  // ==========================
  // Вспомогательные методы
  // ==========================
  updateGradient() {
    const value =
      ((this.range.value - this.range.min) /
        (this.range.max - this.range.min)) *
      100;
    this.range.style.setProperty('--value', `${value}%`);
  }

  show(target, data) {
    this.position(target);
    this.el.style.opacity = 1;
    this.el.style.transform = 'translateY(-12px)';
    this.tooltipTitle.textContent = data.title;

    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  hide() {
    if (this.isHovered) return;
    this.el.style.opacity = '0';
    this.el.style.transform = 'translateY(-8px)';
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

    // перезапуск анимации
    this.calculatedPoint.classList.remove('pulse');
    this.star.classList.remove('pulse');
    void this.calculatedPoint.offsetWidth;
    void this.star.offsetWidth;
    this.calculatedPoint.classList.add('pulse');
    this.star.classList.remove('pulse');
  }
}
