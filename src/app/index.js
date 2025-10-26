import { renderCards } from "../features/cards/renderCards.js";

const data = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    title: `Карточка ${i + 1}`,
    info: `Описание карточки №${i + 1}`,
}));

const container = document.getElementById("cards");
renderCards(container, data);
