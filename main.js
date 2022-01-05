//querySelectors
var inputTitle = document.querySelector('#input-title');
var inputBody = document.querySelector('#input-body');

var buttonSave = document.querySelector('.button-save');

//data
var ideas = [];

//eventListeners

//separate the function, don't use alert, add a p tag to the dom?
buttonSave.addEventListener('click', function clickSave(e) {
  e.preventDefault();
  if (inputTitle.value === '' && inputBody.value === '') {
    alert('New ideas require a Title and a Body!');
  } else if (inputTitle.value === '') {
    alert('New ideas require a Title!');
  } else if (inputBody.value == '') {
    alert('New ideas require a Body!');
  } else {
    var inputIdea = new Idea(inputTitle.value, inputBody.value);
    ideas.push(inputIdea);
    inputTitle.value = '';
    inputBody.value= '';
  }
});

buttonSave.addEventListener('mouseover', validateInputs);
buttonSave.addEventListener('mouseout', validateInputs);

//functions
function validateInputs() {
  if (inputTitle.value === '' || inputBody.value === '') {
    buttonSave.classList.toggle('button-save-invalid');
  }
}