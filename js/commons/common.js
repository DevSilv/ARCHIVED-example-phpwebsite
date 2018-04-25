// Hightlight a menu position indicating the current page
window.addEventListener("load", function() {
    "use strict";
    let mainMenuLinks =
        document.getElementsByClassName("main-menu__link");

    // Find the element with class
    //		"main-menu__link--current-page"
    //		and remove this class from it.
    //	There is "for" loop, because "forEach"
    //      loop does not allow "break"s.
    for (let index = 0; index < mainMenuLinks.length; ++index) {
        let elementClassList = mainMenuLinks[index].classList;
        if (elementClassList.contains("main-menu__link--current-page")) {
            elementClassList.remove("main-menu__link--current-page");
            break;
        } // if
    } // for

    // Add that class to the link to the current page.
    //	The "for" loop is doubled above and here in order
    //      that two elements don't have the same class
    //		at the same time (because I prefer none of
    //      the elements colored instead of two).
    for (let index = 0; index < mainMenuLinks.length; ++index) {
        let locationPathname = location.pathname;
        let shortLocationPathname = locationPathname.substring(
            locationPathname.lastIndexOf("/")
        ); // substring
        let currentPath = mainMenuLinks[index].getAttribute("href");
        let shortCurrentPath = currentPath.substring(
            currentPath.lastIndexOf("/")
        ); // substring
        if (shortLocationPathname === shortCurrentPath) {
            mainMenuLinks[index].classList.add("main-menu__link--current-page");
            break;
        } // if
    } // for
}); // addEventListener

// Returns string.
//      Argument is not being changed.
function formatDate(dateObject) {
    "use strict";
    let options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }; // object
    // "en-GB" is for me both the clearest and
    //		the most innerly-distinguishable date format.
    return dateObject.toLocaleDateString('en-GB', options);
} // formatDate