        $(document).ready(function () {
            $('#nav').localScroll(800);

            //.parallax(xPosition, speedFactor, outerHeight) options:
            //xPosition - Horizontal position of the element
            //inertia - speed to move relative to vertical scroll. Example: 0.1 is one tenth the speed of scrolling, 2 is twice the speed of scrolling
            //outerHeight (true/false) - Whether or not jQuery should use it's outerHeight option to determine when a section is in the viewport
            //            $('#intro').parallax("50%", 0.1);
            //            $('#second').parallax("50%", 0.1);
            //            $('.bg').parallax("50%", 0.4);
            //            $('#third').parallax("50%", 0.3);


            var $window = $(window);
            var $firstBG = $('#intro');
            var $secondBG = $('#second');
            var $thirdBG = $('#third');
            var trainers = $("#second .bg");
            var windowHeight = $window.height();

            $('#intro, #second, #third').bind('inview', function (event, visible) {
                if (visible == true) {
                    $(this).addClass("inview");
                } else {
                    $(this).removeClass("inview");
                }
            });

            function RepositionNav() {
                var windowHeight = $window.height();
                var navHeight = $('#nav').height() / 2;
                var windowCenter = (windowHeight / 2);
                var newtop = windowCenter - navHeight;
                $('#nav').css({
                    "top": newtop
                });
            }

            function newPos(x, windowHeight, pos, adjuster, inertia) {
                return x + "% " + (-((windowHeight + pos) - adjuster) * inertia) + "px";
            }

            function Move() {

                var pos = $window.scrollTop();
                $('#pixels').html(pos);
                //                console.log(pos);

                if ($firstBG.hasClass("inview")) {
                    $firstBG.css({
                        'backgroundPosition': newPos(50, windowHeight, pos, 600, 0.3)
                    });
                }

                if ($secondBG.hasClass("inview")) {
                    $secondBG.css({
                        'backgroundPosition': newPos(50, windowHeight, pos, 1000, 0.3)
                    });

                    trainers.css({
                        'backgroundPosition': newPos(50, windowHeight, pos, 1500, 0.4)
                    });
                }
                if ($thirdBG.hasClass("inview")) {
                    $thirdBG.css({
                        'backgroundPosition': newPos(50, windowHeight, pos, 2600, 0.3)
                    });
                }
            }

            RepositionNav(); //Reposition the Navigation to center it in the window when the script loads
            //            Move();

            $window.resize(function () {
                Move();
                RepositionNav();
            });

            $window.bind('scroll', function () {
                Move();
            });
        })