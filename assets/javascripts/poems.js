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

function generatePoemsContent () {

  let poems = [{ poemSrc: 'pbVFIFVZ68g' }, { poemSrc: '2a35ZppG3pw' }, { poemSrc: 'h00fHCy1Uio' }, { poemSrc: '65SCxJV28Kk' }, { poemSrc: 'Z9Nj6D3rEq8' }, { poemSrc: '-TBb9FWYLmw' }, { poemSrc: 'x4JuuqBGm6Y' }, { poemSrc: 'bkJhYbvOxcU' }, { poemSrc: 'UjOh784AzZU' }, { poemSrc: 'wmxLbFKFMQ8' }, { poemSrc: 'qx5BGYiE7NY' }, { poemSrc: 'YnkxEzSIGGE' }, { poemSrc: '8ZGZDb_3QQU' }, { poemSrc: 'x3BezK9G2jc' }, { poemSrc: '9v6HpxG4tOk' }, { poemSrc: 'NTbBi-ewKJo' }, { poemSrc: 'yrUJ5Vz2t-o' }, { poemSrc: 'INctQS03DeQ' }, { poemSrc: 'G1ipWTI8000' }, { poemSrc: 'HzjNKaI174U' }, { poemSrc: 'XP0UGCE0J0M' }, { poemSrc: 'tiEZKNh_tt8' }, { poemSrc: 'JIXKjPI76NY' }, { poemSrc: 'jjV9DsAGT2M' }, { poemSrc: 'ca8aiNSOpJo' }, { poemSrc: 'mAbhpwn3bo4' }, { poemSrc: 'mddVbxOTbqw' }, { poemSrc: 'D5x3Ss_pqmU' }, { poemSrc: 'SD_QwacQddc' }, { poemSrc: 'FtNp7RJyi9k' }, { poemSrc: 'GVVdTPb6Arw' }, { poemSrc: 'QCiZRoW_y6s' }, { poemSrc: 'ahvJopZk1Z0' }, { poemSrc: 'cJSas4ces9c' }, { poemSrc: '-jWbMxbNlhc' }, { poemSrc: '1zmJC2Vp7ak' }, { poemSrc: 'asvR-D6Wnrc' }, { poemSrc: 'PFGGJWJYB7Y' }, { poemSrc: 'yfZnzfJOXjI' }, { poemSrc: 'O82VMzIIzOQ' }, { poemSrc: '1G2xpGI-kEA' }, { poemSrc: 'r7H0LaFapQs' }, { poemSrc: 'wBdyG5L123o' }, { poemSrc: 'cM9SCzx_O_M' }, { poemSrc: '2Qh6uwCm75s' }, { poemSrc: 'W9OAzjeH0MQ' }, { poemSrc: '5mwexCtWiCw' }, { poemSrc: 'pQuPTJaPPuA' }, { poemSrc: 'esh7sigurxw' }, { poemSrc: '6_771ZrAEV8' }, { poemSrc: 'fCVk4QYpsds' }, { poemSrc: 'T65-te0tjZM' }, { poemSrc: 'jSx4qJ6507E' }, { poemSrc: '3YIgoa2Lwcs' }, { poemSrc: 'wrnpimlOwsw' }, { poemSrc: 'fRV3C1QM54U' }, { poemSrc: 'bW8NIixbCRY' }, { poemSrc: 'WpKdmdTI3TM' }, { poemSrc: 'k6KH0E-sddM' }, { poemSrc: '2C_NGw8dX1Q' }, { poemSrc: 'J9QXQ0QkHQc' }, { poemSrc: 'a2hi9Q9QW3Y' }, { poemSrc: '94WlpzGizWY' }, { poemSrc: 'QpI2RCx3z5Q' }, { poemSrc: 'EZfNOjoFzrU' }, { poemSrc: 'UOcxp9c4Aok' }, { poemSrc: 'CDEBs8zZA0Y' }, { poemSrc: 'rbyPr7uJjEs' }, { poemSrc: 'xH_71ZF5xNA' }, { poemSrc: '3Gl1emyeCPY' }, { poemSrc: 'U8WNkxA8PvY' }, { poemSrc: 'hoF85cHRPQM' }, { poemSrc: '2vsUnCxh8Ng' }, { poemSrc: '2sB2Js8kxeY' }, { poemSrc: 'VrRjbSUCXt8' }, { poemSrc: 'ubsf-LH2EAM' }, { poemSrc: 'BW-mMBR1k2U' }, { poemSrc: 'LGv0uwldUVI' }, { poemSrc: 'v5aBch93VCk' }, { poemSrc: 'uPaaAAiCjp8' }, { poemSrc: 'gqwHTiFS80I' }, { poemSrc: 'uq_MMu_UGbg' }, { poemSrc: 'qOBGA8umGSY' }, { poemSrc: 'FoAIYUOJlhs' }, { poemSrc: 'lD902ktbVxY' }, { poemSrc: 'DLerlUmVsrA' }, { poemSrc: 'rFZ-DtztGKA' }, { poemSrc: 'ykDFdaLrH_o' }, { poemSrc: 'VPeMjG0p6Zs' }, { poemSrc: 'w6l8dD7rfuI' }, { poemSrc: '0iMoIZBX3Xc' }, { poemSrc: 'ebliFv0Ju3E' }, { poemSrc: 'STMtrtZyJ7c' }, { poemSrc: '_yIgKSOCaUk' }, { poemSrc: '_FWr2gXTJ_Y' }, { poemSrc: 'fGPjvdgrATg' }, { poemSrc: 'NH3F_6sQTzE' }, { poemSrc: 'nax_o6ZoYW4' }, { poemSrc: 'b3gcLqDJFAk' }, { poemSrc: 'YVNXZXtMwa4' }, { poemSrc: 'FESRBqqm2p8' }, { poemSrc: 'CrbTn4yV6E4' }, { poemSrc: 'YCcjIBONERo' }, { poemSrc: 'NSCbFtNNZTQ' }, { poemSrc: 'mz-joxbzTQs' }, { poemSrc: 'VRffPZQJUeo' }, { poemSrc: 'd-xtEvhbC1w' }, { poemSrc: 'j30sBZTVfGY' }, { poemSrc: '7EGe040or6k' }, { poemSrc: 'WKhKPr8rdlY' }, { poemSrc: 'gr3g2T2vrQA' }, { poemSrc: 'IEXF4cvn2gc' }, { poemSrc: 'yDnc7FO2L4s' }, { poemSrc: 'qlSo4aGEM7I' }, { poemSrc: 'S9GMxT9RuQ8' }, { poemSrc: 'ooltE7NHdkA' }, { poemSrc: '9qKxFukowR8' }, { poemSrc: 'ZdAbY8io1GY' }, { poemSrc: 'VM63XSsVgkw' }, { poemSrc: 'vktz30Xji7g' }, { poemSrc: 'x_wO-MJJ69w' }, { poemSrc: 'sd7z8-tJY6E' }, { poemSrc: 'kq0oiwoFZ9s' }, { poemSrc: 'RSbg1oNX3Pw' }, { poemSrc: 'cCRtKoKWjZw' }, { poemSrc: 'kGU2yq-t4Bk' }, { poemSrc: 'RUPjYHxdNRc' }, { poemSrc: 'ok_lm9DRu30' }, { poemSrc: 'VE5IEeLgPkk' }, { poemSrc: 'SXJWIY1CJQo' }, { poemSrc: 'JvAQPR5GLWI' }, { poemSrc: 'czNitbPssHg' }, { poemSrc: '2lHdC3zlQqQ' }, { poemSrc: 'sdOO2EHUTCI' }, { poemSrc: 'M0J4eTLiw20' }, { poemSrc: 'D_HEtax5iZk' }, { poemSrc: 'a-YSoZhqtHc' }, { poemSrc: 'PyebH3QS9UQ' }, { poemSrc: 'aU0WT5M--pM' }, { poemSrc: 'eXG9KZhsyNw' }, { poemSrc: '-RHGTy35kGg' }, { poemSrc: 'sNrqDxcaMtk' }, { poemSrc: 'jQ3qevx8Jj8' }, { poemSrc: 'yCn6veUmurI' }, { poemSrc: 'nUaUrNtDMtQ' }, { poemSrc: 'GflmFDEbGAA' }, { poemSrc: '48y_RT8P-eU' }, { poemSrc: 'VbZb269f5AM' }, { poemSrc: 'GZNQwICJ93I' }, { poemSrc: 'Kktd4q1yuN0' }, { poemSrc: 'faEx5mwC3NI' }, { poemSrc: 'wcumsIe973g' }, { poemSrc: 'bQRHW6saYkM' }, { poemSrc: '4udK83rnqRE' }, { poemSrc: 'qD0pIV15Ey8' }, { poemSrc: '1PmMW2Ds2X0' }, { poemSrc: '-ZN618-nvuE' }, { poemSrc: 'OnGByPwSHiU' }, { poemSrc: 'BDoTqC_2YvE' }, { poemSrc: '_BIQV_5PtGI' }, { poemSrc: 'VrWy0qwB6uM' }, { poemSrc: 'GE9HaTi9H8c' }, { poemSrc: 'rXccWt2VeFI' }, { poemSrc: 'SuCcD8p-pvg' }, { poemSrc: 'jusbDd-R-MM' }, { poemSrc: 'kZsdWuX5eBo' }, { poemSrc: 'EeQMhFgEirE' }, { poemSrc: 'fdTkpo_ufyA' }, { poemSrc: 'iabxVpaZJFA' }, { poemSrc: 'vMg_p6t2qPo' }, { poemSrc: 'MBzGDEB8g-c' }, { poemSrc: 'ssgsglw6LWI' }, { poemSrc: 'sAeZfzJ6r1M' }, { poemSrc: 'wAZTpSWloPc' }, { poemSrc: 'lS9x2dr1KP4' }, { poemSrc: 'KF0tKeWcxRc' }, { poemSrc: 'TvxF7i_zmeI' }, { poemSrc: 'aS7c-biHwik' }, { poemSrc: 'fKCVirQRaDY' }, { poemSrc: 'yTDjP3ZFl7k' }, { poemSrc: 'VePZWGu0qbk' }, { poemSrc: 'BgiP4Ud6nSc' }, { poemSrc: 'l1XcP6oRML0' }, { poemSrc: 'qYesCC5bkZI' }, { poemSrc: 'Q0y7TTmX12Y' }, { poemSrc: '_pOZeRWVdW0' }, { poemSrc: 'HDie_RDkokg' }, { poemSrc: 'asLFkfODH0w' }, { poemSrc: 'PHoCuJ0SjPU' }, { poemSrc: 'yHHAWi_RwtM' }, { poemSrc: 'hLLx_l87mYI' }, { poemSrc: 'u_sNEja3SKQ' }, { poemSrc: '26_c8GdxaOQ' }, { poemSrc: 'E-Hq7d4ayag' }, { poemSrc: 'oQ6x4UBRzqg' }, { poemSrc: '2L_0gIKD7oQ' }, { poemSrc: 'Knx2R8oiwd0' }, { poemSrc: 'ZqgmjN4-ifc' }, { poemSrc: 'onUmwWCWocM' }, { poemSrc: 'NDQwvZyMKJI' }, { poemSrc: 'qbUfVrYTLQQ' }, { poemSrc: 'n4D0jfM0VjM' }, { poemSrc: 'F1cPVJtFl-8' }, { poemSrc: '-3tIzCBb4KQ' }, { poemSrc: 'WqY_3oNceb8' }, { poemSrc: 'G5VNzQaJ4dQ' }, { poemSrc: 'EtWQUhQd9LY' }, { poemSrc: '_J6HHoF64lc' }, { poemSrc: 'b7ibwLwkRas' }, { poemSrc: 'HEOZXO-lqk4' }, { poemSrc: 'uR1RtN5m7sM' }, { poemSrc: 'z0U7TKqpqHc' }, { poemSrc: 'm2sQMBtQXc8' }, { poemSrc: 'tvlQ0DkOEp8' }, { poemSrc: 'F05CBFJo90M' }, { poemSrc: 'BcpoPWXXvV0' }, { poemSrc: '5zqd6s-UNwE' }, { poemSrc: 'j-KCaMNi3D8' }, { poemSrc: 'xamRNtkPxM4' }, { poemSrc: '7EZipasG_dA' }, { poemSrc: '-oE_vIzSSmo' }, { poemSrc: '0rMcQpPx2WA' }, { poemSrc: '8GaqTvPjQJA' }, { poemSrc: 'xelOGRflPjk' }, { poemSrc: 'JYBsBXREdTI' }, { poemSrc: 'thdpFgrQQ0w' }, { poemSrc: 'N3Td9bxFaY8' }, { poemSrc: 'sdEPk1JHqDs' }, { poemSrc: '8ePYTHH6f7Q' }, { poemSrc: '9GaFBTVEjQo' }, { poemSrc: 'WSPbP0eWrm0' }, { poemSrc: 'lkSr4KqDTeQ' }, { poemSrc: 'x18JR4AOQ3M' }, { poemSrc: 'hkn1FZX_7ZQ' }, { poemSrc: 'HgAOpcZb-kM' }, { poemSrc: 'I0Pm3XjSKGs' }, { poemSrc: 'AXXD-3xfhmo' }, { poemSrc: '8RD32WMSVXs' }, { poemSrc: 'qjgvLXbmIds' }, { poemSrc: '_W7vgC0lNXE' }, { poemSrc: 'gTO_DQWV3DQ' }, { poemSrc: 'c8xJWI-G6Xg' }, { poemSrc: 'pQdPKMowJ9U' }, { poemSrc: '_Wm3n0bK_rk' }, { poemSrc: 'U6-cI01OgRQ' }, { poemSrc: 'wmZOE7gNDuE' }, { poemSrc: 'uCfEmsJ2Vvo' }, { poemSrc: '0-DJp9dik00' }, { poemSrc: 'T3T00tQOa_4' }, { poemSrc: 'OsSTdSm4Ego' }, { poemSrc: '10ezxakoAB4' }, { poemSrc: 'IiVkQ7Q9rjk' }];

  let rowDiv = $("<div>").addClass("row");
  $.each(poems, function (index) {
    let colDiv = $("<div>").addClass("col-lg-4 col-md-12 mb-4 mb-lg-0 p-5");
    let imgDiv = $("<div>").attr("data-id", this.poemSrc).attr("data-ripple-color", "light").addClass("bg-image hover-overlay ripple shadow-1-strong rounded video-holder");
    let a = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#VideoModal")
    let titleSpan = $("<span>").addClass("badge badge-pill bg-info poemTitle w-100").append(this.poemTitle);
    let img = $("<img>").attr("src", "https://img.youtube.com/vi/" + this.poemSrc + "/hqdefault.jpg").addClass("w-100");
    let ytImg = $("<img>").attr("src", "assets/images/play-button.png").addClass("yt-play-image");
    if (this.poemLyrics != '' && this.poemLyrics != undefined) {
      // lyrics button
      let lyricsTitleA = $("<a>").attr("href", "#!").attr("data-bs-toggle", "modal").attr("data-bs-target", "#Lyrics" + index);
      let lyricsPopupBtnDiv = $("<div>").addClass("badge badge-pill bg-danger w-100").append("Read this poem");
      //Lyrics pop up
      let lyricsModalDiv = $("<div>").attr("id", "Lyrics" + index).attr("tabindex", "1").attr("aria-labelledby", "Lyrics" + index + "Label").attr("aria-hidden", "true").addClass("modal fade");
      let lyricsDialogDiv = $("<div>").addClass("modal-dialog modal-xl modal-dialog-centered");
      let lyricsModalContentDiv = $("<div>").addClass("modal-content");
      let lyricsPopUpSpan = $("<span>").attr("id", "popupTitle").addClass("badge badge-pill bg-info poemTitle")
      let lyricsContentP = $("<p>").addClass("p-3 text-center");
      let lyricsBtnDiv = $("<div>").addClass("text-center py-3");
      let lyricsBtn = $("<button>").attr("type", "button").attr("data-bs-dismiss", "modal").addClass("btn btn-secondary").append("Close");
      // combining all to the row div
      rowDiv.append(colDiv.append(imgDiv.append(a.append(titleSpan).append(img).append(ytImg)).append(lyricsTitleA.append(lyricsPopupBtnDiv))));
      rowDiv.append(lyricsModalDiv.append(lyricsDialogDiv.append(lyricsModalContentDiv.append(lyricsPopUpSpan).append(lyricsContentP.append(lyricsBtnDiv.append(lyricsBtn))))))
    }
    else {
      rowDiv.append(colDiv.append(imgDiv.append(a.append(titleSpan).append(img).append(ytImg))));
    }
  });

  let modalDiv = $("<div>").attr("id", "VideoModal").attr("tabindex", "1").attr("aria-labelledby", "VideoLabel").attr("aria-hidden", "true").addClass("modal fade");

  let dialogDiv = $("<div>").addClass("modal-dialog modal-xl modal-dialog-centered");
  let modalContentDiv = $("<div>").addClass("modal-content");
  let popUpSpan = $("<span>").attr("id", "popupTitle").addClass("badge badge-pill bg-info poemTitle")
  let iframeDiv = $("<div>").addClass("ratio ratio-16x9");
  let iframe = $("<iframe>").addClass("ratio ratio-16x9").attr("src", "#").attr("title", "YouTube video").attr("id", "VideoFrame").attr("allow", "autoplay; encrypted-media").append("allowfullscreen");

  let btnDiv = $("<div>").addClass("text-center");
  let btn = $("<button>").attr("type", "button").attr("data-bs-dismiss", "modal").addClass("btn btn-danger w-100").append("Close");

  modalDiv.append(dialogDiv.append(modalContentDiv.append(popUpSpan).append(iframeDiv.append(iframe)).append(btnDiv.append(btn))));

  rowDiv.append(modalDiv);
  // you haven't touched the DOM yet, everything thus far has been in memory
  $("#toReplacePoems").html(rowDiv); // this is the only time you touch the DOM
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