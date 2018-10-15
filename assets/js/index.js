
(function ($, undefined) {
	$(function() {
// Test area



// Prism.highlightAll();



	/*=============================*/
	// 	pjax
	/*=============================*/
	var PostListSetting = {
		gap: 20,
		childWidth: $(".post-card").width(),
		gridWidth: [0,350,700],
		refresh: 700,
	};
	$(document).pjax('a', '.site-wrapper',{fragment: '.site-wrapper', timeout: 10000});
	$(document).on({
		'pjax:click': function() {
			$(".content").removeClass('P-show').addClass('P-hide');
			NProgress.start();
		},
		'pjax:success': function() {
			$("#post-list").is(function() {
				// If the current page has not the element with the class, 
				// post-card, the value will be null.
				PostListSetting.childWidth = $(".post-card").width();
				$(this).waterfall(PostListSetting);
			});
			$(".ripple").on("animationend", function () {
				$("body").toggleClass('nav-opened');
				$("#in-nav").toggleClass('in-nav-closed in-nav-opened');
			});
		},
		'pjax:end': function(){
			$('.current-title span').html($('title').html());
			$(".post-content img").attr('data-action', 'zoom');
			$(".content").removeClass('P-hide').addClass('P-show');
			$(".img-box").collagePlus();
			$(".post-content code").addClass("language-" + $(".post-content span").first().text());
			Prism.highlightAll();
			NProgress.done();
		}
	})


	/*===========================*/
	// 	Search Engine
	/*===========================*/
	$("#search-input").ghostHunter({
		results           : "#post-list",
		before            : function() {
		$(".content").removeClass('P-show').addClass('P-hide');
		NProgress.start();
		},
		onComplete        : function() {
		$(".content").removeClass('P-hide').addClass('P-show');
		$("#post-list").waterfall(PostListSetting);
		$(".pagination, #date").remove();
		$("#title").html("Number of posts found: " +  $("#post-list").children().length);
		NProgress.done();
		},
		displaySearchInfo : false,
		result_template   : 
		'<article class="post post-card">' +
			'<header class="post-header no-cover" style="background-image: url({{image}})">' +
				'<h2 class="post-title"><a href="{{url}}" data-postid="{{id}}">{{title}}</a></h2>' +
			'</header>' +
			'<section class="post-excerpt">' +
				'<p>{{excerpt}}</p>' +
			'</section>' +
			'<hr>' +
			'<footer class="post-meta">' +
				'{{tag}}' +
				'<time class="post-date" datetime={{pubDate}}>{{pubDate}}</time>' +
			'</footer>' +
		'</article>'
	
	});
	/*=============================*/
	// Replace Icon Function
	/*=============================*/
	var iconReplace = {
		mode_1: function() {
			for(Name in iconConfig_1){
				var e = $("i:contains("+ Name.toLowerCase() +")");
				if(iconConfig_1[Name].name){
					e.html(iconConfig_1[Name].name);
				}
				if(iconConfig_1[Name].color){
					e.css('color', iconConfig_1[Name].color);
				}
			}
		},
		mode_2: function() {
			for(Name in iconConfig_2){
				var e = $("i:contains("+ Name.toLowerCase() +")");
				var w = e.innerWidth(),
					h = e.innerHeight();
				if(iconConfig_2[Name].name){
					e.html('<img src='+ iconConfig_2[Name].name +'"');
					e.css({
						display: 'block',
						width: w,
						height: h
					});
				}
				if(iconConfig_2[Name].color){
					e.children('img').css('color', iconConfig_2[Name].color);
				}
			}
		}
	}
	
	if(iconReplaceSwitch.mode_1) iconReplace.mode_1();
	if(iconReplaceSwitch.mode_2) iconReplace.mode_2();
		
	/*=============================*/
	// HighLight Function
	/*=============================*/
	$(".post-content code").addClass("language-" + $(".post-content span").first().text());
		
	// Post-listd
		$("#post-list").is(function() {
			$(this).waterfall(PostListSetting);

		})
	/*Header*/
		$(".menu-button, .nav-cover").click(function() {
			$("body").toggleClass('nav-opened');
			$("#in-nav").toggleClass('in-nav-closed in-nav-opened');
		});

		//Ripple Effect
		$("aside").find('li:not(.tag-title)').ripple();
		$("aside").find('li:not(.tag-title)').on('animationend', function() {
				$(".nav-current").removeClass('nav-current');
				$(this).addClass('nav-current');
		});
		$(".button-icon").ripple();

	
		/*Menu icon*/
		$("#search").click(function() {
			$(this).addClass('search-opened');
			event.stopPropagation();    //Stop the bubble
		});
		$(".site-wrapper").click(function() {
			$("#search").removeClass('search-opened');
		});
	
		// Bar-Effect
		$(window).scroll(function() {
			if($(this).scrollTop()>100){
				$("#head-bar").addClass('head-bar-scrolled');
				$("#to-top").fadeIn("400", function() {
					$(this).css('transition', '.3s'); //hover effect
				});
			}else{
				$("#head-bar").removeClass('head-bar-scrolled');
				$("#to-top").fadeOut("400", function() {
					$(this).css('transition', '0s');
					$(this).children('span').remove();
				});
			}
		});
		//Scroll Effec
		$("#to-top").scrollEffect(600);

		// Header-image
		$(window).scroll(function() {   
			i = $(this).scrollTop()*0.6;
			$(".header-background").css('transform', 'translate3d(0,' + i + 'px,0)');
		});

/*Post*/
		$(".img-box").collagePlus();
		$(window).resize(function() {
			$(".img-box").collagePlus();
		});	
		$(".post-content img").attr('data-action', 'zoom');
	})
	

/*Ripple Effect*/
	$.fn.ripple = function () {

		$(this).click(function(e) {
			/*Make ripple*/
	
			//current style

			// Remove the old one
			$(".ripple").remove();


			//Setup
			var 
				elementY = $(this).offset().top,
				elementX = $(this).offset().left,
				elementWidth = $(this).outerWidth(),
				elementHeight = $(this).outerHeight();
	
			// Add the ripple element
			$(this).prepend("<span class='ripple'></span>");
	
			// Make it round
			if(elementWidth >= elementHeight){
				elementHeight = elementWidth;
			}else{
				elementWidth = elementHeight;
			}
	
			// Move the center of the element to the mouse
			var x = e.pageX - elementX - (elementWidth)/2,
				y = e.pageY - elementY - (elementHeight)/2;
	
			// Add the ripple CSS and start the animation
			$(".ripple").css({
				width  : elementWidth,
				height : elementHeight,
				top    : y + "px",
				left   : x + "px"
			}).addClass('rippleEffect');
		});
	}
	/*Scroll Effect*/
	$.fn.scrollEffect = function (x) {
		speed = {
			speed : x
		};
		default_options = {
			speed : 400
		};
		option = $.extend(default_options, speed);

		$(this).click(function (event) {
			event.preventDefault();
			if($(this).attr('href')){
				$("html, body").animate({scrollTop : $(this.hash).offset().top}, option);
				//hash is a property that can be found on elements that contain an href attribute/property.
			}else{
				$("html, body").animate({scrollTop : 0}, option.speed);
			}
		})
		
	}
})(jQuery);

