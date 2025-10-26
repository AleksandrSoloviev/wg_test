import { TooltipComponent } from '../../shared/ui/tooltip/tooltip.js';

export function renderCards(container, data) {
  const fragment = document.createDocumentFragment();

  const tooltipComponent = new TooltipComponent();

  data.forEach((card) => {
    const cardWrapper = document.createElement('article');
    cardWrapper.setAttribute('data-tooltip', `ID: ${card.id}\n${card.info}`);
    cardWrapper.className = 'card-wrapper';

    const figure = document.createElement('figure');
    figure.className = 'figure';

    const image = document.createElement('img');
    image.className = 'image-wrapper';
    image.alt = 'Изображение танка';
    image.src = './public-files/images/cards/tank.png';

    const name = document.createElement('figcaption');
    name.className = 'card-title';
    name.textContent = card.title;

    figure.appendChild(image);
    figure.appendChild(name);

    cardWrapper.appendChild(figure);

    fragment.appendChild(cardWrapper);

    cardWrapper.addEventListener('mouseenter', () =>
      tooltipComponent.show(cardWrapper, card)
    );
    cardWrapper.addEventListener('mouseleave', () =>
      tooltipComponent.scheduleHide()
    );
  });

  container.appendChild(fragment);
}
