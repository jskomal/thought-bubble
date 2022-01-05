//querySelectors
var inputTitle = document.querySelector('#input-title');
var inputBody = document.querySelector('#input-body');

var buttonSave = document.querySelector('.button-save');
var errorMessage = document.querySelector('.error-message')

//data
var ideas = [];

//eventListeners


//separate the function, don't use alert, add a p tag to the dom?
buttonSave.addEventListener('click', clickSave);


buttonSave.addEventListener('mouseover', validateError)
buttonSave.addEventListener('mouseover', validateInputs);
buttonSave.addEventListener('mouseout', validateInputs);

//functions
function validateInputs() {
  if (inputTitle.value === '' || inputBody.value === '') {
    buttonSave.classList.toggle('button-save-invalid');
  }
}

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}

function clickSave(e) {
  e.preventDefault();
  if (inputTitle.value === '' || inputBody.value === ''){
    show(errorMessage);
  } else {
    var inputIdea = new Idea(inputTitle.value, inputBody.value);
    ideas.push(inputIdea);
    inputTitle.value = '';
    inputBody.value= '';
  }
}

function validateError() {
  if(inputTitle.value && inputBody.value) {
    hide(errorMessage);
  }

}