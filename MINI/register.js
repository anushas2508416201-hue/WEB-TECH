// Registration Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    
    if (form) {
        form.addEventListener('submit', handleRegistration);
    }
});

async function handleRegistration(e) {
    e.preventDefault();
    clearErrors();
    hideErrorAlert('errorMessage');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const age = document.getElementById('age').value;
    const state = document.getElementById('state').value;

    let hasError = false;

    // Validate Name
    if (name.length < 3) {
        showError('nameError', 'Name must be at least 3 characters long');
        hasError = true;
    }

    // Validate Email
    if (!validateEmail(email)) {
        showError('emailError', 'Please enter a valid email address');
        hasError = true;
    }

    // Validate Password
    if (!validatePassword(password)) {
        showError('passwordError', 'Password must contain uppercase, lowercase, and numbers');
        hasError = true;
    }

    // Confirm Password
    if (password !== confirmPassword) {
        showError('confirmError', 'Passwords do not match');
        hasError = true;
    }

    if (hasError) {
        return;
    }

    try {
        const response = await apiCall('/FindMyScheme/php/register.php', 'POST', {
            name: name,
            email: email,
            password: password,
            age: age,
            state: state
        });

        if (response.success) {
            showSuccess('successMessage', response.message);
            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = '/FindMyScheme/login.html';
            }, 2000);
        } else {
            showErrorAlert('errorMessage', response.message);
        }
    } catch (error) {
        console.error('Registration error:', error);
        showErrorAlert('errorMessage', 'An error occurred. Please try again.');
    }
}
