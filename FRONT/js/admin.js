import {
  API_URL,
  toggleDropMenu,
} from './helpers.js'

toggleDropMenu()

function verifyAdmin() {
  const tokenJSON = JSON.parse(localStorage.getItem('token'))
  const token = tokenJSON[1].token

  const body = {
    "token": token
  }

  const header = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json ' }
  }

  fetch(`${API_URL}/api/admins/access`, header).then(response => {
    response.json().then(data => {
      if (data.message !== 'success') {
        document.body.innerHTML = 'Error 403 Forbidden'
      }
    })
  })
}

verifyAdmin()

const buildAdminPage = {

  init: function () {

    this.cacheStorage()
    this.bindEvents()

  },

  cacheStorage: function () {

    this.$open = document.querySelectorAll('.open')
    this.$editButton = document.querySelectorAll('.edit')
    this.$removeButton = document.querySelectorAll('.remove')
    this.$clientListContainer = document.querySelector('#clientListContainer')
    this.$productListContainer = document.querySelector('#productListContainer')
    this.$orderListContainer = document.querySelector('#orderListContainer')
    this.$editClientContainer = document.querySelector('#editClientContainer')
    this.$editProductContainer = document.querySelector('#editProductContainer')
    this.$editOrderContainer = document.querySelector('#editOrderContainer')
    this.$editContainer = document.querySelector('#editContainer')
    this.$confirmEditionButton = document.querySelector('#confirmEditionButton')
    this.$resetFieldsButton = document.querySelector('#resetFieldsButton')

  },

  bindEvents: function () {
    const self = this

    this.$open.forEach((item) => {
      item.onclick = self.Events.showHiddenItems.bind(self)
    })

    this.$editButton.forEach((button) => {
      button.onclick = self.Events.editItem.bind(this)
    })

    this.$removeButton.forEach((button) => {
      button.onclick = self.Events.removeItem.bind(this)
    })

    if (this.$resetFieldsButton) {
      this.$resetFieldsButton.onclick = self.Events.resetFormFields.bind(this)
    }

    console.log(this.$cancelEditionButton)

    if (this.$cancelEditionButton) {

      this.$cancelEditionButton.onclick = self.Events.cancelEdition.bind(this)

    }

  },

  showClientList: function () {

    const self = this

    fetch(`${API_URL}/api/clients`).then(response => {
      response.json().then(data => {
        data.map(client => {
          const clientsListHTML = `
              <li>
                <span>${client.name}</span>
                <div class="buttons">
                  <button 
                    id="editItem" 
                    data-db="client"
                    data-id="${client._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeItem" 
                    data-db="client"
                    data-id="${client._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$clientListContainer.innerHTML += clientsListHTML

          this.$productListContainer.innerHTML = ''

          this.$orderListContainer.innerHTML = ''

          this.cacheStorage()
          this.bindEvents()

        })

      })

    })

  },

  showProductList: function () {

    fetch(`${API_URL}/api/products`).then(response => {
      response.json().then(data => {
        data.map(product => {

          const productsListHTML = `
              <li>
                <span>${product.name}</span>
                <div class="buttons">
                  <button 
                    id="editItem" 
                    data-db="product"
                    data-id="${product._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeItem" 
                    data-db="product"
                    data-id="${product._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$productListContainer.innerHTML += productsListHTML

          this.cacheStorage()
          this.bindEvents()
        })

      })
    })
  },

  showOrdersList: function () {
    fetch(`${API_URL}/api/orders`).then(response => {
      response.json().then(data => {
        data.map(order => {
          const ordersListHTML = `
              <li>
                <span>${order._id}</span>
                <div class="buttons">
                  <button 
                    id="editOrder" 
                    data-db="order"
                    data-id="${order._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeOrder" 
                    data-db="order"
                    data-id="${order._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$orderListContainer.innerHTML += ordersListHTML

          this.cacheStorage()
          this.bindEvents()
        })
      })
    })
  },

  Events: {

    editItem: function (button) {

      const db = button.target.dataset['db']

      console.log(db)

      const editDialog = button.target.parentElement.parentElement.parentElement.nextElementSibling

      console.log(editDialog)

      const itemID = button.target.dataset['id']

      editDialog.classList.remove('hidden')

      fetch(`${API_URL}/api/${db}s/${itemID}`).then(response => {

        response.json().then(data => {

          data.map(item => {

            if (db === "client") {

              const editClientHTML = `
                <div id="editContainer" class="admin__item-edit">
                  <form id="form" action="">
                    <h3>Edit ${db}</h3>
                    <div class="username-field">
                      <label for="${db}Username">Username:</label>
                      <input type="text" name="${db}Username" id="${db}Username"
                      value="${item.username}"
                      >
                    </div>
                    <div class="name-field">
                      <label for="${db}Name">Name:</label>
                      <input type="text" name="${db}Name" id="${db}Name" value="${item.name}">
                    </div>
                    <div class="email-field">
                      <label for="${db}Email">E-mail:</label>
                      <input type="email" name="${db}Email" id="${db}Email" value="${item.email}">
                    </div>
                    <div class="phone-field">
                      <label for="${db}Phone">Phone:</label>
                      <input type="tel" name="${db}Phone" id="${db}Phone" value="${item.phone}">
                    </div>
                    <div class="address-field">
                      <label for="${db}Address">Address:</label>
                      <input type="address" name="${db}Address" ,id                                
                      ="${db}Address" value="${item.address}">
                    </div>
                    <div class="password-fields">
                      <label for="${db}Password">Password:</label>
                      <input type="text" name="${db}Password" id="${db}Password" value="${item.password}">
                    </div>
                    <div class="buttons">
                      <button 
                        data-id="${item._id}" data-db="${db}"
                        id="confirmEditionButton" class="confirm button">
                          Confirm
                      </button>
                      <button 
                        data-db="${db}"
                        id="resetFieldsButton" 
                        class="reset button">
                          Reset
                      </button>
                      <button 
                        data-db="${db}"
                        id="cancelEditionButton" class="cancel button">
                          Cancel
                      </button>
                    </div>
                  </form>
                </div>
                `
              this.$editProductContainer.innerHTML = ''

              this.$editOrderContainer.innerHTML = ''

              this.$editClientContainer.innerHTML = editClientHTML

              this.$cancelEditionButton = document.querySelector('#cancelEditionButton')

              this.cacheStorage()
              this.bindEvents()



            } else if (db === 'product') {

              const editProductHTML = `
                <div id="editContainer" class="admin__item-edit">
                  <form id="form" action="">
                    <h3>Edit ${db}</h3>
                    <div class="name-field">
                      <label for="${db}Name">Name:</label>
                      <input type="text" name="${db}Name" id="${db}Name" value="${item.name}">
                    </div>
                    <div class="description-field">
                      <label for="${db}Description">Description:</label>
                      <input type="text" name="${db}Description" id="${db}Description" value="${item.description}">
                    </div>
                    <div class="price-field">
                      <label for="${db}Price">Price:</label>
                      <input type="number" name="${db}Price" id="${db}Price" value="${item.price}">
                    </div>
                    <div class="picture-url-field">
                      <label for="${db}PictureUrl">Picture Url:</label>
                      <input type="text" name="${db}PictureUrl" ,id                                
                      ="${db}PictureUrl" value="${item.pictureUrl}">
                    </div>
                    <div class="promo-fields">
                      <label for="${db}Promo">Promo:</label>
                      <select name="${db}Promo" id="${db}Promo">
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    </div>
                    <div class="type-fields">
                      <label for="${db}Type">Type:</label>
                      <select name="${db}Type" id="${db}Type">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </div>
                    <div class="buttons">
                      <button 
                        data-id="${item._id}" data-db="${db}"
                        id="confirmEditionButton" class="confirm button">
                          Confirm
                      </button>
                      <button 
                        data-db="${db}"
                        id="resetFieldsButton" 
                        class="reset button">
                          Reset
                      </button>
                      <button 
                        data-db="${db}"
                        id="cancelEditionButton" class="cancel button">
                          Cancel
                      </button>
                    </div>
                  </form>
                </div>
                `

              console.log(db)

              this.$editClientContainer.innerHTML = ''

              this.$editOrderContainer.innerHTML = ''

              this.$editProductContainer.innerHTML = editProductHTML

              console.log(document.querySelector('#cancelEditionButton'))

              this.$cancelEditionButton = document.querySelector('#cancelEditionButton')

              console.log(this.$cancelEditionButton)

              this.cacheStorage()
              this.bindEvents()

            } else if (db === 'order') {

              const editOrderHTML = `
                <div id="editContainer" class="admin__item-edit">
                  <form id="form" action="">
                    <h3>Edit ${db}</h3>
                    <div class="clientID-field">
                      <label for="${db}ClientID">Client ID:</label>
                      <input type="text" name="${db}ClientID" id="${db}ClientID" value="${item.clientID}">
                    </div>
                    <div id="productData-field" class="productData-field">
                      <p>Products:</p>
                      <ul id="productDataContainer">
                        
                      </ul>
                      <button class="addProductOnOrder button">Add Product</button>
                    </div>
                    <div class="creation-date-field">
                      <label for="${db}CreationDate">Creation Date:</label>
                      <input type="text" name="${db}CreationDate" id="${db}CreationDate" value="${item.creationDate}">
                    </div>
                    <div class="total-value-field">
                      <label for="${db}TotalValue">Total Value:</label>
                      <input type="text" name="${db}TotalValue" id                                
                      ="${db}TotalValue" value="${item.totalValue}">
                    </div>
                    <div class="status-fields">
                      <label for="${db}Status">Status:</label>
                      <select name="${db}Status" id="${db}Status">                      
                        <option value="${item.status}" selected>${item.status}</option>
                        <option value="Pending">Pending</option>
                        <option value="WorkingOnIt">Working on it</option>
                        <option value="OutForDelivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    </div>
                    <div class="buttons">
                      <button 
                        data-id="${item._id}" data-db="${db}"
                        id="confirmEditionButton" class="confirm button">
                          Confirm
                      </button>
                      <button 
                        data-db="${db}"
                        id="resetFieldsButton" 
                        class="reset button">
                          Reset
                      </button>
                      <button 
                        data-db="${db}"
                        id="cancelEditionButton" class="cancel button">
                          Cancel
                      </button>
                    </div>
                  </form>
                </div>
              `

              this.$editClientContainer.innerHTML = ''

              this.$editProductContainer.innerHTML = ''

              this.$editOrderContainer.innerHTML = editOrderHTML
              let $productDataContainer = document.querySelector('#productDataContainer')
              let pos = 0

              item.productsData.map(product => {

                const productDataHTML = `
                  <li>
                    <span>${product.name}</span>
                    <button data-pos="${pos}" class="removeProductFromOrder button">Remove</button>
                    <input type="hidden"
                      name="${product.productID}" 
                      id="${product.productID}"> 
                  </li>
                `

                $productDataContainer.innerHTML += productDataHTML
                pos++


              })

              this.$cancelEditionButton = document.querySelector('#cancelEditionButton')

              this.cacheStorage()
              this.bindEvents()


              let productsData = []

              item.productsData.forEach((product) => {
                let item = {
                  "name": product.name,
                  "pictureUrl": product.pictureUrl,
                  "productID": product.productID,
                  "productObs": product.productObs,
                  "quantity": product.quantity,
                }
                productsData.push(item)
              })

              const productsDataJSON = JSON.stringify(productsData)
              localStorage.setItem('productsDataForOrderChange', productsDataJSON)

            }

          })

          const self = this

          this.$confirmEditionButton.onclick = (button) => {
            button.preventDefault()

            if (button.target.dataset['db'] === 'client') {
              self.Events.confirmClientEdition(button)

            } else if (button.target.dataset['db'] === 'product') {
              self.Events.confirmProductEdition(button)

            } else if (button.target.dataset['db'] === 'order') {
              self.Events.confirmOrderEdition(button)

            }
          }


        })

      })



    },

    confirmClientEdition: function (button) {
      const self = buildAdminPage

      const clientID = button.target.dataset['id']

      const username = document.forms['form'].clientUsername.value
      const name = document.forms['form'].clientName.value
      const email = document.forms['form'].clientEmail.value
      const phone = document.forms['form'].clientPhone.value
      const address = document.forms['form'].clientAddress.value
      const password = document.forms['form'].clientPassword.value

      const body = {
        username,
        name,
        email,
        phone,
        address,
        password
      }

      const header = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      }

      fetch(`${API_URL}/api/clients/${clientID}`, header).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            alert('Client successfully edited')
            document.querySelector('#editClientContainer').classList.add('hidden')
            self.$clientListContainer.innerHTML = ''
            self.showClientList()
            self.cacheStorage()
            self.bindEvents()
          }
        })
      })

    },

    confirmProductEdition: function (button) {
      const self = buildAdminPage

      const productID = button.target.dataset['id']

      const name = document.forms['form'].productName.value
      const description = document.forms['form'].productDescription.value
      const price = document.forms['form'].productPrice.value
      const pictureUrl = document.forms['form'].productPictureUrl.value
      const promo = document.forms['form'].productPromo.value
      const type = document.forms['form'].productType.value

      const body = {
        name,
        description,
        price,
        pictureUrl,
        promo,
        type
      }

      const header = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      }

      fetch(`${API_URL}/api/products/${productID}`, header).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            alert('Product successfully edited')
            document.querySelector('#editProductContainer').classList.add('hidden')
            self.$productListContainer.innerHTML = ''
            self.showProductList()
            self.cacheStorage()
            self.bindEvents()
          }
        })
      })

    },

    confirmOrderEdition: function (button) {
      button.preventDefault()

      const self = buildAdminPage

      const orderID = button.target.dataset['id']

      const tokenFromStorage = JSON.parse(localStorage.getItem('token'))

      const token = tokenFromStorage[1].token

      const clientID = document.forms['form'].orderClientID.value

      const productsData = JSON.parse(localStorage.getItem('productsDataForOrderChange'))

      const creationDate = document.forms['form'].orderCreationDate.value

      const totalValue = document.forms['form'].orderTotalValue.value

      const status = document.forms['form'].orderStatus.value

      const body = {
        token,
        clientID,
        productsData,
        creationDate,
        totalValue,
        status
      }

      const header = {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      }

      fetch(`${API_URL}/api/orders/${orderID}`, header).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            alert('Order successfully updated')
            document.querySelector('#editOrderContainer').classList.add('hidden')
            self.$orderListContainer.innerHTML = ''
            self.showOrdersList()
            self.cacheStorage()
            self.bindEvents()
          }
        })
      })

    },

    cancelEdition: function (button) {
      button.preventDefault()

      console.log(this.$editContainer.parentElement)
      console.log(button.target)
      console.log(this.$cancelEditionButton)

      const editContainer = button.target.parentElement.parentElement.parentElement.parentElement

      this.$editContainer.parentElement.classList.add('hidden')

      this.cacheStorage()
      this.bindEvents()

    },

    resetFormFields: function (button) {
      button.preventDefault()

      if (button.target.dataset['db'] === 'client') {
        console.log('clients')
      } else if (button.target.dataset['db'] === 'product') {
        console.log('products')
      } else if (button.target.dataset['db'] === 'order') {
        console.log('orders')
      }

    },

    removeItem: function (button) {
      const self = this

      const db = button.target.dataset['db']
      const itemID = button.target.dataset['id']

      let confirmation = confirm(`Do you really want to delete ${itemID}`)

      if (!confirmation) {
        alert('Item not deleted')
        return false
      }

      fetch(`${API_URL}/api/${db}s/${itemID}`, { method: 'DELETE' }).then(response => {
        response.json().then(data => {
          if (data.message === 'success') {
            alert('Item deleted')


            if (db === 'client') {
              this.$clientListContainer.innerHTML = ''
              this.showClientList()
            } else if (db === 'product') {
              this.$productListContainer.innerHTML = ''
              this.showProductList()
            } else if (db === 'order') {
              this.$orderListContainer.innerHTML = ''
              this.showOrdersList()
            }

          } else {
            alert('Oops, something went wrong, try again.')
          }
        })
      })

      this.cacheStorage()
      this.bindEvents()
    },

    showHiddenItems: function (item) {
      const self = this

      const itemListContainer = item.target.parentElement.nextElementSibling.nextElementSibling

      const searchSelf = item.target.parentElement.nextElementSibling

      const clientTitle = item.target.parentElement.parentElement.parentElement.children[0].children[0].firstElementChild

      const clientListContainer = item.target.parentElement.parentElement.parentElement.children[0].children[2]

      const clientSearch = item.target.parentElement.parentElement.parentElement.children[0].children[1]

      const productTitle = item.target.parentElement.parentElement.parentElement.children[1].children[0].firstElementChild

      const productListContainer = item.target.parentElement.parentElement.parentElement.children[1].children[2]

      const productSearch = item.target.parentElement.parentElement.parentElement.children[1].children[1]

      const orderTitle = item.target.parentElement.parentElement.parentElement.children[2].children[0].firstElementChild

      const orderListContainer = item.target.parentElement.parentElement.parentElement.children[2].children[2]

      const orderSearch = item.target.parentElement.parentElement.parentElement.children[2].children[1]


      if (itemListContainer.classList.contains('hidden')) {

        itemListContainer.classList.remove('hidden') //show list of items
        item.target.classList.add('selected') //focus on item

        searchSelf.classList.remove('hidden') //show search div

        if (item.target.innerText === 'Clients') {
          productListContainer.classList.add('hidden')
          productTitle.classList.remove('selected')
          orderListContainer.classList.add('hidden')
          orderTitle.classList.remove('selected')
          productSearch.classList.add('hidden')
          orderSearch.classList.add('hidden')
          self.showClientList()



        } else if (item.target.innerText === 'Products') {
          clientListContainer.classList.add('hidden')
          clientTitle.classList.remove('selected')
          orderListContainer.classList.add('hidden')
          orderTitle.classList.remove('selected')
          clientSearch.classList.add('hidden')
          orderSearch.classList.add('hidden')
          self.showProductList()



        } else if (item.target.innerText === 'Orders') {
          clientTitle.classList.remove('selected')
          clientListContainer.classList.add('hidden')
          productListContainer.classList.add('hidden')
          productTitle.classList.remove('selected')
          clientSearch.classList.add('hidden')
          productSearch.classList.add('hidden')
          self.showOrdersList()

        }

      } else {
        itemListContainer.classList.add('hidden')
        searchSelf.classList.add('hidden')
        item.target.classList.remove('selected')

      }

      // this.cacheStorage()
      // this.bindEvents()

    },
  }
}

buildAdminPage.init()


