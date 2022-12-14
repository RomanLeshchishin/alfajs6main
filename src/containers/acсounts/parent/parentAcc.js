import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./styles.css";
import "./normalize.css";
import Logo from '../../Img/logo.svg';

function Account(){
  const name = useState(localStorage.getItem('first_name'));
  const surname = useState(localStorage.getItem('last_name'));
  const middlename = useState(localStorage.getItem('middle_name'))
  const balance = useState(localStorage.getItem('balance'))
  const getOrders = 'http://alfafood.servehttp.com:25565/orders'
  //const postOrders = 'http://alfafood.servehttp.com:25565/orders/'
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
      //body:
  }

  async function axiosPosts(){
    try{
      const response = await axios.get(getOrders, config)
      console.log(response.data)
      const orderSection = document.querySelector('aside')
      orderSection.innerHTML = response.data.map(order => getOrder(order, order.order_items.map(order => getOrderElement(order.product)).join('')))
      //const productSection = document.querySelector('section')
      //productSection.innerHTML = response.data.map(order => order.order_items.map(order => getOrderElement(order.product.grams, order.product.image, order.product.name, order.product.price))).join('')
    }
    catch(error){
      alert('error axios', error)
    }
  }
  axiosPosts()
  /*const [orders, setOrders] = useState([])
  useEffect(()=>{
    axios.get(getOrders, config).then(data => {
      setOrders(data.data)
    })},[]);*/
  //console.log(orders[0].order_items[0].product)
  //const orderImages = orders.map(order => order.order_items.map(order => order.product))
  //const orderProducts = orders.map(order => order.order_items)
  //const orderItems = orders.map(order => order.order_items)
  //const orderItems = orderItems.map(orderItem => orderItem.product)
  //console.log(orderImages[0])
  const getOrderElement = ({grams, image, name, price}) => 
    `<div class="wrapper"><div class="card"><img class="card-img" src=${image} alt=${name}/>
    <div class="card-price">${price} руб</div>
    <div class="card-title">${name}</div>
    <div class="card-gramm">${grams} гр</div>
    <div class="btn-keeper"><a href="#" class="btn">Добавить</a></div></div></div>`

  const getOrder = ({id}, productSection) =>
    `<div><div class="container order">Заказ ${id}<img src="../Img/arrow.svg" alt="" class="arrow"/></div>
    <div class="smaller-container text">Иванова Юлия Петровна <div class="gray-text">1В класс</div>
    <img src="../Img/arrow.svg" alt="" class="arrow"/></div>
    <div class="smaller-container text">Завтрак<img src="../Img/arrow.svg" alt="" class="arrow"/></div>
    <div class="list">${productSection}</div>
    <div class="container total"><p>Стоимость: </p><p className="money">105 рублей</p></div></div>`
  /*const srcOrders = useState(localStorage.getItem('orders'));
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    setOrders(srcOrders)
  })
  const order_items = orders.map(order => order.order_items)
  const images = order_items.map(order => order.product)
  const images = useState(localStorage.getItem('orders'))
  console.log(images)
  const ordersImages = orders.map(order => order.order_items.map(order => order.product.image))*/
  return ( 
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Школьное питание</title>
</head>
<body>
    <header className='header'>
      <ul className="header-parent">
        <li className="header-link">
          <img className="logo-header" src={Logo} alt="логотип"/>
        </li>
        <li>
          <Link to="/createOrder" className="header-link">Заказать питание</Link>
        </li>
        <li>
          <a className="header-link" href="#">Посмотреть заказы</a>
        </li>
        <div className="header-account"></div>
        <li>
          <a className="header-link" href="#">Мой аккаунт</a>
        </li>
        <li>
          <a className="header-link" href="#">Выйти</a>
        </li>
      </ul>
    </header>
    <div className='username-login'>
      <div className="login">
        <p className="text block order">{name} {surname} {middlename}</p>
      </div>
      <div className="login">
        <div className="textBlock"><p className='text block title'>Баланс:</p></div>
        <div className='fio-money'>{balance} рублей<a className='fio-balance' href="#">пополнить</a></div>
      </div>
    </div>
    <div className="container date">
        <time datetime="2022-10-05">05.10.2022</time>
        <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>
    <aside></aside>
    <div className="button-section">
      <button className="button-red">
        <a className="button-text">Подтвердить</a>
      </button>
      <div className="btn-keeper"></div>
      <button className="button-gray">
        <a className="button-text">Изменить</a>
      </button>
    </div>
</body>
</html>
)
}

export default Account;
//const getUser = 'http://alfafood.servehttp.com:25565/api/auth/user'
//const Account = ({isAuthenticated}) => {
/*
<div className="container order">
        Заказ 1
        <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>

    <div className="smaller-container text">
      Иванова Юлия Петровна <div className="gray-text">1В класс</div>
      <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>

    <div className="smaller-container text">
      Завтрак
      <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>
    <div className="list">
      <section></section>
    </div>
    <div className="container total">
      <p>Стоимость: </p><p className="money">105 рублей</p>
    </div>

    <div className="container order">
        Заказ 2
        <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>

    <div className="smaller-container text">
      Иванов Иван Петрович <div className="gray-text">10А класс</div>
      <img src="../Img/arrow.svg" alt="" className="arrow"/>
    </div>

    <div className="smaller-container text">
      Завтрак
      <img src="../Imgarrow.svg" alt="" className="arrow"/>
    </div>

    <div className="list">
      <div className="wrapper">
        <div className="card">
          <img className="card-img" src="../Img/rice_porrige.png" alt="Рисовая каша"/>
          <div className="card-price">
            50 руб
          </div>
          <div className="card-title">
            Каша рисовая 
          </div>
          <div className="card-gramm">
            200 гр
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="card">
          <img className="card-img" src="../Img/black_tea.png" alt="Чай черный"/>
          <div className="card-price">
            15 руб
          </div>
          <div className="card-title">
            Чай черный 
          </div>
          <div className="card-gramm">
            200 мл
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="card">
          <img className="card-img" src="../Img/cottage_cheese_casserole.png" alt="Творожная запеканка"/>
          <div className="card-price">
            40 руб
          </div>
          <div className="card-title">
            Творожная запеканка
          </div>
          <div className="card-gramm">
            70 гр
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="container total">
      <p>Стоимость: </p><p className="money">90 рублей</p>
    </div>

const [account, setAccount] = useState([])
 useEffect(()=>{
    axios.get(src, config).then(data => {
      setAccount(data.user.first_name)
    })},);
  const src = `http://alfafood.servehttp.com:25565/api/auth/user`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
      'Accept': 'application/json'
      }
  };
  <div className="list">
      <div className="wrapper">
        <div className="card">
          <img className="card-img" src='' alt="Овсянка"/>
          <div className="card-price">
            50 руб
          </div>
          <div className="card-title">
            Овсянка
          </div>
          <div className="card-gramm">
            100 гр
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="card">
          <img className="card-img" src="../Img/coffee.png" alt="Кофейный напиток"/>
          <div className="card-price">
            15 руб
          </div>
          <div className="card-title">
            Кофейный напиток
          </div>
          <div className="card-gramm">
            200 мл
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="card">
          <img className="card-img" src="../Img/cottage_cheese_casserole.png" alt="Творожная запеканка"/>
          <div className="card-price">
            40 руб
          </div>
          <div className="card-title">
            Творожная запеканка
          </div>
          <div className="card-gramm">
            70 гр
          </div>
          <div className="btn-keeper">
            <a href="#" className="btn">
              Добавить
            </a>
          </div>
        </div>
      </div>
    </div>
  */ 