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
  const tokenFromStorage = JSON.parse(localStorage.getItem('token'))

  if (!tokenFromStorage) {
    window.location.href = "/login.html"

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
          window.location.href = "/login.html"
        } 
      })
    })
  }
}

alreadyLoggedCheck()

// const editProfile = {
//   init: function(){

//     this.cacheStorage()
//     this.bindEvents()

//   },

//   cacheStorage: function(){

//   },

//   bindEvents: function(){

//   },

//   Events: {

//   }
// }

// editProfile.init()


