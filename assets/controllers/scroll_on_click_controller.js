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
            button.classList.remove('sm:border-blue-600', 'sm:text-blue-100', 'sm:bg-blue-600', 'sm:hover:bg-blue-900', 'sm:hover:text-blue-200' );
            button.classList.add('bg-gray-300', 'text-gray-600', 'border-gray-400', 'hover:bg-gray-700', 'hover:text-gray-100');
        });
        
        [...targetButtonsItems].forEach(button => {
            button.classList.remove('bg-gray-300', 'text-gray-600', 'border-gray-400', 'hover:bg-gray-700', 'hover:text-gray-100');
            button.classList.add('sm:border-blue-600', 'sm:text-blue-100', 'sm:bg-blue-600', 'sm:hover:bg-blue-900', 'sm:hover:text-blue-200' );
        });
        [...this.formationLinkTargets].forEach(link => {
            link.classList.remove('text-white', 'bg-blue-600');
            link.classList.add('text-gray-400', 'border-gray-100',  'bg-gray-200');
        });

        if (targetElement && container) {
            
            
            const offset = targetElement.offsetTop - container.offsetTop;
            
            setTimeout(() => {
                
                container.scrollTo({
                    top: offset - container.clientHeight / 2 + targetElement.clientHeight / 2,
                });
                targetElement.style.transition = "transform 0.2s ease-in-out";
                targetElement.style.transform = "scale(0.98)";
                targetElement.style.transform = "scale(1)";
                target.classList.remove('text-gray-400', 'border-gray-100', 'bg-gray-200');
                target.classList.add('text-white', 'bg-blue-600');
            }, 100);
            
        }
    }
}
