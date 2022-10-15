import {React, useEffect, useState} from 'react'

import '../styles/authorization.css'

import loginIcon from '../images/icons/login.png'
import passwordIcon from '../images/icons/password.png'

import axios from 'axios'

const Authorization = ({ isVisible = true, onClose }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');
    const [isRegister, setRegister] = useState(false)

    const keydownHandler = ({ key }) => {
      switch (key) {
        case 'Escape':
          onClose();
          break;
        default:
      }
    };

    const sendForm = () => {
      axios.post('http://localhost:5000/api/auth/login', {email: login, password})
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          onClose()
        })
        .catch((err) => {
          document.querySelector('.no-valid').classList.add('visible')
        })
    }
  
    useEffect(() => {
      document.addEventListener('keydown', keydownHandler);
      return () => document.removeEventListener('keydown', keydownHandler);
    });
  
    return !isVisible ? null : (
      <div className="modal-auth" onClick={onClose}>
        <form className="modal-dialog" onClick={e => {e.stopPropagation(); e.preventDefault()}}>
          <span className="modal-auth_close" onClick={onClose}></span>
          {isRegister ?
            <h1>Регистрация</h1>
            :
            <h1>Вход</h1>
          }
          <div className="inputs">
            <label>
              <img src={loginIcon} alt="Иконка логин" />
              <input type="text" placeholder='Логин' value={login} onChange={(e) => {setLogin(e.target.value)}}/>
            </label>
            <label>
              <img src={passwordIcon} alt="Иконка пароль" />
              <input type="password" placeholder='Пароль' value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </label>
            {isRegister ? 
              <label>
                <img src={passwordIcon} alt="Иконка повторите пароль" />
                <input type="password" placeholder="Повторите пароль" value={repPassword} onChange={(e) => {setRepPassword(e.target.value)}}/>
              </label>
              :
              null
            }
            <p className="no-valid">Не правильный логин или пароль</p>
            <button onClick={sendForm}>{isRegister ? 'Зарегистрироватья' : 'Войти'}</button>
          </div>
          {isRegister ?
          <p className="register">У вас уже есть аккаунт? Вы можете <a href="#" onClick={() => setRegister(false)}>войти</a> в него</p>
          :
          <p className="register">Если у вас нет аккаунта, вы можете <a href="#" onClick={() => setRegister(true)}>зарегистрироваться</a></p>
          }
          
        </form>
      </div>
    );
  };

export default Authorization