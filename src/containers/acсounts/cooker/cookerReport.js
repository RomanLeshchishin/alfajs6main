import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles/CookerReport.module.css";
import "./styles/normalize.module.css";
import Logo from '../../Img/logo.svg';

function CookerReport(){
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  }
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
              <Link to="/cookerCreateMenu" className={styles.headerLink}>Составить меню</Link>
            </li>
            <li>
              <a className={[styles.headerLink, styles.activeLink].join(" ")} href="">Выгрузить отчет</a>
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
    
            <section className={styles.unloadingTitle}>
    
                <h1 className={styles.textBlockHeader}>Выгрузить отчет</h1>
    
            </section>
    
            <section className={styles.unloadingData}>
              <div className={styles.data}>
              <time className={styles.dataBlock}>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}</time>
              </div>
            </section>
            <section className={styles.tableSection}>
              <div className={[styles.table, styles.container].join(" ")}>
              <div className={styles.textBlock}><p>Данные для столовой</p></div>
                <table> </table>
                <button className={styles.dataTableDownload}>Скачать данные</button>
              </div>
            </section>
            <section className={styles.bugReports}>
                <p className={styles.errorText}>Сообщить об ошибке</p>
            </section>
            </section>
        </body>
    </html>    
)
}

export default CookerReport;