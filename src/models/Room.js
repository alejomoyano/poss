import BaseDocument from "./BaseDocument";

class Room extends BaseDocument {
    get admin() {
        return this.data.admin;
    }

    get users() {
        return this.data.users;
    }

    get maxUsers() {
        return this.data.maxUsers
    }

    get name() {
        // The room name is the document id
        return this.id;
    }

    async join(username) {
        const { users, maxUsers } = this;
        if (users.length == maxUsers) {
            throw new Error('There is no space left in this room');
        }
        if (users.includes(username)) {
            throw new Error(`There is a user with username ${username} in this room already`);
        }
        users.push(username);
        await this.updateFields({
            users,
        })
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
};

export default Room;
