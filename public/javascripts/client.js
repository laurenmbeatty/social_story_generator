/**
 * Created by Lauren on 10/20/15.
 */
$(document).ready(function () {
    event.preventDefault();

    //////////////////////////////////
    //example carousel functionality//
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

    var counter = 0;

    $(".login").on("click", function () {
        $(".loginForm").addClass("showMe");
        $(".slider").fadeOut(600);
        $(".slider-nav").fadeOut(600);
    });
    $("form.logMeIn").submit(function () {
        $(".login").hide();
    });

    /////////////////////////////////////////////////////
    //  clicking on createStory button shows new form  //
    ////////////////////////////////////////////////////
    
    $(".createStory").on("click", function () {
        $(".titleForm").addClass("showMe");
        $(".saveMe").removeClass("saveMe");
        $("#storytitle").focus();
    });

    //////////////////////////////////////////////////////
    //  click on add another page adds the next form   //
    /////////////////////////////////////////////////////

    $(".add").on("click", function () {
        event.preventDefault();
        counter += 1;
        var $newForm = $("<div class = 'pageForm'>" +
            "<div class='formInput'>" +
            "<label for='storyline' class='line'>Text for Page " + counter + "</label>" +
            "<textarea name = 'text' rows = '4' cols='50'>" + "</textarea>" +
            "</div>" +
            "<div class='formInput'>" +
            "<label for='imageURL' class='title'>What is the URL of your photo? </label>" +
            "<input type='url' name='imageUrl' id='imageUrl'/>" +
            "</div>" +
            "<div class='button'>" +
            "<button class='addToo'>" + "Add Another Page" + "</button>" +
            "</div>" +
            "</div>");
        $(".addAfter").append($newForm);
        $("textarea").focus();

    });

    ////////////////////////////////////////////////
    //  Adds the next form for subsequent pages  ///
    ////////////////////////////////////////////////

    $(document).on("click", ".addToo", function () {
        event.preventDefault();
        counter += 1;
        var $brandNewForm = $("<div class = 'pageForm'>" +
            "<div class='formInput'>" +
            "<label for='storyline' class='line'>Text for Page " + counter + "</label>" +
            "<textarea name = 'text' rows = '4' cols='50' id='storyline'>" + "</textarea>" +
            "</div>" +
            "<div class='formInput'>" +
            "<label for='imageURL' class='title'>What is the URL of your photo? </label>" +
            "<input type='url' name='imageUrl' id='imageUrl'/>" +
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

    $(".saveMe").on("click", function () {
        event.preventDefault();
        var newStory = [];


        //TODO figure this out
        //http://stackoverflow.com/questions/10261021/sending-an-array-of-objects-as-ajax-post-data
        //then put each field into the newStory array?  [{text: value of text field one, imageUrl: value of url field one},
        //  {text: value of text field two, imageUrl: value of url field two}, etc.]
        var formData = $(".addAfter").serialize();
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "story/add",
            data: formData
        }).done(function (response) {
            console.log('Success! Posted to the database');
        });

        //do a GET call? make story stuff disappear? make slider appear
        //.pageForm remove and .titleForm remove
        $(".slider").fadeIn(600);
        $(".slider-nav").fadeIn(600);
        getData();
        $(".saveMe").fadeOut(600);

    });

    function getData() {
        console.log("getData fired...Huzzah!");
        $.ajax({
            type: "GET",
            url: "/users/story"
        }).done(function (response) {
            console.log(response);
            console.log(response[0]);
            console.log(response[0].scenes[0].text);
            for (var i = 0; i < response.length; i++) {
                var $carousel = "<div class='slide active-slide slide-feature1'>" +
                "<div class='container'>" +
                    "<div class='row'>" +
                    "<div class='slide-copy col-xs-12>" +
                    "<h1>" + response[i].scenes.text + "</h1>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
                console.log("The carousel is: " + $carousel);
                $(".appendHere").append($carousel);
            }
        });
    }

    //delete function
    //$.ajax({
    //    type: "DELETE",
    //    url: "/story/remove/" + someVariable
    //}).done(function(response){
    //    console.log("deleted from the client side");
    //});
});
