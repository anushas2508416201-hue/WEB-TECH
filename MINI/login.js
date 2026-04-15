// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    
    if (form) {
        form.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    clearErrors();
    hideErrorAlert('errorMessage');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    let hasError = false;

    // Validate Email
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        hasError = true;
    }

    // Validate Password
    if (password.length < 6) {
        showError('passwordError', 'Please enter your password');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const response = await apiCall('/FindMyScheme/php/login.php', 'POST', {
            email: email,
            password: password
        });

        if (response.success) {
            // Redirect to dashboard
            window.location.href = response.redirect;
        } else {
            showErrorAlert('errorMessage', response.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        showErrorAlert('errorMessage', 'An error occurred. Please try again.');
    }
}
