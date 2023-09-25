import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles/CookerCreateMenu.module.css";
import "./styles/normalize.module.css";
import Logo from '../../Img/logo.svg';
import Modal from '../../modalCooker/Modal';

function CookerCreateMenu(){
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  }
  const AddNewMealBreak = () => {
    setModalActive(true)
    setMealCategory("Завтрак")
  }
  const AddNewMealLunch = () => {
    setModalActive(true)
    setMealCategory("Обед")
  }
  const [modalActive, setModalActive] = useState(false)
  const [mealCategory, setMealCategory] = useState()
  var today = new Date()
  return ( 
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet" href="./normalize.css"/>
        <link rel="stylesheet" href="./style.css"/>
        <title>Выгрузить отчет</title>
    </head>
    <body>
        <header className={styles.header}>
          <ul className={styles.headerParent}>
            <li className={styles.headerLink}>
              <img className={styles.logoHeader} src={Logo} alt="логотип"/>
            </li>
            <li>
              <a className={[styles.headerLink, styles.activeLink].join(" ")} href="#">Составить меню</a>
            </li>
            <li>
              <Link to="/cookerReport" className={styles.headerLink}>Выгрузить отчет</Link>
            </li>
            <div className={styles.headerAccount}>
            <li>
              <Link to="/cookerAccount" className={styles.headerLink}>Мой аккаунт</Link>
            </li>
            <li>
              <a className={styles.headerLink} href="#">Выйти</a>
            </li>
            </div>
          </ul>
        </header>
          <section className={styles.constructorForSections}>
            <section className={styles.unloadingData}>
              <div className={styles.data}>
              <time className={styles.dataBlock}>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}</time>
              </div>
            </section>
            <section className={styles.unloadingData}>
              <div className={styles.meal}>
              <p className={styles.mealBlock}>Завтрак</p>
              </div>
            </section>
            <div className={styles.studentsList}>
            <div className={styles.studentsListSearch}>
                <div className={styles.studentsListSearchText}>
                    Поиск
                </div>
            </div>
            <div className={styles.btnKeeper}>
              <button class={styles.btn} onClick={() => {setModalActive(true); setMealCategory("Завтрак")}}>Добавить новое блюдо</button>
            </div>
            </div>
            <section className={styles.unloadingData}>
              <div className={styles.meal}>
              <p className={styles.mealBlock}>Обед</p>
              </div>
            </section>
            <div className={styles.studentsList}>
            <div className={styles.studentsListSearch}>
                <div className={styles.studentsListSearchText}>
                    Поиск
                </div>
            </div>
            <div className={styles.btnKeeper}>
              <button class={styles.btn} onClick={() => {setModalActive(true); setMealCategory("Обед")}}>Добавить новое блюдо</button>
            </div>
            </div>
            <section className={styles.bugReports}>
                <p className={styles.errorText}>Сообщить об ошибке</p>
            </section>
            </section>
            <Modal active={modalActive} setActive={setModalActive} mealCategory={mealCategory}></Modal>
        </body>
    </html>    
)
}

export default CookerCreateMenu;