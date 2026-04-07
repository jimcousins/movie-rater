
const SECURITY_QUESTIONS = {
    1:    'What was the name of your first pet?',
    2: 'Where were you born?',
    3:   'What is your all-time favourite film?'
};

let currentStep   = 1; // 1 = email/password, 2 = security question
let loggedInEmail = '';
let loggedInUser  = null;



function clearAllErrors() {
    document.querySelectorAll('.error').forEach(el => el.classList.remove('show'));
}

function showError(errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (message) errorEl.textContent = message;
    errorEl.classList.add('show');
}

function isValidEmail(email) {
    const hasAtSign = email.includes('@');
    const hasDot    = email.includes('.');
    return hasAtSign && hasDot;
}



async function checkEmailAndPassword() {
    const email    = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !isValidEmail(email)) {
        showError('err-email', 'Enter a valid email address');
        return;
    }

    if (!password) {
        showError('err-pass', 'Password is required');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok) {
            showError('err-pass', result.error);
            return;
        }

        // Credentials OK — show security question
        loggedInEmail = email.toLowerCase();
        loggedInUser  = result.user;
        currentStep   = 2;

        document.getElementById('questionText').textContent     = SECURITY_QUESTIONS[loggedInUser.question];
        document.getElementById('securitySection').style.display = 'block';
        document.getElementById('loginBtn').textContent         = 'Log in';
        document.getElementById('secAnswer').focus();

    } catch (err) {
        showError('err-pass', 'Could not connect to server');
    }
}


function checkSecurityAnswer() {
    const typedAnswer = document.getElementById('secAnswer').value.trim().toLowerCase();

    if (!typedAnswer) {
        showError('err-ans', 'Please enter your answer');
        return;
    }

    if (typedAnswer !== loggedInUser.answer) {
        showError('err-ans', 'Incorrect answer — please try again');
        return;
    }

    const successBanner       = document.getElementById('successBanner');
    successBanner.textContent = `Welcome back, ${loggedInUser.firstName}! You're now logged in.`;
    successBanner.classList.add('show');

    const loginBtn    = document.getElementById('loginBtn');
    loginBtn.disabled = true;

    setTimeout(() => {
window.location.href = '../client/index.html';
}, 1500);
}



function handleLoginClick() {
    clearAllErrors();

    if (currentStep === 1) {
        checkEmailAndPassword();
    } else {
        checkSecurityAnswer();
    }
}


document.getElementById('loginBtn').addEventListener('click', handleLoginClick);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleLoginClick();
});