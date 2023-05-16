document.addEventListener("mousemove", function (e) {
    var target = e.target;
    while (target !== document) {
            if (target.className === "dropdown") {
                break;
        }
        target = target.parentNode;
    }
    if (target !== null) {
        if (target.className === "dropdown") {
            blurEverything("global-nav");
            document.getElementById("title").style.filter = "";
        } else {
            removeBlur();
        }
    } else {
        removeBlur();
    }
});

function blurEverything(exception) {
    // Get all the immediate child elements of the body element except the exception
    const elements = document.querySelectorAll(`body > :not(#${exception}):not(script):not(style)`);

    // Add a blur style to each element
    elements.forEach(element => {
        element.style.filter = "blur(5px)";
    });
}

function removeBlur() {
    const elements = document.querySelectorAll("body > *");

    // Remove the filter style from all elements
    elements.forEach(element => {
        element.style.filter = "none";
    });
}
