import { useSelector } from "react-redux";
import { changeTimerState } from "../redux/slices/ChatSlice";

class chatObserver {
  /**
   * Metodo para avisar al observador Chat que hubo un cambio de estado en la aplicacion
   */
  update() {
    // vemos en que estado esta el timer
    const { status } = useSelector((state) => state.timer);
    if (status) {
      // si esta en study
      changeTimerState("study");
    } else {
      // si esta en cualquier break
      changeTimerState("break");
    }
  }
}

export default chatObserver;