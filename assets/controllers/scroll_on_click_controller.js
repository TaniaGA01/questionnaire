import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

    static targets = ['formationLink']

    connect() {
    }
    
    clickToScrollBlock(event) {
        event.preventDefault();

        const 
            target = event.currentTarget,
            targetId = event.currentTarget.getAttribute("href").substring(1),
            targetElement = document.getElementById(targetId),
            container = targetElement.parentElement,
            targetButtonsItems = targetElement.querySelectorAll('button'),
            allButtonsItems = container.querySelectorAll('button')
        ;
        
        [...allButtonsItems].forEach(button => {
            button.classList.remove('border-blue-600', 'text-blue-600', 'hover:bg-blue-600', 'hover:text-white');
            button.classList.add('border-gray-300', 'text-gray-300', 'hover:bg-gray-300', 'hover:text-gray-200');
        });
        
        [...targetButtonsItems].forEach(button => {
            button.classList.remove('border-gray-300', 'text-gray-300', 'hover:bg-gray-300', 'hover:text-gray-200');
            button.classList.add('border-blue-600', 'text-blue-600', 'hover:bg-blue-600', 'hover:text-white');
        });
        [...this.formationLinkTargets].forEach(link => {
            link.classList.remove('text-white', 'bg-blue-600');
            link.classList.add('text-gray-400', 'border-gray-100',  'bg-gray-200');
        });

        if (targetElement && container) {
            const offset = targetElement.offsetTop - container.offsetTop;
            container.scrollTo({
                top: offset - container.clientHeight / 2 + targetElement.clientHeight / 2,
                behavior: "smooth"
            });
    
            target.classList.remove('text-gray-400', 'border-gray-100', 'bg-gray-200');
            target.classList.add('text-white', 'bg-blue-600');
        }
    }
}
