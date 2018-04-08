// Hightlight a menu position indicating the current page
window.addEventListener("load", function() {
    "use strict";
    var mainMenuLinks =
        this.document.getElementsByClassName("main-menu__link");

    // Find the element with class
    //		"main-menu__link--current-page"
    //		and remove it.
    //	There is "for" loop, because "forEach"
    //      loop does not allow "break"s.
    for (let index = 0; index < mainMenuLinks.length; ++index) {
        var elementClassList = mainMenuLinks[index].classList;
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
    // alert(1);
    for (let index = 0; index < mainMenuLinks.length; ++index) {
        // alert(2);
        let locationPathname = this.location.pathname;
        console.log(this);
        let shortLocationPathname = locationPathname.substring(
            locationPathname.lastIndexOf("/")
        ); // substring
        // alert(4);
        let currentPath = mainMenuLinks[index].getAttribute("href");
        // alert(5);
        let shortCurrentPath = currentPath.substring(
            currentPath.lastIndexOf("/")
        ); // substring
        // alert(6);
        console.log(shortLocationPathname + ", " + shortCurrentPath);
        if (shortLocationPathname === shortCurrentPath) {
            mainMenuLinks[index].classList.add("main-menu__link--current-page");
            // alert(8);
            break;
        } // if
        // alert(9);
    } // for
    // alert(10);
}); // addEventListener

// Returns string.
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