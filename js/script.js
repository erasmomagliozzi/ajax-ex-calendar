$(document).ready(function(){
  // $.ajax({
  //  url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
  //  method: "GET",
  //  success: function (data, stato) {
  //    console.log(data);
  //
  //  },
  // error: function (richiesta, stato, errori) {
  //     alert("E' avvenuto un errore. " + errore);
  //  }
  // });


  var daysInMonth = moment("2018-01", "YYYY-MM").daysInMonth();
  console.log(daysInMonth);

  for (var i = 1; i <= daysInMonth; i++){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = { day: i };
    var html = template(context);
    $(".mese").append(html);
  }





});
