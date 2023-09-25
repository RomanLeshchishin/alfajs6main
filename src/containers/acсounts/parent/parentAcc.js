import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./styles/Parent.module.css";
import "./styles/normalize.css";
import Logo from '../../Img/logo.svg';
import * as utility from './utility';

function ParentAccount(){
  const getOrders = 'http://alfafood.servehttp.com:25565/orders'
  const getUser = 'http://alfafood.servehttp.com:25565/auth/user'
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  }
  var today = new Date()
  const name = useState(localStorage.getItem('first_name'))
  const surname = useState(localStorage.getItem('last_name'))
  const middlename = useState(localStorage.getItem('middle_name'))
  const [balance, setBalance] = useState()
  const navigate = useNavigate()
  async function axiosGet() {
    try {
      const responceInf = await axios.get(getUser, config)
      setBalance(responceInf.data.balance)
    } catch (error) {
      alert('error axios', error)
    }
  }

  const clickLogout = () => {
    localStorage.clear()
    navigate('/')
  }
  async function axiosPosts(){
    try{
      const response = await axios.get(getOrders, config)
      const orderSection = document.querySelector('aside')
      const orders = response.data.map(order => order)
      const htmlOrders = orders.map(order => getOrderCost(order, order.order_items.map(order_item => order_item.product)))
      orderSection.innerHTML = htmlOrders.join('')
    }
    catch(error){
      alert('error axios', error)
    }
  }
  axiosPosts()
  axiosGet()
  const getOrderCost = (order, products) => {
    const productsCost = products.map(product => product.price).reduce((a, b) => a + b, 0)
    const htmlOrderProduct = products.map(product => getOrderElement(product))
    const htmlOrder = getOrder(order, htmlOrderProduct.join(''), productsCost)
    return htmlOrder
  }

  const getOrderElement = ({grams, image, name, price}) => 
    `<div class=${styles.wrapper}><div class=${styles.card}><img class=${styles.cardImg} src=${image} alt=${name}/>
    <div class=${styles.cardPrice}>${price} руб</div>
    <div class=${styles.cardTitle}>${name}</div>
    <div class=${styles.cardGramm}>${grams} гр</div>
    <div class=${styles.btnKeeper}><a href="#" class=${styles.btn}>Добавить</a></div></div></div>`

  const getOrder = ({id, student_id, meal_category}, productSection, productsCost) =>
    `<div><div class=${styles.containerOrder}>Заказ ${id}<img src="../Img/arrow.svg" alt="" class=${styles.arrow}/></div>
    <div class=${styles.smallerContainerText}>${student_id.last_name}  ${student_id.first_name} ${student_id.middle_name}<div class=${styles.grayText}>${student_id.grade} класс</div>
    <img src="../Img/arrow.svg" alt="" class=${styles.arrow}/></div>
    <div class=${styles.smallerContainerText}>${meal_category}<img src="../Img/arrow.svg" alt="" class=${styles.arrow}/></div>
    <div class=${styles.list}>${productSection}</div>
    <div class=${styles.containerTotal}><p>Стоимость: </p><p className=${styles.money}>${productsCost} ${utility.declOfNum(productsCost, ['рубль', 'рубля', 'рублей'])}</p></div></div>`
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
          <Link to="/createOrder" className={styles.headerLink}>Заказать питание</Link>
        </li>
        <li>
          <Link to="/parentAccount" className={[styles.headerLink, styles.link].join(" ")}>Посмотреть заказы</Link>
        </li>
        <div className={styles.headerAccount}>
        <li>
          <a className={styles.headerLink} href="#">Мой аккаунт</a>
        </li>
        <li>
          <a className={styles.headerLink} href="" onClick={clickLogout}>Выйти</a>
        </li>
        </div>
      </ul>
    </header>
    <div className={styles.usernameLogin}>
      <div className={styles.login}>
        <p className={[styles.text, styles.block, styles.order].join(" ")}>{name} {surname} {middlename}</p>
      </div>
      <div className={styles.login}>
        <div className={styles.textBlock}><p className={[styles.text, styles.block, styles.title].join(" ")}>Баланс:</p></div>
        <div className={styles.fioMoney}>{balance} рублей<a className={styles.fioBalance} href="#">пополнить</a></div>
      </div>
    </div>
    <div className={[styles.container, styles.date].join(" ")}>
        <time>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}</time>
        <img src="../Img/arrow.svg" alt="" className={styles.arrow}/>
    </div>
    <aside>
    </aside>
    <div className={styles.buttonSection}>
      <button className={styles.buttonRed}>
        <a className={styles.buttonText}>Подтвердить</a>
      </button>
      <div className={styles.btnKeeper}></div>
      <button className={styles.buttonGray}>
        <a className={styles.buttonText}>Изменить</a>
      </button>
    </div>
</body>
</html>
)
}

export default ParentAccount;
