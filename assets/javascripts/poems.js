async function getVideoTitle (videoId) {
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
(function () {
    "use strict";
  
generatePoemsContent();
$('.video-holder').each(function (i, obj) {
    getVideoTitle($(this).data("id")).then((data) => $(this).find("span").text(data));
  });

  // Document.Ready
// jQuery(function () {
  

// });
})();