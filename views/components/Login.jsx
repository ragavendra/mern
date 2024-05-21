import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validationUtility from "../../app/utility/validationUtility.js";
import Cookies from 'js-cookie';

const LoginForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  // check if token cookie exists?
  const [loggedIn, setLoggedIn] = useState(Cookies.get("user_token") === undefined ? false : true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogout = () => {
    fetch('/api/logout', { headers: { 'Content-Type': 'application/json' } }).then((resp) => {
      if (resp.status === 200) {

        Cookies.remove("user_token");

        setLoggedIn(false);

        navigate("/list")
      }
      else {
        alert("Invalid credentials");
      }
    })
  }

  const handleSubmit = async () => {
    if (validationUtility.isEmpty(formData.username)) {
      toast.error("Username required!")
    }
    else if (validationUtility.isEmpty(formData.password)) {
      toast.error("Password required!")
    }
    else {
      try {
        setLoading(true)
        fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }).then((resp) => {
          if(resp.status === 200) {

            resp.json().then((jso) => {
              console.log("Token is " + JSON.stringify(jso));

              // set for 1 day for the whole site
              Cookies.set("user_token", jso?.token, { expires: 1, path: "/" });
              // setToken(jso.token);

              navigate("/");

              setLoggedIn(true);
            })

            // navigate("/")
          }
          else {
            alert("Invalid credentials");
          }
      });
      } catch (error) {
        alert('Error submitting form');
        setLoading(false)
      }
    }
  };


  // need to add line to show user is logged in if logged in, else the link to login or the form itself.
  return (
    <div className="container p-20 ">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
        </div>
        {loggedIn ? (<> User {formData.username} is logged in. Click <button disabled={!loggedIn} onClick={handleLogout} className="btn-primary w-auto my-2 mx-2">here</button> to logout. </> ) : (
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <input type="text" placeholder="Username" className="form-control" name="username" value={formData.username} onChange={handleChange} />
          <input type='password' placeholder="Password" className="mt-3 form-text" name="password" value={formData.password} onChange={handleChange} />
          <button disabled={loading} onClick={handleSubmit} className="btn-primary w-auto my-2 mx-2">
            {loading ? (<span>Logging..</span>) : (<span>Login</span>)}
          </button>
          <button onClick={() => { navigate("/signup") }} className='btn-primary w-auto my-2 mx-2'>Signup</button>
        </div>) }
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
