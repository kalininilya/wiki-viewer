document.getElementById("input")
  .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      document.getElementById("search").click();
    }
  });


$("#search").click(function() {
  console.log(1);
  let queryValue = $("#input").val();
  updateResults(queryValue);
});


function updateResults(queryValue) {
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
      format: "json",
      action: "query",
      list: "search",
      srsearch: queryValue,
      prop: "info",
      section: 0,
    },
    dataType: 'jsonp',
    headers: {
      'Api-User-Agent': 'MyCoolTool/1.1 (http://example.com/MyCoolTool/; MyCoolTool@example.com) BasedOnSuperLib/1.4'
    },
    success: function(data) {
      showResults(data);
    }
  });
}

function showResults(data) {
  $(".results").empty();
  data.query.search.forEach(function(item, i, arr) {
    var resultsItem = $("<a href='https://en.wikipedia.org/wiki/" + item.title + "' target='_blank'></div>");
    resultsItem.addClass("results__item");
    var resultHeader = $("<h2></h2>")
      .html(item.title)
      .addClass("results__header");
    var resultContent = $("<p></p>")
      .html(item.snippet)
      .addClass("results__descr");
    resultsItem = $(resultsItem).append(resultHeader, resultContent);
    $(".results").append(resultsItem);

  });
  $("#input").val("");
}
