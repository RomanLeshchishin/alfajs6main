import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles/Cooker.module.css";
import "./styles/normalize.module.css";
import Logo from '../../Img/logo.svg';

function CookerAccount(){
  const getOrders = 'http://alfafood.servehttp.com:25565/orders'
  const getUser = 'http://alfafood.servehttp.com:25565/auth/user'
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  }
  const name = useState(localStorage.getItem('first_name'))
  const surname = useState(localStorage.getItem('last_name'))
  const middlename = useState(localStorage.getItem('middle_name'))
  return ( 
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Школьное питание</title>
</head>
<body>
    <header className={styles.header}>
      <ul className={styles.headerParent}>
        <li className={styles.headerLink}>
          <img className={styles.logoHeader} src={Logo} alt="логотип"/>
        </li>
        <li>
          <Link to="/cookerCreateMenu" className={styles.headerLink}>Составить меню</Link>
        </li>
        <li>
          <Link to="/cookerReport" className={styles.headerLink}>Выгрузить отчет</Link>
        </li>
        <div className={styles.headerAccount}>
        <li>
          <a className={styles.headerLink} href="#">Мой аккаунт</a>
        </li>
        <li>
          <a className={styles.headerLink} href="#">Выйти</a>
        </li>
        </div>
      </ul>
    </header>

      <section className={styles.usernameLogin}>
        <div className={styles.login}>
        <p className={[styles.text, styles.block, styles.order].join(" ")}>{surname} {name} {middlename}</p>
        </div>
      </section>

      <section className={styles.usernameLogin}>
        <div className={styles.login}>
        <div className={styles.textBlock}><p className={[styles.text, styles.block, styles.title].join(" ")}>Логин:</p></div>
        <p className={[styles.text, styles.block].join(" ")}>ERMAKOVAEVAROMANOVNA</p>
        </div>
        <div className={styles.login}>
        <div className={styles.textBlock}><p className={[styles.text, styles.block, styles.title].join(" ")}>Пароль:</p></div>
        <p className={[styles.text, styles.block].join(" ")}>***** </p>
        </div>
        <a className={[styles.text, styles.link, styles.changePassword].join(" ")} href="#">Изменить пароль</a>
      </section>

      <div className={styles.container}>
        <p className={styles.registration}>Аккаунт зарегистрирован:
            <time className={styles.datetime} datetime="2022-09-11">01.09.2022</time></p>
      </div>

      <div className={styles.container}>
        <p className={styles.error}>Сообщить об ошибке</p>
      </div>


</body>
</html>
)
}

export default CookerAccount;