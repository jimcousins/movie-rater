
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


async function handleSignupClick() {
    clearAllErrors();

    const firstName        = document.getElementById('firstName').value.trim();
    const lastName         = document.getElementById('lastName').value.trim();
    const email            = document.getElementById('email').value.trim();
    const password         = document.getElementById('password').value;
    const securityQuestion = document.getElementById('secQuestion').value;
    const securityAnswer   = document.getElementById('secAnswer').value.trim();

    let formIsValid = true;

    if (!firstName)                      { showError('err-first'); formIsValid = false; }
    if (!lastName)                       { showError('err-last');  formIsValid = false; }
    if (!email || !isValidEmail(email))  { showError('err-email', 'Enter a valid email address'); formIsValid = false; }
    if (password.length < 8)            { showError('err-pass',  'At least 8 characters required'); formIsValid = false; }
    if (!securityQuestion)              { showError('err-q',     'Please select a question'); formIsValid = false; }
    if (!securityAnswer)                { showError('err-ans');   formIsValid = false; }

    if (!formIsValid) return;

    try {
        const response = await fetch('http://localhost:3000/signup', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ firstName, lastName, email, password, securityQuestion, securityAnswer })
        });

        const result = await response.json();

        if (!response.ok) {
            showError('err-email', result.error);
            return;
        }

        // Show success banner and redirect to login
        document.getElementById('successBanner').classList.add('show');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);

    } catch (err) {
        showError('err-email', 'Could not connect to server');
    }
}


document.getElementById('signupBtn').addEventListener('click', handleSignupClick);

document.getElementById('password').addEventListener('input', function () {
    updatePasswordStrength(this.value);
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleSignupClick();
});