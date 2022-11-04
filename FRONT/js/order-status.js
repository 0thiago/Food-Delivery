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

  products: [],

  init: function () {

    this.cacheStorage()
    this.bindEvents()
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
    const orders = JSON.parse(localStorage.getItem('order'))

    orders.forEach((order) => {

      const self = this
            
      fetch(`${API_URL}/api/orders/${order._id}`).then(response => response.json().then(data => {

        console.log(data[0])

        const items = [ data[0] ]        

        items.forEach((item)=>{
          self.products = item.productsData
        })

        let orderHTML = `
          <div class="order">
            <h3>Order ID: <a href=""><span id="orderIDContainer">${data[0]._id}</a></span></h3>
          <hr>
            <div class="order__status">
              <p>Status:</p>
              <p>${data[0].status}</p>
            </div> 
         </div> 
        `

        this.$orderContainer.innerHTML += orderHTML
        
        this.cacheStorage()
        this.bindEvents()
        this.buildingOrderProductsHtml()

      }))
    })   
  },

  buildingOrderProductsHtml: function () {
    
  },

}

orderPage.init()





