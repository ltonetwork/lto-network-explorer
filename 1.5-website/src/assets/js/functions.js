function initPreloader() {
  $(window).on('load', function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({
      'overflow': 'visible'
    });
  })
}

function initNavbar() {
  $(window).scroll(function () { // this will work when your window scrolled.
    var height = $(window).scrollTop(); //getting the scrolling height of window
    if (height > 50) {
      $("#navbar-clone").addClass('is-active');
    } else {
      $("#navbar-clone").removeClass('is-active');
    }
  });
}

function initMobileMenu() {
  $('.navbar-burger').on("click", function () {
    var menu_id = $(this).attr('data-target');
    $(this).toggleClass('is-active');
    $("#" + menu_id).toggleClass('is-active');
    $('.navbar.is-light').toggleClass('is-dark-mobile')
  });
}

function initSidebar() {
  //Animate left hamburger icon and open sidebar
  $('.menu-icon-trigger').click(function (e) {
    e.preventDefault();
    $('.menu-icon-wrapper').toggleClass('open');
    $('.sidebar').toggleClass('is-active');
  });

  //Close sidebar
  $('.sidebar-close').click(function () {
    $('.sidebar').removeClass('is-active');
    $('.menu-icon-wrapper').removeClass('open');
  })

  //Sidebar menu
  if ($('.sidebar').length) {
    $(".sidebar-menu > li.have-children > a").on("click", function (i) {
      i.preventDefault();
      if (!$(this).parent().hasClass("active")) {
        $(".sidebar-menu li ul").slideUp();
        $(this).next().slideToggle();
        $(".sidebar-menu li").removeClass("active");
        $(this).parent().addClass("active");
      } else {
        $(this).next().slideToggle();
        $(".sidebar-menu li").removeClass("active");
      }
    });
  }
}

function initModals() {
  $('.modal-trigger').on('click', function () {
    var modalID = $(this).attr('data-modal');
    $('#' + modalID).addClass('is-active');
  })
  $('.modal-close, .close-modal').on('click', function () {
    $(this).closest('.modal').removeClass('is-active');
  })
}

function initBackToTop() {
  var pxShow = 600;
  var scrollSpeed = 500;
  $(window).scroll(function () {
    if ($(window).scrollTop() >= pxShow) {
      $("#backtotop").addClass('visible');
    } else {
      $("#backtotop").removeClass('visible');
    }
  });
  $('#backtotop a').on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, scrollSpeed);
    return false;
  });
}

function initBackgroundImages() {
  if ($(".has-background-image").length) {
    $(".has-background-image").each(function () {
      var bgImage = $(this).attr("data-background");
      var attrColor = $(this).attr("data-color");
      var attrOpacity = $(this).attr("data-color-opacity");
      if (bgImage !== undefined) {
        $(this).css("background-image", "url(" + bgImage + ")");
      }
      if (attrColor !== undefined) {
        $(this)
          .find(".overlay")
          .css("background-color", "" + attrColor + "");
      }
      if (attrOpacity !== undefined) {
        $(this)
          .find(".overlay")
          .css("opacity", "" + attrOpacity + "");
      }
    });
  }
}

function initScrollReveal() {
  window.sr = ScrollReveal();

  // Simple reveal
  sr.reveal('.is-title-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2,

  });

  // Revealing features
  sr.reveal('.is-feature-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: true,
    useDelay: 'always',
    viewFactor: 0.2,

  }, 160);

  // Revealing features
  sr.reveal('.is-icon-reveal', {
    origin: 'bottom',
    distance: '20px',
    duration: 600,
    delay: 100,
    rotate: {
      x: 0,
      y: 0,
      z: 0
    },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
    container: window.document.documentElement,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.2,

  }, 160);
}

function initScrollToHash() {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 550, function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
}

function initPricingSlider() {
  (function () {
    const pricingSliders = document.querySelectorAll(".pricing-slider");

    if (pricingSliders.length > 0) {
      for (let i = 0; i < pricingSliders.length; i++) {
        const pricingSlider = pricingSliders[i];

        // Build the input object
        const pricingInput = {
          el: pricingSlider.querySelector("input")
        };
        pricingInput.data = JSON.parse(
          pricingInput.el.getAttribute("data-price-input")
        );
        pricingInput.currentValEl = pricingSlider.querySelector(
          ".pricing-slider-value"
        );
        pricingInput.thumbSize = parseInt(
          window
          .getComputedStyle(pricingInput.currentValEl)
          .getPropertyValue("--thumb-size"),
          10
        );

        // Build the output array
        const pricingOutputEls = pricingSlider.parentNode.querySelectorAll(
          ".pricing-item-price"
        );
        const pricingOutput = [];
        for (let i = 0; i < pricingOutputEls.length; i++) {
          const pricingOutputEl = pricingOutputEls[i];
          const pricingOutputObj = {};
          pricingOutputObj.currency = pricingOutputEl.querySelector(
            ".pricing-item-price-currency"
          );
          pricingOutputObj.amount = pricingOutputEl.querySelector(
            ".pricing-item-price-amount"
          );
          pricingOutputObj.after = pricingOutputEl.querySelector(
            ".pricing-item-price-after"
          );
          pricingOutputObj.data = JSON.parse(
            pricingOutputEl.getAttribute("data-price-output")
          );
          pricingOutput.push(pricingOutputObj);
        }

        pricingInput.el.setAttribute("min", 0);
        pricingInput.el.setAttribute(
          "max",
          Object.keys(pricingInput.data).length - 1
        );
        !pricingInput.el.getAttribute("value") &&
          pricingInput.el.setAttribute("value", 0);

        handlePricingSlider(pricingInput, pricingOutput);
        window.addEventListener("input", function () {
          handlePricingSlider(pricingInput, pricingOutput);
        });
      }
    }

    function handlePricingSlider(input, output) {
      // output the current slider value
      if (input.currentValEl)
        input.currentValEl.innerHTML = input.data[input.el.value];
      // update prices
      for (let i = 0; i < output.length; i++) {
        const outputObj = output[i];
        if (outputObj.currency)
          outputObj.currency.innerHTML = outputObj.data[input.el.value][0];
        if (outputObj.amount)
          outputObj.amount.innerHTML = outputObj.data[input.el.value][1];
        if (outputObj.after)
          outputObj.after.innerHTML = outputObj.data[input.el.value][2];
      }
    }
  })();

}
