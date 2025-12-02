const AbstractHandler = require('./AbstractHandler');
const Constants = require('../../../../util/Constants');
class RelationshipAddHandler extends AbstractHandler {
  handle(packet) {
    const client = this.packetManager.client;
    const data = packet.d;
    if (data.type === 1) { // Si tu viens d'ajouter en ami l'uilisateur
      client.fetchUser(data.id).then(user => {
        client.user.friends.set(user.id, user);
      });
    } else if (data.type === 2) { // Si tu viens de bloquer l'utilisateur
      client.fetchUser(data.id).then(user => {
        client.user.blocked.set(user.id, user);
      });
    } else if (data.type === 3) { // Si l'utilisateur t'envois une demande d'ami
      client.fetchUser(data.id).then(user => {
        client.user.pending.set(user.id, user);
      });
    } else if (data.type === 4) { // Si tu envois une demande d'ami
      client.fetchUser(data.id).then(user => {
        client.user.outgoing.set(user.id, user);
      });
    }
    client.emit(Constants.Events.RELATIONSHIP_ADD, data.id, Constants.RelationshipTypes[data.type]);
  }
}

module.exports = RelationshipAddHandler;
