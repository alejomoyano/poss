import React, {Fragment} from 'react'
import { Button} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings'
import '../../App.css'

function Buttons(props) {

return(
    <div>

        {(props.status === 0) ?
            <Fragment>
                <Button onClick={props.configTimes}><SettingsIcon color="primary" fontSize="large"></SettingsIcon></Button>
            </Fragment> : "" }
            
            {(props.status === 1) ?
            <Fragment>
                <Button variant="contained" onClick={props.studyStart}>Start Study</Button>
            </Fragment> : "" }

        
        {(props.status === 2) ?             
            <Fragment>
                <Button variant="contained" onClick={props.shortBreakStart}>Start Short Break</Button>
            </Fragment> : "" }

        {(props.status === 3) ?
            <Fragment>
                <Button variant="contained" onClick={props.longBreakStart}>Start Long Break</Button>
            </Fragment> : "" }

        {(props.status === 4) ?
            <Fragment>
                <Button variant="contained" onClick={props.backToStart}>Volver al inicio</Button>
                <Button onClick={props.configTimes}><SettingsIcon color="primary" fontSize="large"></SettingsIcon></Button>
            </Fragment> : "" }

        {(props.status === 5) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stop}>Stop Study</Button>
            <Button variant="contained" onClick={props.skip}>Skip to Short Break</Button>
        </Fragment> : "" }

        {(props.status === 6 && props.subCycleCount < 4) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resume}>Resume Study</Button>
            <Button variant="contained" onClick={props.skip}>Skip to Short Break</Button>
        </Fragment> : (props.status === 6) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resume}>Resume Study</Button>
            <Button variant="contained" onClick={props.skip}>Skip to Long Break</Button>
        </Fragment> : ""}

        {(props.status === 7) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stop}>Stop Short Break</Button>
            <Button variant="contained" onClick={props.skip}>Skip to Long Break</Button>
        </Fragment> : "" }
        
        {(props.status === 8) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resume}>Resume Short Break</Button>
            <Button variant="contained" onClick={props.skip}>Skip to Long Break</Button>
        </Fragment> : "" }

        {(props.status === 9) ? 
        <Fragment>
            <Button variant="contained" onClick={props.stop}>Stop Long Break</Button>
        </Fragment> : "" }

        {(props.status === 10) ? 
        <Fragment>
            <Button variant="contained" onClick={props.resume}>Resume Long Break</Button>
        </Fragment> : "" }


    </div>
)
}
export default Buttons