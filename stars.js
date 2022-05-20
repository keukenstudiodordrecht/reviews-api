// hele sterren
while (x % 1 == 0) {
  for (let i = 0; i < checkedStars; i++) {
    ratingStars += `<span class="fa fa-star checked"></span>`;
  } // halve sterren
} while(x % 1 == 0.5); {
  for (let j = 0; j < halfStars; j++) {
    ratingStars += `<span class="fa fa-star-half-o"></span>`;
  }
}
// unchecked sterren
while (uncheckedStars < 6) {
  for (let k = 0; k < uncheckedStars; k++) {
    ratingStars += `<span class="fa fa-star-o"></span>`;
  }
}
