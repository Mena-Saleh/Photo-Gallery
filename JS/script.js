//Like/dislike heart animation + updating likes on the front end.
function heartAnimation(event){

const elem = event.target;
elem.classList.toggle("heart-active");
elem.classList.toggle("fa-solid");
const card = elem.parentElement;
const likesElem = card.querySelector('.like-count');
let likes = parseInt(likesElem.innerText);

if(elem.classList.contains("heart-active"))
{
    likes++;
}
else{
    likes--;
}
likesElem.innerHTML = likes;

}

//Delete clicked element

function deleteElement(event)
{
    const elem = event.target;
    const isConfirmed = confirm("Are you sure you want to delete this photo?");
    if(isConfirmed)
    {
        elem.parentElement.remove();
    }
}




//API call for public photos album:
const baseURL = "https://api.unsplash.com/photos/?client_id=";
const key =  "5BFamL-qwIJlWsUajaoaCj3jGesVJ4BxTPU-1Uexm_c"


const getAPIData = async (baseURL , page, key) =>
{

  const res = await fetch(baseURL+ key + "&page=" + page);

  try
  {
    const data = await res.json(); // Store the retrieved Data.
    // console.log(data);
    return data;
  }
  catch (error) // Error handling.
  {
    console.log("error", error);
  }

}

//Function that adds a public photos card.

const publicGrid = document.querySelector('#public-photos-grid');

function createCard (profilePictureURL, username, imageURL, imageName, imageDesc, Likes )
{
    imageName = imageName == null? "": imageName;
    imageDesc = imageDesc == null? "": imageDesc;

    const card = `<div class="card">
          
    <img class= "profile-pic" src="${profilePictureURL}" alt="profile picture">
    <div class="name">${username}<i class="fas fa-check"></i></div>
    <div class="photo">
      <img src="${imageURL}" alt="user image">
    </div>
    <i class="fa-regular fa-heart heart-icon" onclick="heartAnimation(event)"></i>
    <div class="photo-text">
      <div class="photo-name-likes">
        <h4>${imageName}</h4>
        <h6><span class="like-count">${Likes}</span> Likes</h6>
      </div>
      <p>${imageDesc}</p>
    </div>
    
  </div>`

publicGrid.innerHTML += card;

}


//Function that creates cards with API data
function generateCardsFromData(data){
    for (let [key, value] of Object.entries(data)) {
        //For now I'll pass the "Photo name" for photo name, because the API doesn't provide photo names.
        createCard(value.user.profile_image.small, value.user.username, value.urls.regular, "Photo Name" , value.description, value.likes)
    }
}



//Function Calls

getAPIData(baseURL,Math.floor(Math.random() * 100), key).then(function(data){
generateCardsFromData(data);
});
