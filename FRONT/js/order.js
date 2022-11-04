import {
  openCartPage,
  showProductsAmountOnCart,
  toggleDropMenu, 
  API_URL,
} from './helpers.js'

showProductsAmountOnCart()
openCartPage()
toggleDropMenu()

function buildOrderCard() {
  const productIDJSON = localStorage.getItem('productID')

  if (!productIDJSON){ 
    alert('Choose a product first')
    window.history.back()
  }

  const productID = JSON.parse(productIDJSON)

  const $productContainer = document.querySelector('#productContainer')

  fetch(`${API_URL}/api/products/${productID}`)
    .then(response => {
      response.json().then(data => {

        let cartID = 0

        const product = data[0]

        const productHTML = data.map(products => `
        <h3>${products.name}</h3>
        <img src="${products.pictureUrl}" alt="${products.name}">
        <p class="order__product-description">${products.description}</p>
        <p class="order__product-price">Price: $ ${products.price}</p>
        <label for="observations">Observations:</label>
        <textarea name="observations" id="observations" cols="30" rows="3"></textarea>
        <button id="addCartButton" class="button" data-cartID="${cartID++}">ADD TO CART</button>
      `)

        $productContainer.innerHTML = productHTML

        const $addCartButton = document.querySelector('#addCartButton')
        const $observations = document.querySelector('#observations')

        $addCartButton.onclick = (button) => {
          const observations = { obs: $observations.value }
          const productObj = {
            observations: observations.obs,
            quantity: 1,
            ...product
          }

          if (localStorage.getItem('cart') === null) {
            localStorage.setItem('cart', JSON.stringify([productObj]))
            alert(`${product.name} successfully added to cart`)
          } else {
            localStorage.setItem('cart', JSON.stringify([
              ...JSON.parse(localStorage.getItem('cart')),
              productObj]))
            alert(`${product.name} successfully added to cart`)
          }

          window.location.href = '/cart.html'
        }
      })
    }).catch(error => console.log(Error))
}

buildOrderCard()