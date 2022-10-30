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
    this.$clientsListContainer = document.querySelector('#clientsListContainer')
    this.$editClientButton = document.querySelectorAll('.edit')
    this.$editClientContainer = document.querySelector('#editClientContainer')


    this.$productsListContainer = document.querySelector('#productsListContainer')
    this.$ordersListContainer = document.querySelector('#ordersListContainer')
    this.$editProductButton = document.querySelector('#editProduct')

    this.editClientDialog = document.querySelector('#editClientContainer')

    

  
    this.$editOrderButton = document.querySelector('#editOrder')

    this.$confirmEditionButton = document.querySelector('#confirmEditionButton')
    this.$resetFieldsButton = document.querySelector('#confirmFieldsButton')
    this.$cancelEditionButton = document.querySelector('#cancelEditionButton')

    this.$removeClientButton = document.querySelector('#removeClient')
    this.$removeProductButton = document.querySelector('#removeProduct')
    this.$removeClientButton = document.querySelector('#removeOrder')    

  },

  bindEvents: function () {
    const self = this

    this.$open.forEach((item) => {
      item.onclick = self.Events.showHiddenItems.bind(self)
    })


    // this.$confirmEditionButton.onclick = self.Events.confirmEdition.bind(this) 
    

    // this.$editProductButton.onclick = self.Events.editProduct.bind(this)
    // this.$editOrderButton.onclick = self.Events.editOrder.bind(this)

    // this.$removeClientButton.onclick = self.Events.removeClient.bind(this)
    // this.$removeProductButton.onclick = self.Events.removeProduct.bind(this)
    // this.$removeOrderButton.onclick = self.Events.removeOrder.bind(this)

  },

  showClientList: function () {
    fetch(`${API_URL}/api/clients`).then(response => {
      response.json().then(data => {
        data.map(client => {
          const clientsListHTML = `
              <li>
                <span>${client.name}</span>
                <div class="buttons">
                  <button 
                    id="editClient" 
                    data-id="${client._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeClient" 
                    data-id="${client._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$clientsListContainer.innerHTML += clientsListHTML

          this.cacheStorage()
          this.bindEvents()
         
          this.$editClientButton.forEach((button)=>{
            const self = this
            button.onclick = self.Events.editClient.bind(self)
          })
       
          
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
                    id="editProduct" 
                    data-id="${product._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeProduct" 
                    data-id="${product._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$productsListContainer.innerHTML += productsListHTML

          this.cacheStorage()
          this.bindEvents()
        })

      })
    })
  },

  showOrdersList: function () {
    fetch(`${API_URL}/api/orders`).then(response => {
      response.json().then(data => {
        data.order.map(order => {
          const ordersListHTML = `
              <li>
                <span>${order._id}</span>
                <div class="buttons">
                  <button 
                    id="editOrder" 
                    data-id="${order._id}"
                    class="edit button">
                      Edit
                  </button>
                  <button 
                    id="removeOrder" 
                    data-id="${order._id}"
                    class="remove button">
                      Remove
                  </button>
                </div>
              </li>
          `

          this.$ordersListContainer.innerHTML += ordersListHTML

          this.cacheStorage()
          this.bindEvents()
        })
      })
    })
  },

  Events: {

    editClient: function (button) {
      const clientID = button.target.dataset['id']
      const editClientWindow = button.target.parentElement.parentElement.parentElement.nextElementSibling

      editClientWindow.classList.remove('hidden')

      fetch(`${API_URL}/api/clients/${clientID}`).then(response => {
        response.json().then(data => {
          data.map(client => {
            
            const editClientHTML = `
              <div class="admin__clients-edit ">
                <form id="form" action="">
                  <h3>Edit Client</h3>
                  <div class="username-field">
                    <label for="clientUsername">Username:</label>
                    <input type="text" name="clientUsername" id="clientUsername"
                    value="${client.username}"
                    >
                  </div>
                  <div class="name-field">
                    <label for="clientName">Name:</label>
                    <input type="text" name="clientName" id="clientName" value="${client.name}">
                  </div>
                  <div class="email-field">
                    <label for="clientEmail">E-mail:</label>
                    <input type="email" name="clientEmail" id="clientEmail" value="${client.email}">
                  </div>
                  <div class="phone-field">
                    <label for="clientPhone">Phone:</label>
                    <input type="tel" name="clientPhone" id="clientPhone" value="${client.phone}">
                  </div>
                  <div class="address-field">
                    <label for="clientAddress">Address:</label>
                    <input type="address" name="clientAddress" id="clientAddress" value="${client.address}">
                  </div>
                  <div class="password-fields">
                    <label for="clientPassword">Password:</label>
                    <input type="text" name="clientPassword" id="clientPassword" value="${client.password}">
                  </div>
                  <div class="buttons">
                    <button 
                      data-id="${client._id}" id="confirmEditionButton" class="confirm button">
                        Confirm
                    </button>
                    <button 
                      id="resetFieldsButton" 
                      class="reset button">
                        Reset
                    </button>
                    <button 
                      id="cancelEditionButton" class="cancel button">
                        Cancel
                    </button>
                  </div>
                </form>
              </div>
            `

            this.$editClientContainer.innerHTML = editClientHTML
  
            this.cacheStorage()
            this.bindEvents()

            const self = this  
            
            this.$confirmEditionButton.onclick = (button)=> {
              button.preventDefault()        
              self.Events.confirmClientEdition(button)
            }

            document.querySelector('#resetFieldsButton').onclick = (button)=> {
              button.preventDefault()        
              document.querySelector('#form').clientUsername.value = ''
              document.querySelector('#form').clientName.value = ''
              document.querySelector('#form').clientEmail.value = ''
              document.querySelector('#form').clientPhone.value = ''
              document.querySelector('#form').clientAddress.value = ''
              document.querySelector('#form').clientPassword.value = ''              
            }

            this.$cancelEditionButton.onclick = (button) => {
              button.preventDefault()
              self.Events.cancelEdition(button)
            }

          })
  
        })
      })
      
    },

    confirmClientEdition: function (button) {
      const self = this
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
          if(data.message === 'success') {
            alert('Client successfully edited')
            document.querySelector('#editClientContainer').classList.add('hidden') 
          }
        })
      })
    },

    cancelEdition: function (button){
      document.querySelector('#editClientContainer').classList.add('hidden') 
     },

    resetValues: function (button) {

    },

    showHiddenItems: function (item) {
      const self = this

      const list = item.target.parentElement.nextElementSibling.nextElementSibling

      const search = item.target.parentElement.nextElementSibling

      if (list.classList.contains('hidden')) {
        list.classList.remove('hidden')
        search.classList.remove('hidden')
        item.target.classList.add('selected')

        if (item.target.innerText === 'Clients') {
          self.showClientList()

        } else if (item.target.innerText === 'Products') {
          self.showProductList()
        } else if (item.target.innerText === 'Orders') {
          self.showOrdersList()
        }

      } else {
        list.classList.add('hidden')
        search.classList.add('hidden')
        item.target.classList.remove('selected')

      }

    },



  }
}

buildAdminPage.init()


