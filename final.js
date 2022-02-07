/*NOTE:
This file is for testing purposes only.
*/

//HTML catching:
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");

const API_KEY = "AIzaSyB2CL69PUQsH4j4lRmMFJmm07nE1dB8rTE";

//Pagination:
const Pagination = document.querySelector(".pagination");
let initialSearch = 0;
let nextPageToken='';
let previousPageToken='';

//Searching:
let searchQuery = "";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  initialSearch=0;
  //write the fetch API function: Because we are fetching it, we use async
  fetchVideos();
});

async function fetchVideos(pageToken) {
  // go the documentation and get the base url or path of the API:

  const base_URL =
    initialSearch === 0
      ? `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=15&q=${searchQuery}`
      : `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=video&part=snippet&maxResults=15&q=${searchQuery}&pageToken=${pageToken}`;

  const response = await fetch(base_URL);

  //convert the response into JSON:
  const data = await response.json();
  console.log(">>>", data);
  nextPageToken=data.nextPageToken;
  if(data.prevPageToken){
    previousPageToken=data.prevPageToken;
  }

  generateHTML(data.items);
  pageNavigation();
}

//youtube cards generation:
function generateHTML(results) {
  //console.log(">>", results);
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        
        <div class="item">
                    <img src="${result.snippet.thumbnails.high.url}" alt="">
                    <div class="flex-container">
                        <h1 class="title">${result.snippet.channelTitle}</h1>
                        <a class="view-button" href="" target="_blank">Watch Video</a>
                    </div>
                    <p class="item-data">${result.snippet.description} </p>
                    
                </div>
        `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}

//Page next and previous function:
function pageNavigation() {
  Pagination.innerHTML =
    `<button id="back">Back</button>` + `<button id="forward">Forward</button>`;

  document.getElementById("forward").addEventListener("click", () => {
    initialSearch=initialSearch+1;
    fetchVideos(nextPageToken);
  });
  document.getElementById("back").addEventListener("click", () => {
    initialSearch=initialSearch-1;
    fetchVideos(previousPageToken);
  });
}
