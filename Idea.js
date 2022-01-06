class Idea {
  //id, title, body, star
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.isStarred = false;
  }

  // update idea's starred state
  updateIdea() {}
}