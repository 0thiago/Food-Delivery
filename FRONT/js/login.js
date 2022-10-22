import {
  toggleDropMenu, 
  authLogin,
} from './helpers.js'

toggleDropMenu()

function formLogin() {
  const form = document.querySelector('#loginForm')
  const usernameInput = document.querySelector('#username')
  const passwordInput = document.querySelector('#password')
  const loginButton = document.querySelector('#loginButton')

  loginButton.addEventListener("click", (button) => {
    button.preventDefault()

    const username = usernameInput
    const password = passwordInput

    let result = authLogin(username, password)

    if (result) {
      console.log(result)//form SUBMIT
    } else {
      console.log(result)
    }
  })
}

formLogin()
