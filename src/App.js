import React from 'react';
import { Routes, Route } from "react-router-dom";

import Khleang_display from "./khleang_display";
import Khleang_note from './Khleang_note';
import Note_detail from './route/componant/Note_detail';
import Khleang_upload from './Khleang_upload';
import Box from './route/login/Box';

import PrivateRoutes from './PrivateRoutes';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Khleang_display />}></Route>
        <Route path='/Khleang_note' element={<Khleang_note />}></Route>
        <Route path='/Khleang_note_detail/:id' element={<Note_detail/>}></Route>
        <Route path='/Khleang_upload' element={<Khleang_upload />}></Route> 
        */}

        <Route path='/Khleang_login/*' element={<Box />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Khleang_display />} exact />
          <Route path='/Khleang_note' element={<Khleang_note />}></Route>
          <Route path='/Khleang_note_detail/:id' element={<Note_detail />}></Route>
          <Route path='/Khleang_upload' element={<Khleang_upload />}></Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
