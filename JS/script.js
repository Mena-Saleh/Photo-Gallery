//Like/dislike heart animation + updating likes on the front end only.
function heartAnimation(event){

const elem = event.target; //Get the element clicked on.

//Toggle CSS classes for animations:
elem.classList.toggle("heart-active");
elem.classList.toggle("fa-solid");
//Get the card containing the heart (the parent element):
const card = elem.parentElement;
//Get the HTML span element that contains the likes:
const likesElem = card.querySelector('.like-count');
//Parse the text to int to get the number of likes:
let likes = parseInt(likesElem.innerText);

if(elem.classList.contains("heart-active")) //The user just liked the photo so it contains classes associated with liking.
{
    likes++;
}
else{
    likes--;
}
//Update likes only on the front-end:
likesElem.innerHTML = likes;

}


//Delete clicked element
function deleteElement(event)
{
  
    const elem = event.target; //Get the element clicked on
    const isConfirmed = confirm("Are you sure you want to delete this photo?"); //Ask for confirmation:
    if(isConfirmed) //Delete parent element (the whole card) if confirmed by user and remove data from local storage.
    {
        deleteCardFromLocalStorage(elem.getAttribute("data-id")); //Delete data from local storage.
        localStorage.idCounter --; //Decrement element count.
        elem.parentElement.remove(); //Remove HTML element without refreshing,
    }
}




//API call for public photos album:

//API call credentials:
const baseURL = "https://api.unsplash.com/photos/?client_id=";
const key = "5BFamL-qwIJlWsUajaoaCj3jGesVJ4BxTPU-1Uexm_c"; //It is better to not have the key here for security reasons, but for the sake of the assessment, I'll have it here for now.

//Function that gets JSON data for a list of photos from the unsplash API by providing page number as a query parameter.
const getAPIData = async (baseURL , page, key) =>
{

  const res = await fetch(baseURL+ key + "&page=" + page); //Await response from the API

  try
  {
    const data = await res.json(); //Store the retrieved data in JSON format.
    // console.log(data);
    return data; //Return JSON data.
  }
  catch (error) // Error handling.
  {
    console.log("error", error);
  }

}


//Function that adds a public photos card.

const publicGrid = document.querySelector('#public-photos-grid');

//Function that takes card information and creates a card element under public photos grid.
function createPublicCard (profilePictureURL, username, imageURL, imageName, imageDesc, Likes )
{
    //If the image name or description are null, replace the value "null" with empty quotes "":
    imageName = imageName == null? "": imageName;
    imageDesc = imageDesc == null? "": imageDesc;

    //Card element html:
    const publicCard = `<div class="card">
          
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

  //Append the card HTML to the grid's HTML:
  publicGrid.innerHTML += publicCard;

}


//Function that creates cards with API data
function generateCardsFromAPIData(data){
    //Loop over all entries retreiving the required data and creating a card for each entry:
    for (let [key, value] of Object.entries(data)) {
        //For now I'll pass "Lorem Ipsum" for photo name, because the API doesn't provide photo names.
        createPublicCard(value.user.profile_image.small, value.user.username, value.urls.regular, "Lorem Ipsum" , value.description, value.likes)
    }
}




///Function that takes card information and creates a card element under local photos grid.

const localGrid = document.querySelector('#local-photos-grid');

function createLocalCard (card)
{
  const localCard = `<div class="card">
          
  <img class= "profile-pic" src="Local_Images/user.jpg" alt="profile picture">
  <div class="name">thecolorlesseyes<i class="fas fa-check"></i></div>
  <i class="fa-regular fa-trash-can trash-icon" onclick="deleteElement(event)" data-id="${card.id}"></i>
  <div class="photo">
    <img src="${card.img}" alt="user image">
  </div>
  <i class="fa-regular fa-heart heart-icon" onclick="heartAnimation(event)"></i>
  <div class="photo-text">
    <div class="photo-name-likes">
      <h4>${card.name}</h4>
      <h6><span class="like-count">0</span> Likes</h6>
    </div>
    <p>${card.desc}</p>
  </div>
  
</div>`


  //Append the card HTML to the grid's HTML:
  localGrid.innerHTML += localCard;

}

//Function that creates cards from LocalStorage data

function generateCardsFromLocalStorage(){
  let cardKey;
  for(let i = 0; i < localStorage.idCounter; i++) //Loop over all cards stored
  {
    let card = JSON.parse(localStorage["card"+i]);  //Get the ith card.
    createLocalCard(card);
  }
}


//Function Calls

if(document.body.id == 'index-body') //Functions related to index page
{

//Generate local storage album:
generateCardsFromLocalStorage();


//To load the album every time the home page is refreshed or re-directed to.
document.addEventListener("DOMContentLoaded", ()=> {
  //get a random pictures feed everytime and display 10 cards on the page:
  getAPIData(baseURL,Math.floor(Math.random() * 100), key).then(function(data){
      generateCardsFromAPIData(data);
      });

})




} 


else //Functions related to add-photo page
{

//Add-photo form validation:

//Constants from the DOM to validate the form with.
const form = document.querySelector('#add-photo-form'); 
const button = document.querySelector('#form-button');

const name = document.querySelector('#text-name');
const desc = document.querySelector('#text-desc');
const img = document.querySelector('#file-input');


const regex = /^[a-zA-Z-,]*$/; //Regex for name validation (accepts alphabets . and -);

button.addEventListener('click', (event) =>{

  event.preventDefault(); //Prevent sumbit action for now, to validate in JS first.

  
  if(form.checkValidity()) //Check if it passes initial HTML input validation.
  {

    if (regex.test(name.value)) //Check if name matches the regular expression.
    {
    
      if(desc.value.length <= 255) //Check if description is under 255 characters.
      {

        const imgType = img.files[0].type; //Get the type of the image.

        if (imgType == 'image/jpg' || imgType == 'image/jpeg' || imgType == 'image/png') //Check if image is png, jpg or jpeg:
        {
          const reader = new FileReader();
          reader.readAsDataURL(img.files[0]);
          
          //Wait for the reader to read, then add a card to local storage with relevant info.
            reader.addEventListener("load", ()=>{
            const myCard = new Card(localStorage.idCounter== null? 0: localStorage.idCounter, name.value, desc.value, reader.result);
            writeCardToLocalStorage(myCard);
            
          })
          
          alert("Success!");
          form.submit();
        }
        else{
          alert("Please choose an image in jpg, jpeg or png format!"); //Notify user of error.
        }
      }
      else{
        alert("Description can't be more than 255 characters"); //Notify user of error.
      }
    }


    else{
      alert("You can only use alphabets , or - for Name field"); //Notify user of error.
    }
  


  }
  else{
    form.reportValidity(); //Report validity of HTML input elements.
  }




})



}













//Local storage manipulation and storing card data:

//Class to represent card data:
class Card  {
  constructor(id,name, desc, img){
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.img = img;
  }
}


//Push a new card to the local storage:
function writeCardToLocalStorage(card){
  if(localStorage.idCounter == null) //Initialize counter if it doesn't exist
  {
    localStorage.idCounter = 0;
  }
    localStorage.setItem(`card${localStorage.idCounter}`, JSON.stringify(card)); //Set an item with unique ID storing the JSON object for the card as a string.
    localStorage.idCounter ++; //Increment counter

}


//Deletes card from storage using id
function deleteCardFromLocalStorage(id)
{
  localStorage.removeItem("card" + id);
}

