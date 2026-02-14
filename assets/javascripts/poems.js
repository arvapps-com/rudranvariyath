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

function generatePoemsContent () {

  let rowDiv = $( "<div>" ).addClass( "row justify-content-center" );
  $.getJSON( 'assets/javascripts/poem-ids.json', function ( poems ) {


    $.each( poems, function ( index ) {
      let colDiv = $( "<div>" )
        .addClass( "col-lg-2 col-md-4 col-sm-6 m-2 position-relative rounded p-2 border border-2 rounded shadow" );
      // let colDiv = $( "<div>" ).addClass( "col-lg-2 col-md-3 mb-6 mb-lg-0 p-3" );
      let imgDiv = $( "<div>" ).attr( "data-id", this.poemSrc ).attr( "data-ripple-color", "light" ).addClass( "bg-image hover-overlay ripple shadow-1-strong rounded video-holder" );
      // let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#VideoModal")
      let a = $( "<a>" ).attr( "href", "https://www.youtube.com/watch?v=" + this.poemSrc ).attr( "target", "_blank" )
      // console.log( this.poemTitle )
      let img = $( "<img>" ).attr( "src", "https://img.youtube.com/vi/" + this.poemSrc + "/hqdefault.jpg" ).addClass( "img-fluid image w-100 h-100 shadow-1-strong rounded" );
      let ytImg = $( "<img>" ).attr( "src", "assets/images/play-button.webp" ).addClass( "yt-play-image" ).addClass( "w-25" );

      if ( this.poemTitle != '' && this.poemTitle != undefined ) {
        let titleSpan = $( "<span>" ).addClass( "badge badge-pill bg-info poemTitle w-100" ).append( this.poemTitle );
        if ( index < 5 ) {
          titleSpan.append( $( "<span>" ).addClass( "badge bg-danger ms-2" ).text( "New" ) );
        }
        rowDiv.append( colDiv.append( imgDiv.append( a.append( titleSpan ).append( img ).append( ytImg ) ) ) );
      } else {
        rowDiv.append( colDiv.append( imgDiv.append( a.append( img ).append( ytImg ) ) ) );
      }

    } );
  } ).fail( function () {
    console.error( "Failed to load the gallery images JSON file." );
  } );

  // For Pop Up video player 
  // let modalDiv = $( "<div>" ).attr( "id", "VideoModal" ).attr( "tabindex", "1" ).attr( "aria-labelledby", "VideoLabel" ).attr( "aria-hidden", "true" ).addClass( "modal fade" );

  // let dialogDiv = $( "<div>" ).addClass( "modal-dialog modal-xl modal-dialog-centered" );
  // let modalContentDiv = $( "<div>" ).addClass( "modal-content" );
  // let popUpSpan = $( "<span>" ).attr( "id", "popupTitle" ).addClass( "badge badge-pill bg-info poemTitle" )
  // // let iframeDiv = $("<div>").addClass("ratio ratio-16x9");
  // // let iframe = $("<iframe>").addClass("ratio ratio-16x9").attr("src", "#").attr("title", "YouTube video").attr("id", "VideoFrame").attr("allow", "autoplay; encrypted-media").append("allowfullscreen");

  // let btnDiv = $( "<div>" ).addClass( "text-center" );
  // let btn = $( "<button>" ).attr( "type", "button" ).attr( "data-bs-dismiss", "modal" ).addClass( "btn btn-danger w-100" ).append( "Close" );

  // // modalDiv.append(dialogDiv.append(modalContentDiv.append(popUpSpan).append(iframeDiv.append(iframe)).append(btnDiv.append(btn))));
  // modalDiv.append( dialogDiv.append( modalContentDiv.append( popUpSpan ).append( btnDiv.append( btn ) ) ) );

  // rowDiv.append( modalDiv );
  // you haven't touched the DOM yet, everything thus far has been in memory
  $( "#toReplacePoems" ).html( rowDiv ); // this is the only time you touch the DOM
}
( function () {
  "use strict";

  generatePoemsContent();
  $( '.video-holder' ).each( function ( i, obj ) {
    getVideoTitle( $( this ).data( "id" ) ).then( ( data ) => $( this ).find( "span" ).text( data ) );
  } );

  // Document.Ready
  // jQuery(function () {


  // });
} )();