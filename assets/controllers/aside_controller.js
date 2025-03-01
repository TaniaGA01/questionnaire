import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    
    static targets = ['rightModal'];

    async close() {
        this.rightModalTarget.style.right = '-600px';
        this.rightModalTarget.style.width = 'initial';
        await this.waitForAnimation();
    }
    async open() {
        this.rightModalTarget.style.right = '0';
        this.rightModalTarget.style.width = '100%';
        await this.waitForAnimation();
    }
    
    waitForAnimation() {
        return Promise.all(
            this.element.getAnimations().map((animation) => animation.finished)
        );
    }
}
