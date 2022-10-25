import {
  toggleDropMenu, API_URL
} from './helpers.js'

toggleDropMenu()

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
    this.API_URL = `${API_URL}/api/products`
    this.$loadingImg = document.querySelector('#loadingImg')

  },

  getProductsFromAPI: function () {
    fetch(this.API_URL)
      .then(response => {
        response.json().then(data => {
          this.APIData = data
          // console.log(data)
        })
      })
  },

  bindEvents: function () {
    const self = this

    this.$typesButtons.forEach((button) => {
      button.onclick = self.Events.showProducts.bind(this)
    })

  },

  Events: {

    showProducts: function (button) {
      this.$loadingImg.style.display = 'block'
      let type = button.target.dataset['type']
      console.log(type)
      fetch(`${this.API_URL}/type/${type}`).then(response => response.json().then(data => {
        const productCardHtml = data.map(products => `
          <figure>
          <h3>${products.name}</h3>
          <img src="${products.pictureUrl}" alt="${products.name} picture">
          <figcaption>${products.description}</figcaption>
          <p>$ ${products.price}</p>
          <button id="orderButton" class="button">ORDER NOW</button>
          </figure>
        `)

        this.$productsContainer.innerHTML = productCardHtml
        this.$loadingImg.style.display = 'none'

        this.cacheSelectores()
        this.bindEvents()
      }))
    }
  }
}

menuPageProductsBuilder.init()



