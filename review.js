const api_url = "https://reviewsksd.herokuapp.com/reviews/:keyWord";
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
  let reviewCard = "";
  let ratingStars = "";
  let stars = 1; 

  function ratingStar(rat) {
    ratingStars = Number(rat / 2);
    stars = ratingStars;
  }

  for (let i = 0; i < data.length; i++) {
    tit += data[i].reviews["review"].title;
    console.log([`Review ${[i]}:`]);
    console.log(`Title: ${tit}`);
    rev += data[i].reviews["review"].reviewText || "";
    console.log(`Review text: ${rev}`);
    rat += data[i].reviews["review"].rating;
    ratingStar(rat);

    for (let i = 0; i < stars; i++) {
      ratingStars += `<span class="fa fa-star checked"></span>`;
      console.log("dit is rating stars: ", ratingStars);
    }

    console.log(`Rating: ${rat}`);
    rea += data[i].reviews["review"].reaction || "";
    console.log(`Reactie: ${rea}`);
    sou += data[i].reviews["review"].source;
    console.log(`Source ${sou}`);

    reviewCard += `
       <div class="review-card">
       <h2 id="tit">${tit}</h2>
       <p>
        <span id="rev">${rev}</span> <br> <br>
      <span id="rat">${ratingStars} </span> <br> <br>
      <span id="rea">${rea}</span> <br> <br>
        <span id="sou"><a href="https://www.klantenvertellen.nl/reviews/1035633/keukenstudio_dordrecht_nl?lang=nl&limit=100&pageNumber=0&filterRating=0&filterLocale=&filterDateScoreOrder=DATE_DESC">${sou}</a></span> <br><br>
      </p></div>`;

    document.getElementById("review-card").innerHTML = reviewCard;
    document.getElementById("tit").innerHTML = tit;
    document.getElementById("rev").innerHTML = rev;
    document.getElementById("rat").innerHTML = rat;
    document.getElementById("rea").innerHTML = rea;
    document.getElementById("sou").innerHTML = sou;

    tit = "";
    rev = "";
    rat = "";
    rea = "";
    sou = "";
    ratingStars = "";
  }
}
getReviews();