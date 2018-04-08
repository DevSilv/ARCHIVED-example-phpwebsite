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

    // Index "0" (the first element of the "paths"
    //      array) was chosen arbitrarily.
    var defaultImageSizePath = imagesDirectory +
        groupedImagesProperties[currentImageIndex]["paths"][0];

    // Here is set the "src" attribute for these browsers
    //      which do not implement "srcset". Its value might
    //      differ from "srcset"'s value, because the order of
    //      the images' filenames array depends on an external
    //      script (PHP) and probably on the filesystem.
    imgElement.setAttribute("src", defaultImageSizePath);

    imgElement.setAttribute(
        "srcset",
        (function() {
            var array = [];
            groupedImagesProperties[currentImageIndex]["paths"]
                .forEach(function(value, index) {
                    array.push(
                        groupedImagesProperties[currentImageIndex]["paths"][index] +
                        " " +
                        groupedImagesProperties[currentImageIndex]["widths"][index] +
                        "w"
                    ); // push
                }); // forEach
            return array.join(", ");
        })() // function
    ); // setAttribute
    imgElement.setAttribute(
        "alt",
        groupedImagesProperties[currentImageIndex]["name"]
    ); // setAttribute
    imgElement.onload = function() {
        // Set caption.
        var captionNode = document.createTextNode(
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
    var request = new XMLHttpRequest();

    request.onload = function() {
        var currentImageIndex = 0;
        // The "this" below is used for clarity.
        var imagesFilenames = JSON.parse(this.responseText);
        var imagesDirectory = "../images/";
        var groupedImagesProperties = groupImagesProperties(
            imagesFilenames,
            imagesDirectory
        ); // groupImagesProperties

        // Warning: these below are NOT miliseconds!
        var dimLength = 3000;
        var imgElement = document.getElementsByClassName(
            "image-slider__image"
        )[0]; // getElementsByClassName
        var figcaptionElement = document.getElementsByClassName(
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
        var imageSliderNextButton = document.getElementsByClassName(
            "image-slider__next-button"
        )[0]; // getElementsByClassName
        var imageSliderPrevButton = document.getElementsByClassName(
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