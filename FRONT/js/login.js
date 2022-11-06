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

function alreadyLoggedCheck() {

  const $loginContainer = document.querySelector('#loginContainer')
  const $alreadyLoggedContainer = document.querySelector('#alreadyLoggedContainer')

  const tokenFromStorage = JSON.parse(localStorage.getItem('token'))

  if (!tokenFromStorage) {
    $alreadyLoggedContainer.classList.add('hidden')
    $loginContainer.style.opacity = '1'

  } else {
    
    let tokenStr = tokenFromStorage[1].token 
  
    let body = {
      token: tokenStr
    }
  
    body = JSON.stringify(body)
  
    const header = {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    }
  
    fetch(`${API_URL}/api/clients/check`, header).then(response => {
      response.json().then(data => {
        
        if (data.message === 'user not found') {
          $alreadyLoggedContainer.classList.add('hidden')
          $loginContainer.style.opacity = '1'
        } else {
          if (data.client) {
            document.querySelector('#loginTitle').innerText = `Welcome ${data.client.name}`
          }

          $loginContainer.classList.add('hidden')
          $alreadyLoggedContainer.style.opacity = '1'

        }
      })
    })
  }
}

alreadyLoggedCheck()

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
        if (data.message === 'user or password invalid') {
          $incorrectUserOrPass.style.opacity = '1'
          return false
        } else {

          $incorrectUserOrPass.style.opacity = '0'

          const userToken = [
            { user: data.user.name },
            { token: data.token }
          ]

          const userID = data.user._id
          const tokenJSON = JSON.stringify(userToken)
          const userIDJSON = JSON.stringify(userID)
          localStorage.setItem('token', tokenJSON)
          localStorage.setItem('userID', userIDJSON)

          alert(`Welcome ${data.user.name}!`)

          window.location.href = '/index.html'

        }
      })
    })
  }
}

function logout() {
  const $logoutButton = document.querySelector('#logoutButton')

  $logoutButton.onclick = (button) => {
    button.preventDefault()
    let confirmation = confirm('Do you really want to logout?')

    if(confirmation === true){
      localStorage.removeItem('token')
      document.location.reload()
    }
  }
}

logout()

