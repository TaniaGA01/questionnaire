import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['input']
    
    validate(){
        const emailRegex = /^[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        if(this.inputTargets.length){
            const focusedInput = [...this.inputTargets].filter(input => input);
            console.log('focusedInput',focusedInput)

            focusedInput.forEach(input => {
                if([...input.value].length < 5 && input.id !== 'poll_user_email'){
                    input.classList.add('focus:outline-red-500')
                }else{
                    input.classList.remove('focus:outline-red-500')
                    input.classList.add('focus:outline-green-500')
                }
                if(input.id === 'poll_user_email'){
                    
                    if(emailRegex.test(input.value) === false){
                        input.classList.add('focus:outline-red-500')
                    }else{
                        input.classList.remove('focus:outline-red-500')
                        input.classList.add('focus:outline-green-500')
                    }
                }
            })
            
        }
    }
}
