# Photo Gallery Application

## Website is live at:
https://mena-ibrahim.github.io/Photo-Gallery/

## Table of Contents

1. Project Description 
2. Usage
3. Dependencies And About The Project
4. Functionality
5. Copyrights And Acknowledgements

## Project Description 

The project is simply a photo gallery that futures two albums, an album of public photos retrieved through the unsplash API, and another album that contains local photos save on the user's local storage.

## Usage

The user can view public pictures and check information such as the username of the picture owner, description (although not always included from the unsplash API), photo name (also not provided by the unsplash API) and number of likes. There is the option to like a photo but it is not registered to unsplash as of now. it just shows the functionality visually (no backend support right now).

The other use case is to use the local photos album, in which you can add photos from the add-photo page. There is a limitation to the number and size of photos you can have because this app stores photos in the form of a dataURL which ultimately depends on the size of the image uploaded, so generally you can't upload more than 5mb worth of photos, which is why I strongly recommend you use photos provided with the project under the "TestImages" folder. or any local thumbnails that aren't to large in size. You can also delete photos from local storage by clicking on the trash icon and confirming deletion.

## Dependencies And About The Project

To run this software, all that is required is a web browser that supports HTML, CSS and Javascript such as Google Chrome.
No special software is required to run this code and there is no installation process, just open the index.HTML with any supporting browser software.

- Files and folders included in the project:

    - index.html
    - CSS/main.css
    - JS/script.js
    - TestImages (contains test images and a static local user profile image)
    - add-photo.html
    - README.md

- How to run the project?
    navigate to the project folder, then double click the "index.html" file, the project should immediately open in your default web browser.

- Technologies used
    - HTML5
    - CSS 3
    - JavaScript ES6



## Functionality

- Design
    The design is done according to a mock up design provided by Cyberus, with a little bit of extra animations and design aspects thrown around, for instance, there is a trash hover animation and a heart beat animation on liking a photo, there is also other cool hover effects like a zoom effect when hovering over a picture, in addition to simple button animations.

    Responsiveness is taken into consideration in the design process. This web app is responsive across all different sizes of screens.

- Randomized photos feed
    Every time you refresh the home page, a random feed of 10 pictures is loaded using the unsplash web API, the API doesn't provide photo names so the photo name is statically filled for now with "lorem ipsum". You get the option to like any picture but it is not registered on the unsplash databases, it is just visual for now.

- Local photos feed
    This contains pictures that are uploaded by the user and save in the local storage (up to 5mb of data because the images are stored as data URLs in the local storage). There is validation functions that validates the required entries and displays validation errors when the user attempts to add a new photo. The user can also delete any photo, on deletition the photo is unretrievable because it is deleted from the local storage. Local photos are saved so that the user can access them any time (almost like cookies), and restarting the application doesn't delete them.



## Copyrights And Acknowledgements

    The mock up design belongs to the Cyberus team, however any code written in this project is solely done by me.

    - About The Author
        - Name: Mena Ashraf Mikhael Saleh
        - Email: Mena.a.saleh.2001@gmail.com
        - GitHub: https://github.com/Mena-Ibrahim
        - LinkedIn: https://www.linkedin.com/in/mena-ashraf-23b947167/

