/*NOTE:
This file is for testing purposes only.

*/



//Key:
const API_Key="AIzaSyB2CL69PUQsH4j4lRmMFJmm07nE1dB8rTE";


//Grabbing HTML :
const searchResultDiv=document.querySelector('.search-result');
const Pagination=document.querySelector('.pagination');
const container=document.querySelector('.container');

let content=0;
// Fetching data(30 values) using key:
async function fetchAPI(){

    // go the documentation and get the base url or path of the API:
    const base_URL=`https://www.googleapis.com/youtube/v3/search?key=${API_Key}&type=video&part=snippet&maxResults=30&q=js`;

    const response=await fetch(base_URL);

    //convert the response into JSON:
    const data= await response.json();
    //console.log('>>',data);
    return data.items;
    console.log('>>', content);
} 

let constent=fetchAPI();
constent.then((res)=>{
   console.log(res);
});




