const api_url = `https://reviewsksd.herokuapp.com/reviews/"`;
async function getReviews() {
  const response = await fetch(api_url);
  const data = await response.json();

  tit = "";
  rev = "";
  rat = "";
  rea = "";
  sou = "";
  nam = "";
  reviewCard = "";
  ratingStars = "";
  filterRating = 7; // use this for filtering reviews.
  reviewCount = 3; // use this for the count of reviews you want to display.

  for (let i = 0; i < reviewCount; i++) {
    let random = Math.floor(Math.random() * data.length);
    tit += data[random].reviews["review"].title;
    rev += data[random].reviews["review"].reviewText || "";
    rat += data[random].reviews["review"].rating;
    rea += data[random].reviews["review"].reaction || "";
    nam += data[random].reviews["review"].name || "";
    sou += data[random].reviews["review"].source;

    if (rat > filterRating) {
      numberOfStars = rat / 2; // example: rat = 8, 8 / 2 = 4 stars.

      function starRating(x) {
        // Function for calculating stars.

        checkedStars = parseInt(x); // 1.5 = 1
        halfStars = Math.round(parseFloat(x - parseInt(x))); // 1
        uncheckedStars = parseInt(5 - x); // 5 - 1.5 = 3

        // checked stars
        if (x % 1 == 0) {
          for (let i = 0; i < checkedStars; i++) {
            ratingStars += `<span class="fa fa-star checked"></span>`;
          }
          for (let k = 0; k < uncheckedStars; k++) {
            ratingStars += `<span class="fa fa-star-o"></span>`;
          }
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

      starRating(numberOfStars); // calling the starRating function to get the html element.

      // collecting the full element in html.

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
    } else {
      tit = "";
      rev = "";
      rat = "";
      rea = "";
      sou = "";
      ratingStars = "";
      nam = "";
      i--;
    }
  }
}
document.querySelector("#review-card").insertAdjacentElement('beforebegin', document.createElement('h3')).setAttribute("id", "onze-reviews");
document.querySelector("#onze-reviews").innerHTML = "Onze Reviews";
getReviews();