$(document).ready(function() {
    var $flipbook = $("#flipbook");
    var pages = $flipbook.children(".page, .hard");
    var currentPage = 1;
    var useTurn = false;
    var animating = false;

    function normalizeSpread(pageNum) {
        if (pageNum < 1) pageNum = 1;
        if (pageNum > pages.length) pageNum = pages.length;
        if (pageNum % 2 === 0) pageNum = pageNum - 1;
        if (pageNum < 1) pageNum = 1;
        if (pageNum > pages.length) pageNum = pages.length - 1;
        return pageNum;
    }

    function showManualPage(pageNum, direction) {
        if (animating) return;
        pageNum = normalizeSpread(pageNum);
        if (pageNum === currentPage) return;

        var currentSpread = pages.slice(currentPage - 1, currentPage + 1);
        var newSpread = pages.slice(pageNum - 1, pageNum + 1);
        var $rightOld = pages.eq(currentPage - 1);
        var $rightNew = pages.eq(pageNum - 1);
        direction = direction || (pageNum > currentPage ? 'next' : 'prev');
        animating = true;

        currentSpread.removeClass('flip-in flip-out current').addClass('flip-out');
        newSpread.show().addClass('current');
        $rightNew.addClass('flip-in');

        setTimeout(function() {
            currentSpread.hide().removeClass('flip-out');
            newSpread.removeClass('flip-in');
            currentPage = pageNum;
            animating = false;
        }, 700);
    }

    if ($.fn.turn) {
        try {
            $flipbook.turn({
                width: 1000,
                height: 720,
                autoCenter: true,
                display: 'double',
                acceleration: true,
                direction: 'rtl',
                gradients: true,
                elevation: 60,
                duration: 650
            });
            useTurn = true;
            console.log("Turn.js initialized");
        } catch (error) {
            console.warn("Turn.js initialization failed, using manual pagination.", error);
        }
    } else {
        console.warn("Turn.js not loaded, using manual pagination.");
    }

    if (!useTurn) {
        $("body").addClass("no-turn");
        pages.hide();
        pages.slice(0, 2).show().addClass('current');
    }

    $("#prevPageBtn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (useTurn) {
            $flipbook.turn("previous");
        } else {
            showManualPage(currentPage - 2, 'prev');
        }
    });

    $("#nextPageBtn").on("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (useTurn) {
            $flipbook.turn("next");
        } else {
            showManualPage(currentPage + 2, 'next');
        }
    });

    window.goToPage = function(pageNum, event) {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (useTurn) {
            $flipbook.turn("page", pageNum);
        } else {
            showManualPage(pageNum, pageNum > currentPage ? 'next' : 'prev');
        }
    };
});
