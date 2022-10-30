import {
  openCartPage,
  toggleDropMenu, 
  API_URL
} from './helpers.js'

openCartPage()
toggleDropMenu()

let productIdFromMenu

const menuPageProductsBuilder = {

  APIData: [],

  init: function () {

    this.cacheSelectores()
    this.bindEvents()

  },

  cacheSelectores: function () {

    this.$typesButtons = document.querySelectorAll('.menu__types')
    this.$typeOneButton = document.querySelector('#typeOneButton')
    this.$typeTwoButton = document.querySelector('#typeTwoButton')
    this.$typeThreeButton = document.querySelector('#typeThreeButton')
    this.$typeFourButton = document.querySelector('#typeFourButton')
    this.$productsContainer = document.querySelector('#productsContainer')
    this.$orderButton = document.querySelectorAll('.order-button')
    this.API_URL = `${API_URL}/api/products`
    this.$loadingImg = document.querySelector('#loadingImg')
    this.$backgroundGif = document.querySelector('#backgroundGif')

  },

  bindEvents: function () {
    const self = this

    this.$typesButtons.forEach((button) => {
      button.onclick = self.Events.showProducts.bind(this)
    })

    this.$orderButton.forEach((button)=>{
      button.onclick = self.Events.goToOrderScreen.bind(this)
    })

  },

  Events: {

    goToOrderScreen: function(button){
      
      const id = button.target.dataset['id']
      productIdFromMenu = id

      fetch(`${API_URL}/api/order/${id}`).then(response => {
        response.json().then(data => {                
          const productFromMenuID = id
          const productIDJSON = JSON.stringify(productFromMenuID)
          localStorage.setItem('productID', productIDJSON)

          window.location.href = "/order.html"       
        
        })
      }).catch(error => console.log(error))
    },

    showProducts: function (button) {
      this.$loadingImg.style.display = 'block'
      let type = button.target.dataset['type']
      
      fetch(`${this.API_URL}/type/${type}`).then(response => response.json().then(data => {
        const productCardHtml = data.map(products => `
          <figure>
          <h3>${products.name}</h3>
          <img src="${products.pictureUrl}" alt="${products.name} picture">
          <figcaption>${products.description}</figcaption>
          <p>$ ${products.price}</p>
          <button id="orderButton" data-id="${products._id}" class="order-button button">ORDER NOW</button>
          </figure>
        `)

        this.$productsContainer.innerHTML = productCardHtml
        this.$loadingImg.style.display = 'none'
        this.$backgroundGif.style.display = 'none'

        this.cacheSelectores()
        this.bindEvents()
      })).catch(error => console.log(Error))
    }
  }
}

menuPageProductsBuilder.init()


