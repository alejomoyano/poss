import { Document } from 'firestorter';

class BaseDocument extends Document {
  /**
   * Inicializa el documento y asegura que despues de llamar este método
   * es seguro consumir datos del documento
   * @param {object} [opts] opciones
   * @param {boolean} [opts.fetch=true] Flag que indica que se debe fetchear el documento
   */
  async init({ fetch } = { fetch: true }) {
    if (fetch) {
      await this.fetch();
    }
    await this.ready();
  }

  get exists() {
    return !!this.snapshot && this.snapshot.exists;
  }

  /**
   * Updates the fields of the doc passed as parameter.
   * If the document exists, it will just update its value.
   * If the document does not exists, it will create the document and populate
   * the corresponding fields.
   * Note: make sure to use this method with an already initialized document.
   * (meaning init method was called before). Only by doing that you can make
   * sure that the snapshot prop is actually available to be used.
   * @param {object} fields The fields to update.
   * @param {object} [opts] Additional options.
   * @param {boolean} [opts.merge=true] Whether the data being updated should be merged when using set.
   */
  updateFields = async (fields, { merge } = { merge: true }) => {
    if (this.exists) {
      await this.update({ ...fields });
    } else {
      await this.set({ ...fields }, { merge });
    }
  };
}

export default BaseDocument;
