import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import validationUtility from "../../app/utility/validationUtility.js";


const SignupForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    if (validationUtility.isEmpty(formData.username)) {
      toast.error("Name Required !")
    }
    else if (validationUtility.isEmpty(formData.password)) {
      toast.error("Password Required !")
    }
    else {
      try {
        setLoading(true)
        await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        navigate("/login");
      } catch (error) {
        alert('Error submitting form');
        setLoading(false)
      }
    }
  };


  return (
    <div className="container p-20 ">
      <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
          <input type="text" placeholder="Username" className="form-control" name="username" value={formData.username} onChange={handleChange} />
          <input type='password' placeholder="Password" className="mt-3 form-text" name="password" value={formData.password} onChange={handleChange} />
          <button disabled={loading} onClick={handleSubmit} className="btn-primary w-full my-2">
            {loading ? (<span>Creating user..</span>) : (<span>Signup</span>)}
          </button>
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-4">
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
