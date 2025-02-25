import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    
    static targets = ['collection', 'addButton']

    connect() {
        this.index = this.collectionTarget.children.length;
    }

    addElement(event) {
        event.preventDefault();
        
        const prototypeElement = this.collectionTarget.dataset.prototype;
        const newForm = prototypeElement.replace(/__name__/g, this.index);
        const questionElement = document.createElement('div');
        questionElement.innerHTML = newForm;
        const questionsGroup = document.getElementById('questionsGroup');
        questionsGroup.appendChild(questionElement.firstElementChild);

        this.index++;
    }

}
