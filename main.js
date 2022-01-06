//querySelectors
var inputTitle = document.querySelector('#input-title');
var inputBody = document.querySelector('#input-body');
var buttonSave = document.querySelector('.button-save');
var buttonDelete = document.querySelector('button-delete');
var errorMessage = document.querySelector('.error-message');
var cardFlex = document.querySelector('.card-view');

//data
var ideas = [];
var targetStar;

//eventListeners
buttonSave.addEventListener('click', clickSave);
buttonSave.addEventListener('mouseover', validateError);
buttonSave.addEventListener('mouseover', validateInputsAdd);
buttonSave.addEventListener('mouseout', validateInputsRemove);
cardFlex.addEventListener('click', toDelete);
cardFlex.addEventListener('click', toStar);

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
  if (inputTitle.value === '' || inputBody.value === '') {
    show(errorMessage);
  } else {
    var inputIdea = new Idea(inputTitle.value, inputBody.value);
    ideas.push(inputIdea);
    inputTitle.value = '';
    inputBody.value = '';
    updateCardView();
  }
}

function validateError() {
  if (inputTitle.value && inputBody.value) {
    hide(errorMessage);
  }
}

function toDelete(e) {
  if (e.target.id === 'button-delete') {
    var targetID = e.target.parentNode.parentNode.id;
    for (var i = 0; i < ideas.length; i++) {
      if (targetID === ideas[i].id.toString()) {
        ideas.splice(i, 1);
        updateCardView();
        break;
      }
    }
  }
}

function toStar(e) {
  if (e.target.id === 'button-star') {
    var targetID = e.target.parentNode.parentNode.id;
    for (var i = 0; i < ideas.length; i++) {
      if (targetID === ideas[i].id.toString()) {
        ideas[i].isStarred = !ideas[i].isStarred;
        updateCardView();
      }
    }
  }
}

function updateCardView() {
  var emptyHTML = '';
  for (var i = 0; i < ideas.length; i++) {
    emptyHTML += `<article class='card' id=${ideas[i].id}>
      <div class='card-top-bar' id=${ideas[i].isStarred}>
        <input type='image' src= ${
          ideas[i].isStarred ? 'assets/star-active.svg' : 'assets/star.svg'
        } id='button-star' />
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
