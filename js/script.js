// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista

$(document).ready(function(){
  var thisMonth = 0;
  var year = 2018;
  var baseMonth = moment(
   {
     year: year,
     month: thisMonth
   }
 );

  daysMonth(baseMonth);
  daysHolidays(baseMonth);

  $('#next').click(function(){
    var thisMonth = $('h3').attr('data-month');
    var date = moment(thisMonth).add(1, 'months');
     console.log(date);

    daysMonth(date);
    daysHolidays(date);

  });
  $('#prev').click(function(){
    var thisMonth = $('h3').attr('data-month');
    var date = moment(thisMonth).subtract(1, 'months');
     console.log(date);


     daysMonth(date);
     daysHoliday(date);
  });

// -----FUNZIONI
// FUNZIONE CHE STAMPA I GIORNI DEL MESE
function daysMonth(mese){
  $('.days').html('');
  //inseriamo h1 dinamicamente
 $('h3').text(mese.format('MMMM YYYY'));
 $('h3').attr('data-month', mese.format('YYYY-MM'));

  var daysInMonth = mese.daysInMonth();

  for (var i = 1; i <= daysInMonth; i++){
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    var context = {
      day: i,
      month : mese.format('MMMM'),
      dateCompleta: mese.format('YYYY-MM') + '-' + addZero(i)
    };
    var html = template(context);
    $(".days").append(html);
  }
}
// FUNZIONE CHE AGGIUNGE GLI ZERI AI NUMERI MINORE DI 10
function addZero(num) {
  if(num < 10) {
    return '0' + num;
  }
  return num;
}

// FUNZIONE CHE PRENDE I GIORI FESTIVI DALL/API, E LI COLORA DI ROSSO SUL CALENDARIO
function daysHolidays(mese){
  $.ajax({
   url: "https://flynn.boolean.careers/exercises/api/holidays",
   method: "GET",
   data: {
       year: mese.year(),
       month: mese.month()
     },
   success: function (data, stato) {
     var holidays = data.response;

     for (var i = 0; i < holidays.length; i++) {
       var dayHolidays = holidays[i];
       console.log(dayHolidays);
       var holidayData = dayHolidays.date;
       console.log(holidayData);

      $(".day").each(function () {
        if ($(this).attr("data-date") == holidayData) {
          $(this).addClass("red");
          $(this).find('.festivita').append(dayHolidays.name);
        }
      });
    }
   },
  error: function (richiesta, stato, errori) {
      alert("E' avvenuto un errore. " + errore);
   }
  });
}





});
