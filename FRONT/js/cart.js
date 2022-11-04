import {
  API_URL,
  openCartPage,
  toggleDropMenu,
} from './helpers.js'

openCartPage()
toggleDropMenu()

const cartMainFunctions = {

  newCarto: [],

  init: function () {

    this.cacheStorage()
    this.bindEvents()
    this.buildCartPage()

  },

  cacheStorage: function () {

    this.$test = document.querySelectorAll('.remove')
    this.$unitPrice = document.querySelectorAll('.price')
    this.$addOneButton = document.querySelectorAll('.add-one')
    this.$removeOneButton = document.querySelectorAll('.remove-one')
    this.$pricesValue = document.querySelectorAll('.price')
    this.$totalValue = document.querySelector('#totalValue')
    this.$keepButton = document.querySelector('#keepButton')
    this.$finishButton = document.querySelector('#finishButton')
    this.$itemOnTheCart = document.querySelector('#itemOnTheCart')
    this.totalGeral = 0
  },

  buildCartPage: function () {

    const self = this

    const cartProducts = JSON.parse(localStorage.getItem('cart'))

    this.newCarto = cartProducts

    let totalValue = 0

    cartProducts.forEach((item, index) => {

      let prodQuantity = item.quantity

      fetch(`${API_URL}/api/products/${item._id}`).then(response => response.json().then(data => {

        
        const $cartContainer = document.querySelector('#cartContainer')

        const productHTML = data.map(products => `
            <div id="itemOnTheCart" class="cart__products-item">

            <div class="thumbnail"><img src="${products.pictureUrl}" alt="thumbnail of ${products.name}"></div>

            <div class="item-data-container">

              <div class="item-name-and-price">
                <p class="name">${products.name}</p>
                <p id="unitPrice" class="price">$ ${products.price}0</p>
              </div>
              <div class="item-management">
                <div class="item-quantity">
                  <button id="removeOneBtn" 
                  data-price="${products.price}" 
                  data-position="${index}"
                  class="remove-one button">-</button>
                  <p class="number">${prodQuantity}</p>
                  <button id="addOneBtn" 
                  data-position="${index}"
                  data-price="${products.price}" 
                  class="add-one button">+</button>
                </div>
                <div class="remove-item">
                  <button id="removeItem" 
                  data-position="${index}" 
                  data-id="${products._id}"
                  class="remove button">Remove item</button>
                </div>
              </div>

            </div>

            </div> 
          `)

        $cartContainer.innerHTML += productHTML

        this.cacheStorage()
        this.bindEvents()
        this.totalValueCalculate()

      })).catch(error => console.log(Error))
    })
  },

  bindEvents: function () {
    const self = this

    this.$test.forEach((button) => {
      button.onclick = this.Events.itemRemove.bind(self)
    })

    this.$addOneButton.forEach((button) => {
      button.onclick = this.Events.itemAddOne.bind(self)
    })

    this.$removeOneButton.forEach((button) => {
      button.onclick = this.Events.itemRemoveOne.bind(self)
    })

    this.$keepButton.onclick = this.Events.backToShopping.bind(this)

    this.$finishButton.onclick = this.Events.finishShopping.bind(this)

  },

  totalValueCalculate: function () {
    this.$pricesValue.forEach((item) => {
      this.totalGeral += parseFloat(item.innerText.slice(2))
    })

    this.totalGeral = this.totalGeral.toFixed(2)
    this.$totalValue.innerText = `$ ${this.totalGeral}`

  },

  submitOrder: function () {
    const products = JSON.parse(localStorage.getItem('cart'))
    let productsData = []

    products.forEach((product) => {
      let item = {
        "name": product.name,
        "pictureUrl": product.pictureUrl,
        "productID": product._id,
        "quantity": product.quantity,
        "productObs": product.observations        
      }
      productsData.push(item)
    })

    console.log(productsData)

    const tokenFromLocal = JSON.parse(localStorage.getItem('token'))

    const token = tokenFromLocal[1].token

    const creationDate = new Date().toLocaleString()

    const totalValue = this.totalGeral

    const status = 'Pending'

    const body = {
      "token": token,
      productsData,
      "creationDate": creationDate,
      "totalValue": totalValue,
      "status": status
    }

    const header = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${API_URL}/api/orders`, header).then(response => response.json().then(data => {
      if (data.message === 'success') {    

        alert(`Order placed successfully`)

        if (localStorage.getItem('order') === null) {

          localStorage.setItem('order', JSON.stringify([data.order]))          

        } else {

          localStorage.setItem('order', 
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('order')),
            data.order]))
          
        }

        window.location.href = "/order-status.html"
      }
    })).catch(error => console.log(error))
  },

  Events: {

    finishShopping: function () {

      if (this.$itemOnTheCart) {
        let confirmation = confirm('Finish the order and procceed to payment?')
        if (!confirmation) {
          return false
        } else {
          this.submitOrder()
        }
      } else {
        alert('You need at least one product to finish an order')
      }
    },

    backToShopping: function () {
      window.location.href = '/menu.html'
    },

    itemAddOne: function (button) {
      const itemPos = button.target.dataset['position']

      button.target.previousElementSibling.innerText++

      if (button.target.previousElementSibling.innerText >= 1) {
        button.target.previousElementSibling.previousElementSibling.style.opacity = '1'
      }

      let quantity = parseInt(button.target.previousElementSibling.innerText)

      this.newCarto[itemPos].quantity = quantity    

      const newCartoJSON = JSON.stringify(this.newCarto)

      localStorage.setItem('cart', newCartoJSON)

      let unitPrice = parseFloat(button.target.dataset['price'])

      let unitPriceTotal = unitPrice * quantity

      unitPriceTotal = unitPriceTotal.toFixed(2)

      button.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.previousSibling.innerText = `$ ${unitPriceTotal}`

      this.bindEvents()
      this.cacheStorage()
      this.totalValueCalculate()
    },

    itemRemoveOne: function (button) {

      const itemPos = button.target.dataset['position']

      if (button.target.nextElementSibling.innerText <= 1) {

        button.target.style.opacity = '0.5'

      } else {
        button.target.nextElementSibling.innerText--
        button.target.style.opacity = '1'
      }

      let quantity = parseInt(button.target.nextElementSibling.innerText)

      this.newCarto[itemPos].quantity = quantity    

      const newCartoJSON = JSON.stringify(this.newCarto)

      localStorage.setItem('cart', newCartoJSON)

      let unitPrice = parseFloat(button.target.dataset['price'])

      let unitPriceTotal = unitPrice * quantity

      unitPriceTotal = unitPriceTotal.toFixed(2)

      button.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.previousSibling.innerText = `$ ${unitPriceTotal}`

      this.bindEvents()
      this.cacheStorage()
      this.totalValueCalculate()
    },

    itemRemove: function (button) {
      const self = cartMainFunctions

      console.log(button.target.dataset['position'])

      const itemPos = button.target.dataset['position']

      this.newCarto.splice(itemPos, 1)

      console.log(this.newCarto)

      const newCartoJSON = JSON.stringify(this.newCarto)

      localStorage.setItem('cart', newCartoJSON)

      location.reload()
    }
  }
}

cartMainFunctions.init()