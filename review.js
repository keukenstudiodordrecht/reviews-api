const params = new URLSearchParams(window.location.search);
keyWord = params.get("keyWord");
keyWord = document.querySelector("#article > div.lp_content-labels > div:nth-child(3) > span").innerText;
const api_url = `https://reviewsksd.herokuapp.com/reviews/${keyWord}`;
async function getReviews() {
  const response = await fetch(api_url);
  const data = await response.json();
  const d = data[0].reviews["review"];
  console.log("Raw data: ", data);
  console.log(data[2]);
  console.log("Aantal reviews: ", data.length);
  console.log("Reviews: ", data[0].reviews["review"]);

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

    function ratingToStars(rat) {
      numberOfStars = Number(rat / 2);
    }

    ratingToStars(rat);

    console.log(`Rating: ${rat}`);
    rea += data[i].reviews["review"].reaction || "";
    console.log(`Reactie: ${rea}`);
    nam += data[i].reviews["review"].name || "";
    console.log(`Reactie: ${nam}`);
    sou += data[i].reviews["review"].source;
    console.log(`Source ${sou}`);

    for (let i = 0; i < parseInt(numberOfStars); i++) {
      ratingStars += `<span class="fa fa-star checked"></span>`;
    }
    console.log();

    function checkNumber(x) {
      // check if the passed value is a number
      if (typeof x == "number" && !isNaN(x)) {
        // check if it is integer
        if (Number.isInteger(x)) {
          for (let k = 0; k < parseInt(5 % numberOfStars); k++) {
            ratingStars += `<span class="fa fa-star-o"></span>`;
          }
          console.log(`5 - ratingStars = ${x}. So it's an integer.`);
        } else {
          for (let j = 0; j < 0.5; j++) {
            ratingStars += `<span class="fa fa-star-half-o"></span>`;
          }
          console.log(`5 - ratingStars = ${x}. So it's a float value.`);
        }
      } else {
        console.log(`${x} is not a number`);
      }
    }

    checkNumber(5 - numberOfStars);

    reviewCard += `
       <div class="review-card">
       <h2 id="tit">${tit}</h2>
        <span id="rev">${rev}</span> <br> <br>
      <span id="rat">Rating: ${rat} ${ratingStars} </span> <br> <br>
      <span id="nam">Geschreven door: ${nam} </span> <br> <br></div>`;

    document.getElementById("review-card").innerHTML = reviewCard;

    tit = "";
    rev = "";
    rat = "";
    rea = "";
    sou = "";
    ratingStars = "";
    nam = "";
  }
}
getReviews();