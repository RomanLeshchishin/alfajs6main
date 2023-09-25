import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
// import "./styles.css";
import styles from "./styles/CreateOrder.module.css";
import "./styles/normalize.module.css";
import Logo from '../../Img/logo.svg';
import { render } from '@testing-library/react';
import { Input } from 'semantic-ui-react';

function ParentOrder(){
    const name = useState(localStorage.getItem('first_name'));
    const surname = useState(localStorage.getItem('last_name'));
    const middlename = useState(localStorage.getItem('middle_name'))
    const getProducts = 'http://alfafood.servehttp.com:25565/products/'
    const getStudents = 'http://alfafood.servehttp.com:25565/students/'
    const getUser = 'http://alfafood.servehttp.com:25565/auth/user'
    const postOrders = 'http://alfafood.servehttp.com:25565/orders/'
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
        }
    }
    async function axiosGet() {
      try {
        const responceInf = await axios.get(getUser, config)
        setBalance(responceInf.data.balance)
      } catch (error) {
        alert('error axios', error)
      }
    }
    var today = new Date()
    const [products, setProducts] = useState([])
    const [students, setStudents] = useState([])
    const [balance, setBalance] = useState()
    const [orders, setOrders] = useState()
    useEffect(() => { axios.get(getProducts, config).then(response => { setProducts(response.data)})}, [])
    useEffect(() => { axios.get(getStudents, config).then(response => { setStudents(response.data)})}, [])
    console.log(students)
    const CustomSelect = ({ id, options }) => {
      return (
          <select className={styles.selector} id={id} onChange={(e) => handleChildChange(e.target.value)}>
              { options.map((option, index) =>
                  <option key={id + index} value={option.id}>{option.first_name} {option.last_name} {option.middle_name}</option>
              ) }
          </select>
      )
    }
    const createOrder = () => {
      var data = JSON.stringify({
        "order_date": addDate,
        "meal_category": addMeal,
        "order_items": addProducts.map(product => product.id),
        "student_id": addChild
      });

      var configOrder = {
        method: 'post',
        url: 'http://alfafood.servehttp.com:25565/orders/',
        headers: { 
          'Authorization': `Token ${localStorage.getItem('token')}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      axios(configOrder).then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const addProducts = []
    const addToOrder = (product) => {
      const productInf = {
        id: {"quantity": 1, "product_id": product.id},
        grams: product.grams,
        image: product.image,
        name: product.name,
        price: product.price
      }
      addProducts.push(productInf)
      const addProductSection = document.querySelector('article')
      addProductSection.innerHTML = addProducts.map(product => getOrderElement(product)).join('')
    }

    var addChild = 2
    var handleChildChange = (child) => {
    addChild = child
    console.log(addChild)
    }

    var addMeal = 1
    var handleMealChange = (category) => {
    addMeal = category
    console.log(addMeal)
    }


    var addDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    var handleDateChange = (date) => {
    addDate = date
    console.log(addDate)
    }

    const getOrderElement = ({grams, image, name, price}) => 
      `<div class=${styles.wrapper}><div class=${styles.card}><img class=${styles.cardImg} src=${image} alt=${name}/>
      <div class=${styles.cardPrice}>${price} руб</div>
      <div class=${styles.cardTitle}>${name}</div>
      <div class=${styles.cardGramm}>${grams} гр</div>
      <div class=${styles.btnKeeper}><a href="#" class=${styles.btn}>+</a></div></div></div>`
    const [add, setAdd] = useState("Добавить")
    axiosGet()
    
    return ( 
        <html lang="en">
        <head>
            <meta charset="UTF-8"/>
            <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <link rel="stylesheet" href="./normalize.css"/>
            <link rel="stylesheet" href="./style.css"/>
            <title>Школьное питание</title>
        </head>
        <body>
            <header className={styles.header}>
              <ul className={styles.headerParent}>
                <li className={styles.headerLink}>
                  <img className={styles.logoHeader} src={Logo} alt="логотип"/>
                </li>
                <li>
                  <a className={styles.headerLink} href="#">Заказать питание</a>
                </li>
                <li>
                  <Link to="/parentAccount" className={[styles.headerLink, styles.link].join(" ")}>Посмотреть заказы</Link>
                </li>
                <div className={styles.headerAccount}>
                <li>
                  <a className={[styles.headerLink, styles.linkAccount].join(" ")} href="#">Мой аккаунт</a>
                </li>
                <li>
                  <a className={[styles.headerLink, styles.linkAccount].join(" ")} href="#">Выйти</a>
                </li>
                </div>
              </ul>
            </header>
        
              <section className={styles.usernameLogin}>
                <div className={styles.login}>
                <p className={[styles.text, styles.block, styles.order].join(" ")}>{name} {surname} {middlename}</p>
                </div>
                <div className={styles.login}>
                <div className={styles.textBlock}><p className={[styles.text, styles.block, styles.title].join(" ")}>Баланс:</p></div>
                <div className={styles.fioMoney}>{balance} рублей<a className={styles.fioBalance} href="#">пополнить</a></div>
                </div>
              </section>
        
            <div className={[styles.container, styles.date].join(" ")}>
                <time datetime={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}>{today.getDate() + 1}.{today.getMonth() + 1}.{today.getFullYear()}</time>
                <img src="/img/arrow.svg" alt="" className={styles.arrow}/>
            </div>
            <button type="submit" className={styles.buttonRedProducts} id="submit">Заказ
            <CustomSelect id="children" options={students}/>
            <select className={styles.selector} onChange={(e) => handleMealChange(e.target.value)}>
              <option value={1}>Завтрак</option>
              <option value={2}>0бед</option>
            </select>
            <select className={styles.selector} onChange={(e) => handleDateChange(e.target.value)}>
              <option value={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`}>{today.getDate()}.{today.getMonth() + 1}.{today.getFullYear()}</option>
              <option value={`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate() + 1}`}>{today.getDate() + 1}.{today.getMonth() + 1}.{today.getFullYear()}</option>
            </select>
            </button>
            <article className={styles.list}>
            </article>
            <button type="submit" className={styles.buttonRedProducts} id="submit">Меню</button>
            
            <aside className={styles.list}>
            { products.map(product => (
            <div className={styles.wrapper} key={product.id}>
                 <div className={styles.card}>
                     <img className={styles.cardImg} src={product.image} alt={product.name}/>
                     <div className={styles.cardPrice}>
                         {product.price} руб
                     </div>
                     <div className={styles.cardTitle}>
                         {product.name}
                     </div>
                     <div className={styles.cardGramm}>
                         {product.grams} гр
                     </div>
                     <div className={styles.btnKeeper}>
                         <button onClick={() => addToOrder(product)} className={styles.btn}>
                             {add}
                         </button>
                     </div>
                 </div>
             </div>
             ))}
            </aside>
        
            <div className={styles.buttonSection}>
              <button className={styles.buttonRed} onClick={createOrder}>
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
  
  export default ParentOrder;