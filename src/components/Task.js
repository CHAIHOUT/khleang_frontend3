import React, { useContext } from 'react'
import { CalendarContext } from '../context/CalendarContext';

function Task({task, style}) {

    const {setTask} = useContext(CalendarContext);

    return (
        <div>
            <p style={style} onClick={()=> {setTask(task)}}>{task.name}</p>
        </div>
        // <p style={style} onClick={()=> {setTask(task)}}>{task.name}</p>
    )
}

export default Task
