"use strict";

var Messageboard = {

  init: function() {
    var mess = new Message("Hejhejhej hoho", new Date());
    console.log(mess);
    console.log(mess.getText());
    console.log(mess.getDate());
    console.log(mess.toString());
    mess.setText("Ny text, ny text");
    mess.setDate(new Date("2012-11-12"));
    console.log(mess.getText());
    console.log(mess.getDate());
    console.log(mess.toString());
  }

};

window.onload = Messageboard.init;
