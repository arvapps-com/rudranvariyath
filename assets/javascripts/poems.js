async function getVideoTitle(videoId) {
  var url = "https://www.youtube.com/watch?v=" + videoId;
  var title;
  await $.getJSON(
    "https://noembed.com/embed",
    { format: "json", url: url },
    function (data) {
      title = data.title;
    }
  );
  return title;
}

function generatePoemsContent() {
  let rowDiv = $("<div>").addClass("row justify-content-center");
  
  $.getJSON('assets/javascripts/poem-ids.json', function (poems) {
    $.each(poems, function (index) {
      let colDiv = $("<div>")
        .addClass("col-lg-2 col-md-4 col-sm-6 m-2 position-relative rounded p-2 border border-2 rounded shadow");
      
      let imgDiv = $("<div>")
        .attr("data-id", this.poemSrc)
        .attr("data-ripple-color", "light")
        .addClass("bg-image hover-overlay ripple shadow-1-strong rounded video-holder");
      
      let a = $("<a>")
        .attr("href", "https://www.youtube.com/watch?v=" + this.poemSrc)
        .attr("target", "_blank");
      
      let img = $("<img>")
        .attr("src", "https://img.youtube.com/vi/" + this.poemSrc + "/hqdefault.jpg")
        .addClass("img-fluid image w-100 h-100 shadow-1-strong rounded");
      
      // Replaced image with CSS play button
      let playBtn = $("<div>").addClass("play-btn");

      if (this.poemTitle != '' && this.poemTitle != undefined) {
        // Added title attribute for tooltip
        let titleSpan = $("<span>")
          .addClass("badge badge-pill bg-info poemTitle w-100 text-truncate")
          .attr("title", this.poemTitle)
          .attr("data-bs-toggle", "tooltip")
          .attr("data-bs-placement", "top")
          .append(this.poemTitle);
          
        if (index < 5) {
          titleSpan.append($("<span>").addClass("badge bg-danger ms-2").text("New"));
        }
        rowDiv.append(colDiv.append(imgDiv.append(a.append(titleSpan).append(img).append(playBtn))));
      } else {
        rowDiv.append(colDiv.append(imgDiv.append(a.append(img).append(playBtn))));
      }
    });

    // Update DOM only after data is processed
    $("#toReplacePoems").html(rowDiv);
    
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
    
    // Fetch titles after elements are in the DOM
    $('.video-holder').each(function (i, obj) {
      getVideoTitle($(this).data("id")).then((data) => {
        $(this).find("span.poemTitle").text(data).attr("title", data);
        // Re-initialize tooltip for updated title if necessary
        // new bootstrap.Tooltip($(this).find("span.poemTitle")[0]);
      });
    });

  }).fail(function () {
    console.error("Failed to load the poem-ids JSON file.");
  });
}

// Initialize when document is ready
$(function() {
  generatePoemsContent();
});