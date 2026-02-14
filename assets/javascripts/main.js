async function getVideoTitle ( videoId ) {
  var url = "https://www.youtube.com/watch?v=" + videoId;
  var title;
  try {
    await $.getJSON(
      "https://noembed.com/embed",
      { format: "json", url: url },
      function ( data ) {
        title = data.title;
      }
    );
  } catch (e) {
    title = "Poem Video"; // Fallback to avoid console errors
  }
  return title;
}

function generatePoemsContent_for_home () {
  let rowDiv_for_home = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/poem-ids-small.json', function ( poems ) {
    $.each( poems, function ( index ) {
      let colDiv = $( "<div>" ).addClass( "col-lg-2 col-md-4 col-sm-6 m-2 position-relative rounded p-2 border border-2 rounded shadow" );
      let imgDiv = $( "<div>" ).attr( "data-id", this.poemSrc ).addClass( "bg-image hover-overlay ripple shadow-1-strong rounded video-holder" );
      let a = $( "<a>" ).attr( "href", "https://www.youtube.com/watch?v=" + this.poemSrc ).attr( "target", "_blank" );
      let img = $( "<img>" ).attr( "src", "https://img.youtube.com/vi/" + this.poemSrc + "/hqdefault.jpg" ).addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      let ytImg = $( "<img>" ).attr( "src", "assets/images/play-button.webp" ).addClass( "yt-play-image w-25" );

      if ( this.poemTitle != '' && this.poemTitle != undefined ) {
        let titleSpan = $( "<span>" ).addClass( "badge badge-pill bg-info poemTitle w-100" ).append( this.poemTitle );
        if ( index < 5 ) titleSpan.append( $( "<span>" ).addClass( "badge bg-danger ms-2" ).text( "New" ) );
        rowDiv_for_home.append( colDiv.append( imgDiv.append( a.append( titleSpan ).append( img ).append( ytImg ) ) ) );
      } else {
        rowDiv_for_home.append( colDiv.append( imgDiv.append( a.append( img ).append( ytImg ) ) ) );
      }
    });
    let linkDiv = $( "<div>" ).addClass( "text-center mt-4 p-3 bg-primary text-white rounded cursor-pointer" ).attr( "onclick", "window.location.href='poems.html#poems';" ).text( "View All Poems" );
    rowDiv_for_home.append( linkDiv );
    $( "#toReplacePoems_for_home" ).html( rowDiv_for_home );
  });
}

// Global listener to fix double backdrops (faded effect)
$(document).on('hidden.bs.modal', function() {
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open').css('overflow', '');
    $('.modal').hide(); // Force hide all modals
});

const isLocalFile = window.location.protocol === 'file:';
if (isLocalFile) {
    console.warn("Notice: Content is being viewed via file:// protocol. Dynamic JSON loading may be restricted by your browser's CORS policy. For full functionality, please use a local web server (e.g. Live Server).");
}

function generateGalleryContent() {
  $.getJSON('assets/javascripts/gallery-images.json', function(galleryImages) {
    const rowDiv = $("<div>").addClass("row justify-content-center");
    const items = [];

    const loadPromises = galleryImages.map((imageData, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imageData.imageSrc;
        img.onload = () => {
          const isPortrait = img.height > img.width;
          items.push({ imageData, index, isPortrait });
          resolve();
        };
        img.onerror = resolve; // Continue even if one fails
      });
    });

    Promise.all(loadPromises).then(() => {
      // Sort: Portraits first, then Landscapes
      items.sort((a, b) => (b.isPortrait ? 1 : 0) - (a.isPortrait ? 1 : 0));

      items.forEach(({ imageData, index, isPortrait }) => {
        const orientationClass = isPortrait ? "portrait-thumbnail" : "landscape-thumbnail";
        const modalImgClass = isPortrait ? "portrait-modal-img" : "landscape-modal-img";

        let div = $("<div>").addClass("m-3 frame-container " + orientationClass);
        let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#GalleryImage" + index);
        let thumbImg = $("<img>").attr("src", imageData.imageSrc).attr("loading", "lazy").addClass("img-fluid rounded");

        div.append(a.append(thumbImg));
        rowDiv.append(div);

        // Modal section
        let modalDiv = $("<div>").attr("id", "GalleryImage" + index).attr("tabindex", "-1").addClass("modal fade");
        let innerDiv = $("<div>").addClass("modal-dialog modal-lg modal-dialog-centered");
        let modalContentDiv = $("<div>").addClass("modal-content p-0 border-0");

        let imgContainer = $("<div>").addClass("modal-image-container position-relative");
        let closeBtn = $("<button>").addClass("modal-close-custom").attr("data-bs-dismiss", "modal").html("<i class='bi bi-x-lg'></i>");
        let imgModalContent = $("<img>").attr("src", imageData.imageSrc).addClass(modalImgClass);
        imgContainer.append(closeBtn).append(imgModalContent);

        let infoDiv = $("<div>").addClass("p-3 text-center");
        let descrSpan = $("<h5>").addClass("text-dark mb-0").text(imageData.imageDescription || imageData.imageTitle || "");
        infoDiv.append(descrSpan);

        modalDiv.append(innerDiv.append(modalContentDiv.append(imgContainer).append(infoDiv)));
        rowDiv.append(modalDiv);
      });

      $("#toReplaceGallery").html(rowDiv);
    });
  });
}

function generateAwardsContent() {
  $.getJSON('assets/javascripts/award-images.json', function(awardImages) {
    const rowDiv = $("<div>").addClass("row justify-content-center");
    const items = [];

    const loadPromises = awardImages.map((imageData, index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = imageData.imageSrc;
        img.onload = () => {
          const isPortrait = img.height > img.width;
          items.push({ imageData, index, isPortrait });
          resolve();
        };
        img.onerror = resolve;
      });
    });

    Promise.all(loadPromises).then(() => {
      items.sort((a, b) => (b.isPortrait ? 1 : 0) - (a.isPortrait ? 1 : 0));

      items.forEach(({ imageData, index, isPortrait }) => {
        const orientationClass = isPortrait ? "portrait-thumbnail" : "landscape-thumbnail";
        const modalImgClass = isPortrait ? "portrait-modal-img" : "landscape-modal-img";

        let div = $("<div>").addClass("m-3 frame-container " + orientationClass);
        let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#AwardImage" + index);
        let thumbImg = $("<img>").attr("src", imageData.imageSrc).addClass("img-fluid rounded");

        div.append(a.append(thumbImg));
        rowDiv.append(div);

        let modalDiv = $("<div>").attr("id", "AwardImage" + index).attr("tabindex", "-1").addClass("modal fade");
        let innerDiv = $("<div>").addClass("modal-dialog modal-lg modal-dialog-centered");
        let modalContentDiv = $("<div>").addClass("modal-content p-0 border-0");

        let imgContainer = $("<div>").addClass("modal-image-container position-relative");
        let closeBtn = $("<button>").addClass("modal-close-custom").attr("data-bs-dismiss", "modal").html("<i class='bi bi-x-lg'></i>");
        let imgModalContent = $("<img>").attr("src", imageData.imageSrc).addClass(modalImgClass);
        imgContainer.append(closeBtn).append(imgModalContent);

        let infoDiv = $("<div>").addClass("p-3 text-center");
        let descrSpan = $("<h5>").addClass("text-dark mb-0").text(imageData.imageDescription || "");
        infoDiv.append(descrSpan);

        modalDiv.append(innerDiv.append(modalContentDiv.append(imgContainer).append(infoDiv)));
        rowDiv.append(modalDiv);
      });

      $("#toReplaceAwards").html(rowDiv);
    });
  });
}

function generateBooksContent() {
  $.getJSON('assets/javascripts/book-images.json', function(bookImages) {
    const rowDiv = $("<div>").addClass("row justify-content-center px-4");
    $.each(bookImages, function(index) {
      const imageData = this;
      let div = $("<div>").addClass("col-lg-3 col-md-4 col-sm-6 m-3 p-3 frame-container book-card text-center");

      let imageWrapper = $("<div>").addClass("image-wrapper");
      let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#BookImage" + index);
      let img = $("<img>").attr("src", imageData.imageSrc).addClass("img-fluid");
      imageWrapper.append(a.append(img));

      let title = $("<h5>").addClass("mb-3 mt-2").text(imageData.imageTitle);
      let buyBtn = $("<button>").addClass("btn btn-success buy-now-btn w-100").attr("data-title", imageData.imageTitle).html("<i class='bi bi-cart-fill me-2'></i>Buy Now @ ₹100");

      div.append(imageWrapper).append(title).append(buyBtn);
      rowDiv.append(div);

      let modalDiv = $("<div>").attr("id", "BookImage" + index).attr("tabindex", "-1").addClass("modal fade");
      let innerDiv = $("<div>").addClass("modal-dialog modal-lg modal-dialog-centered");
      let modalContentDiv = $("<div>").addClass("modal-content p-0 border-0");

      let imgContainer = $("<div>").addClass("modal-image-container position-relative");
      let closeBtn = $("<button>").addClass("modal-close-custom").attr("data-bs-dismiss", "modal").html("<i class='bi bi-x-lg'></i>");
      let imgModalContent = $("<img>").attr("src", imageData.imageSrc).addClass("portrait-modal-img");
      imgContainer.append(closeBtn).append(imgModalContent);

      let infoDiv = $("<div>").addClass("p-4 text-center bg-white");
      let descrSpan = $("<h5>").addClass("text-dark mb-3").text(imageData.imageDescription || imageData.imageTitle);
      let buyBtnModal = $("<button>").addClass("btn btn-success buy-now-btn px-5").attr("data-title", imageData.imageTitle).html("<i class='bi bi-cart-fill me-2'></i>Buy Now @ ₹100");
      infoDiv.append(descrSpan).append(buyBtnModal);

      modalDiv.append(innerDiv.append(modalContentDiv.append(imgContainer).append(infoDiv)));
      rowDiv.append(modalDiv);
    });
    $("#toReplaceBooks").html(rowDiv);
  });
}

/**
 * Payment Modal Generation and Handling
 */
function initializePaymentModal() {
  if ($("#paymentModal").length === 0) {
    const paymentModalHtml = `
      <div class="modal fade payment-modal" id="paymentModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content border-0 shadow-lg">
            <div class="payment-header">
              <h4 class="modal-title mb-0" id="paymentModalTitle">Complete Purchase</h4>
              <p class="mb-0 opacity-75">Secure UPI Payment</p>
            </div>
            <div class="modal-body text-center p-4">
              <div class="qr-container mb-4">
                <div class="qr-wrapper p-3 bg-white rounded shadow-sm d-inline-block">
                  <img id="paymentQr" src="" alt="UPI QR Code" class="img-fluid qr-code" style="width: 200px; height: 200px;">
                </div>
                <div class="mt-3">
                  <span class="upi-id select-all">rudranvariyath-2@okaxis</span>
                  <p class="small text-muted mt-2 mb-0">Scan this QR using any UPI App (GPay, PhonePe, Paytm)</p>
                </div>
              </div>
              
              <div class="payment-info mb-4">
                <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                  <span>Amount to Pay:</span>
                  <span class="fw-bold text-success">₹100</span>
                </div>
                <p class="text-muted small">Once paid, please send a screenshot of the transaction to confirm your order.</p>
              </div>

              <a id="whatsappLink" href="#" target="_blank" class="whatsapp-link w-100 justify-content-center">
                <i class="bi bi-whatsapp me-2"></i> Send Screenshot on WhatsApp
              </a>
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-light w-100" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    `;
    $("body").append(paymentModalHtml);
  }

  $(document).on("click", ".buy-now-btn", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // If opened from another modal, close that first
    $(".modal").modal("hide");
    
    const title = $(this).attr("data-title");
    const upiId = "rudranvariyath-2@okaxis";
    const amount = "100";
    const whatsapp = "+91 1234567890";
    
    $("#paymentModalTitle").text("Buy " + title);
    
    // Generate UPI URL for QR
    const upiUrl = `upi://pay?pa=${upiId}&pn=Rudran%20Variyath&am=${amount}&cu=INR&tn=Purchase of ${title}`;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiUrl)}&color=173b6c&bgcolor=ffffff&margin=1`;
    
    $("#paymentQr").attr("src", qrApiUrl);
    
    const waMessage = encodeURIComponent(`Hi, I've just paid ₹${amount} for the book "${title}". Here is my payment screenshot.`);
    $("#whatsappLink").attr("href", `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}?text=${waMessage}`);
    
    setTimeout(() => {
        $("#paymentModal").modal("show");
    }, 400);
  });
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
  initializePaymentModal();

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
