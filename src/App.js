import React from 'react';
import { Routes, Route } from "react-router-dom";

import Khleang_display from "./khleang_display";
import Khleang_note from './Khleang_note';
import Note_detail from './route/componant/Note_detail';
import Khleang_upload from './Khleang_upload';
import Box from './route/login/Box';
import Profile from './route/componant/Profile';
import Setting from './route/componant/setting';
import Setting_profile from './route/componant/Setting_profile';

import Calendar from './Khleang_calender';
import PrivateRoutes from './PrivateRoutes';
import Feedback from './route/componant/feedback/Feedback';

import Admin_inbox from './route/componant/admin/Admin_inbox';

import Admin from './route/componant/admin/Admin';
import PrivateRoutesAdmin from './PrivateRoutesAdmin';

function App() {
  return (
    <div>
      <Routes>
        {/* <Route path='/' element={<Khleang_display />}></Route>
        <Route path='/Khleang_note' element={<Khleang_note />}></Route>
        <Route path='/Khleang_note_detail/:id' element={<Note_detail/>}></Route>
        <Route path='/Khleang_upload' element={<Khleang_upload />}></Route> 
        */}
        <Route path='/test' element={<Admin_inbox/>}></Route>
        <Route path='/Khleang_login/*' element={<Box />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<Khleang_display />} exact />
          <Route path='/Khleang_note' element={<Khleang_note />}></Route>
          <Route path='/Khleang_note_detail/:id' element={<Note_detail />}></Route>
          <Route path='/Khleang_upload' element={<Khleang_upload />}></Route>
          <Route path='/Calender' element={<Calendar />}></Route>
          <Route path='/Profile' element={<Profile />}></Route>
          <Route path='/Setting' element={<Setting />}></Route>
          <Route path='/Setting_profile' element={<Setting_profile />}></Route>
          <Route path='/feedback' element={<Feedback/>}></Route>
          <Route element={<PrivateRoutesAdmin/>}>
            <Route path='/Admin/*' element={<Admin/>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
