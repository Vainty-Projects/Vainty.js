const AbstractHandler = require('./AbstractHandler');
const Constants = require('../../../../util/Constants');

class RelationshipRemoveHandler extends AbstractHandler {
  handle(packet) {
    const client = this.packetManager.client;
    const data = packet.d;

    if (data.type === 1) { // Suppression d'un ami
      if (client.user.friends.has(data.id)) {
        if (client.presences.has(data.id)) {
          client.presences.delete(data.id);
        }
        client.user.friends.delete(data.id);
      }
    } else if (data.type === 2) { // Déblocage
      if (client.user.blocked.has(data.id)) {
        client.user.blocked.delete(data.id);
      }
    } else if (data.type === 3) { // Demande entrante annulée
      if (client.user.pending.has(data.id)) {
        client.user.pending.delete(data.id);
      }
    } else if (data.type === 4) { // Demande sortante annulée
      if (client.user.outgoing.has(data.id)) {
        client.user.outgoing.delete(data.id);
      }
    }

    client.emit(Constants.Events.RELATIONSHIP_REMOVE, data.id, Constants.RelationshipTypes[data.type]);
  }
}

module.exports = RelationshipRemoveHandler;
