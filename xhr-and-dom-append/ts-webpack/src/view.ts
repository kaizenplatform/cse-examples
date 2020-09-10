import { Places } from "./placesProvider";
import "./view.css";

export const render = (places: Places): boolean => {
  if (places.length === 0) return false;

  const $w = $(`<div class="inner-form kz"></div>`).insertAfter(".inner-form");

  $.each(places, function (i, p) {
    $(`
        <div class="kz-item">
          <div class="kz-image">
            <img src=${p.image} />
          </div>
          <div class="kz-desc">
            <div class="kz-name">
              <a href="${p.googleMap}" target="_blank">${p.name}</a>
            </div>
            <div class="kz-country">${p.country}</div>
          </div>
        </div>
      `).appendTo($w);
  });

  return true;
};
