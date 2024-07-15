"use client"
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface dataType {
    children:React.ReactNode;
}
const ToastProvider = ({ children }:dataType) => {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
};

export default ToastProvider;
