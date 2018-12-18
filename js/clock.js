$('#clock');
var getClock;

function update() {
  $('#clock').html(moment().format('D MMMM YYYY (dddd) HH:mm:ss'));
  getClock = moment().format('DD/MM/YYYY hh:mm A');
  theDate = moment().format('YYYY-MM-DD'); //javascript compatible for Date() function!
  isAMPM = moment().format('A');
}

setInterval(update, 1000);