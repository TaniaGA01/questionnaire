import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    
    static targets = ['itemBlock']

    connect() {
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            root: this.element,
            threshold: 1
        });

        this.itemBlockTargets.forEach(item => this.observer.observe(item));
    }

    handleIntersect(entries) {
        const links = document.getElementById('linksBlock');
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                const allButtonsItems = entry.target.querySelectorAll('button');
                [...allButtonsItems].forEach(button => {
                    button.classList.remove('border-gray-300', 'text-gray-300', 'hover:bg-gray-300', 'hover:text-gray-200');
                    button.classList.add('border-blue-600', 'text-blue-600', 'hover:bg-blue-600', 'hover:text-white');
                });
                [...links.children].forEach(link => {
                    if(link.getAttribute("href").substring(1) === entry.target.id){
                        link.classList.remove('text-gray-400', 'border-gray-100',  'bg-gray-200');
                        link.classList.add('text-white', 'bg-blue-600')
                    }else{
                        link.classList.add('text-gray-400', 'border-gray-100',  'bg-gray-200');
                        link.classList.remove('text-white', 'bg-blue-600')
                    }
                })
            } else {
                const allButtonsItems = entry.target.querySelectorAll('button');
                [...allButtonsItems].forEach(button => {
                    button.classList.add('border-gray-300', 'text-gray-300', 'hover:bg-gray-300', 'hover:text-gray-200');
                    button.classList.remove('border-blue-600', 'text-blue-600', 'hover:bg-blue-600', 'hover:text-white');
                });
            }
        });
    }

    waitForAnimation() {
        return Promise.all(
            this.element.getAnimations().map((animation) => animation.finished)
        );
    }

    disconnect() {
        this.observer.disconnect();
    }
}
