const pagination=document.querySelector('.pagination');
let start=0;
let last =4;
function goToPage(page_number){
 last=page_number*4;
 start=last-4;
 console.log(start+" "+last);
}



pagination.innerHTML=`<button id="back">Back</button>`;
for(let i=1;i<=3;i++){
    pagination.innerHTML=pagination.innerHTML+`<button id="forward" onclick="goToPage(${i})">${i}</button>`;
}
pagination.innerHTML=pagination.innerHTML+`<button id="forward">Forward</button>`;