import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import "./styles.css";
import "./normalize.css";
import Logo from '../../Img/logo.svg';

function ParentOrder(){
    const name = useState(localStorage.getItem('first_name'));
    const surname = useState(localStorage.getItem('last_name'));
    const middlename = useState(localStorage.getItem('middle_name'))
    const balance = useState(localStorage.getItem('balance'))
    const getProducts = 'http://alfafood.servehttp.com:25565/products/'
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
        }
    }
    async function getMenu(){
        try{
            const response = await axios.get(getProducts, config)
            console.log(response.data)
            const orderSection = document.querySelector('aside')
            //const renderProduct = response.data.map(order => getOrderElement(order))
            //console.log(renderProduct)
            orderSection.innerHTML = response.data.map(order => ReactDOMServer.renderToStaticMarkup(getOrderElement(order))).join('')
          }
          catch(error){
            alert('error axios', error)
          }
    }
    const [add, setAdd] = useState("Добавить")
    const [add1, setAdd1] = useState("Добавлено")
    //при нажатии кнопки "добавить" текст меняется на "добавлено", в лист "заказ" добавляется id выбранного продукта через функцию (id) => getId(id), quantity = 1 - по умолчанию
    function onClickAdd(){
        alert(123)
    }

    const getOrderElement = ({grams, image, name, price}) => {
            return(
            <div className="wrapper">
                <div className="card">
                    <img className="card-img" src={image} alt={name}/>
                    <div className="card-price">
                        {price} руб
                    </div>
                    <div className="card-title">
                        {name}
                    </div>
                    <div className="card-gramm">
                        {grams} гр
                    </div>
                    <div className="btn-keeper">
                        <button onClick={onClickAdd} className="btn">
                            Добавить
                        </button>
                    </div>
                </div>
            </div>
        )
        }
    // const getOrderElement = ({grams, image, name, price}) =>
    //     `<script>
    //      function () {
    //         //получаем идентификатор элемента
    //         var a = document.getElementById('onClickAdd');
    //         //вешаем на него событие
    //         a.onclick = function() {
    //         //производим какие-то действия
    //         if (this.innerHTML=='On') this.innerHTML = 'Off';
    //         else this.innerHTML = 'On';
    //         //предотвращаем переход по ссылке href
    //         return false;
    //         }
    //     }
    //     </script>
    //     <div class="wrapper"><div class="card"><img class="card-img" src=${image} alt=${name}/>
    //     <div class="card-price">${price} руб</div>
    //     <div class="card-title">${name}</div>
    //     <div class="card-gramm">${grams} гр</div>
    //     <div class="btn-keeper"><a id="onClickAdd" href="#" class="btn">On</a></div></div></div>`

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
            <header className="header">
              <ul className="header-parent">
                <li className="header-link">
                  <img className="logo-header" src="img/logotype.png" alt="логотип"/>
                </li>
                <li>
                  <a className="header-link" href="#">Заказать питание</a>
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
        
              <section className='username-login'>
                <div className="login">
                <p className="text block order">{name} {surname} {middlename}</p>
                </div>
                <div className="login">
                <div className="textBlock"><p className='text block title'>Баланс:</p></div>
                <div className='fio-money'>{balance} рублей<a className='fio-balance' href="#">пополнить</a></div>
                </div>
              </section>
            
            <div className="container child">
                <p className="textOrder blockOrder titleOrder">Выбрать питание для:</p>
            </div>
        
            <div className="container date">
                <time datetime="2022-10-05">05.10.2022</time>
                <img src="/img/arrow.svg" alt="" className="arrow"/>
            </div>

            <button onClick={getMenu} type="submit" className='button-red-products' id="submit">Меню</button>
            
            <aside className="list"></aside>
        
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
  
  export default ParentOrder;