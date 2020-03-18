const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// hold state variables for submit button
let usernameOk = 0;
let emailOk = 0;
let passwordOk = 0;
let password2Ok = 0


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
        emailOk = 1;
        showSuccess(input)
    } else {
        emailOk = 0;
        showError(input, 'Please enter a valid email') 
    };
}

// Check password is secure


function validatePassword(input) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,14}$)/;
    if (re.test(String(input.value))) {
       passwordOk = 1
        showSuccess(input)
    } else {
        passwordOk = 0
        showError(input, 'Must include a number, one uppercase, one lowercase and one special character. Length must be 6-14 characters.') 
    };
}

// Check input length

function checkLengthUser(input, min, max) {
    if (input.value.length < min ) {
        usernameOk = 0
        showError(input, `${convertFieldName(input)} requires a minimum of ${min} characters.`) 
    } else if (input.value.length > max ) {
        usernameOk = 0
            showError(input, `${convertFieldName(input)} requires a maximum of ${max} characters.`) 
        }
     else {
         usernameOk = 1
        showSuccess(input)
    }
}



// Check password confirmation matches orginal password
function confirmPassword(p1, p2 ){ if (p1.value && p1.value !== p2.value) {
    password2Ok = 0;
    showError(p2, "Both passwords must match.")
} else if (p1.value && p1.value === p2.value) {
    password2Ok = 1;
    showSuccess(p2)
}
}
// Get fieldname and convert first character to uppercase
    function convertFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

// Event listners 


// final validation
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password]);
    checkLengthUser(username, 4, 10)
    validateEmail(email)
    validatePassword(password)
    confirmPassword(password, password2)

   if(usernameOk + emailOk + passwordOk + password2Ok === 4)  {
    document.getElementById("form-container").style.display = 'none'
       document.getElementById("success").style.display = 'block'
   }

});

// run validate username
username.addEventListener('focusout', function(e) {
    checkLengthUser(username, 4, 10)
}
)

// run validate email
email.addEventListener('focusout', function(e) {
    validateEmail(email)
}
)

// display password rules and password strength gauge
password.addEventListener('focusin', function(e) {
    e.preventDefault();
    // document.getElementById("message").style.display = 'none'
    document.getElementById("password-strength").style.display = 'block'

    document.getElementById("rules").style.display = 'block'
    document.getElementById("rules2").style.display = 'block'
    document.getElementById("rules3").style.display = 'block'
    document.getElementById("rules2").style.display = 'block'
    document.getElementById("rules4").style.display = 'block'
    document.getElementById("rules5").style.display = 'block'
}) 

 // hide password rules and  run validation 
password.addEventListener('focusout', function(e) {
    e.preventDefault();
    document.getElementById("password-strength").style.display = 'none'

    document.getElementById("rules").style.display = 'none'
    document.getElementById("rules2").style.display = 'none'
    document.getElementById("rules3").style.display = 'none'
    document.getElementById("rules2").style.display = 'none'
    document.getElementById("rules4").style.display = 'none'
    document.getElementById("rules5").style.display = 'none'
    
    validatePassword(password)
    // document.getElementById("message").style.display = 'block'

})

// logic to handle UI password rules to user
password.addEventListener('keyup', function(e) {
    const bar = document.getElementById("password-strength-status");   
    const width =  password.value.length/14 * 100 ;
    const lowercase = /^(?=.*[a-z])/.test(password.value) === true ? 1 : 0;
    const uppercase = /^(?=.*[A-Z])/.test(password.value) === true ? 1 : 0;
    const number  = /^(?=.*[0-9])/.test(password.value) === true ? 1 : 0;
    const special  = /^(?=.*[!@#$%^&*])/.test(password.value) === true ? 1 : 0;
    const pLengthMin = /^(?=.{6,14}$)/.test(password.value) === true ? 1 : 0;
    const pLength = /^(?=.{8,14}$)/.test(password.value) === true ? 1 : 0;
  

    if (lowercase + uppercase + number + special + pLength < 2) {
        bar.style.backgroundColor  = 'red'
   } else if (lowercase + uppercase + number + special + pLength === 2) {
       bar.style.backgroundColor  = 'orange'
   } else if (lowercase + uppercase + number + special + pLength === 3) {
       bar.style.backgroundColor  = 'yellow'
   } else if (lowercase + uppercase + number + special + pLength === 5) {
       bar.style.backgroundColor  = 'green'
   }

   if (lowercase === 1 ) {
    document.getElementById("rules").style.color = 'green'
    document.getElementById("rules").querySelector('span').innerText = '✓'
} else if (lowercase === 0 ) {
    document.getElementById("rules").style.color = 'red'
    document.getElementById("rules").querySelector('span').innerText = 'X'
}

if (uppercase === 1 ) {
    document.getElementById("rules2").style.color = 'green'
    document.getElementById("rules2").querySelector('span').innerText = '✓'
} else if (uppercase === 0 ) {
    document.getElementById("rules2").style.color = 'red'
    document.getElementById("rules2").querySelector('span').innerText = 'X'
}


if (special === 1 ) {
    document.getElementById("rules3").style.color = 'green'
    document.getElementById("rules3").querySelector('span').innerText = '✓'
} else if (special === 0 ) {
    document.getElementById("rules3").style.color = 'red'
    document.getElementById("rules3").querySelector('span').innerText = 'X'
}

if (number === 1 ) {
    document.getElementById("rules4").style.color = 'green'
    document.getElementById("rules4").querySelector('span').innerText = '✓'
} else if (number === 0 ) {
    document.getElementById("rules4").style.color = 'red'
    document.getElementById("rules4").querySelector('span').innerText = 'X'
}

if (pLengthMin === 1 ) {
    document.getElementById("rules5").style.color = 'green'
    document.getElementById("rules5").querySelector('span').innerText = '✓'
} else if (pLengthMin === 0 ) {
    document.getElementById("rules5").style.color = 'red'
    document.getElementById("rules5").querySelector('span').innerText = 'X'
}


    if (width >= 100) {
        bar.style.width = '100%';
      } else {
    bar.style.width = width + '%';

    


}
   
})

// run validate for password confirmation
password2.addEventListener('focusout', function(e) {
    confirmPassword(password, password2)
})