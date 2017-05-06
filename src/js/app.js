/* ========= Model ========= */
const model = {
  // index of the current cat
  currentCatIndex: null,
  cats: [
    {
      name: 'Abby',
      score: 0,
      url: 'src/img/cat0.jpg',
    },
    {
      name: 'Angel',
      score: 0,
      url: 'src/img/cat1.jpg',
    },
    {
      name: 'Annie',
      score: 0,
      url: 'src/img/cat2.jpg',
    },
    {
      name: 'Baby',
      score: 0,
      url: 'src/img/cat3.jpg',
    },
    {
      name: 'Bailey',
      score: 0,
      url: 'src/img/cat4.jpg',
    },
  ],
};

/* ========= Controller ========= */
const controller = {
  getCatsName: function() {
    return model.cats.map((cat) => cat.name);
  },
  setCurrentCat: function(catIndex) {
    model.currentCatIndex = catIndex;
  },
  getCurrentCat: function() {
    return model.cats[model.currentCatIndex];
  },
  incrementCatScore: function() {
    this.getCurrentCat().score += 1;
    views.catView.insertCatScore(this.getCurrentCat().score);
  }, 
  init: function() {
    views.catsListView.init();
  },
};

/* ========= Views ========= */
const views = {
  /* ========= cats name List View ========= */
  catsListView: {
    // builds the list then calls the render method to render the list
    init: function() {
      //maps each name into li tag then join the array created by map into a string then insert that into the ul tag
      this.catsList = `<ul class="catsNames">${ controller.getCatsName().map(helpers.item).join('') }</ul>`;
      this.render();

      // get cats LI after they've been rendered and attach event listner to each of them
      helpers.selector('.catName').forEach((li, i) => {
        li.addEventListener('click', (e) => {
          controller.setCurrentCat(i);
          views.catView.init();
          // console.log(this)
        }, false);
      });
    },
    // inserts the list on to the page
    render: function() {
      helpers.selector('.catsName-list')[0].innerHTML = this.catsList;
    },
  },

  /* ========= cat View ========= */
  catView: {
    // builds the view then calls the render method to render it
    init: function(){
      const currentCat = controller.getCurrentCat();
      this.cat = `
        <div class="cat">
          <header>
            <h2 class="cat-name">${currentCat.name}</h2>
          </header>
          <img src="${currentCat.url}" class="catImg">
          <div><h3>Clicks: <span>${currentCat.score}</span></h3></div>
        </div>
      `;
      this.render();

      // get current cat image and the attach an event listner to it
      helpers.selector('.catImg')[0].addEventListener('click', (e) => {
        controller.incrementCatScore();
      }, false);
    },
    // updates the dom with cat score
    insertCatScore: function (score) {
      helpers.selector('span')[0].textContent = score;
    },
    render: function (){
      helpers.selector('.cat-wrapper')[0].innerHTML = this.cat;
    },  
  },
};

// helpers
const helpers = {
  // creates one list item given some text
  item: function (text) {  
    return `<li class="catName">${text}</li>`;
  },
  // selects elements from the dom
  selector: function (target) {
    return document.querySelectorAll(target);
  }
}

// initialize the app
views.catsListView.init();
