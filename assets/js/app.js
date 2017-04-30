const catImgs = selector('.catImg');
const scoreSpans = selector('span');
const catsH2 = selector('.cat-name');

// element selector
function selector(target) {
  return document.querySelectorAll(target);
}

//Cat names
const cats = [
  { name: 'spencer', score: 0}, 
  {name: 'polly', score: 0}
];

// insert cats name and score
cats.forEach((cat, i) => {
  catsH2[i].textContent = cat.name;
  insertCatScore(i, cat.score);
});

function insertCatScore(i, score) {
  scoreSpans[i].textContent = score;
}

catImgs.forEach((catImg, i) => {
  catImg.addEventListener('click', (e) => {
    cats[i].score += 1;
    insertCatScore(i, cats[i].score);
  }, false);
});
