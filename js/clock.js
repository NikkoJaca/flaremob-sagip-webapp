$('#clock');

function update() {
  $('#clock').html(moment().format('D MMMM YYYY (dddd) HH:mm:ss'));
}

setInterval(update, 1000);