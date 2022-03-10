function generateGalleryContent () {

  let galleryImages = [{
    imageSrc: 'https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp',
    imageTitle: 'some image',
    imageDescription: 'some description'
  }]

  let rowDiv = $("<div>").addClass("row");
  $.each(galleryImages, function (index) {
    let div = $("<div>").addClass("col-lg-3 col-md-12 mb-4 mb-lg-0 item position-relative");
    let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#Image" + index) //TODO
    let img = $("<img>").attr("src", this.imageSrc).addClass("img-fluid image w-100 shadow-1-strong rounded mb-4");
    div.append(a.append(img));
    rowDiv.append(div);

    let modalDiv = $("<div>").attr("id", "Image" + index).attr("tabindex", "1").attr("aria-labelledby", "Image" + index + "Label").attr("aria-hidden", "true").addClass("modal fade");

    let innerDiv = $("<div>").addClass("modal-dialog modal-lg");
    let modalContentDiv = $("<div>").addClass("modal-content");
    let imgModalContent = $("<img>").attr("src", this.imageSrc).addClass("img-fluid image shadow-1-strong rounded");

    let descrSpan = $("<span>").attr("style", "width: 100%;").addClass("badge bg-secondary text-center").append(this.imageDescription);//TODO
    let buttonDiv = $("<div>").addClass("text-center py-3");
    let button = $("<button>").attr("type", "button").attr("data-bs-dismiss", "modal").addClass("btn btn-secondary");
    modalDiv.append(innerDiv.append(modalContentDiv.append(imgModalContent).append(descrSpan).append(buttonDiv.append(button))))
    rowDiv.append(modalDiv);

  });
  // you haven't touched the DOM yet, everything thus far has been in memory
  $("#toReplaceGallery").html(rowDiv); // this is the only time you touch the DOM
}
function _calculateAge (birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
$(document).on("click", ".video-holder", function () {
  var poemId = $(this).data("id");
  getVideoTitle(poemId).then((data) => $("#popupTitle").text(data));
  // to add custom close button
  // getVideoTitle(poemId).then(data => $("#popupTitle").html(data+'<span class="badge badge-danger" data-bs-dismiss="modal">X</span>'));
  $("#VideoFrame").attr(
    "src",
    "https://www.youtube.com/embed/" + poemId + "?autoplay=1"
  );
});

$("#VideoModal").on("hidden.bs.modal", function (e) {
  $("#VideoFrame").attr("src", "#");
});

(function () {
  "use strict";

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  generateGalleryContent();

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };


  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
    });
  }

  const ageSpan = select("#ageSpan");
  const dobSpan = select("#dobSpan");
  if (ageSpan && dobSpan) {
    let dob = dobSpan.textContent;
    var mydate = new Date(dob);
    ageSpan.textContent = _calculateAge(mydate);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });



  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})();


jQuery(function () {
  if ($('#tree').length)
    createFamilyTree();

});
