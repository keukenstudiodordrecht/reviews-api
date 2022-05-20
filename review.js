const params = new URLSearchParams(window.location.search);
// keyWord = params.get("keyWord");
keyWord = document.querySelector("#article > div.lp_content-labels > div:nth-child(3) > span").innerText.toLowerCase();
const api_url = `https://reviewsksd.herokuapp.com/reviews/${keyWord}`;
async function getReviews() {
  console.log(`Loading reviews about ${keyWord}`)
  const response = await fetch(api_url);
  const data = await response.json();
  const d = data[0].reviews["review"];

  let tit = "";
  let rev = "";
  let rat = "";
  let rea = "";
  let sou = "";
  let nam = "";
  let reviewCard = "";
  let ratingStars = "";
  let numberOfStars = Number;

  for (let i = 0; i < data.length; i++) {
    tit += data[i].reviews["review"].title;
    rev += data[i].reviews["review"].reviewText || "";
    rat += data[i].reviews["review"].rating;
if (rat > 5){
    function ratingToStars(rat) {
      numberOfStars = Number(rat / 2);
    }

    ratingToStars(rat);

    rea += data[i].reviews["review"].reaction || "";
    nam += data[i].reviews["review"].name || "";
    sou += data[i].reviews["review"].source;


    function checkNumber(x) {
      let checkedStars = parseInt(x); // 1.5 = 1
      let halfStars = Math.round(parseFloat(x - parseInt(x))); // 1
      let uncheckedStars = parseInt(5 - x); // 5 - 1.5 = 3

      // hele sterren
      if (x % 1 == 0) {
        for (let i = 0; i < checkedStars; i++) {
          ratingStars += `<span class="fa fa-star checked"></span>`;
        }
        for (let k = 0; k < uncheckedStars; k++) {
          ratingStars += `<span class="fa fa-star-o"></span>`;
        } // halve sterren
      } else {
        for (let i = 0; i < checkedStars; i++) {
          ratingStars += `<span class="fa fa-star checked"></span>`;
        }
        for (let j = 0; j < halfStars; j++) {
          ratingStars += `<span class="fa fa-star-half-o"></span>`;
        }
        for (let k = 0; k < uncheckedStars; k++) {
          ratingStars += `<span class="fa fa-star-o"></span>`;
        }


      }
    }
    checkNumber(numberOfStars);
    if (rat > 1) {
      reviewCard += `
       <div class="review-card">
       <h2 id="tit">${tit}</h2>
        <span id="rev">${rev}</span> <br> <br>
      <span id="rat">Rating: ${rat} ${ratingStars} </span> <br> <br>
      <span id="nam">Geschreven door: ${nam} </span> <br> <br></div>`;
    }

    document.getElementById("review-card").innerHTML = reviewCard;

    tit = "";
    rev = "";
    rat = "";
    rea = "";
    sou = "";
    ratingStars = "";
    nam = "";
  } else{
    console.log("Review is niet relevant")
  }
}}
getReviews();