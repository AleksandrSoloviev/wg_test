export class TooltipComponent {
  constructor() {
    this.el = document.createElement('div');
    this.el.className = 'tooltip';
    document.body.appendChild(this.el);

    this.isHovered = false; // отслеживаем наведение на тултип
    this.hideTimeout = null;

    this.el.addEventListener('mouseenter', () => {
      this.isHovered = true;
    });

    this.el.addEventListener('mouseleave', () => {
      this.isHovered = false;
      this.scheduleHide();
    });
  }

  show(target, data) {
    this.el.innerHTML = this.render(data);
    this.position(target);
    this.el.style.opacity = 1;
    this.el.style.transform = 'translateY(-12px)';

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

  render(data) {
    return `
    <div role="tooltip">
      <form>
        <fieldset class="configuration">
        <legend class="title">Комплектация</legend>
        
        <label>
          <input type="radio" name="standard" value="standard" />
          Стандартная
        </label>

        <label>
          <input type="radio" name="elite" value="elite" />
          Элитная
        </label>

        <label>
          <input type="radio" name="premium" value="premium" />
          Премиум
        </label>
      </fieldset>
      
      <fieldset class="experience">
        <label class="range-input">
           Количество боев
          <input type="range" name="experience" min="0" max="300" />
        </label>
      </fieldset>
      </form>
    </div>
    `;
  }
}
