// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

$(document).ready(function(){

  daysMonth();
  $.ajax({
   url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
   method: "GET",
   success: function (data, stato) {
     for (var i = 0; i < data.response.length; i++) {
       console.log(data.response[i].date);

      $(".mese li").each(function () {

        if ($(this).attr("data") == data.response[i].date) {
          $(this).addClass("red");

          var source = $("#entry-template").html();
          var template = Handlebars.compile(source);
          var context = {
            name : data.response[i].name
          }
          var html = template(context);
          $('.mese ul').append(html);
        };
      });
    }


   },
  error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
   }
  });

function daysMonth(){
  var daysInMonth = moment("2018-01", "YYYY-MM").daysInMonth();
  console.log(daysInMonth);
  var month = moment("01").format("MMMM");
  console.log(month);
  for (var i = 1; i <= daysInMonth; i++){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      day: i,
      month : month
    };
    var html = template(context);
    $(".mese").append(html);
  }
}





});
