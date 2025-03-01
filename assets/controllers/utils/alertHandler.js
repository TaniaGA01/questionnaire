export function alertHandle(){
    const 
        questionBlock = document.getElementById('questionsGroup'),
        nonQuestionsAlert = document.getElementById('nonQuestionsAlert')
    ;
    if([...questionBlock.children].length === 0){
        nonQuestionsAlert.classList.remove('hidden');
    }else{
        nonQuestionsAlert.classList.add('hidden');
    }
}