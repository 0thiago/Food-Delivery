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

function validateUsername(username) {  
  const regex = /^[a-zA-Z ]{6,30}$/

  if (regex.test(username) === false){
    return false
  } else {
    return true
  }
}

function validateName(Name) {  
  const regex = /^[a-zA-Z ]{6,30}$/

  if (regex.test(Name) === false){
    return false
  } else {
    return true
  }
}

function validateEmail(email) {  
  const regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

  if (regex.test(email) === false){
    return false
  } else {
    return true
  }
}

function validateCpf(cpf) {  
  const regex = /^(\d{3})\.?(\d{3})\.?(\d{3})\-?(\d{2}$)$|^(\d{2})\.?(\d{3})\.?(\d{3})\/?([0-1]{4})\-?(\d{2})$/

  if (regex.test(cpf) === false){
    return false
  } else {
    return true
  }
}

function validatePassword(password) {  
  const regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/

  if (regex.test(password) === false){
    return false
  } else {
    return true
  }
}

function authLogin(username, password) {
  let hasError = false

    if (!validateUsername(username.value)) {
      hasError = true
      username.style.borderColor = 'red'
      username.previousElementSibling.style.opacity = '1'

    } else {
      username.style.borderColor = ''
      username.previousElementSibling.style.opacity = '0'
    }

    if (!validatePassword(password.value)) {
      hasError = true
      password.style.borderColor = 'red'
      password.previousElementSibling.style.opacity = '1'

    } else {
      password.style.borderColor = ''
      password.previousElementSibling.style.opacity = '0'
    }

    if (hasError) {
      return false
    } else {
      return true
    }

  
}

function validateRegisterData(username, Name, email, password) {
  let hasError = false

    if (!validateUsername(username.value)) {
      hasError = true
      username.style.borderColor = 'red'
      username.previousElementSibling.style.opacity = '1'

    } else {
      username.style.borderColor = ''
      username.previousElementSibling.style.opacity = '0'
    }

    if (!validateName(Name.value)) {
      hasError = true
      Name.style.borderColor = 'red'
      Name.previousElementSibling.style.opacity = '1'

    } else {
      Name.style.borderColor = ''
      Name.previousElementSibling.style.opacity = '0'
    }

    if (!validateEmail(email.value)) {
      hasError = true
      email.style.borderColor = 'red'
      email.previousElementSibling.style.opacity = '1'

    } else {
      email.style.borderColor = ''
      email.previousElementSibling.style.opacity = '0'
    }

    if (!validatePassword(password.value)) {
      hasError = true
      password.style.borderColor = 'red'
      password.previousElementSibling.style.opacity = '1'

    } else {
      password.style.borderColor = ''
      password.previousElementSibling.style.opacity = '0'
    }    

    if (password.value !== confirmPassword.value) {
      hasError = true
      confirmPassword.style.borderColor = 'red'
      confirmPassword.previousElementSibling.style.opacity = '1'
    } else {
      confirmPassword.style.borderColor = ''
      confirmPassword.previousElementSibling.style.opacity = '0'
    }

    if (hasError) {
      return false
    } else {
      return true
    }  
}

export { 
  productsCarousel, 
  getSalesProducts,
  toggleDropMenu,
  validateUsername,
  validateName,
  validateEmail,
  validateCpf,
  validatePassword,
  authLogin,
  validateRegisterData,
 }