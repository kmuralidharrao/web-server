console.log("client side javascript file is loaded");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const p1 = document.querySelector("#p1");
const p2 = document.querySelector("#p2");

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault(); // default behavior is to reload the page whenever we hit search, this prevents it
  const location = search.value;
  p1.textContent = "Loading...";
  p2.textContent = "";
  console.log("location", location);
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          p1.textContent = data.error;
        } else {
          console.log(data.location);
          p1.textContent = data.location;
          console.log(data.forecast);
          p2.textContent = data.forecast;
        }
      });
    }
  );
});
