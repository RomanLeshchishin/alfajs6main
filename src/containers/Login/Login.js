import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login, logout } from '../../actions/auth';
import styles from './Login.module.css';
import Logo from '../Img/logo.svg';

const background = require('../Img/LoginBackground.png');
const divStyle = {
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover'
};
const Login = ({ login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });
    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
    };

    if (isAuthenticated) {
        const role = localStorage.getItem('groups')
        if (role === "Родитель"){
          return <Navigate to='/parentAccount' />
        }
        if (role === "Учитель"){
          return <Navigate to='/teacherAccount' />
        }
        if (role === "Работник столовой"){
          return <Navigate to='/cookerAccount' />
        }
    }
    return (
    <html lang="en">
        <head>
          <meta charSet="UTF-8"/>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Школьное питание</title>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />  
        </head>
      <body style={divStyle}>
      <div className={styles.loginBox}>
        <div>
          <img src={Logo}/>
        </div>

      <form className={styles.loginForm} onSubmit={e => onSubmit(e)}>
        <h1 className={[styles.textStyle, styles.bigLogin].join(" ")}>
          Вход
        </h1>
        
        <div className={styles.login}>
          <input
            className={[styles.textStyle, styles.loginText].join(" ")}
            type="username"
            name="username"
            placeholder="Введите логин"
            value={username}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className={[styles.login, styles.password].join(" ")}>
          <input
            className={[styles.textStyle, styles.loginText].join(" ")}
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className={styles.forgotPassword}>
          <a href="#">
            <p className={[styles.textStyle, styles.loginText, styles.forgotPass].join(" ")}>
              Забыли пароль?
            </p>
          </a>
        </div>

        <button className={styles.loginAction}>
          <a href="#">
              <p className={[styles.textStyle, styles.parentText].join(" ")}>
                Войти
              </p>
            </a>
        </button>
      </form>
    </div>
    </body>
  </html>
  )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login})(Login);
// {/* <div className="login-action employee">
//           <a href="#">
//             <p className="textStyle employeeText">
//               Войти как сотрудник
//             </p>
//           </a>
//         </div> */}