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
        if(window.matchMedia("(min-width: 640px)").matches){
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    const allButtonsItems = entry.target.querySelectorAll('button');
                    [...allButtonsItems].forEach(button => {
                        button.classList.remove('bg-gray-300', 'text-gray-100', 'border-gray-400', 'hover:bg-gray-700', 'hover:text-gray-100');
                        button.classList.add('sm:border-blue-600', 'sm:text-blue-100', 'sm:bg-blue-600', 'sm:hover:bg-blue-900', 'sm:hover:text-blue-200' );
                    });
                    [...links.children].forEach(link => {
                        if(link.getAttribute("href").substring(1) === entry.target.id){
                            link.classList.remove('text-gray-400', 'border-gray-100', 'bg-gray-200');
                            link.classList.add('text-white', 'bg-blue-600')
                        }else{
                            link.classList.add('text-gray-400', 'border-gray-100', 'bg-gray-200');
                            link.classList.remove('text-white', 'bg-blue-600')
                        }
                    })
                } else {
                    const allButtonsItems = entry.target.querySelectorAll('button');
                    [...allButtonsItems].forEach(button => {
                        button.classList.add('bg-gray-300', 'text-gray-600', 'border-gray-400', 'hover:bg-gray-700', 'hover:text-gray-100');
                        button.classList.remove('sm:border-blue-600', 'sm:text-blue-100', 'sm:bg-blue-600', 'sm:hover:bg-blue-900', 'sm:hover:text-blue-200' );
                    });
                }
            });
        }
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
