import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import EmployeeCrud from '../components/EmployeeCrud.vue'
import Register from '../components/Register.vue'
import Login from '../components/Login.vue'
import LocationCrud from '../components/LocationCrud.vue'
import PasVehicule from '../components/PasVehicule.vue'
import PasLocation from '../components/PasLocation.vue'
import PasProprietaire from '../components/PasProprietaire.vue'
import PasClient from '../components/PasClient.vue'
import CreateVehicule from '../components/CreateVehicule.vue'
import EditVehicule from '../components/EditVehicule.vue'
import EditLocation from '../components/EditLocation.vue'
import ClientCrud from '../components/ClientCrud.vue'
import AgendaCrud from '../components/AgendaCrud.vue'
import BarChart from '../components/BarChart.vue'
import ProprietaireCrud from '../components/ProprietaireCrud.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/vehicule',
      name: 'EmployeeCrud',
      component: EmployeeCrud
    },
    {
      path: '/dashboard',
      name: 'BarChart',
      component: BarChart
    },
    {
      path: '/proprietaire',
      name: 'Proprietaire',
      component: ProprietaireCrud
    },
    {
      path: '/agenda/:matricule',
      name: 'AgendaCrud',
      component: AgendaCrud
    },
    {
      path: '/client',
      name: 'ClientCrud',
      component: ClientCrud
    },
    {
      path: '/location',
      name: 'LocationCrud',
      component: LocationCrud
    },
    {
      path: '/location/edit/:id',
      name: 'EditLocation',
      component: EditLocation
    },
    {
      path: '/registration',
      name: 'Register',
      component: Register
    },
    {
      path: '/pasvehicule',
      name: 'PasVehicule',
      component: PasVehicule
    },
    {
      path: '/vehicule/create',
      name: 'CreateVehicule',
      component: CreateVehicule
    },
    {
      path: '/vehicule/edit/:matricule',
      name: 'EditVehicule',
      component: EditVehicule
    },
    {
      path: '/paslocation',
      name: 'PasLocation',
      component: PasLocation
    },
    {
      path: '/pasproprietaire',
      name: 'PasProprietaire',
      component: PasProprietaire
    },
    {
      path: '/pasclient',
      name: 'PasClient',
      component: PasClient
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
