import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    
    static targets = ['collection', 'addButton']

    connect() {
        this.index = this.collectionTarget.children.length;
    }
    
    addElement(event) {
        event.preventDefault();
        
        const prototypeElement = this.collectionTarget.firstElementChild;
        const prototypeHTML = prototypeElement.outerHTML;
        const newForm = prototypeHTML.replace(/__name__/g, this.index - 1);
        const questionElement = document.createElement('div');

        questionElement.innerHTML = newForm;
        questionElement.firstElementChild.classList.remove('hidden');
        
        const questionsGroup = document.getElementById('questionsGroup');
        questionsGroup.appendChild(questionElement.firstElementChild);
    
        this.index++;
    }

}
