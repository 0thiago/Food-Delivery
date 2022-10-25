import {
  toggleDropMenu, validateRegisterData, API_URL,
} from './helpers.js'

toggleDropMenu()

const $form = document.querySelector('#registerForm')

function validateFormRegister(){
  
  const $username = document.querySelector('#username');
  const $Name = document.querySelector('#name');
  const $email = document.querySelector('#email');
  const $password = document.querySelector('#password');
  const $confirmPassword = document.querySelector('#confirmPassword');
  const $registerButton = document.querySelector('#registerButton')
  
  $registerButton.onclick = () => {   

    if (!validateRegisterData($username, $Name, $email, $password, $confirmPassword)) {
      return false
    }
  }
}

validateFormRegister()

$form.onsubmit = function(event) {
  event.preventDefault()

  const username = document.forms['registerForm'].username.value
  const name = document.forms['registerForm'].name.value
  const email = document.forms['registerForm'].email.value
  const phone = document.forms['registerForm'].phone.value
  const address = document.forms['registerForm'].address.value
  const password = document.forms['registerForm'].password.value

  const header = {
    method: 'POST',
    body: JSON.stringify({
      username,
      name,
      email,
      phone,
      address,
      password
    }),
    headers: { 'Content-Type': 'application/json '}
  }

  fetch(`${API_URL}/api/clients`, header).then(response => {
    response.json().then(data => {
      if (data.message === 'success') {
        alert('User registered successfully! Login now.')
        window.location.href = '/login.html'
      } else if (data.message === 'e-mail already registered') {
        alert('E-mail already registered, please inform another.')
      } else if (data.message === 'phone already registered') {
        alert('Phone already registered, please inform another.')
      }
    })
  })
}



