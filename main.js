//querySelectors
var inputTitle = document.querySelector('#input-title');
var inputBody = document.querySelector('#input-body');
var buttonSave = document.querySelector('.button-save');
var errorMessage = document.querySelector('.error-message')
var cardFlex = document.querySelector('.card-view');
var buttonDelete = document.querySelector('button-delete');

//data
var ideas = [];

//eventListeners
buttonSave.addEventListener('click', clickSave);
buttonSave.addEventListener('mouseover', validateError)
buttonSave.addEventListener('mouseover', validateInputsAdd);
buttonSave.addEventListener('mouseout', validateInputsRemove);
cardFlex.addEventListener('click', toDelete);

//functions
function validateInputsAdd() {
  if (inputTitle.value === '' || inputBody.value === '') {
    buttonSave.classList.add('button-save-invalid');
  }
}

function validateInputsRemove() {
  if (inputTitle.value === '' || inputBody.value === '') {
    buttonSave.classList.remove('button-save-invalid');
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
    updateCardView(); 
  }
}

function updateCardView() {
  var emptyHTML = '';
  for (var i= 0; i < ideas.length; i++) {
    emptyHTML += `<article class='card' id=${ideas[i].id}>
    <div class='card-top-bar'>
      <input type='image' src='assets/star-active.svg' id='button-star' />
      <input type='image' src='assets/delete.svg' id='button-delete'/>
    </div>
    <section class='card-text'>
      <h1 class='card-title'>${ideas[i].title}</h1>
      <p class='card-body'>${ideas[i].body}</p>
    </section>
    <div class='card-bottom-bar'>
      <input type='image' src='assets/comment.svg' id='button-image-comment' />
      <button id='button-comment'>Comment</button>
    </div>
  </article>`;
  } 
  cardFlex.innerHTML = emptyHTML;
}

function validateError() {
  if(inputTitle.value && inputBody.value) {
    hide(errorMessage);
  }
}

function toDelete(e) {
  var targetID = e.target.parentNode.parentNode.id;
  for (var i = 0; i < ideas.length; i++) {
    if(targetID === ideas[i].id.toString()) {
        ideas.splice(i, 1);
        updateCardView();
        break;
    }
  }
  updateCardView();
}