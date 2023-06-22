import { useEffect, useState } from "react";
import { clearSession, getItemFromSession } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import './HomePage.scss';

function HomePage() {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [itemList, setItemList] = useState([{
        input: "3,9,7,3",
        output: 2
    }]);

    useEffect(() => {
        const userCredential = getItemFromSession('userCredential');
        if (userCredential === null) {
            navigate('/', { replace: true })
        }
    }, [navigate])

    const handleLogout = () => {
        clearSession();
        navigate('/', { replace: true })
    }

    const findMinAbsValue = (inputArr) => {
        let minDiff = Infinity;
        if (inputArr.length < 2) return null
        for (let i = 0; i < inputArr.length; i++) {
            for (let j = i; j < inputArr.length; j++) {
                if (inputArr[i] !== inputArr[j]) {
                    const diff = Math.abs(inputArr[i] - inputArr[j]);
                    if (diff < minDiff)
                        minDiff = diff
                    else if (diff === 1)
                        return 0;
                }
            }
        }
        return minDiff;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let nums = input.trim();
        if (nums.length > 0) {
            if (!nums.includes(',')) {
                setError('invalid format');
                return null;
            }
            setError('');
            const absValue = findMinAbsValue(nums.split(','));
            if (absValue !== null) {
                setItemList((val) => [...val, {
                    input: nums,
                    output: absValue
                }])
                setInput('');
            }
        } else {
            setError('Please enter numbers');
        }
    }

    const renderForm = () => {
        return <form className="col-md-4" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <input value={input} onChange={(e) => setInput(e.target.value)} className="form-control" placeholder="eg-1,2,3,4" />
                    <small className="text-danger">{error}</small>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-primary" type="submit">Get Min Abs</button>
                </div>
            </div>
        </form>
    }

    const renderList = () => {
        return <ul className="col-md-4">
            {itemList.map((e, i) => {
                return <li key={i}>[{e.input.split(',').toString()}] = {e.output}</li>
            })}
        </ul>
    }

    return <div className="h-100">
        <div className="navbar">
            <span className="h6">Welcome to Ippo Pay</span>
            <button className="btn btn-light" onClick={handleLogout}>Logout</button>
        </div>
        <div className="d-flex justify-content-center mt-5">
            {renderForm()}
        </div>
        <div className="d-flex justify-content-center mt-5">
            {renderList()}
        </div>
    </div>
}
export default HomePage;