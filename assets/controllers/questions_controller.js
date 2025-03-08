import { Controller } from '@hotwired/stimulus';
import { alertHandle } from './utils/alertHandler'

export default class extends Controller {
    
    static targets = ['questionsGroup', 'questions', 'addQuestionButton', 'deleteQuestionButton']

    connect() {
        this.index = this.questionsGroupTarget.children.length;
    }

    addQuestion(event) {
        event.preventDefault();
        
        const prototypeElement = this.questionsTarget.cloneNode(true);
        const questionElement = document.createElement('div');
        const input = prototypeElement.querySelector('input[type="text"]');
        input.setAttribute('required', true);

        
        [...prototypeElement.children]
        .forEach(item => {
            item.outerHTML = item.outerHTML.replace(/__questions__/g, this.index + 1);
        });
        
        questionElement.classList.add('mt-3');
        questionElement.innerHTML = prototypeElement.innerHTML;
        const newDeletBtn = questionElement.querySelector('button');
        questionElement.id = newDeletBtn.id;

        this.questionsGroupTarget.appendChild(questionElement);
        alertHandle();

        this.index++;
    }

    deleteQuestion(event){
        event.preventDefault(); 
        
        const deleteBtn = this.deleteQuestionButtonTarget;
        const question = document.querySelector(`div[id="${ deleteBtn.id }"]`);
        question.remove();
        this.sortQuestions();
    }

    sortQuestions(){

        if([...this.questionsGroupTarget.children].length){
            
            [...this.questionsGroupTarget.children]
                .forEach((element, idx) => {
                    let index = idx + 1;
                    
                    if(element.id){
                        element.id = element.id.replace(/(\d+)/, index);
                    }
                    const label = element.querySelector('label');
                    label.htmlFor = label.htmlFor.replace(/(\d+)/, index);
                    label.innerText = label.innerText.replace(/(\d+)/, index);

                    const block = element.querySelector('div');
                    
                    if(block){
                        const input = block.querySelector('input');
                        const button = block.querySelector('button');
                        
                        input.id = input.id.replace(/(\d+)/, index);
                        input.name = input.name.replace(/(\d+)/, index);
                        button.id = button.id.replace(/(\d+)/, index);
                    }
                })
        }
        this.index--

    }

}
