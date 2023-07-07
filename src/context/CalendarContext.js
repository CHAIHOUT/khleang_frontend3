import axios from "axios";
import {createGlobalState} from 'react-hooks-global-state';
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const SET_DATE = "SET_DATE";
const SET_TASK = "SET_TASK";
const SAVE_TASK = "SAVE_TASK";
const DELETE_TASK = "DELETE_TASK";

const getDatabase =()=> {
  fun_getDataBase();
  let db = localStorage.getItem("$calendar_db");  // 1
  console.log(db)
  if(!db) {
      db = [];
      setDatabase(db);   // 1
  } else {
    db = JSON.parse(db);    
    db.map(task=> task.date = new Date(task.date)); 
  }
  console.log(db)
  return db;

}

const setDatabase = (db)=> {

  localStorage.setItem("$calendar_db", JSON.stringify(db));  //1
  
  db.map((item)=>{
    const Token = JSON.parse(localStorage.getItem("auth"));
    const date = item.date;
    const name = item.name;
    const color = item.color;
    const id2 = item.id2;
    const data = {date,name,color,id2};
    axios.post('http://127.0.0.1:8000/api/calender',data,{
        headers:{
            "Authorization" : "Bearer "+Token.token,
        }
    })
  })

  console.log(db)
}

const fun_getDataBase=()=>{
  const Token = JSON.parse(localStorage.getItem("auth"));
  let tempdata = [];
  axios.get('http://127.0.0.1:8000/api/calender',{
    headers:{
        "Authorization" : "Bearer "+Token.token,
    }
  }).then((Data)=>{
    tempdata = Data.data;
    console.log(tempdata)
    localStorage.setItem("$calendar_db", JSON.stringify(tempdata));
  })
}

const fun_setDelete=(db)=>{
    localStorage.setItem("$calendar_db", JSON.stringify(db));
}

const fun_delete=(id)=>{
  const Token = JSON.parse(localStorage.getItem("auth"));
  axios.delete('http://127.0.0.1:8000/api/calender/'+id,{
    headers:{
        "Authorization" : "Bearer "+Token.token,
    }
  })
}

export const CalendarContext = createContext();

export const sameDay = (a, b) => {
  return a.getDate()     === b.getDate()
      && a.getMonth()    === b.getMonth()
      && a.getFullYear() === b.getFullYear();
}

function CalendarState(props) {
  
  const initialState = {
    date: new Date(),
    days: [],
    task: null
  }

  const reload=()=>{
    window.location.reload();
  }

  // Dispatch 
  const [state, dispatch] = useReducer((state, action) => {

    switch (action.type) {
      case SET_DATE: // Set current date
        const date = action.payload;

        // Calendar Start Day
        const d1 = new Date(date.getFullYear(), date.getMonth()    , 1);
        d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));
        // Calendart End Day
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if(d2.getDay() !== 0) d2.setDate(d2.getDate() + (7 - d2.getDay()));
        
        let db = getDatabase();  //asyn

        // let db = getDatabase();
        console.log(db)
        // if(db == null){   //add
        //   db = [];
        // }

        const days = [];
        do { // Obtain tasks
          d1.setDate(d1.getDate() + 1); // iterate            
          days.push({
            date: new Date(d1.getTime()),
            tasks: db.filter((task)=> sameDay(d1, task.date))
          });
        } while(!sameDay(d1, d2));
          
        console.log(date)
        return { // Update state
          ...state,
          date: date,
          days: days
        }

      case SET_TASK: 
        return {
          ...state,
          task: action.payload
        }
      case SAVE_TASK: {
        // let db = getDatabase();  // 1
        // if(db == null){   //add
        //   db = [];
        // }
        let db = [];

        const task = action.payload;
        console.log(task)
        if(!task.id2) { // new Task
          task.id2 = uuidv4();
          db.push(task);       // where is put data in db and setdata
        } else {
          db = db.map(t=> {
            return t.id2 === task.id2 ? task : t;
          })
        }
        console.log(db)
        setDatabase(db);  // 1 2
        setTimeout(() => {
          reload();
        }, 1000);

        return {
          ...state
        }
      }
      case DELETE_TASK : {
        let db = getDatabase();   // 1
        db = db.filter((task)=> {
          fun_delete(action.payload);
          return task.id2 !== action.payload;
        });
        // setDatabase(db);   // 1 2
        fun_setDelete(db);
        return {
          ...state,
        }
      }
      default:
        break;
    }
  }, initialState);

  // CRUD
  const setDate = (date)=> {
    dispatch({
      type: SET_DATE,
      payload: date
    });
  }

  const setTask = (task)=> {
    dispatch({
      type: SET_TASK,
      payload: task
    });
  }

  const saveTask = (task)=> {
    dispatch({
      type: SAVE_TASK,
      payload: task
    })
  }

  const deleteTask = (taskId)=> {
    dispatch({
      type: DELETE_TASK,
      payload: taskId
    })
  }
  
  return (
    <CalendarContext.Provider
      value={{

        date: state.date,
        days: state.days,
        task: state.task,

        setDate,
        setTask,
        saveTask,
        deleteTask
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
}

export default CalendarState;