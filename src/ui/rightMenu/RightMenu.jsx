import React, { } from 'react';
import './right-menu.css'

const RightMenu = ({isOpen, onOpen, onClose, userData}) => {

    return (
        <div className={`right-menu ${isOpen ? 'open' : null}`}>
            <h3>Привет, {userData.nickname}</h3>
            <div className="variants">
                <p>Аккаунт</p>
                <p>Канал</p>
                <p>Плейлисты</p>
                <p>Друзья</p>
            </div>
        </div>
    );
}

export default RightMenu;
