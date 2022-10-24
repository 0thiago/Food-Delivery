import {
  toggleDropMenu,
  authLogin,
} from './helpers.js'

toggleDropMenu()

function formLogin() {
  
  const $usernameInput = document.querySelector('#username')
  const $passwordInput = document.querySelector('#password')
  const $loginButton = document.querySelector('#loginButton')

  $loginButton.addEventListener("click", (button) => {

    const username = $usernameInput
    const password = $passwordInput

    if (!authLogin(username, password)) {
      return false
    }
  })
}

formLogin()

const $form = document.querySelector('#loginForm')

$form.onsubmit = function(event) {
  event.preventDefault()  

  const API_URL = 'http://192.168.1.5:8080/api/login'

  const $incorrectUserOrPass = document.querySelector('#IncorrectUserOrPass')

  const username = document.forms['loginForm'].username.value

  const password = document.forms['loginForm'].password.value

  const header = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: { 'Content-Type': 'application/json '}
  }

  fetch(API_URL, header).then(response => {
    response.json().then(data => {
      if(data.message === 'username or password incorrect') {
        $incorrectUserOrPass.style.opacity = '1'  
        return false
      } else {

        const userToken = [
          {user: data.name},
          {token: data.token}        
        ]
        const tokenJSON = JSON.stringify(userToken)
        localStorage.setItem('token', tokenJSON)

        alert(`Welcome ${data.name}!`)

        window.location.href = '/index.html'

      }
    })
  })

}


