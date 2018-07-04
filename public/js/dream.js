(function ($) {
  'use strict' // Start of use strict
  let location = document
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var target = $(this.hash)
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']')
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 54)
        }, 1000, 'easeInOutExpo')
        return false
      }
    }
  })

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function () {
    $('.navbar-collapse').collapse('hide')
  })

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 56
  })

  // Collapse Navbar
  var navbarCollapse = function () {
    if (window.location.pathname === '/') {
      if ($('#mainNav').offset().top > 100) {
        $('#mainNav').addClass('navbar-shrink')
      } else {
        $('#mainNav').removeClass('navbar-shrink')
      }
    }
  }
  // Collapse now if page is not at top
  navbarCollapse()
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse)

  // Hide navbar when modals trigger
  $('.portfolio-modal').on('show.bs.modal', function (e) {
    $('.navbar').addClass('d-none')
  })
  $('.portfolio-modal').on('hidden.bs.modal', function (e) {
    $('.navbar').removeClass('d-none')
  })
})($)// End of use strict

// Blog Like / Dislike
$('.fa-thumbs-o-down').on('click', function () {
  let url = $('.hide').text() + 'no'
  // console.log(url)
  $.ajax(
    url,
    {
      type: 'post',
      success: (e) => {
        if (e === 'Post Disliked') {
          let num = Number($('#postDislike').text())
          num++
          $('#postDislike').text(num)
        }
      },
      error: (e) => console.log(e)
    }
  )
})

$('.fa-thumbs-o-up').on('click', function () {
  let url = $('.hide').text() + 'yes'
  // console.log(url)
  $.ajax(
    url,
    {
      type: 'post',
      success: (e) => {
        if (e === 'Post Liked') {
          let num = Number($('#postLike').text())
          num++
          $('#postLike').text(String(num))
        }
      },
      error: (e) => console.log(e)
    }
  )
})
