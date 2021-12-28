// first grab the search form
const searchForm = document.querySelector("form");
// now catch the search result div
const searchResultDiv = document.querySelector(".search-result");
//grab the entire container:
const container = document.querySelector(".container");

const API_Key = "AIzaSyB2CL69PUQsH4j4lRmMFJmm07nE1dB8rTE";

//Pagination:
const Pagination = document.querySelector(".pagination");
let start_video_value = 0;
let last_video_value = 4;

let searchQuery = "";
//Function to catch what's in the search query:
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  //write the fetch API function: Because we are fetching it, we use async
  fetchAPI();
});

async function fetchAPI() {
  // go the documentation and get the base url or path of the API:

  const base_URL = `https://www.googleapis.com/youtube/v3/search?key=${API_Key}&type=video&part=snippet&maxResults=30&q=${searchQuery}`;

  const response = await fetch(base_URL);

  //convert the response into JSON:
  const data = await response.json();
  console.log('>>>',data);

  //Getting only 4 videos at once:
  let present_data = data.items.slice(
    `${start_video_value}`,
    `${last_video_value}`
  );

  //Creating the pagination row:
  Pagination.innerHTML = `<button id="back">Back</button>`;
  for (let i = 1; i <= Math.ceil(data.items.length / 4); i++) {
    Pagination.innerHTML =
      Pagination.innerHTML +
      `<button id="pageNumber" onclick="goToPage(${i})">${i}</button>`;
  }
  Pagination.innerHTML =
    Pagination.innerHTML + `<button id="forward">Forward</button>`;

  //Creating the videos cards:
  generateHTML(present_data);

  //Forward button:
  document.getElementById("forward").addEventListener("click", () => {
    start_video_value = start_video_value + 4;
    last_video_value = last_video_value + 4;
    fetchAPI();
  });

  //Back button:
  if (start_video_value > 0) {
    document.getElementById("back").addEventListener("click", () => {
      start_video_value = start_video_value - 4;
      last_video_value = last_video_value - 4;
      fetchAPI();
    });
  }
}

//Go to page function:
function goToPage(page_number) {
  last_video_value = page_number * 4;
  start_video_value = last_video_value - 4;

  fetchAPI();
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
