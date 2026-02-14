function generateGalleryContent () {

  let rowDiv_for_home = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/gallery-images.json', function ( galleryImages ) {
    $.each( galleryImages, function ( index ) {
      // For thumbnails
      let div = $( "<div>" )
        .addClass( "col-lg-2 col-md-3 col-sm-2 m-3 position-relative rounded p-3 border border-2 rounded shadow" );

      let a = $( "<a>" ).attr( "href", "#!" ).attr( "data-bs-toggle", "modal" ).attr( "data-bs-target", "#GalleryImage" + index )
      let img = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .attr( "alt", this.imageTitle || "Gallery Image" )
        .addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      div.append( a.append( img ) );
      rowDiv_for_home.append( div );
      // This is for pop up section
      let modalDiv = $( "<div>" ).attr( "id", "GalleryImage" + index ).attr( "tabindex", "-1" ).attr( "aria-labelledby", "GalleryImage" + index + "Label" ).attr( "aria-hidden", "true" ).addClass( "modal fade" );

      let innerDiv = $( "<div>" ).addClass( "modal-dialog modal-lg" );
      let modalContentDiv = $( "<div>" ).addClass( "modal-content col-lg-2 col-md-4 col-sm-4 m-3  position-relative rounded p-3" );
      let imgModalContent = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image shadow-1-strong rounded" );

      let descrSpan = $( "<span>" ).attr( "style", "width: 100%;" ).addClass( "badge bg-primary text-center" )//.append( this.imageDescription );//TODO
      let buttonDiv = $( "<div>" ).addClass( "text-center p-3" );
      let button = $( "<button>" ).attr( "type", "button" ).attr( "data-bs-dismiss", "modal" ).addClass( "btn btn-danger w-100" ).append( "Close" );
      modalDiv.append( innerDiv.append( modalContentDiv.append( imgModalContent ).append( descrSpan ).append( buttonDiv.append( button ) ) ) )
      rowDiv_for_home.append( modalDiv );

    } );
    // you haven't touched the DOM yet, everything thus far has been in memory
    $( "#toReplaceGallery" ).html( rowDiv_for_home ); // this is the only time you touch the DOM
  } ).fail( function () {
    console.error( "Failed to load the gallery images JSON file." );
  } );
}
async function getVideoTitle ( videoId ) {
  var url = "https://www.youtube.com/watch?v=" + videoId;
  var title;
  await $.getJSON(
    "https://noembed.com/embed",
    { format: "json", url: url },
    function ( data ) {
      title = data.title;
    }
  );
  return title;
}

function generatePoemsContent_for_home () {

  let rowDiv_for_home = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/poem-ids-small.json', function ( poems ) {


    $.each( poems, function ( index ) {
      let colDiv = $( "<div>" )
        .addClass( "col-lg-2 col-md-4 col-sm-6 m-2 position-relative rounded p-2 border border-2 rounded shadow" );
      // let colDiv = $( "<div>" ).addClass( "col-lg-2 col-md-3 mb-6 mb-lg-0 p-3" );
      let imgDiv = $( "<div>" ).attr( "data-id", this.poemSrc ).attr( "data-ripple-color", "light" ).addClass( "bg-image hover-overlay ripple shadow-1-strong rounded video-holder" );
      // let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#VideoModal")
      let a = $( "<a>" ).attr( "href", "https://www.youtube.com/watch?v=" + this.poemSrc ).attr( "target", "_blank" )
      // console.log( this.poemTitle )
      let img = $( "<img>" )
        .attr( "src", "https://img.youtube.com/vi/" + this.poemSrc + "/hqdefault.jpg" )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      let ytImg = $( "<img>" )
        .attr( "src", "assets/images/play-button.webp" )
        .attr( "loading", "lazy" )
        .addClass( "yt-play-image" )
        .addClass( "w-25" );

      if ( this.poemTitle != '' && this.poemTitle != undefined ) {
        let titleSpan = $( "<span>" ).addClass( "badge badge-pill bg-info poemTitle w-100" ).append( this.poemTitle );
        if ( index < 5 ) {
          titleSpan.append( $( "<span>" ).addClass( "badge bg-danger ms-2" ).text( "New" ) );
        }
        rowDiv_for_home.append( colDiv.append( imgDiv.append( a.append( titleSpan ).append( img ).append( ytImg ) ) ) );
      } else {
        rowDiv_for_home.append( colDiv.append( imgDiv.append( a.append( img ).append( ytImg ) ) ) );
      }


    } );
    // Add a Bootstrap-styled div acting as a link at the end
    let linkDiv = $( "<div>" )
      .addClass(
        "text-center mt-4 p-3 bg-primary text-white rounded cursor-pointer"
      )
      .attr( "onclick", "window.location.href='poems.html#poems';" )
      .text( "View All Poems" );

    rowDiv_for_home.append( linkDiv );
    $( "#toReplacePoems_for_home" ).html( rowDiv_for_home ); // this is the only time you touch the DOM
  } ).fail( function () {
    console.error( "Failed to load the gallery images JSON file." );
  } );


}

function generateAwardsContent () {

  let rowDiv_for_home = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/award-images.json', function ( awardImages ) {
    $.each( awardImages, function ( index ) {
      // For thumbnails
      let div = $( "<div>" )
        .addClass( "col-lg-2 col-md-3 col-sm-2 m-3 position-relative rounded p-3 border border-2 rounded shadow" );

      let a = $( "<a>" ).attr( "href", "#!" ).attr( "data-bs-toggle", "modal" ).attr( "data-bs-target", "#AwardImage" + index )
      let img = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      div.append( a.append( img ) );
      rowDiv_for_home.append( div );
      // This is for pop up section
      let modalDiv = $( "<div>" ).attr( "id", "AwardImage" + index ).attr( "tabindex", "-1" ).attr( "aria-labelledby", "AwardImage" + index + "Label" ).attr( "aria-hidden", "true" ).addClass( "modal fade" );

      let innerDiv = $( "<div>" ).addClass( "modal-dialog modal-lg" );
      let modalContentDiv = $( "<div>" ).addClass( "modal-content col-lg-2 col-md-4 col-sm-4 m-3  position-relative rounded p-3" );
      let imgModalContent = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image shadow-1-strong rounded" );

      let descrSpan = $( "<span>" ).attr( "style", "width: 100%;" ).addClass( "badge bg-primary text-center" ).append( this.imageDescription );//TODO
      let buttonDiv = $( "<div>" ).addClass( "text-center p-3" );
      let button = $( "<button>" ).attr( "type", "button" ).attr( "data-bs-dismiss", "modal" ).addClass( "btn btn-danger w-100" ).append( "Close" );
      modalDiv.append( innerDiv.append( modalContentDiv.append( imgModalContent ).append( descrSpan ).append( buttonDiv.append( button ) ) ) )
      rowDiv_for_home.append( modalDiv );

    } );
    // you haven't touched the DOM yet, everything thus far has been in memory
    $( "#toReplaceAwards" ).html( rowDiv_for_home ); // this is the only time you touch the DOM
  } ).fail( function () {
    console.error( "Failed to load the Awards images JSON file." );
  } );
}
function generateBooksContent () {

  let rowDiv_for_home = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/book-images.json', function ( bookImages ) {
    $.each( bookImages, function ( index ) {
      // For thumbnails
      let div = $( "<div>" )
        .addClass( "col-lg-2 col-md-3 col-sm-2 m-3 position-relative rounded p-3 border border-2 rounded shadow" );

      let a = $( "<a>" ).attr( "href", "#!" ).attr( "data-bs-toggle", "modal" ).attr( "data-bs-target", "#BookImage" + index )
      let img = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      div.append( a.append( img ) );
      rowDiv_for_home.append( div );
      // This is for pop up section
      let modalDiv = $( "<div>" ).attr( "id", "BookImage" + index ).attr( "tabindex", "-1" ).attr( "aria-labelledby", "BookImage" + index + "Label" ).attr( "aria-hidden", "true" ).addClass( "modal fade" );

      let innerDiv = $( "<div>" ).addClass( "modal-dialog modal-lg" );
      let modalContentDiv = $( "<div>" ).addClass( "modal-content col-lg-2 col-md-4 col-sm-4 m-3  position-relative rounded p-3" );
      let imgModalContent = $( "<img>" )
        .attr( "src", this.imageSrc )
        .attr( "loading", "lazy" )
        .attr( "decoding", "async" )
        .addClass( "img-fluid image shadow-1-strong rounded" );

      let descrSpan = $( "<span>" ).attr( "style", "width: 100%;" ).addClass( "badge bg-primary text-center" ).append( this.imageDescription );//TODO
      let buttonDiv = $( "<div>" ).addClass( "text-center p-3" );
      let button = $( "<button>" ).attr( "type", "button" ).attr( "data-bs-dismiss", "modal" ).addClass( "btn btn-danger w-100" ).append( "Close" );
      modalDiv.append( innerDiv.append( modalContentDiv.append( imgModalContent ).append( descrSpan ).append( buttonDiv.append( button ) ) ) )
      rowDiv_for_home.append( modalDiv );

    } );
    // you haven't touched the DOM yet, everything thus far has been in memory
    $( "#toReplaceBooks" ).html( rowDiv_for_home ); // this is the only time you touch the DOM
  } ).fail( function () {
    console.error( "Failed to load the gallery images JSON file." );
  } );
}

function _calculateAge ( birthday ) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date( ageDifMs ); // miliseconds from epoch
  return Math.abs( ageDate.getUTCFullYear() - 1970 );
}
$( document ).on( "click", ".video-holder", function () {
  var poemId = $( this ).data( "id" );
  getVideoTitle( poemId ).then( ( data ) => $( "#popupTitle" ).text( data ) );
  // to add custom close button
  // getVideoTitle(poemId).then(data => $("#popupTitle").html(data+'<span class="badge badge-danger" data-bs-dismiss="modal">X</span>'));
  $( "#VideoFrame" ).attr(
    "src",
    "https://www.youtube.com/embed/" + poemId + "?autoplay=1"
  );
} );

$( "#VideoModal" ).on( "hidden.bs.modal", function ( e ) {
  $( "#VideoFrame" ).attr( "src", "#" );
} );

( function () {
  "use strict";

  /**
   * Easy on scroll event listener 
   */
  const onscroll = ( el, listener ) => {
    el.addEventListener( 'scroll', listener )
  }

  generateGalleryContent();
  generateAwardsContent();
  generateBooksContent();
  generatePoemsContent_for_home();

  /**
   * Easy selector helper function
   */
  const select = ( el, all = false ) => {
    el = el.trim();
    if ( all ) {
      return [ ...document.querySelectorAll( el ) ];
    } else {
      return document.querySelector( el );
    }
  };

  /**
   * Easy event listener function
   */
  const on = ( type, el, listener, all = false ) => {
    let selectEl = select( el, all );

    if ( selectEl ) {
      if ( all ) {
        selectEl.forEach( ( e ) => e.addEventListener( type, listener ) );
      } else {
        selectEl.addEventListener( type, listener );
      }
    }
  };


  /**
   * Profile type effect
   */
  const typed = select( ".typed" );
  if ( typed ) {
    let typed_strings = typed.getAttribute( "data-typed-items" );
    typed_strings = typed_strings.split( "," );
    new Typed( ".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000,
    } );
  }

  const ageSpan = select( "#ageSpan" );
  const dobSpan = select( "#dobSpan" );
  if ( ageSpan && dobSpan ) {
    let dob = dobSpan.textContent;
    var mydate = new Date( dob );
    ageSpan.textContent = _calculateAge( mydate );
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select( '#navbar .scrollto', true )
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach( navbarlink => {
      if ( !navbarlink.hash ) return
      let section = select( navbarlink.hash )
      if ( !section ) return
      if ( position >= section.offsetTop && position <= ( section.offsetTop + section.offsetHeight ) ) {
        navbarlink.classList.add( 'active' )
      } else {
        navbarlink.classList.remove( 'active' )
      }
    } )
  }
  window.addEventListener( 'load', navbarlinksActive )
  onscroll( document, navbarlinksActive )

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = ( el ) => {
    let elementPos = select( el ).offsetTop
    window.scrollTo( {
      top: elementPos,
      behavior: 'smooth'
    } )
  }

  /**
   * Back to top button
   */
  let backtotop = select( '.back-to-top' )
  if ( backtotop ) {
    const toggleBacktotop = () => {
      if ( window.scrollY > 100 ) {
        backtotop.classList.add( 'active' )
      } else {
        backtotop.classList.remove( 'active' )
      }
    }
    window.addEventListener( 'load', toggleBacktotop )
    onscroll( document, toggleBacktotop )
  }

  /**
   * Mobile nav toggle
   */
  on( 'click', '.mobile-nav-toggle', function ( e ) {
    select( 'body' ).classList.toggle( 'mobile-nav-active' )
    this.classList.toggle( 'bi-list' )
    this.classList.toggle( 'bi-x' )
  } )

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on( 'click', '.scrollto', function ( e ) {
    if ( select( this.hash ) ) {
      e.preventDefault()

      let body = select( 'body' )
      if ( body.classList.contains( 'mobile-nav-active' ) ) {
        body.classList.remove( 'mobile-nav-active' )
        let navbarToggle = select( '.mobile-nav-toggle' )
        navbarToggle.classList.toggle( 'bi-list' )
        navbarToggle.classList.toggle( 'bi-x' )
      }
      scrollto( this.hash )
    }
  }, true )

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener( 'load', () => {
    if ( window.location.hash ) {
      if ( select( window.location.hash ) ) {
        scrollto( window.location.hash )
      }
    }
  } );



  /**
   * Animation on scroll
   */
  window.addEventListener( 'load', () => {
    AOS.init( {
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    } )
  } );
} )();


// jQuery(function () {
//   if ($('#tree').length)
//     createFamilyTree();

// });
