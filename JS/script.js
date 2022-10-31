//Like/dislike heart animation

function heartAnimation(event){

const elem = event.target;
elem.classList.toggle("heart-active");
elem.classList.toggle("fa-solid");

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