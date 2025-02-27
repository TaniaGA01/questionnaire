import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    
    static targets = ['collection', 'addQuestionButton', 'deleteQuestionButton']

    connect() {
        this.index = this.collectionTarget.children.length;
    }

    addQuestion(event) {
        event.preventDefault();
        
        const prototypeElement = this.collectionTarget.dataset.prototype;
        const newForm = prototypeElement.replace(/__name__/g, this.index + 1);
        const questionElement = document.createElement('div');
        questionElement.innerHTML = newForm;
        const questionsGroup = document.getElementById('questionsGroup');
        questionsGroup.appendChild(questionElement.firstElementChild);

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
        const questionsGroup = document.getElementById('questionsGroup');

        if(questionsGroup.children){
            [...questionsGroup.children].forEach((div, index) => {
                index++
                div.outerHTML = 
                `<div id="poll_questions_${index}" class="mt-3"><label class="block text-sm/6 font-medium text-cyan-300" for="poll_questions_${index}_questionName">Question-${index}</label><div class="flex"><input class="form-control block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-indigo-500 sm:text-sm/6" type="text" id="poll_questions_${index}_questionName" name="poll[questions][${index}][questionName]" data-form-validation-target="input" required=""><button id="poll_questions_${index}" type="button" data-action="click->questions#deleteQuestion" data-questions-target="deleteQuestionButton" class="remove-question text-base font-semibold flex justify-end bg-orange-950 align-middle border-orange-700 border-1 py-1.5 px-4 rounded-md text-orange-500 hover:bg-orange-700 hover:text-blue-200 right-3 top-3 ml-1">🗑️</button></div></div>`
            })
            this.index--
        }
    }
}
