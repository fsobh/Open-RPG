import React from "react";
// import { motion } from "framer-motion";
// import styled from "styled-components";

// const OpenModalButton = styled(motion.button)`
//   font-size: 1.2rem;
//   padding: 20px;
//   border-radius: 50px;
//   border: none;
//   background-color: #5c3aff;
//   color: white;
// `;
import './styles.css'

export const NetworkButton1 = ({children}) => {
  return (
 
    <li className="nav-item" >
                  <a className="nav-link text-white">{children}</a>
          </li>
  );

}
export const NetworkButton2 = ({children}) => {
  return (
    <li className="nav-item" >
                  <a className="nav-link text-white">{children}</a>
          </li>
  );

}
export const NetworkButton3 = ({children}) => {
  return (
    <li className="nav-item" >
                  <a className="nav-link text-white">{children}</a>
          </li>
  );

}
export const NetworkButton4 = ({children}) => {
  return (
    <li className="nav-item" >
                  <a className="nav-link text-white">{children}</a>
          </li>
  );

}
const animatedOpenButton = ({ children, handlClick, className }) => {
  return (

    <li className="nav-item" >
                  <a className="nav-link text-white" style={{cursor: "pointer"}} onClick={handlClick}>{children}</a>
          </li>

      
   
  );
};

export default animatedOpenButton;