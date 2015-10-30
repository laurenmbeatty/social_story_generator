/**
 * Created by Lauren on 10/20/15.
 */
$(document).ready(function () {
    event.preventDefault();

    ////////////////////////////
    //populates story archive//
    ///////////////////////////

    loadData();

    //////////////////////////////////
    //  iPad swipe functionality   //
    /////////////////////////////////

    $(".slider").swipe({
        swipeLeft: function (event, direction, distance, duration, fingerCount) {
            var currentSlide = $('.active-slide');
            var prevSlide = currentSlide.prev();

            var currentDot = $('.active-dot');
            var prevDot = currentDot.prev();

            if (prevSlide.length === 0) {
                prevSlide = $('.slide').last();
                prevDot = $('.dot').last();
            }

            currentSlide.fadeOut(600).removeClass('active-slide');
            prevSlide.fadeIn(600).addClass('active-slide');

            currentDot.removeClass('active-dot');
            prevDot.addClass('active-dot');
        },
        swipeRight: function (event, direction, distance, duration, fingerCount) {
            var currentSlide = $('.active-slide');
            var nextSlide = currentSlide.next();

            var currentDot = $('.active-dot');
            var nextDot = currentDot.next();

            if (nextSlide.length === 0) {
                nextSlide = $('.slide').first();
                nextDot = $('.dot').first();
            }

            currentSlide.fadeOut(600).removeClass('active-slide');
            nextSlide.fadeIn(600).addClass('active-slide');

            currentDot.removeClass('active-dot');
            nextDot.addClass('active-dot');
        }
    });


    //////////////////////////////////
    //    carousel functionality    //
    //////////////////////////////////

    $('#right').click(function () {
        var currentSlide = $('.active-slide');
        var nextSlide = currentSlide.next();

        var currentDot = $('.active-dot');
        var nextDot = currentDot.next();

        if (nextSlide.length === 0) {
            nextSlide = $('.slide').first();
            nextDot = $('.dot').first();
        }

        currentSlide.fadeOut(600).removeClass('active-slide');
        nextSlide.fadeIn(600).addClass('active-slide');

        currentDot.removeClass('active-dot');
        nextDot.addClass('active-dot');
    });


    $('#left').click(function () {
        var currentSlide = $('.active-slide');
        var prevSlide = currentSlide.prev();

        var currentDot = $('.active-dot');
        var prevDot = currentDot.prev();

        if (prevSlide.length === 0) {
            prevSlide = $('.slide').last();
            prevDot = $('.dot').last();
        }

        currentSlide.fadeOut(600).removeClass('active-slide');
        prevSlide.fadeIn(600).addClass('active-slide');

        currentDot.removeClass('active-dot');
        prevDot.addClass('active-dot');
    });


    //////////////////////////////////////////////////
    //  login and register clicking functionality  //
    /////////////////////////////////////////////////


    $(".login").on("click", function () {
        $(".slider").hide();
        $(".loginForm").addClass("showMe");
        $(".slider-nav").hide();
    });
    $("form.logMeIn").submit(function () {
        $(".login").hide();
    });

    /////////////////////////////////////////////////////
    //  clicking on createStory button shows new form  //
    ////////////////////////////////////////////////////

    $(".createStory").on("click", function () {
        $(".slider").hide();
        $(".titleForm").addClass("showMe");
        $(".saveMe").removeClass("saveMe");
        $("#storytitle").focus();
    });

    //////////////////////////////////////////////////////
    //  click on add another page adds the next form   //
    /////////////////////////////////////////////////////

    var counter = 0;

    $(".add").on("click", function () {
        event.preventDefault();
        counter += 1;
        var $newForm = $("<div class = 'pageForm'>" +
            "<div class='formInput'>" +
            "<label for='storyline' class='line'>Text for Page " + counter + "</label>" +
            "<textarea class = 'form-control hresize' name = 'text' rows = '4' cols='50'>" + "</textarea>" +
            "</div>" +
            "<div class='formInput'>" +
            "<label for='imageURL' class='title'>What is the URL of your photo? </label>" +
            "<input type='url' name='imageUrl' class='form-control hresize' id='imageUrl'/>" +
            "</div>" +
            "<div class='button'>" +
            "<button class='addToo'>" + "Add Another Page" + "</button>" +
            "</div>" +
            "</div>");
        $(".addAfter").append($newForm);
        $("textarea").focus();

    });

    ////////////////////////////////////////////////
    //  Adds the next form for subsequent pages   //
    ////////////////////////////////////////////////

    $(document).on("click", ".addToo", function () {
        event.preventDefault();
        counter += 1;
        var $brandNewForm = $("<div class = 'pageForm'>" +
            "<div class='formInput'>" +
            "<label for='storyline' class='line'>Text for Page " + counter + "</label>" +
            "<textarea class='form-control hresize' name = 'text' rows = '4' cols='50' id='storyline'>" + "</textarea>" +
            "</div>" +
            "<div class='formInput'>" +
            "<label for='imageURL' class='title'>What is the URL of your photo? </label>" +
            "<input type='url' name='imageUrl' class ='form-control hresize' id='imageUrl'/>" +
            "</div>" +
            "<div class='button'>" +
            "<button class='addToo'>" + "Add Another Page" + "</button>" +
            "</div>" +
            "</div>");
        $(".addAfter").append($brandNewForm);
        $("textarea").focus();
    });

    /////////////////////////////////////////////////////////////////////////
    //  clicking on the save story button POSTS the story to the database ///
    /////////////////////////////////////////////////////////////////////////

    $(".saveStory").on("click", function () {
        event.preventDefault();
        var formData = $(".addAfter").serialize();
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "story/add",
            data: formData
        }).done(function (response) {
            console.log('Success! Posted to the database');
        });

        $(".saveStory").fadeOut(600);

        $(".slider").fadeIn(600);
        $("input").val("");
        $("textarea").val("");
        $(".pageForm").remove();
        $(".titleForm").remove();
    });

    /////////////////////////////////////////////////////////////////////////
    // functionality to get story from the database from view story button //
    ////////////////////////////////////////////////////////////////////////

    function getData() {
        console.log("getData fired...Huzzah!");
        $.ajax({
            type: "GET",
            url: "/users/story"
        }).done(function (response) {
            console.log(response);
            console.log(response.length);
            console.log(response[response.length - 1]);
            var storyObject = response[response.length - 1];
            console.log(storyObject);

            for (var i = 0; i < storyObject.scenes.length; i++) {
                var $carouselSlide = "<div class='slide slide-feature-user-" + i + "'>" +
                    "<div class='container'>" +
                    "<div class='row'>" +
                    "<div class='col-xs-12'>" +
                    "<img class = 'userImage' src='" + storyObject.scenes[i].imageUrl + "' height= '600px' width='830px'>" +
                    "</div>" +
                    "<div class='slide-copy col-xs-12'>" +
                    "<h1 id='user-paragraph-slide'>" + storyObject.scenes[i].text + "</h1>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";


                $(".slide-feature-user-0").addClass("active-slide");
                console.log("The carousel is: " + $carouselSlide);
                $(".slider").append($carouselSlide);
            }
            var $newStoryOption = "<option>" + storyObject.scenes[0].text + "</option>";
            $("#stories").append($newStoryOption);
        });
    }

    $(".getStory").on("click", function () {
        $(".slider-nav").show();
        getData();
    });

    ///////////////////////////////////////////////////////////////
    // loadData function that populates story archive in footer  //
    ///////////////////////////////////////////////////////////////

    function loadData() {
        $.ajax({
            type: "GET",
            url: "/users/story"
        }).done(function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var $storyOption = "<option value = '" + [i] + "'>" + response[i].scenes[0].text + "</option>";
                console.log($storyOption);
                $("#stories").append($storyOption);

            }
        });
    }


    //////////////////////////////////////////
    // dropdown that shows previous stories //
    /////////////////////////////////////////

    function getArchivedStory() {
        console.log($classSelected);
        $.ajax({
            type: "GET",
            url: "/users/story"
        }).done(function (response) {
            var storyObject = response[$classSelected];
            for (var i = 0; i < storyObject.scenes.length; i++) {
                var $carouselSlide = "<div class='slide slide-feature-user-" + i + "'>" +
                    "<div class='container'>" +
                    "<div class='row'>" +
                    "<div class='col-xs-12'>" +
                    "<img class = 'userImage' src='" + storyObject.scenes[i].imageUrl + "' height= '600px' width='830px'>" +
                    "</div>" +
                    "<div class='slide-copy col-xs-12'>" +
                    "<h1 id='user-paragraph-slide'>" + storyObject.scenes[i].text + "</h1>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";


                $(".slide-feature-user-0").addClass("active-slide");
                console.log("The carousel is: " + $carouselSlide);
                $(".slider").append($carouselSlide);
            }

        });

    }

    var $classSelected;

    $(".archive").on("submit", function () {
        event.preventDefault();
        $(".slider").children().remove();
        $classSelected = $(this).find(":selected").val();
        console.log($classSelected);
        $(".slider-nav").show();
        getArchivedStory();
    });

//delete function
//$.ajax({
//    type: "DELETE",
//    url: "/story/remove/" + someVariable
//}).done(function(response){
//    console.log("deleted from the client side");
//});
});
