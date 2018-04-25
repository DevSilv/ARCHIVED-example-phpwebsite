// If "imageFilesNames" is an array and "imagesDirectory"
//      is a string, returns an array containing grouped
//      "imageFilesNames"' elements.
//  Neither argument is being changed.
function groupImagesProperties(imageFilesNames, imagesDirectory) {
    "use strict";
    let imageNameRegex = /-\d+\.?[a-z]+$/;
    let imageWidthStartRegex = /\d+\.?[a-z]+$/;
    let imageWidthEndRegex = /\.?[a-z]+$/;
    let groupedImagesProperties = [];
    if (Array.isArray(imageFilesNames) &&
        typeof imagesDirectory === "string") {
        for (let imgFlNm in imageFilesNames) {
            if (typeof imgFlNm !== "string") {
                continue;
            } // if
            let imageName = imageFilesNames[imgFlNm].slice(
                0,
                imageFilesNames[imgFlNm].search(imageNameRegex)
            ); // slice
            let imageWidth = imageFilesNames[imgFlNm].slice(
                imageFilesNames[imgFlNm].search(imageWidthStartRegex),
                imageFilesNames[imgFlNm].search(imageWidthEndRegex)
            ); // slice
            let imagePath = imagesDirectory +
                imageFilesNames[imgFlNm];
            let exists = false;
            groupedImagesProperties.forEach(function(value, index) {
                if (groupedImagesProperties[index].hasOwnProperty("name") &&
                    groupedImagesProperties[index]["name"] === imageName) {
                    groupedImagesProperties[index]["widths"].push(imageWidth);
                    groupedImagesProperties[index]["paths"].push(imagePath);
                    exists = true;
                } // if
            }); // forEach
            if (exists === false) {
                groupedImagesProperties.push({
                    "name": imageName,
                    "widths": [imageWidth],
                    "paths": [imagePath]
                }); // push
            } // if
        } // for
    } // if
    return groupedImagesProperties;
} // groupImagesProperties

// Returns new image caption (string).
//  Returns empty string if "imgElement"
//      is not an HTMLElement.
//  Neither argument is being changed.
function createImageCaption(imgElement) {
    "use strict";
    let caption = "";
    if (imgElement instanceof HTMLElement) {
        let imageWidth = imgElement.width;
        let imageHeight = imgElement.height;
        caption = imageWidth + "px \u00D7 " + imageHeight + "px";
    } // if
    return caption;
} // createImageCaption

// Dims "element".
//  Does not change anything if "element" argument
//      is not an HTMLElement OR if "inOut" argument
//      is not from the {0, 1} range OR if "time"
//      argument is lower than 0.
//  "element" argument is being changed.
//  "inOut" = ("out" or 0 --> disappears | "in" or 1
//      --> appears).
//  "granularity" --> miliseconds (zero or greater).
//  Something similar is here:
//      https://stackoverflow.com/a/2207751
// function dimInOutElement(element, inOut, time) {
//     "use strict";
//     if (element instanceof HTMLElement &&
//         time >= 0 &&
//         (inOut === 0 || inOut === 1)) {
//         for (let i = inOut * time;
//             (-1) * i * (1 - 2 * inOut) > (1 - inOut) * (-1) * time; i += 1 - 2 * inOut) {
//             setTimeout(function() {
//                 element.style.opacity = i / time;
//             }, 1); // setTimeout
//         } // for
//     } // if
// } // dimInOutElement

// Returns a dimmed-out copy of the "element".
//  Neither argument is being changed.
function dimOutElement(element, length) {
    "use strict";
    for (let i = length; i > 0; --i) {
        setTimeout(function() {
            element.style.opacity = i / length;
        }, 1); // setTimeout
    } // for
} // dimOutElement

// Returns a dimmed-in copy of the "element".
//  Neither argument is being changed.
function dimInElement(element, length) {
    "use strict";
    for (let i = 0; i < length; ++i) {
        setTimeout(function() {
            element.style.opacity = i / length;
        }, 1); // setTimeout
    } // for
} // dimInElement