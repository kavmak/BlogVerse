import { useContext, useEffect,useState } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";
//import {UserContext} from "./UserContext";
export default function Header()
{
 const {setUserInfo,userInfo}=useContext(UserContext);
 const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(()=>{
    fetch('http://localhost:5000/profile',{
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  },[]);
  function logout() {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'GET',
    });
    


    localStorage.removeItem('token-info');
    setIsLoggedin(false);
    setUserInfo(' ');
    alert("Refresh The page");
   

  
  }

  const username = userInfo?.username;
    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link>
        <nav>
        {username && (
          <>
          <span><b>Hello {username}</b></span>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        )}
        </nav>
      </header>
    );
}