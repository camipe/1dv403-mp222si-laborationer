function Message(message, date) {

  // Get/Set text
  this.getText = function(){
    return message;
  }
  this.setText = function(_text) {
    message = _text;
  }

  // Get/Set date
  this.getDate = function(){
    return date;
  }
  this.setDate = function(_date){
    date = _date;
  }
}

Message.prototype.toString = function() {
  return this.getText() + " (" + this.getDate() + ")";
}

Message.prototype.getHTMLText = function() {
  return this.getText().replace(/\n/g, "<br>")
};
