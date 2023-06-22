import { useState, useEffect } from "react";
import "./LoginPage";
import { checkPasswordStrength, validateEmail } from "../../utils/validations";
import { useNavigate } from "react-router-dom";
import { getItemFromSession, setItemToSession } from "../../utils/utils";
import Cryptojs from 'crypto-js';

function LoginPage() {
    const navigate = useNavigate();
    const { REACT_APP_SECRETKEY } = process.env;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    })

    const [stepCount, setStepCount] = useState(null)


    useEffect(() => {
        const userCredential = getItemFromSession('userCredential');
        if (userCredential) {
            navigate('/home', { replace: true })
        }
    }, [navigate])


    const handleSubmit = (e) => {
        e.preventDefault();
        const checkEmail = validateEmailId();
        const checkPassword = validatePassword();
        if (checkEmail && checkPassword) {
            setItemToSession('userCredential', {
                email: formData.email,
                password: Cryptojs.AES.encrypt(formData.password, REACT_APP_SECRETKEY).toString()
            })
            navigate('/home', { replace: true })
        }
    }

    const validateEmailId = (email = formData.email) => {
        const errorMsg = validateEmail(email.trim())
        setErrors((errors) => ({ ...errors, email: errorMsg }));
        return errorMsg === "";
    }

    const validatePassword = (password = formData.password) => {
        const [count, errorMsg] = checkPasswordStrength(password.trim())
        setErrors((errors) => ({ ...errors, password: errorMsg }));
        setStepCount(count)
        return errorMsg === "";
    }

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'email') validateEmailId(value);
        if (name === 'password') validatePassword(value);
        setFormData((val) => ({ ...val, [name]: value.trim() }))
    }

    const renderLoginRight = () => {
        return <div className='' style={{ width: '400px' }}>
            <div className="text-center mb-5">
                <img className="w-50" src="https://www.ippopay.in/img/logo_ippopay.svg" alt="Ippo Pay" />
            </div>
            <h3>Login</h3>
            <h5>Enter your details below</h5>
            <form className="mt-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputEmail">Email address</label>
                    <input name="email" id="inputEmail" className="form-control" onChange={handleInput} />
                    <small className="text-danger">{errors.email}</small>
                </div>
                <div className="mb-3">
                    <label className="form-label d-flex justify-content-between" htmlFor="inputPassword">
                        <span>Password</span>
                        <a href="/">Forgot Password?</a>
                    </label>
                    <input name="password" type="password" id="inputPassword" className="form-control" onChange={handleInput} />
                    <div className="w-100 d-flex  justify-content-between">
                        <small className="text-danger">{errors.password}</small>
                        {(formData.password.length > 0) && <small className={`${stepCount > 0 ? "text-danger" : "text-success"}`}>{stepCount > 0 ? 'Weak' : 'Strong'}</small>}
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn border rounded-pill btn-primary">Sign in</button>
                </div>
            </form>
        </div>
    }

    return <div className="d-flex justify-content-center align-items-center h-100">
        {renderLoginRight()}
    </div>
}
export default LoginPage;