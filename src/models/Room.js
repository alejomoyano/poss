import BaseDocument from "./BaseDocument";

class Room extends BaseDocument {
  get admin() {
    return this.data.admin;
  }

  get users() {
    return this.data.users;
  }

  get maxUsers() {
    return this.data.maxUsers;
  }

  static async create(roomData) {
    const { roomname, username, maxUsers } = roomData;
    // Referencia al documento con id roomname, puede o no existir
    const roomDoc = new Room(`room/${roomname}`);
    // Prepara el documento para consumir sus datos
    await roomDoc.init();
    if (roomDoc.hasData) {
      throw new Error(`There is a room with the name ${roomname} already`);
    }
    // Crea el documento en firebase
    await roomDoc.set({
      admin: username,
      users: [username],
      maxUsers,
    });
    return roomDoc;
  }
}

export default Room;
