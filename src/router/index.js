import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddContact from '../views/AddContact';
import EditContact from '../views/EditContact';
import ContactDetails from '../views/ContactDetails';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addcontact',
    name: 'AddContact',
    component: AddContact
  },
  {
    path: '/editcontact/:id',
    name: 'EditContact',
    component: EditContact
  },
  {
    path: '/contactdetails/:id',
    name: 'ContactDetails',
    component: ContactDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
