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
      
      // Changed to trigger modal instead of new tab
      let a = $("<a>")
        .attr("href", "#!")
        .attr("data-bs-toggle", "modal")
        .attr("data-bs-target", "#VideoModal")
        .attr("data-video-src", "https://www.youtube.com/embed/" + this.poemSrc + "?autoplay=1&rel=0"); // Auto-play when opened
      
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

    // Create Modal HTML Structure
    let modalHtml = `
      <div class="modal fade" id="VideoModal" tabindex="-1" aria-labelledby="VideoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
          <div class="modal-content bg-transparent border-0">
            <div class="modal-body p-0 position-relative">
              <!-- Close button outside or top-right -->
              <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-index-modal" data-bs-dismiss="modal" aria-label="Close" style="z-index: 1056; filter: invert(1);"></button>
              <div class="ratio ratio-16x9 shadow-lg rounded">
                <iframe id="videoFrame" src="" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="border-radius: 8px;"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Append modal to body (or rowDiv, but body is safer for z-index)
    if ($("#VideoModal").length === 0) {
      $("body").append(modalHtml);
    }

    // Update DOM
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

    // Handle Modal Events
    var videoModal = document.getElementById('VideoModal');
    if (videoModal) {
      videoModal.addEventListener('show.bs.modal', function (event) {
        // Button that triggered the modal
        var button = event.relatedTarget;
        // Extract info from data-* attributes
        var videoSrc = button.getAttribute('data-video-src');
        // Update the modal's content.
        var iframe = videoModal.querySelector('#videoFrame');
        iframe.src = videoSrc;
      });

      videoModal.addEventListener('hidden.bs.modal', function (event) {
        // Stop video on close by resetting src
        var iframe = videoModal.querySelector('#videoFrame');
        iframe.src = "";
      });
    }

  }).fail(function () {
    console.error("Failed to load the poem-ids JSON file.");
  });
}

// Initialize when document is ready
$(function() {
  generatePoemsContent();
});