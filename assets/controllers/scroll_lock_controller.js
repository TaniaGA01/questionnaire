import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
    connect() {
        const 
            parentBlock = document.getElementById('formationsBlock'),
            firstChild = parentBlock.firstElementChild
        ;

        if (parentBlock) {
            const offset = firstChild.offsetTop - parentBlock.offsetTop;
            parentBlock.scrollTo({
                top: offset - parentBlock.clientHeight / 2 + firstChild.clientHeight / 2,
                behavior: "smooth"
            });
        }
    }
    
    scrollToBlock(event) {
        event.preventDefault();
        const 
            targetId = event.currentTarget.getAttribute("href").substring(1),
            targetElement = document.getElementById(targetId),
            container = targetElement.parentElement
        ;

        if (targetElement && container) {
            const offset = targetElement.offsetTop - container.offsetTop;
            container.scrollTo({
                top: offset - container.clientHeight / 2 + targetElement.clientHeight / 2,
                behavior: "smooth"
            });
        }
    }
}
