$(document).on("click", ".readMore", function () {
  var parent = $(this).closest("p");
  parent.find(".dots, .readMore").css("display", "none");
  parent.find(".moreText, .readLess").css("display", "inline");
});

$(document).on("click", ".readLess", function () {
  var parent = $(this).closest("p");
  parent.find(".dots, .readMore").css("display", "inline");
  parent.find(".moreText, .readLess").css("display", "none");
});
