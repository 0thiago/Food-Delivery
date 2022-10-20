function productsCarousel() {
  const $wrapper = document.querySelector('.home__products-wrapper')

  let pressed = false
  let startX = 0

  $wrapper.addEventListener('mousedown', function (event) {
    pressed = true
    startX = event.clientX
    this.style.cursor = 'grabbing'

  })

  $wrapper.addEventListener('mouseleave', function (event) {
    pressed = false
  })

  window.addEventListener('mouseup', function (event) {
    pressed = false
    startX = event.clientX
    $wrapper.style.cursor = 'grab'
  })

  $wrapper.addEventListener('mousemove', function (event) {
    if (!pressed) {
      return
    }
    this.scrollLeft += startX - event.clientX
  })
}

function getSalesProducts() {
  const API_URL = 'http://192.168.1.5:8080/api/products'
  const salesSectionContainer = document.querySelector('#salesSectionContainer')

  fetch(API_URL).then(response => {
    response.json().then(data => {

      data = data.filter(products => products.promo === true)

      const salesSectionHtml = data.map(products => `
      <div class="slider">
          <figure class="home__products-card">
            <span class="sale-span">SALE!</span>
            <h3>${products.name}</h3>
            <div class="caption-img-box">
              <img src="${products.pictureUrl}" alt="${products.name} image">
              <div class="caption-button-box">
                <figcaption>${products.description}
                </figcaption>
                <p>Only <strong>$ ${products.price}</strong> !</p>
                <button id="orderButton" class="button">Order Now</button>
              </div>
            </div>
          </figure>
        </div>      
      `)

      salesSectionContainer.innerHTML = salesSectionHtml

    })
  }).catch(error => console.log(Error))
}

function toggleDropMenu() {

  const $burguerMenuButton = document.querySelector('#burguerMenuButton')

  const $dropMenu = document.querySelector('#dropMenu')

  const $menuItem = document.querySelectorAll('#menuItem')

  $burguerMenuButton.addEventListener("click", (e) => {
    if ($dropMenu.classList.contains('show')) {
      $dropMenu.classList.remove('show')
      $burguerMenuButton.classList.remove('menu-button--active')

    } else {
      $dropMenu.classList.add('show')
      $burguerMenuButton.classList.add('menu-button--active')
    }
  })

  document.body.addEventListener("click", (e) => {
    let dropMenu = $dropMenu
    let btnMenu = $burguerMenuButton
    let target = e.target

    if (!target.classList.contains('menuItem') && !target.classList.contains('header__burguer-menu') && dropMenu.classList.contains('show')) {
      dropMenu.classList.remove('show')
      btnMenu.classList.remove('menu-button--active')

    }
  })
}

export { 
  productsCarousel, 
  getSalesProducts,
  toggleDropMenu,
 }