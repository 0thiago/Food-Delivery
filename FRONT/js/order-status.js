import {
  API_URL,
  showProductsAmountOnCart,
  toggleDropMenu,
  openCartPage,

} from './helpers.js'

showProductsAmountOnCart()
toggleDropMenu()
openCartPage()

const orderPage = {
  init: function () {

    this.cacheStorage()
    this.buildingOrderHtml() 
     
  },

  cacheStorage: function () {
    this.$orderContainer = document.querySelector('#orderContainer')
    this.$orderProductsContainer = document.querySelector('#orderProductsContainer')
    this.$orderIDContainer = document.querySelector('#orderIDContainer')
    this.$orderStatus = document.querySelector('#orderStatus')
    this.$orderID = document.querySelector('#orderID')

  },

  buildingOrderHtml: function () {
    const clientID = JSON.parse(localStorage.getItem('userID'))

    fetch(`${API_URL}/api/orders/status/${clientID}`).then(response => response.json().then(data => {
      data.order.forEach((order)=>{
        const orderHTML = `
          <div class="order">
            <h3>Order ID: <a href=""><span id="orderIDContainer">${order._id}</a></span></h3>
            <hr>
            <div class="order__status">
              <p>Status:</p>
              <p>${order.status}</p>
            </div> 
          </div> 
        `

        this.$orderContainer.innerHTML += orderHTML
      })
      this.cacheStorage()
    })).catch(error)    
  },
}

orderPage.init()





