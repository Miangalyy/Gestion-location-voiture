<template>
        <div class="containerr">
            <aside>
                <div class="top">
                    <div class="logo">
                        <img src="../../../public/images/logo.png" alt="">
                        <h2 class="text-muted">EGA <span class="danger">TOR</span></h2>
                    </div>
                    <div class="close" id="close-btn">
                        <span class="material-icons-sharp">close</span>
                    </div>
                </div>
                <div class="sidebar" v-if="user">
                    <router-link to="/dashboard" :class="{ 'router-link-exact-active': isActiveRoute1 }">
                        <span class="material-icons-sharp">dashboard</span>
                        <h3>Dashboard</h3>
                    </router-link>
                        <router-link to="/vehicule" :class="{ 'router-link-exact-active': isActiveRoute }">
                            <span class="material-icons-sharp">directions_bus</span>
                            <h3>Vehicules</h3>
                        </router-link>
                    <router-link to="/client" :class="{ 'router-link-exact-active': isActiveRouteClient }">
                        <span class="material-icons-sharp">group</span>
                        <h3>Client</h3>
                    </router-link>
                    <router-link to="/location" :class="{ 'router-link-exact-active': isActiveRoute2 }">
                        <span class="material-icons-sharp">receipt_long</span>
                        <h3>Location</h3>
                    </router-link>
                    <router-link to="/proprietaire" :class="{ 'router-link-exact-active': isActiveRoute3 }">
                        <span class="material-icons-sharp">admin_panel_settings</span>
                        <h3>Proprietaire</h3>
                    </router-link>
    
                    <a>
                        <span class="material-icons-sharp">logout</span>
                        <h3 @click="confirmation">Logout</h3>
                    </a>
                    <v-dialog
                    v-model="dialog1"
                    max-width="320"
                    persistent
                  >
                    <v-list
                      class="py-2"
                      color="primary"
                      elevation="12"
                      rounded="lg"
                    >
                      <v-list-item
                        prepend-icon="$vuetify-outline"
                        title="Deconnexion a l' Application..."
                      >
                        <template v-slot:prepend>
                          <div class="pe-4">
                            <v-icon color="primary" size="x-large"></v-icon>
                          </div>
                        </template>
              
                        <template v-slot:append>
                          <v-progress-circular
                            color="primary"
                            indeterminate="disable-shrink"
                            size="16"
                            width="2"
                          ></v-progress-circular>
                        </template>
                      </v-list-item>
                    </v-list>
                  </v-dialog>
                </div>
                <div class="sidebar" v-else>
                    <router-link to="/pasvehicule">
                        <span class="material-icons-sharp">grid_view</span>
                        <h3>Vehicules</h3>
                    </router-link>
                <router-link to="/pasclient">
                    <span class="material-icons-sharp">person_outline</span>
                    <h3>Clients</h3>
                </router-link>
                <router-link to="/paslocation">
                    <span class="material-icons-sharp">receipt_long</span>
                    <h3>Location</h3>
                </router-link>
                <router-link to="/pasproprietaire">
                    <span class="material-icons-sharp">admin_panel_settings</span>
                    <h3>Proprietaire</h3>
                </router-link>

                <a>
                    <span class="material-icons-sharp">logout</span>
                    <h3 @click="dialog">Logout</h3>
                </a>
            </div>
            </aside>
            <!--End of aside -->
            <div class="right">
                <div class="top">
                    <button id="menu-btn">
                        <span class="material-icons-sharp">menu</span>
                    </button>
                    <div class="theme-toggler">
                        <span class="material-icons-sharp active">light_mode</span>
                        <span class="material-icons-sharp">dark_mode</span>
                    </div>
                    <div class="profile">
                        <div class="info" v-if="user">
                            <p>Hey, <b>{{ name }}</b></p>
                            <v-row justify="center">
                                <v-menu
                                transition="scale-transition"
                                  min-width="200px"
                                  rounded
                                >
                                  <template v-slot:activator="{ props }">
                                    <v-btn
                                      icon="mdi-chevron-down"
                                      class="menu ml-4"
                                      v-bind="props"
                                    >

                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-text>
                                      <div class="mx-auto text-center">
                                        <v-avatar size="large" color="warning">
                                            <span class="text-h5">{{ name.charAt(0) }}</span>
                                        </v-avatar>
                                        <h3 class="mt-2">{{ name }}</h3>
                                        <p class="text-caption mt-1">
                                          {{ email }}
                                        </p>
                                        <div class="text-start">
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                             prepend-icon="mdi-account"
                                              variant="text"
                                              @click="ouvrir(user.id)"
                                              rounded
                                            >
                                              Edit Account
                                            </v-btn>
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                            prepend-icon="mdi-logout"
                                              variant="text"
                                              @click="confirmation"
                                              rounded
                                            >
                                              Disconnect
                                            </v-btn>
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                            prepend-icon="mdi-help"
                                            class="ml-0"
                                              variant="text"
                                              rounded
                                            >
                                              Aide
                                            </v-btn>
                                        </div>
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-menu>
                              </v-row>
                        </div>
                        <div class="info" v-else>
                            <p>Hey, <b>Vous devez se connecter</b></p>
                        </div>
                        <div class="profile-photo">
                            <v-row justify="center mt-0">
                                <v-menu
                                transition="scale-transition"
                                  min-width="200px"
                                  rounded
                                >
                                  <template v-slot:activator="{ props }">
                                    <v-btn
                                      icon
                                      v-bind="props"
                                    >
                                    <v-avatar size="large" color="warning">
                                        <span v-if="user" class="text-h5">{{ name.charAt(0) }} </span>
                                        <span v-else class="text-h5">D</span>
                                    </v-avatar>
                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-text>
                                      <div class="mx-auto text-center">
                                        <v-avatar size="large" color="warning">
                                            <span class="text-h5">{{ name.charAt(0) }}</span>
                                        </v-avatar>
                                        <h3 class="mt-2">{{ name }}</h3>
                                        <p class="text-caption mt-1">
                                          {{ email }}
                                        </p>
                                        <div class="text-start">
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                             prepend-icon="mdi-account"
                                              variant="text"
                                              @click="ouvrir(user.id)"
                                              rounded
                                            >
                                              Edit Account
                                            </v-btn>
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                            prepend-icon="mdi-logout"
                                              variant="text"
                                              @click="confirmation"
                                              rounded
                                            >
                                              Disconnect
                                            </v-btn>
                                            <v-divider class="my-3"></v-divider>
                                            <v-btn
                                            prepend-icon="mdi-help"
                                            class="ml-0"
                                              variant="text"
                                              rounded
                                            >
                                              Aide
                                            </v-btn>
                                        </div>
                                      </div>
                                    </v-card-text>
                                  </v-card>
                                </v-menu>
                              </v-row>
                        </div>
                    </div>
                </div>
                <!--end of top-->
                <!--end od recent updates-->
            </div>
            <main>
                <router-view/>
                <div class="pa-4 text-center">
                    <v-dialog
                    v-model="dialog2"
                    max-width="600"
                    >
                    <v-form v-model="form" method="POST" @submit.prevent="modifUser(user.id)" class="form">
                        <v-card 
                        prepend-icon="mdi-account"
                        title="Modifier le profil">
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12" md="12" sm="12">
                                    <v-text-field
                                    prepend-inner-icon="mdi-account-circle"
                                    v-model="name"
                                    label="Nom*"
                                    :rules="[rules.required, rules.minNom]"
                                    required
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" sm="12">     
                                    <v-text-field
                                    prepend-inner-icon="mdi-email"
                                    v-model="email"
                                    label="Adresse email*"
                                    :rules="[rules.required, rules.min, rules.email]"
                                    type="email"
                                    required
                                  ></v-text-field>
                                  <span class="ErrorSpan" v-if="errorEmail">* {{ errorEmail }}</span>
                                </v-col>
                                <v-col cols="12" md="12" sm="12">
                                    <v-text-field
                                    prepend-inner-icon="mdi-lock-outline"
                                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="visible ? 'text' : 'password'"
                                    @click:append-inner="visible = !visible"
                                    v-model="ancien"
                                    label="Ancien Password*"
                                    :rules="[rules.required, rules.min]"
                                    required
                                  ></v-text-field>
                                  <span class="ErrorSpan" v-if="errorPassword">* {{ errorPassword }}</span>
                                </v-col>
                                <v-col cols="12" md="12" sm="12">
                                    <v-text-field
                                    prepend-inner-icon="mdi-lock-outline"
                                    :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                                    :type="visible2 ? 'text' : 'password'"
                                    @click:append-inner="visible2 = !visible2"
                                    v-model="nouveau"
                                    :rules="[rules.minPass]"
                                    label="Nouveau password*"
                                  ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                  
                            <v-btn
                              text="Fermer"
                              prepend-icon="mdi mdi-close"
                              variant="plain"
                              @click="closeDialog"
                            ></v-btn>
                  
                            <v-btn
                              :disabled="!form"
                              prepend-icon="mdi mdi-content-save"
                              color="primary"
                              text="Enregistrer"
                              variant="tonal"
                              type="submit"
                            ></v-btn>
                            <v-dialog
                            v-model="edituser"
                            max-width="320"
                            persistent
                          >
                            <v-list
                              class="py-2"
                              color="primary"
                              elevation="12"
                              rounded="lg"
                            >
                              <v-list-item
                                prepend-icon="$vuetify-outline"
                                title="Enregistrement..."
                              >
                                <template v-slot:prepend>
                                  <div class="pe-4">
                                    <v-icon color="primary" size="x-large"></v-icon>
                                  </div>
                                </template>
                      
                                <template v-slot:append>
                                  <v-progress-circular
                                    color="primary"
                                    indeterminate="disable-shrink"
                                    size="16"
                                    width="2"
                                  ></v-progress-circular>
                                </template>
                              </v-list-item>
                            </v-list>
                          </v-dialog>
                          </v-card-actions>
                    </v-card>
                    </v-form>
                </v-dialog>
                </div>
            </main>
            <!--end of main-->
        </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert2';
 export default {
    name: "SideBar",
    data () {
        return {
            user: null,
            edituser: false,
            visible2: false,
            visible: false,
            dialog1: false,
            dialog2: false,
            form: false,
            name: '',
            ancien: '',
            nouveau: '',
            email: '',
            errorEmail: '',
            errorPassword: '',
            links: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-folder', text: 'My Project', route: 'projects'},
                {icon: 'mdi-account', text: 'Team', route: '/team'},
            ],
         rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          minPass: v => v.length == 0 || v.length>=8 || 'Min 8 characters',
          minNom: v => v.length >= 4 || 'Min 4 characters',
          email: v => /.+@.+\..+/.test(v) || 'Veuillez saisir un email valide',
          emailMatch: () => (`The email and password you entered don't match`),
        },

        }
    },
    mounted () {
        console.log("mounted() called...............");
    },
   async created () {
      await this.fetchUser();
      await this.fetchUserUpdate(this.user.id);

    },
    computed: {
    isActiveRoute() {
        return this.$route.path.startsWith('/vehicule') || this.$route.path.startsWith('/vehicule/create') || this.$route.path.startsWith('/vehicule/edit') || this.$route.path.startsWith('/agenda');
      },
      isActiveRouteClient() {
        return this.$route.path.startsWith('/client');
      },
      isActiveRoute2() {
        return this.$route.path.startsWith('/location') || this.$route.path.startsWith('/location/edit');
      },
      isActiveRoute1() {
        return this.$route.path.startsWith('/dashboard');
      },
      isActiveRoute3() {
        return this.$route.path.startsWith('/proprietaire');
      }
      
    },
    methods: {
    async fetchUser() {
      try {
        // Effectuer une requête GET à votre backend pour récupérer les informations de l'utilisateur
        const response = await axios.get('http://localhost:8800/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Mettre à jour les données de l'utilisateur dans le composant avec les informations reçues du backend
        this.user = response.data;
        //this.name = response.data.name;
        //this.email = response.data.email;
      } catch (error) {
        // Gérer les erreurs en cas de problème lors de la récupération des informations de l'utilisateur
        console.error('Error fetching user:', error.message);
      }
    },
    async fetchUserUpdate(id) {
      try {
        // Effectuer une requête GET à votre backend pour récupérer les informations de l'utilisateur
        const response = await axios.get(`http://localhost:8800/userupdate?id=${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        // Mettre à jour les données de l'utilisateur dans le composant avec les informations reçues du backend
        const responseData = response.data.data[0];
        console.log("UpdateProfile:",responseData.name);
        this.name = responseData.name;
        console.log('nameUpdate: ', this.name);
        this.email = responseData.email;
      } catch (error) {
        // Gérer les erreurs en cas de problème lors de la récupération des informations de l'utilisateur
        console.error('Error fetching user:', error.message);
      }
    },
    ouvrir (id) {
        this.dialog2 = true;
        this.fetchUserUpdate(id);
    },
   async modifUser(id) {
        try {
            this.edituser = true;
            this.formatError();
            const response = await axios.put(`http://localhost:8800/modifier?id=${id}`, {
                name: this.name, email: this.email, oldPassword: this.ancien, newPassword: this.nouveau
            },
          {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('message : ',response.data);
        if(response.data.message == 'User profile updated successfully') {

            setTimeout(() => {
              this.edituser = false;
              this.fetchUserUpdate(id);
              this.dialog2 = false;
              swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "User enregistrer dans la base de donnée",
                    showConfirmButton: false,
                    timer: 1800
                });
            }, 4000);

            this.formatInput();
            
        } 

        } catch (error) {
            this.edituser = false;
            if (error.response.data.message === 'Email already exists') {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "L'adresse email existe deja :(",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.errorEmail = "L'adresse email existe deja :(";
        }
        if (error.response.data.message == 'Incorrect old password'){
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "L'ancien mot de passe est incorrecte :(",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.errorPassword = "L'ancien mot de passe est incorrecte :(";
        }

            console.log(error);
        }
    },
   async modif () {
        this.dialog1 = true;
    },
   async dialog () {
        await this.modif();
        await this.logout();
    },
    closeDialog() {
        this.formatError();
        this.formatInput();
        this.dialog1 = false; // Ferme le v-dialog
        this.dialog2 = false;
    },
    formatInput () {
        this.nouveau = '';
        this.ancien = null;
    },
    formatError () {
        this.errorEmail = '';
        this.errorPassword = '';
    },

    async logout() {
      try {
        this.dialog1 = true;
        await axios.post(this.$apiURL + "/logout", null,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      }) // Assurez-vous que le point de terminaison correspond à votre backend
        .then(response => {
         console.log(response);
         // swal.fire('Success', response.data.message, 'success');
          // Vous pouvez ajouter d'autres actions de nettoyage ici, par exemple, rediriger vers la page de connexion
          localStorage.removeItem('token');
          //this.$router.push('/');

          setTimeout(() => {
                this.user = null;
                this.dialog1 = false;
                this.$router.push('/');
            }, 4000);
        })
        .catch(error => {
          console.error('Error logging out:', error);
          swal.fire('Error', 'An error occurred while logging out. Please try again later.', 'error');
        });
      } catch (error) {
        console.error('Error logging out:', error);
          swal.fire('Error', 'An error occurred while logging out. Please try again later.', 'error');
      }
    },
    confirmation(){ 
    this.$swal.fire({
    title: 'Voulez vous vraiment',
    text: "se deconnectez ?",
    icon: 'warning',
    showCancelButton: true,
   // confirmButtonColor: '#2a2185',
   // cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, continuer.',
    cancelButtonText: 'Non, fermer.',
  }).then((result) => {
    if (result.isConfirmed) {
        this.logout();
    } else if (result.isDenied) {
      this.$swal.close()
    }
  })
     
    },

   },
}
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons+Sharp");
@import url("https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css");
:root {
    --color-primary: #7380ec;
    --color-danger: #ff7782;
    --color-success: #41f1b6;
    --color-warning: #ffbb55;
    --color-white: #fff;
    --color-dark: #7d8da1;
    --color-light: rgba(132, 139, 200, 0.18);
    --color-primary-variant: #111e88;
    --color-dark-variant: #677483;
    --color-background: #f6f6f9;
    --color-info-dark: #7d8da1;
    --color-info-light: #dce1eb;
    --color-hover-select: #f2f2f2;

    --card-border-radius: 2rem;
    --border-radius-1: 0.4rem;
    --border-radius-2: 0.8rem;
    --border-radius-3: 1.2rem;

    --card-padding: 1.8rem;
    --padding-1: 1.2rem;

    --box-shadow: 0 2rem 3rem var(--color-light);
}
/* dark theme variables */
.dark-theme-variables {
    --color-background: #181a1e;
    --color-white: #202528;
    --color-dark: #edeffd;
    --color-dark-variant: #a3bdcc;
    --color-light: rgba(0, 0, 0, 0.4);
    --color-info-dark: #dce1eb;
    --color-info-light: #202528;
    --box-shadow: 0 2rem 3rem var(--color-light);
    --color-hover-select:  rgba(0, 0, 0, 0.4);
}
* {
    margin: 0;
    padding: 0;
    outline: 0;
    appearance: none;
    border: 0;
    text-decoration: none;
    list-style: none;
    box-sizing: border-box;
}
html {
    font-size: 14px;
}

body {
    width: 100vw;
    height: 100vh;
    font-family: 'Poppins', sans-serif;
    font-size: 0.88rem;
    background: var(--color-background);
    user-select: none;
    overflow-x: hidden;
    color: var(--color-dark);
}
.containerr {
    display: grid;
    width: 96%;
    margin: 0 auto;
    gap: 1.89rem;
    grid-template-columns: 14rem  auto;
}
a {
    
    color: var(--color-dark);
    text-decoration: none;
}
img {
    display: block;
    width: 100%;
}
h1 {
    font-weight: 800;
    font-size: 1.6rem;
 
}
h2 {
    font-size: 1.4rem;
}
h3 {
    font-size: 0.87rem;
}
h4 {
    font-size: 0.8rem;
}
h5 {
    font-size: 0.77rem;
}
small {
    font-size: 0.75rem;
}
.profile-photo {
    width: 2.8rem;
    height: 2.8rem;
    border-radius: 50%;
    overflow: hidden;
}
.text-muted {
    color: var(--color-info-dark);
}
p {
    color: var(--color-dark-variant);
}
b {
    color: var(--color-dark);

}
.primary {
    color: var(--color-primary);
    
}
.danger {
    color: var(--color-danger);
}
.success {
    color: var(--color-success);
}
.warning {
    color: var(--color-warning);
}
aside {
    display: block;
    height: 100vh;
    left: 0;
}
aside .top {
    background: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1.4rem;
    position: fixed;
    width: 224px;
}
aside .logo {
    display: flex;
    gap: 0.8rem;
}
aside .logo img {
    width: 2em;
    height: 2rem;
}
aside .close {
    display: none;
}
/* sidebar */

aside .sidebar {
    background: var(--color-white);
    display: flex;
    flex-direction: column;
    height: 86vh;
    position: fixed;
    width: 224px;
    margin-top: 6.3rem;
    overflow: hidden;
}
aside h3 {
    font-weight: 500;
}
aside .sidebar a {
    display: flex;
    color: var(--color-info-dark);
    margin-left: 2rem;
    gap: 1rem;
    align-items: center;
    position: relative;
    height: 3.9rem;
    transition: all 300ms ease;
    cursor: pointer;
}
aside .sidebar a span {
    margin-bottom: 7px;
    font-size: 1.6rem;
    transition: all 300ms ease;
}
aside .sidebar a:last-child {
    position: absolute;
    bottom: 2rem;
    width: 100%;
}
aside .sidebar .router-link-exact-active {
    background: var(--color-light);
    color: var(--color-primary);
    margin-left: 0;
}
aside .sidebar .router-link-exact-active::before {
    content: "";
    width: 6px;
    height: 100%;
    background: var(--color-primary);
}
aside .sidebar .router-link-exact-active span {
    color: var(--color-primary);
    margin-left: calc(1rem -3px);
}
aside .sidebar a:hover {
    color: var(--color-primary);
}
aside .sidebar a.active span {
    color: var(--color-primary);
    margin-left: calc(1rem - -3px);
}
aside .sidebar a:hover span {
    margin-left: 1rem;
}
aside .sidebar .message-count {
    background: var(--color-danger);
    color: var(--color-white);
    padding: 2px 10px;
    font-size: 11px;
    border-radius: var(--border-radius-1);
}

/*main*/
main {
    margin-top: 1.2rem;
    width: 100%;
}
main .date {
    display: inline-block;
    background: var(--color-white);
    border-radius: var(--border-radius-1);
    box-shadow: var(--box-shadow);
    margin-top: 2rem;
    padding: 0.5rem 1.6rem;
    padding: 10px;
    width: 200px;
}
main .date input[type="date"],
main .date input[type="text"] {
    background: transparent;
    padding: 5px;
    width: 90%;
    font-size: 15px;
    color: var(--color-dark-variant);
}
main .insights {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.6rem;
}
main .insights > div {
    height: 100px;
    text-align: start;
    padding: 5px;
    border-radius: var(--card-border-radius);
    margin-top: .5rem;
    transition: all 300ms ease;
}
main .insights > div:hover {
    box-shadow: none;
}
main .insights > div span {
    background: var(--color-primary);
    padding: 0.5rem;
    border-radius: 50%;
    color: var(--color-white);
    font-size: 2rem;
}
main .insights > div.expenses span {
    background: var(--color-danger);
}
main .insights > div.income span {
    background: var(--color-success);
}
main .insights > div .middle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
main .insights h3 {
    margin: 1rem 0 0.6rem;
    font-size: 1rem;
}
main .insights .progress {
    position: relative;
    width: 92px;
    height: 92px;
    border-radius: 50%;
}
main .insights svg {
    width: 7rem;
    height: 7rem;
}
main .insights svg circle {
    fill: none;
    stroke: var(--color-primary);
    stroke-width: 14;
    stroke-linecap: round;
    transform: translate(5px, 5px);
    stroke-dasharray: 110;
    stroke-dashoffset: 92;
}
main .insights .sales svg circle {
    stroke-dashoffset: -30;
    stroke-dasharray: 200;
}
main .insights .expenses svg circle {
    stroke-dashoffset: 20;
    stroke-dasharray: 80;
}
main .insights .income svg circle {
    stroke-dashoffset: 35;
    stroke-dasharray: 110;
}
main .insights .progress .number {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
main .insights small {
    margin-top: 1.3rem;
    display: block;
}
/* recent orders */
main .recent-orders {
    margin-top: 2rem;
}
main .recent-orders h2 {
    margin-bottom: 0.8rem;
}
main .recent-orders table {
    background: var(--color-white);
    width: 100%;
    /*border-radius: var(--card-border-radius);*/
    padding: var(--card-padding);
    text-align: center;
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
    
}
main .recent-orders table:hover {
    box-shadow: none;
}
main table tbody td {
    height: 2.8rem;
    border-bottom: 1px solid var(--color-light);
    color: var(--color-dark-variant);
}
main table tbody tr:last-child td {
    border: none;
}
main .recent-orders a {
    text-align: center;
    display: block;
    margin: 1rem auto;
    color: var(--color-primary);
}
/* right*/
.right {
    position: absolute;
    top: 0;
    right: 0;
}
.right .top {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    margin-top: 1.2rem;
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
.right .top #menu-btn {
    display: none;
}
.right .theme-toggler {
    background: var(--color-light);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.6rem;
    width: 4.2rem;
    cursor: pointer;
    border-radius: var(--border-radius-1);
}
.right .theme-toggler span {
    font-size: 1.2rem;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.right .theme-toggler span.active {
    background: var(--color-primary);
    color: white;
    border-radius: var(--border-radius-1);
}
.profile .info small {
    margin-top: 0px!important;
}
.ErrorSpan {
    font-size: 14px;  
    margin: -15px 0;
    color: red;
  }
.profile .info {
    display: flex;
    justify-content: center;
    align-items: center;
}
.menu {
    background: var(--color-background)!important;
    border: none;
    margin-top: -13px;
    box-shadow: none!important;
}
.right .top .profile {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
    text-align: right;
}
.right .top .profile .profile-photo {
   margin-top: -10px;
   margin-right: 2rem;
}
/* recent updates */
.right .recent-updates {
    margin-top: 1rem;
}

.right .recent-updates h2 {
    margin-bottom: 0.8rem;
}
.right .recent-updates .updates {
    background: var(--color-white);
    padding: var(--card-border-radius);
    border-radius: var(--card-border-radius);
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}
.right .recent-updates .updates:hover {
    box-shadow: none;
}
.right .recent-updates .updates .update {
    display: grid;
    grid-template-columns: 2.6rem auto;
    gap: 1rem;
    margin-bottom: 1rem;
}
/* sales analytics*/

.right .sales-analytics {
    margin-top: 2rem;
}
.right .sales-analytics h2 {
    margin-bottom: 0.8rem;
}
.right .sales-analytics .item {
    background: var(--color-white);
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.7rem;
    padding: 1.4rem var(--card-padding);
    border-radius: var(--border-radius-3);
    box-shadow: var(--box-shadow);
    transition: all 300ms ease;
}
.right .sales-analytics .item:hover {
    box-shadow: none;
}
.right .sales-analytics .item .right {
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin: 0;
    width: 100%;
}
.right .sales-analytics .item .icon {
    padding: 0.6rem;
    color: var(--color-white);
    border-radius: 50%;
    background: var(--color-primary);
    display: flex;
}
.right .sales-analytics .item.offline .icon {
    background: var(--color-danger);
}
.right .sales-analytics .item.customers .icon {
    background: var(--color-success);
}
 .add-product {
    background: transparent;
    border: 2px dashed var(--color-primary);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px!important;
    margin-top: 80px!important;
    margin-left: -20px;
}
 .add-product div {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    transition: 400ms ease;
}
.add-product button {
    font-weight: 500;
    color: var(--color-primary);
    font-size: 15px;
    background: transparent;
}
 .add-product:hover{
    background: var(--color-primary);
    color: white;
}
.add-product:hover h3,
.add-product:hover button {
    color: white;
}
.right .sales-analytics .add-product div h3 {
    font-weight: 600;
}

@media screen and (max-width: 1200px) {
    .containerr {
        width: 94%;
        grid-template-columns: 7rem auto 23rem;
    }
    aside {
        display: block;
        left: 0;
    }
    aside .logo h2 {
        display: none;
    }
    aside .sidebar h3 {
        display: none;
    }
    aside .sidebar a {
        width: 5.6rem;
    }
    aside .sidebar a:last-child {
        position: relative;
        margin-top: 1.8rem;
    }
    main .insights {
        grid-template-columns: 1fr;
        gap: 0;
    }
    main .recent-orders {
        width: 94%;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin: 2rem 0 0 0.8rem;
    }
    main .recent-orders table {
        width: 83vw;
    }
    main table thead tr td:last-child,
    main table thead tr td:first-child {
        display: none;
    }
}
/* media queries */
@media screen and (max-width: 768px) {
    .containerr {
        width: 100%;
        grid-template-columns: 1fr;
    }
    aside {
        position: fixed;
        left: -100%;
        background: var(--color-white);
        width: 18rem;
        z-index: 3;
        box-shadow: 1rem 3rem 4rem var(--color-light);
        height: 100vh;
        padding-right: var(--card-padding);
        display: none;
        animation: showMenu 400ms ease forwards;
        
    }
    @keyframes showMenu {
        to {
            left: 0;
        }
    }
    aside .logo {
        margin-left: 1rem;

    }
    aside .logo h2 {
        display: inline;
        margin-left: 1rem;
    }
    aside .sidebar h3 {
        display: inline;
    }
    aside .sidebar a {
        width: 100%;
        height: 3.4rem;
    }
    aside .sidebar a:last-child {
        position: absolute;
        bottom: 5rem;
    }
    aside .close {
        display: inline-block;
        cursor: pointer;
        margin-left: 3rem;
    }
    main {
        margin-top: 8rem;
        padding: 0 1rem;
    }
main .insights > div {
    width: 100%;
}
    main .recent-orders {
        position: relative;
        margin: 3rem 0 0 0;
        width: 100%;
    }
    main .recent-orders table {
        width: 100%;
        margin: 0;
    }
    .right {
        width: 94%;
        margin: 0 auto 4rem;
    }
    .right .top {
        position: fixed;
        top: 0;
        left: 0;
        align-items: center;
        padding: 0 0.8rem;
        height: 4.6rem;
        background: var(--color-white);
        width: 100%;
        margin: 0;
        z-index: 2;
        box-shadow: 0 1rem 1rem var(--color-light);
    }
    .right .top .theme-toggler {
        width: 4.4rem;
        top: 25%;
        position: absolute;
        left: 40%;
    }
    .right .top #menu-btn {
        display: inline-block;
        background-color: transparent;
        cursor: pointer;
        color: var(--color-dark);
        position: absolute;
        left: 1rem;
    }
    .right .top #menu-btn span {
        font-size: 2rem;
    }
    .right .top .profile .profile-photo {
        margin-right: 0rem;
     }



}
</style>
