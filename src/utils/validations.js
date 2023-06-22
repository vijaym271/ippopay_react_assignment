
export const validateEmail = (email) => {
    let emailErr = ""
    if (email.length === 0) return "please enter email";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    emailErr = emailRegex.test(email) ? '' : "Invalid email"
    return emailErr;
}


export const checkPasswordStrength = (passwordStr) => {
    let stepCount = null;
    let passwordErr = "";
    if (passwordStr?.length === 0) return [stepCount, 'Please enter password'];
    if (passwordStr.length < 6) {
        stepCount++;
        passwordErr = "Password must conatin atleast 6 characters";
    }
    if (passwordStr.length > 20) {
        stepCount++;
        passwordErr = "Password must not exceed 20 characters";
    }
    if (!(/[a-z]/).test(passwordStr)) {
        stepCount++;
        passwordErr = "Password must conatin atleast one lowercase";
    }
    if (!(/[A-Z]/).test(passwordStr)) {
        stepCount++;
        passwordErr = "Password must conatin atleast one upperCase";
    }
    if (!(/[0-9]/).test(passwordStr)) {
        stepCount++;
        passwordErr = "Password must conatin atleast one number";
    }
    if ((/(.)\1{2}/).test(passwordStr)) {
        stepCount++;
        passwordErr = "Password can not have 3 consecutive characters";
    }
    return [stepCount, passwordErr]
}