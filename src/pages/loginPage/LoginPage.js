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
    const [isPassVisible, setIsPassVisible] = useState(false)
    const passwordConditions = [
        "Must be 6-20 characters long",
        "Must contain atleast one lowercase",
        "Must contain atleast one uppercase",
        "Must contain atleast one number",
        "Must not contain 3 consecutive characters",
    ]

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

    const renderHeader = () => {
        return <>
            <div className="text-center mb-5">
                <img className="w-50" src="https://www.ippopay.in/img/logo_ippopay.svg" alt="Ippo Pay" />
            </div>
            <h3>Login</h3>
            <h5>Enter your details below</h5>
        </>
    }

    const renderForm = () => {
        return <form className="mt-3 border p-3" onSubmit={handleSubmit}>
            <div>
                <label className="form-label" htmlFor="inputEmail">Email address</label>
                <input name="email" id="inputEmail" className="form-control" onChange={handleInput} />
                <small className="text-danger">{errors.email}</small>
            </div>
            <div className="mt-3">
                <label className="form-label d-flex justify-content-between" htmlFor="inputPassword">
                    <span>Password</span>
                    <small className="btn-link">Forgot Password?</small>
                </label>
                <div className="input-group">
                    <input name="password" type={isPassVisible ? "text" : "password"} id="inputPassword" className="form-control" onChange={handleInput} />
                    <button className="btn border" type="button" id="passwordToggle" onClick={() => setIsPassVisible((val) => !val)}>
                        <i className={isPassVisible ? "bi bi-eye" : "bi bi-eye-slash"} />
                    </button>
                </div>
                <div className="w-100 d-flex  justify-content-between">
                    <small className="text-danger">{errors.password}</small>
                    {(formData.password.length > 0) && <small className={`${stepCount > 0 ? "text-danger" : "text-success"}`}>{stepCount > 0 ? 'Weak' : 'Strong'}</small>}
                </div>
            </div>
            {formData.password.length > 0 && <div style={{ fontSize: '12px' }} className="border p-1 text-muted mt-3">
                <ul className="m-0">
                    {passwordConditions.map((e, i) => {
                        return <li key={i}>{e}</li>
                    })}
                </ul>
            </div>}
            <div className="mt-3 text-center">
                <button type="submit" className="btn border rounded-pill btn-primary w-50">Sign in</button>
            </div>
        </form>
    }

    return <div className="d-flex justify-content-center pt-5 h-100">
        <div className="col-md-3 mt-3">
            {renderHeader()}
            {renderForm()}
        </div>
    </div>
}
export default LoginPage;