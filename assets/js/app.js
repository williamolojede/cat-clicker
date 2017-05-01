
// element selector
function selector(target) {
  return document.querySelectorAll(target);
}

const catsH2 = selector('.cat-name');
const catsDIV = selector('.cat-wrapper');

// cat object creator
function Cat(name, score = 0){
  return {
    name: name,
    score: score,
  };
}

//Cat names
const cats = [];

const catNamesURL = 'https://williamolojede.github.io/cat-clicker/assets/js/cat-names.json';
$.getJSON(catNamesURL, (names) => {
  // creates list by filtering names for the first 10
  const catNames = names.filter((_name, i) => i < 10);

  catNames.forEach((name)=>{
    cats.push(Cat(name));
  });

  // list out cat names
  // creates one list item given some text
  function item(text) {  
      return `<li class="catName">${text}</li>`;
  }

  //maps each name into li tag then join the array created by map into a string then insert that into the ul tag
  const catsList = `
    <ul class="catsNames">
      ${ catNames.map(item).join('') }
    </ul>
  `;

  document.querySelector('.catsName-list').innerHTML = catsList;

  const catsLI = document.querySelectorAll('.catName');

  // display cat image and touch count on cat name click
  catsLI.forEach((li, i) => {
    li.addEventListener('click', (e) => {
      const catName = e.target.textContent;
      const selectedCat = cats.filter((cat) => cat.name === catName);
      catsDIV[0].innerHTML = `
        <div class="cat">
          <header>
            <h2 class="cat-name">${selectedCat[0].name}</h2>
          </header>
          <img src="assets/img/cat${i}.jpg" class="catImg">
          <div><h3>Number of Clicks: <span>${selectedCat[0].score}</span></h3></div>
        </div>
      `;
      const catImg = selector('.catImg');
      catImg[0].addEventListener('click', (e) => {
        cats[i].score += 1;
        insertCatScore(0, cats[i].score);
      }, false);
    }, false);
  });
});

function insertCatScore(i, score) {
  const scoreSpan = selector('span');
  scoreSpan[i].textContent = score;
}
