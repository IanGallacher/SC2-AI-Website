var alert_id = 0;
var messages = [];

export default class AlertLogic {
  static addMessage(message) {
    var thing = { id: alert_id,
                     message: message,
                     type: "error",
                     remove: function() {
                       AlertLogic.removeAlertWithId(thing.id);
                     }
                   }
    messages.push( thing );
    setTimeout(messages[messages.length-1].remove, 5000);
    alert_id++;
    if(this.notify)
      this.notify(messages);
  }

  static getMessages() {
    return messages;
  }

  static removeAlertWithId(id) {
    messages = messages.filter((obj) => {
      return obj.id !== id;
    });
    if(this.notify)
      this.notify(messages);
  }
}
