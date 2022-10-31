//Dynamic Navigation Theme:
const nav = document.querySelector(".nav")
const logo = document.querySelector("#logo")


window.addEventListener("scroll", dynamizeNav)       // Call the function fixNav when you scroll on the window

function dynamizeNav() {
    if(window.scrollY > nav.offsetHeight + 100) {     // If the scroll on the y-axis is greater than navigations height + 100, then we should add the class of active
        nav.classList.add("nav-active")
        logo.src="Images/Logo4.png"
    }
    else {
        nav.classList.remove("nav-active")                // If it is not, then we should remove the class
        logo.src="Images/Logo3.png";
    }
}



//Active entries styling:

function isInViewPort(element) //Helper function to determine whether an element is in the viewport.
{
      const rect = element.getBoundingClientRect();
      return (rect.top >= -100 && rect.top <= 400);

}

