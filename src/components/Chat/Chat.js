import BreakChat from "./BreakChat";
import StudyChat from "./StudyChat"
import { useSelector } from "react-redux";

export default function Chat() {
    const {timerState} = useSelector((state)=>state.chat)

    return timerState == "break" ? (
        <BreakChat/>
      ) : (
       
       <StudyChat />
      )
} 

