$(document).ready(function() {
    
    if (!$.fn.turn) {
        console.log("Turn.js not loaded");
        return;
    }
    
    function resizeBook() {
        var bookWidth = 800;
        var bookHeight = 600;

        if ($("#flipbook").turn("is")) {
            $("#flipbook").turn("size", bookWidth, bookHeight);
        } else {
            $("#flipbook").turn({
                width: bookWidth,
                height: bookHeight,
                autoCenter: true,
                display: 'double',
                acceleration: true,
                direction: 'rtl',
                duration: 600
            });
            console.log("Turn.js initialized");
        }
    }

    resizeBook();

    // $(window).resize(function() {
    //     resizeBook();
    // });
});

function goToPage(pageNum, event) {
    event.preventDefault();
    event.stopPropagation();
    $("#flipbook").turn("page", pageNum);
}

function nextPage(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#flipbook").turn("next");
}

function prevPage(event) {
    event.preventDefault();
    event.stopPropagation();
    $("#flipbook").turn("previous");
}