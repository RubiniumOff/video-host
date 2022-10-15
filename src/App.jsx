import { useEffect, useState } from "react";
import Header from "./ui/header/Header";
import axios from 'axios'
import './styles/main.css'
import Authorization from "./components/Authorization";
import RightMenu from "./ui/rightMenu/RightMenu";

function App() {

const [userData, setUserData] = useState({})
const [isAuth, setAuth] = useState(false)
const [isMenuOpen, setMenuOpen] = useState(false)


useEffect(() => {
    async function checkUserToken() {
        if (localStorage.getItem('token')) {
            axios.defaults.headers.post['Authorization'] = `Bearer ${localStorage.getItem('token')}`
            await axios.post('http://localhost:5000/api/auth/check')
                .then((res) => {
                    setUserData(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }
    checkUserToken()
}, []);

return (
    <div>
        <Authorization isVisible={isAuth} onClose={() => {setAuth(false)}} />
        <Header 
            avatar={userData.avatar} 
            openAuth={() => {setAuth(true)}} 
            isMenuOpen={isMenuOpen}
            closeMenu={() => setMenuOpen(false)}
            openMenu={() => setMenuOpen(true)}
        />
        <RightMenu userData={userData} isOpen={isMenuOpen} onOpen={() => setMenuOpen(true)} onClose={(e) => setMenuOpen(false)} />
    </div>
);
}

export default App;
