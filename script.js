const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');



// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}


// Check required input fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value === "") {
            showError(input, `${convertFieldName(input)} is required.`)
        } else {
            showSuccess(input)
        }

    });

}

// Check input email

function validateEmail(input) {
    const ere = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (ere.test(String(input.value).toLowerCase())) {
        showSuccess(input)
    } else {
        showError(input, 'Please enter a valid email') 
    };
}

// Check password is secure


function validatePassword(input) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;
    if (re.test(String(input.value))) {
        showSuccess(input)
    } else {
        showError(input, 'Please include one uppercase character, one lowercase character and one special character') 
    };
}

// Check input length

function checkLength(input, min, max) {
    if (input.value.length < min ) {
        showError(input, `${convertFieldName(input)} requires a minimum of ${min} characters.`) 
    } else if (input.value.length > max ) {
            showError(input, `${convertFieldName(input)} requires a maximum of ${max} characters.`) 
        }
     else {
        showSuccess(input)
    }
}

// Check password confirmation matches orginal password
function confirmEmail(p1, p2 ){ if (p1.value && p1.value !== p2.value) {
    showError(p2, "Both passwords must match.")
} else if (p1.value && p1.value === p2.value) {
    showSuccess(p2)
}
}
// Get fieldname and convert first character to uppercase
    function convertFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

// Event listners 
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password]);
    checkLength(username, 4, 10)
    checkLength(password, 6, 14)
    validateEmail(email)
    validatePassword(password)
    confirmEmail(password, password2)
});