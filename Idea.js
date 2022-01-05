class Idea {
    //id, title, body, star
    constructor(title, body) {
        this.id = Date.now();
        this.title = title;
        this.body = body;
        this.isStarred = false;
    }

    // local storage?
    saveToStorage() {

    }

    deleteFromStorage() {

    }

    // update idea's starred state
    updateIdea() {

    }
}