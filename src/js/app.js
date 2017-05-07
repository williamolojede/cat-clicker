/* ========= Model ========= */
const model = {
  // index of the current cat
  currentCatIndex: null,
  adminMode: false,
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
  onAdminMode: function() {
    model.adminMode = true;
    views.adminView.render(model.adminMode);
  },
  offAdminMode: function() {
    model.adminMode = false;
    views.adminView.render(model.adminMode);
  },
  addNewCat: function(data){
    const newCat = new helpers.objectCreator(data[0], data[1]);
    model.cats.push(newCat);
    views.catsListView.init();
  },
  init: function() {
    views.catsListView.init();
    views.adminView.init();
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
  adminView: {
    init: function() {
      // add event listner to admin button and set admin mode to true
      helpers.selector('.admin__btn')[0].addEventListener('click', (e) => {
        controller.onAdminMode();
      }, false);
      // event listner on both cancel and ssave button
      Array.from( helpers.selector('.admin-form__btn') ).forEach( (btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const adminForm = helpers.selector('.admin__form')[0];
          const warningP = helpers.selector('.warning')[0];
          warningP.classList.remove('active');

          if( btn.textContent === 'Cancel'){
            // clears inputs and set admin mode to false
            helpers.clearFormField(adminForm);
            controller.offAdminMode();
          } else if(btn.textContent === 'Save') {
            const newCatDetails = helpers.getValuesOfFormField(adminForm);
            // form validation
            if(helpers.formValidation(newCatDetails)){
              // pass data gotten from input field to the controller
              controller.addNewCat(newCatDetails);
            } else {
              // activate warining message
              if (!warningP.classList.contains('active')) {
                warningP.classList.add('active');
              }
            }
            // clears input field
            helpers.clearFormField(adminForm);
          }
        }, false)
      });
    },
    render: function(flag) {
      const adminDIV = helpers.selector('.admin')[0];
      // makes form visible
      if (flag && !adminDIV.classList.contains('active')){
        adminDIV.classList.add('active');
      }
      if(!flag && adminDIV.classList.contains('active')){
        adminDIV.classList.remove('active');
      }
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
  },
  objectCreator: function(name, url, score = 0){
    return {
      name: name,
      url: url,
      score: score,
    };
  },
  // clears form field
  clearFormField: function(formElement){
    // creates an iterateable array from htmlCollection
    Array.from(formElement.getElementsByTagName('input'))
      .forEach((tag) => tag.value = '');
  },
  // creates an array of all form input's value, also removes white spaces
  getValuesOfFormField: function(formElement){
    return Array.from(formElement.getElementsByTagName('input')).map((tag) => tag.value.trim());
  },
  formValidation: function(data) {
    const catname = data[0];
    const url = data[1];
    // check if input is empty
    function isFormFieldEmpty() {
      if(catname === '' || url === ''){
        return true;
      }
      return false;
    }
    // checks if valid image url is entered
    function isUrlValid() {
      if(url.match(/\.(jpeg|jpg|gif|png)$/) != null ) {
        return true;
      }
      return false;
    }
    if (!isFormFieldEmpty() && isUrlValid()) {
      return true;
    }
    return false;
  },
}

// initialize the app
controller.init();
