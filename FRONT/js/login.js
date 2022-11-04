import {
  openCartPage,
  showProductsAmountOnCart,
  toggleDropMenu,
  authLogin,
  API_URL,
} from './helpers.js'

showProductsAmountOnCart()
openCartPage()
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

$form.onsubmit = function (event) {
  event.preventDefault()

  const $incorrectUserOrPass = document.querySelector('#IncorrectUserOrPass')

  const username = document.forms['loginForm'].username.value

  const password = document.forms['loginForm'].password.value

  const header = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: { 'Content-Type': 'application/json ' }
  }


  if (document.forms['loginForm'].adminCheckbox.checked) {
    console.log('nessa rota')
    fetch(`${API_URL}/api/admins`, header).then(response => {
      response.json().then(data => {
        if (data.message === 'username or password incorrect') {
          $incorrectUserOrPass.style.opacity = '1'
          return false
        } else {

          $incorrectUserOrPass.style.opacity = '0'

          const userToken = [
            { user: data.name },
            { token: data.token }
          ]
          const tokenJSON = JSON.stringify(userToken)
          localStorage.setItem('token', tokenJSON)

          alert(`Welcome ${data.name}!`)

          window.location.href = '/admin.html'

        }
      })
    })
  } else {
    fetch(`${API_URL}/api/login`, header).then(response => {
      response.json().then(data => {
        if (data.message === 'username or password incorrect') {
          $incorrectUserOrPass.style.opacity = '1'
          return false
        } else {

          $incorrectUserOrPass.style.opacity = '0'

          const userToken = [
            { user: data.name },
            { token: data.token }
          ]
          const tokenJSON = JSON.stringify(userToken)
          localStorage.setItem('token', tokenJSON)

          alert(`Welcome ${data.name}!`)

          window.location.href = '/index.html'

        }
      })
    })


  }


}


