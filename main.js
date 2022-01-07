//querySelectors
var inputTitle = document.querySelector('#inputTitle');
var inputBody = document.querySelector('#inputBody');
var inputSearchIdea = document.querySelector('#inputSearch');
var buttonSave = document.querySelector('#buttonSave');
var buttonDelete = document.querySelector('#buttonDelete');
var buttonShowStarred = document.querySelector('#buttonShowStarredIdeas');
var errorMessage = document.querySelector('#errorMessage');
var cardFlex = document.querySelector('#cardView');

//data
var ideas = [];

//eventListeners
buttonSave.addEventListener('click', clickSave);
buttonSave.addEventListener('mouseover', validateError);
buttonSave.addEventListener('mouseover', validateInputsAdd);
buttonSave.addEventListener('mouseout', validateInputsRemove);
cardFlex.addEventListener('click', toDelete);
cardFlex.addEventListener('click', toStar);
buttonShowStarred.addEventListener('click', filterStarred);
inputSearchIdea.addEventListener('keyup', filterSearch);

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
    updateView(ideas);
  }
}

function validateError() {
  if (inputTitle.value && inputBody.value) {
    hide(errorMessage);
  }
}

function toDelete(e) {
  if (e.target.id === 'buttonDelete') {
    var targetID = e.target.parentNode.parentNode.id;
    for (var i = 0; i < ideas.length; i++) {
      if (targetID === ideas[i].id.toString()) {
        ideas.splice(i, 1);
        updateView(ideas);
        break;
      }
    }
  }
}

function toStar(e) {
  if (e.target.id === 'buttonStar') {
    var targetID = e.target.parentNode.parentNode.id;
    for (var i = 0; i < ideas.length; i++) {
      if (targetID === ideas[i].id.toString()) {
        ideas[i].isStarred = !ideas[i].isStarred;
        updateView(ideas);
      }
    }
  }
}

function filterStarred(e) {
  e.preventDefault();
  if (buttonShowStarred.innerText === 'Show All Ideas') {
    updateView(ideas);
    buttonShowStarred.innerText = 'Show Starred Ideas';
  } else {
    var starredIdeas = ideas.map(function (element) {
      if (element.isStarred) {
        return element;
      }
    });
    for (var i = 0; i < starredIdeas.length; i++) {
      if (starredIdeas[i] === undefined) {
        starredIdeas.splice(i, 1);
      }
    }
    updateView(starredIdeas);
    buttonShowStarred.innerText = 'Show All Ideas';
  }
}

function filterSearch() {
  var filteredIdeas = [];
  for (var i = 0; i < ideas.length; i++) {
    if (
      ideas[i].title.toLowerCase().includes(inputSearchIdea.value.toLowerCase()) ||
      ideas[i].body.toLowerCase().includes(inputSearchIdea.value.toLowerCase())
    ) {
      filteredIdeas.push(ideas[i]);
    }
  }
  updateView(filteredIdeas);
}

function updateView(arrayName) {
  var emptyHTML = '';
  for (var i = 0; i < arrayName.length; i++) {
    emptyHTML += `<article class='card' id=${arrayName[i].id}>
      <div class='card-top-bar'>
        <input type='image' src= ${
          arrayName[i].isStarred ? 'assets/star-active.svg' : 'assets/star.svg'
        } id='buttonStar' />
        <input type='image' src='assets/delete.svg' id='buttonDelete'/>
      </div>
      <section class='card-text'>
        <h1 class='card-title'>${arrayName[i].title}</h1>
        <p class='card-body'>${arrayName[i].body}</p>
      </section>
      <div class='card-bottom-bar'>
        <input type='image' src='assets/comment.svg' id='buttonImageComment' />
        <button class='button-comment'>Comment</button>
      </div>
    </article>`;
  }
  cardFlex.innerHTML = emptyHTML;
}