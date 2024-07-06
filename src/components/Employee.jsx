import React from 'react';
import { useLocation } from 'react-router-dom';
import Appbar from "../components/Appbar.jsx";

const Employee = () => {
  const location = useLocation();
  const { id } = location.state || {};

  return (
    <div>
      <Appbar id={id} />
    </div>
  );
};

export default Employee;


