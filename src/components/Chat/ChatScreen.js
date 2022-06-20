import BaseDocument from "./BaseDocument";

class ChatScreen extends BaseDocument {
  get fetchmensajes() {
    return this.data.mensajes;
  }

  static async add(content) {
    await this.set({
      content,
      state: "active",
    });
  }

  // le pasamos el mismo id que la sala? o hacemos usaa referencia en la room?
  static async create(id) {
    const chat = new ChatScreen(`chat/${id}`);
    await chat.init();

    await chat.set({
      mensajes: [
        {
          content: "Escribe algo",
          state: "active",
        },
      ],
    });
    return chat;
  }
}

export default ChatScreen;