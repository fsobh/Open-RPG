import {useEffect} from 'react'

// import All Of Data
import Logo from './logo.png';
import MenuInfo from '../../data/data-layout/Header/data-MenuInfo.json';



import {Addshrink , moveSmooth} from "../../utils/"

import './header.css'

import Preloader from '../../components/Preloader'

import SecHeader from './SecHeader'


const Header = ({Title}) => {

  useEffect(() => {
      Addshrink()
  },[])

  useEffect(() => {
      moveSmooth()
  },[])

  return (
    <>
      <Preloader Title={Title} />
      <SecHeader Logo={Logo}  MenuInfo={MenuInfo} />

    </>
  );
}

export default Header;