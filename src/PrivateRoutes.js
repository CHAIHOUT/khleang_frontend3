import { Outlet , Navigate } from "react-router-dom";

import React, { useEffect, useState } from 'react';

export default function PrivateRoutes() {
  return (
    JSON.parse(localStorage.getItem("auth")) ? <Outlet/> : <Navigate to={"/khleang_login"} />
  )
}
