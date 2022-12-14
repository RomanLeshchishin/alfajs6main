import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import "./styles.css";
import Logo from '../Img/logo.svg';

const background = require('../Img/LoginBackground.png');
const divStyle = {
  width: '100%',
  height: '100vh',
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover'
};
const Login = ({ login, isAuthenticated }) => {
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
      return <Navigate to='/account' />
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
      
          
          <link rel="stylesheet" type="text/css" href="./pages/login/styles.css" />
        </head>
        
        <body style={divStyle}>
        <div className="loginbox">
      <div>
        <img src={Logo}/>
      </div>

      <form onSubmit={e => onSubmit(e)}>
        <h1 className="textStyle bigLogin">
          Вход
        </h1>
        
        <div className="login">
          <input
            className="textStyle loginText"
            type="username"
            name="username"
            placeholder="Введите логин"
            value={username}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className="login password">
          <input
            className="textStyle loginText"
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => onChange(e)}
            required
          />
        </div>

        <div className="forgot-password">
          <a href="#">
            <p className="textStyle loginText forgotPass">
              Забыли пароль?
            </p>
          </a>
        </div>

        <button>
            <div className="login-action">
          <a href="#">
              <p className="textStyle parentText">
                Войти как родитель
              </p>
            </a>
          </div>
        </button>

        <div className="login-action employee">
          <a href="#">
            <p className="textStyle employeeText">
              Войти как сотрудник
            </p>
          </a>
        </div>

      </form>
    </div>
    </body>
</html>
    )
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
