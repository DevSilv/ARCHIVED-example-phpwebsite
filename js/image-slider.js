// Does not return.
//  "imgElement" and "figcaptionElement" parameters are being changed.
function setImageAndCaption(
    imgElement,
    figcaptionElement,
    imagesDirectory,
    groupedImagesProperties,
    currentImageIndex
) {
    "use strict";

    let currentImageProperties =
        groupedImagesProperties[currentImageIndex];
    // Index "0" (the first element of the "paths"
    //      array) was chosen arbitrarily.
    let defaultImageSizePath = imagesDirectory +
        currentImageProperties["paths"][0];

    // Here is set the "src" attribute for these browsers
    //      which do not implement "srcset". Its value might
    //      differ from "srcset"'s value, because the order of
    //      the images' filenames array depends on an external
    //      script (PHP) and probably on the filesystem.
    imgElement.setAttribute("src", defaultImageSizePath);

    imgElement.setAttribute(
        "srcset",
        (function() {
            // I have tried to replace the code below
            //  by "Array.map" to make it clearer, but
            //  unfortunatly this construction is not
            //  standard (I am iterating over two arrays
            //  at once), therefore I consider "Array.map"
            //  not to be clearer here.
            let array = [];
            currentImageProperties["paths"]
                .forEach(function(value, index) {
                    array.push(
                        currentImageProperties["paths"][index] +
                        " " +
                        currentImageProperties["widths"][index] +
                        "w"
                    ); // push
                }); // forEach
            return array.join(", ");
        })() // function
    ); // setAttribute
    imgElement.setAttribute(
        "alt",
        currentImageProperties["name"]
    ); // setAttribute
    imgElement.onload = function() {
        // Set caption.
        let captionNode = document.createTextNode(
            createImageCaption(imgElement)
        ); // createTextNode
        figcaptionElement.replaceChild(
            captionNode,
            figcaptionElement.firstChild
        ); // replaceChild
    }; // function
} // setImageAndCaption

window.addEventListener("load", function() {
    "use strict";
    let request = new XMLHttpRequest();

    request.onload = function() {
        let currentImageIndex = 0;
        // "this" below is used for clarity.
        let imagesFilenames = JSON.parse(this.responseText);
        let imagesDirectory = "../images/";
        let groupedImagesProperties = groupImagesProperties(
            imagesFilenames,
            imagesDirectory
        ); // groupImagesProperties

        // Warning: these below are NOT miliseconds in fact!
        let dimLength = 3000;
        let imgElement = document.getElementsByClassName(
            "image-slider__image"
        )[0]; // getElementsByClassName
        let figcaptionElement = document.getElementsByClassName(
            "image-slider__caption"
        )[0]; // getElementsByClassName

        // Set the default image and caption.
        setImageAndCaption(
            imgElement,
            figcaptionElement,
            imagesDirectory,
            groupedImagesProperties,
            currentImageIndex
        ); // setImageAndCaption

        // Set the "sliding images" action.
        let imageSliderNextButton = document.getElementsByClassName(
            "image-slider__next-button"
        )[0]; // getElementsByClassName
        let imageSliderPrevButton = document.getElementsByClassName(
            "image-slider__prev-button"
        )[0]; // getElementsByClassName
        imageSliderNextButton.addEventListener(
            "click",
            function() {
                // The code below is to prevent reading the
                //      opacity property value while it is "null".
                imgElement.style.opacity = 1;
                dimOutElement(imgElement, dimLength);

                setTimeout(function() {
                    if (currentImageIndex ===
                        groupedImagesProperties.length - 1) {
                        // If "currentImageIndex" is the index
                        //      of the last element, set it
                        //      to the index of the first one.
                        currentImageIndex = 0;
                    } else {
                        ++currentImageIndex;
                    } // if
                    // Set the image and its caption.
                    setImageAndCaption(
                        imgElement,
                        figcaptionElement,
                        imagesDirectory,
                        groupedImagesProperties,
                        currentImageIndex
                    ); // setImageAndCaption

                    dimInElement(imgElement, dimLength);
                }, 0); // function; "0" makes it probably set as the browser's minimum.
            } // function
        ); // addEventListener
        imageSliderPrevButton.addEventListener(
            "click",
            function() {
                // The code below is to prevent reading the
                //      opacity property value while it is "null".
                imgElement.style.opacity = 1;
                dimOutElement(imgElement, dimLength);

                setTimeout(function() {
                    if (currentImageIndex === 0) {
                        // If "currentImageIndex" is the index
                        //      of the first element, set it
                        //      to the index of the last one.
                        currentImageIndex
                            = groupedImagesProperties.length - 1;
                    } else {
                        --currentImageIndex;
                    } // if
                    // Set the image and its caption.
                    setImageAndCaption(
                        imgElement,
                        figcaptionElement,
                        imagesDirectory,
                        groupedImagesProperties,
                        currentImageIndex
                    ); // setImageAndCaption

                    dimInElement(imgElement, dimLength);
                }, 0); // function; "0" makes it probably set as the browser's minimum.
            } // function
        ); // addEventListener
    }; // function

    // Download the list of images.
    request.open("GET", "get-filenames.php");
    request.send();
}); // addEventListener