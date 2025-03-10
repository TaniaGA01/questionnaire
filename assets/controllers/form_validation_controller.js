import { Controller } from '@hotwired/stimulus';
import { alertHandle } from './utils/alertHandler'

export default class extends Controller {
    static targets = ['input', 'questionsGroup', 'questions', 'submit', 'form'];

    connect() {
        this.submitTargets[0].onclick = (event) => this.validateFieldForm(event);
    }
    
    validateField(){
        const emailRegex = {
            inputText:/^[a-zA-ZÂ-ÿ0-9.,;:!?()'"-\sÁ]{2,}$/,
            inputMail:/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        };
        
        if(this.inputTargets.length){
            const focusedInput = [...this.inputTargets].filter(input => input.required);

            focusedInput.forEach(input => {
                
                if(input.id === 'poll_user_email'){
                    if(emailRegex.inputMail.test(input.value) === false){
                        input.classList.add('focus:outline-red-500','border-1','border-red-500');
                        alertHandle();
                    }else{
                        input.classList.remove('focus:outline-red-500','border-1','border-red-500');
                        input.classList.add('focus:outline-green-500','border-1','border-green-500');
                        alertHandle();
                    }
                }else{
                    if(input.type !== "date"){
                        if(emailRegex.inputText.test(input.value) === false){
                            input.classList.add('focus:outline-red-500','border-1','border-red-500');
                            alertHandle();
                        }else{
                            input.classList.remove('focus:outline-red-500','border-1','border-red-500');
                            input.classList.add('focus:outline-green-500','border-1','border-green-500');
                            alertHandle();
                        }
                    }else{
                        if(input.valueAsDate !== null){
                            input.classList.remove('focus:outline-red-500','border-1','border-red-500');
                            input.classList.add('focus:outline-green-500','border-1','border-green-500');
                            alertHandle();
                        }else{
                            input.classList.add('focus:outline-red-500','border-1','border-red-500');
                            alertHandle();
                        }
                    }
                }
            })
            
        }
    }

    validateDateField(){
        if(this.inputTargets.length){
            [...this.inputTargets].filter(input => input.type === 'date').forEach(input => {
                if(input.valueAsDate !== null){
                    input.classList.remove('focus:outline-red-500','border-1','border-red-500');
                    input.classList.add('focus:outline-green-500','border-1','border-green-500');
                }else{
                    input.classList.add('focus:outline-red-500','border-1','border-red-500');
                    input.classList.remove('focus:outline-green-500','border-1','border-green-500');
                }
            })}
    }
    
    validateFieldForm(event){
        if(this.formTargets.length){
            
            [...this.formTargets].forEach(form => { 
                if(this.questionsGroupTargets[0].children.length > 0){
                    if(!form.checkValidity()){
                        [...this.inputTargets].forEach(input => { 
                            if(!input.checkValidity()){
                                input.classList.remove('focus:outline-green-500','border-1','border-green-500')
                                input.classList.add('focus:outline-red-500','border-1','border-red-500');
                            }else{
                                input.classList.remove('focus:outline-red-500','border-1','border-red-500')
                                input.classList.add('focus:outline-green-500','border-1','border-green-500');
                            }
                        })
                        event.preventDefault();
                    }else{
                        if(this.questionsTargets){
                            [...this.questionsTargets].forEach(item => item.remove());
                        }
                        this.formTargets[0].submit()
                    }
                }else{
                    alertHandle();
                    if(!form.checkValidity()){
                        [...this.inputTargets].forEach(input => { 
                            if(!input.checkValidity()){
                                input.classList.add('focus:outline-red-500','border-1','border-red-500');
                            }else{
                                input.classList.remove('focus:outline-red-500','border-1','border-red-500')
                                input.classList.add('focus:outline-green-500','border-1','border-green-500');
                            }
                        });

                        event.preventDefault();
                    }
                    const nonQuestionsAlert = document.getElementById('nonQuestionsAlert');
                    nonQuestionsAlert.classList.add('vibrating');
                    setTimeout(() =>{
                        nonQuestionsAlert.classList.remove('vibrating');
                    },500)
                    event.preventDefault();
                }
                
            })  
        }
    }
}
