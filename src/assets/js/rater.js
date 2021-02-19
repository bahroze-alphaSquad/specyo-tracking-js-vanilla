export function Rater(ratingElement) {
  const stars = ratingElement.querySelectorAll(".star");
  const highlightRating = rating => {
    stars.forEach(star => {
      star.style.color =
        rating >= star.getAttribute("data-value") ? "yellow" : "gray";
    });
  };

  const resetRating = ev => {
    const currentRating = ratingElement.getAttribute("data-rating");
    highlightRating(currentRating);
  };
  const ratingHover = ev => {
    const currentHover = ev.currentTarget.getAttribute("data-value");
    highlightRating(currentHover);
  };

  stars.forEach(star => {
    star.addEventListener("mouseover", ratingHover);
  });

  ratingElement.addEventListener("mouseout", resetRating);

  resetRating();
}
