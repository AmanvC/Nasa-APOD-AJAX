const apiKey = "YOUR_API_KEY_HERE";
const url = "https://api.nasa.gov/planetary/apod?";

let container = document.querySelector(".container");
let button = document.getElementById("fetch-image");

button.addEventListener("click", () => {
  getImage("normal");
});

let hdButton = document.getElementById("fetch-hd");
hdButton.addEventListener("click", () => {
  getImage("hd");
});

function getImage(value) {
  let imageContainer = document.querySelector(".image-container");
  imageContainer.remove();

  let newImageContainer = document.createElement("div");
  newImageContainer.classList.add("image-container");

  container.append(newImageContainer);

  let dateInput = document.querySelector(".details-input input");
  let date = dateInput.value;

  let request = new XMLHttpRequest();
  request.open("GET", url + "date=" + date + "&api_key=" + apiKey, true);
  request.send();
  request.onload = function () {
    if (request.status === 200) {
      let data = JSON.parse(request.responseText);
      let imageUrl;
      if (value === "hd") {
        imageUrl = data.hdurl;
      } else {
        imageUrl = data.url;
      }
      let image = document.createElement("img");
      image.src = imageUrl;
      newImageContainer.append(image);
    } else {
      window.alert("Please enter the date in correct format.");
    }
  };
}
