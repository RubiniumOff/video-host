import { React, useState } from 'react';
import './Header.css';
import logo from './logo.png'
import searchIcon from '../../images/icons/search.png';


const Header = ({avatar, openAuth, openMenu}) => {

    const [search, setSearch] = useState('');

    return (
        <header>
            <div className="logotype">
                <img src={logo} alt="Логотип видео хостинга" />
                <h1 className="company-name">Infinite</h1>
            </div>
            <div className="search">
                <form>
                    <input 
                        type="text" 
                        placeholder="Я хочу найти..."
                        onChange={(e) => {setSearch(e.target.value)}}
                        value={search}
                    />
                    <div className="search-button">
                        <img src={searchIcon} alt="Иконка поиска" />
                    </div>
                </form>
            </div>
            <div className="profile">
                {localStorage.getItem('token') ?
                    <img src={'http://localhost:5000/avatars/' + avatar} alt="Аватар пользователя" onClick={openMenu} />
                    :
                    <button onClick={openAuth}>Войти</button>
                }
            </div>
        </header>
    );
}

export default Header;
