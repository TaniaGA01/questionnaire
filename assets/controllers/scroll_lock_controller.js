import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        this.element.addEventListener("scroll", (event) => {
            console.log('event', event)
            const el = this.element;
            console.log('el', el)
            if (
                (event.deltaY > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight) ||
                (event.deltaY < 0 && el.scrollTop === 0)
            ) {
                // Permite el scroll normal
                el.closest(".overflow-y-auto").scrollBy(0, event.deltaY);
            } else {
                // Detiene el scroll externo
                event.stopPropagation();
            }
        });
    }
}
