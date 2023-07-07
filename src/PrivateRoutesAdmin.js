import { Outlet , Navigate } from "react-router-dom";

import React, { useEffect, useState } from 'react';

export default function PrivateRoutesAdmin() {
  return (
    JSON.parse(localStorage.getItem("admin")) ? <Outlet/> : <Navigate to={"/login"} />
  )
}