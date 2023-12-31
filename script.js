const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];




// Unsplash API
const count = 30;
const apiKey = 'W1-Q6I07OQHigK7pXUs7XsF8cCC5mb3gO9SSztwh52I';
const apiURL = `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    console.log(imagesLoaded);
    if (imagesLoaded === totalImages) {
        ready =true;
        loader.hidden = true;
       
    }
}
// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Elements For Links & photos, Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    
    // Run function for each object in PhotosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to unslash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description, 
            title: photo.alt_description, 
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);



    });
}



// Get photos from Unpsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayPhotos();


    } catch (error) {
        // Catch Error Here
    }
}


// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight -
        1000 && ready) {
            ready = false;
            getPhotos();
            
        }
});


// On Load
getPhotos();


