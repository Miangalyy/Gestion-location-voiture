
<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div v-if="myModel" id="myModal" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h2 class="modal-title">Modification du voiture</h2>
                  <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <div id="about" class="py-5">
                      <div class="container">
                          <div class="row gy-lg-5 align-items-center rowe">
                              <div class="col-lg-6 order-lg-1 text-center text-lg-start">
                                  <div class="title pt-0 pb-5">
                                      <h2 class="position-relative d-inline-block ms-4">{{ editer.matricule }}</h2>
                                  </div>
                                  <p><b class="titre"> Numero de la voiture: </b> {{ editer.matricule }}</p>
                                  <p><b class="titre"> Proprietaire: </b> {{ editer.idPropretaire }}</p>
                                  <p><b class="titre"> Marque de la voiture: </b> {{ editer.marque }}</p>
                                  <p><b class="titre"> Nombre de place: </b> {{ editer.nbPlace }}</p>
                                  <p><b class="titre"> Prix de la location: </b> {{ editer.prix_location }}</p>
                                  <p><b class="titre"> Disponibilite: </b> {{ editer.disponibilite }}</p>
                                  <div class="footer mt-2">
                                    <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="redirection(editer.matricule)" class="btn btn-success">Modifier</button>
                                    <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="redirection2(editer.matricule)" class="btn btn-success">Agenda</button>
                                    <button @click="closeModal" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#myModal">Annuler</button>
                                  </div>
                              </div>
                              <div class="col-lg-6 order-lg-0">
                                  <img :src="getAttachmentUrl(editer.attachment)" alt="" class="img-fluid">
                              </div>
                          </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h1>Filtrez vos donnees ici</h1>
    <div class="insights">
      <div class="sales">
          <div class="middle">
              <div class="left">
                <div class="select-menu">
                  <div class="select-btn" @click="ouvrirSelect">
                      <span v-if="textSelected" class="sBtn-text">{{ textSelected }}</span>
                      <span v-else class="sBtn-text">Filtrer par proprietaire</span>
                      <i class="bx bx-chevron-down"></i>
                  </div>
          
                  <ul class="options">
                 <li class="option">
                      <span class="option-text" @click="FonctionSelectedTextParDefaut()">Filtrer par proprietaire</span>
                  </li>
                      <li class="option" :key="proprietaire.id" :value="proprietaire.id" v-for="proprietaire in proprietaires">
                          <i class="bx bx-user"></i>
                          <span class="option-text" @click="FonctionSelectedText(proprietaire.nom +' '+ proprietaire.prenom, proprietaire.id_propretaire)">{{ proprietaire.nom }} {{ proprietaire.prenom }}</span>
                      </li>
                  </ul>
              </div>
              </div>
          </div>
      </div>
      <div class="expenses">
          <div class="middle">
              <div class="left">                 
                <div class="select-menu menu-dispo">
                  <div class="select-btn btn-dispo" @click="ouvrirSelectDispo">
                      <span v-if="textDisponible" class="sBtn-text">{{ textDisponible }}</span>
                      <span v-else class="sBtn-text">Filtrer par disponibilite</span>
                      <i class="bx bx-chevron-down"></i>
                  </div>
                  
                  <ul class="options">
                    <li class="option date-option" @click="FonctionSelectedTextParDefaut()">
                      <button class="btn">Reset</button>
                    </li>
                    <li class="option date-option">
                      <p class="dateSearch">Date de debut</p>
                      <input type="date" v-model="date_debut">
                    </li>
                    <li class="option date-option">
                      <p class="dateSearch">Date de fin</p>
                      <input type="date" v-model="date_fin">
                    </li>
                    <li class="option date-option">
                      <button @click="vehiculeDispo" class="btn">Search</button>
                    </li>
                  </ul>
              </div>
              </div>
          </div>
      </div>
      <div class="income">
          <div class="middle">
              <div class="left">
                  <div class="input-groupe">
                    <input @keyup="SearchLoad" type="search" placeholder="Search Data..." class="rien" v-model="searchTerm">
                    <img src="../../public/images/search.png" alt="" style="cursor: pointer;">
                </div>
              </div>
          </div>
      </div>
      <div class="income">
        <div class="middle">
            <div class="left">
              <div class="add-product">
                    <span class="material-icons-sharp">add</span>
                   <router-link to="/vehicule/create" style="text-decoration: none; font-size: 18px;"><h3 class="add">Ajouter</h3></router-link>   
            </div>
            </div>
        </div>
    </div>
  </div>
    <!--<div class="tables">
        <section class="table_header">
          <section class="table_header">
            <h2>Liste des locations</h2>
            <button class="btn btn-success btn-xs mb-2 mt-2" data-bs-toggle="modal" data-bs-target="#myModal" @click="openModel" style="margin-right: 15px; display: none;"><i class="fa fa-add"></i> Ajouter</button>
        </section>
        </section>
        <section class="table_body">
          <table>
            <thead>
                <tr>
                    <th scope="col">Matricule</th>
                    <th scope="col">Nom voiture</th>
                    <th scope="col">Marque</th>
                    <th scope="col">Proprietaire</th>
                    <th scope="col">Prix_location</th>
                    <th scope="col">Pourcentage</th>
                    <th scope="col">Nombre de Place</th>
                    <th scope="col">Carburant</th>
                    <th scope="col">Option</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="voiture in result" v-bind:key="voiture.matricule">
                    <td>{{ voiture.matricule }}</td>
                    <td>{{ voiture.nomVoiture }}</td>
                    <td>{{ voiture.marque }}</td>
                    <td>{{ voiture.idPropretaire }}</td>
                    <td>{{ voiture.prix_location }}</td>
                    <td>{{ voiture.pourcentage }}</td>
                    <td>{{ voiture.nbPlace }}</td>
                    <td>{{ voiture.carburant }}</td>
                    <td style="width: 180px;">
                        <button @click="redirection2(voiture.matricule)" type="button" name="edit" class="status warning"><span class="material-icons-sharp">visibility</span></button>
                        <button @click="redirection(voiture.matricule)" type="button" class="status primary"><span class="material-icons-sharp">edit</span></button>
                        <button @click="deleteEmployee(voiture.matricule)" type="button" class="status danger"><span class="material-icons-sharp">delete</span></button>
                    </td>
                </tr>
            </tbody>
        </table>
        
  ----  <div v-if="pagination" class="pagination">
      <button @click="fetchPage(1)" :disabled="pagination.currentPage === 1">First</button>
      <button @click="fetchPage(pagination.currentPage - 1)" :disabled="pagination.currentPage === 1">Previous</button>
      <button v-for="pageNumber in pagination.totalPages" :key="pageNumber" @click="fetchPage(pageNumber)">
        {{ pageNumber }}
      </button>
      <button @click="fetchPage(pagination.currentPage + 1)" :disabled="pagination.currentPage === pagination.totalPages">Next</button>
      <button @click="fetchPage(pagination.totalPages)" :disabled="pagination.currentPage === pagination.totalPages">Last</button>
    </div>
        </section>
    </div>-->
    <div class="vehicule">
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" v-for="(vehicule, i) in result" :key="i">
            <v-card class="mx-auto" max-width="344">
                <v-img :src="getAttachmentUrl(vehicule.attachment)" height="200px" cover></v-img>
                <v-divider></v-divider>
                <v-card-title>
                    {{ vehicule.nomVoiture }}
                </v-card-title>
                <v-card-text>
                  {{ vehicule.nbPlace }} places
                </v-card-text>
                <v-card-actions>
                    <v-btn prepend-icon="mdi mdi-cart">{{ vehicule.prix_location }} Ar/Jours</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn @click="redirection2(vehicule.matricule)" color="warning" variant="text" icon="mdi-eye-arrow-left"></v-btn>
                    <v-btn @click="deleteEmployee(vehicule.matricule)" color="danger" variant="text" icon="mdi-delete"></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    <div class="text-center paginations">
      <v-pagination
      color="primary"
        v-model="pagination.currentPage"
        :length="pageCount"
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        @next="fetchPage(pagination.currentPage)"
        @prev="fetchPage(pagination.currentPage)"
        @click="fetchPage(pagination.currentPage)"
      ></v-pagination>
    </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
 export default {
  name: "EmployeeCrud",
  data () {
    return {
        textSelected: '',
        date_debut: '',
        date_fin: '',
        textDisponible: '',
        disponibilite: '',
        idpropretaire: '',
        proprietaires: [],
        filtreProprietaire: '',
        searchTerm: '',
        editer: null,
        result: [],
        myModel: false,
        pagination: null,
    }
  },

  created() {
    this.EmployeeLoad();
    this.proprietaireLoad();
  },
  mounted() {
    console.log("mounted() called...............");
    console.log(this.result);
  },
  computed: {
      pageCount () {
        return (this.pagination.totalPages)
      },
    },
  methods: {
    FonctionSelectedText (text, id) {
      this.textSelected = text;
      this.idpropretaire = id;
      this.FiltrerParProprietaire();
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.remove("active");
    },
    FonctionSelectedTextParDefaut () {
      this.textSelected = "Filtrer par proprietaire";
      this.disponibilite = '';
      this.textDisponible = '';
      this.idpropretaire = '';
      this.date_debut = '';
      this.date_fin = '';
      this.EmployeeLoad();
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.remove("active");
      const optionMenuDispo = document.querySelector(".menu-dispo");
      optionMenuDispo.classList.remove("active");
    },
    ouvrirSelect () {
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.toggle("active");
    },
    ouvrirSelectDispo () {
      const optionMenu = document.querySelector(".menu-dispo");
      optionMenu.classList.toggle("active");
    },
    vehiculeDispo (){
      this.textDisponible = "Vehicule disponible";
      this.disponibilite = 1;
      this.FiltrerParDisponibilite();
      const optionMenu = document.querySelector(".menu-dispo");
      optionMenu.classList.remove("active");
    },
    vehiculeNonDispo (){
      this.textDisponible = "Vehicule non disponible";
      this.disponibilite = 0;
      this.FiltrerParDisponibilite();
      const optionMenu = document.querySelector(".menu-dispo");
      optionMenu.classList.remove("active");
    },
    async EmployeeLoad(page = 1, pageSize = 8)
    {
        const response = await axios.get(`http://localhost:8800/vehicule?page=${page}&pageSize=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.result = response.data.data;
        this.pagination = response.data;
        console.log(this.pagination);
        
    },
    async proprietaireLoad()
    {
        const response = await axios.get('http://localhost:8800/vehicule/proprietaire', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.proprietaires = response.data.data;
        
    },
    fetchPage(page) {
      const pageSize = this.pagination.pageSize; // Récupère la taille de la page actuelle
      this.EmployeeLoad(page, pageSize);
    },
    paginate () {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        const page = this.pagination.currentPage + 1;
        this.fetchPage(page);
      }
      if (this.pagination.currentPage != 1) {
        const page = this.pagination.currentPage - 1;
        this.fetchPage(page);
      }
    },
    async SearchLoad() {
    try {
        const response = await axios.post('http://localhost:8800/vehicule/search', {
            searchTerm: this.searchTerm
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        this.result = response.data.data;
        console.log(this.result);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},
async FiltrerParProprietaire() {
    try {
        const response = await axios.post('http://localhost:8800/vehicule/filtrerParProprietaire', {
            searchTerm: this.idpropretaire
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        
        this.result = response.data.data;
        console.log(this.result);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},
async FiltrerParDisponibilite() {
    try {
        const response = await axios.post('http://localhost:8800/vehicule/filtrerParDisponibilite', {
            searchTerm1: this.date_debut,
            searchTerm2: this.date_fin
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        this.result = response.data.data;
        console.log(this.result);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},

    edit(voiture)
    {
        this.myModel = true;
        this.editer = voiture;
    },
    getAttachmentUrl(attachment) {
            // Assurez-vous que l'attachment est défini et non nul
            if (attachment) {
                // Remplacez 'http://127.0.0.1:8800/' par l'URL de votre serveur où les images sont stockées
                const imageUrl = `http://localhost:8800/${attachment.replace(/\\/g, "/")}`;
                return imageUrl;

            } else {
                // Si aucun attachment n'est disponible, retournez une URL d'image par défaut ou une chaîne vide selon vos besoins
                return ''; // ou return 'URL_DE_VOTRE_IMAGE_PAR_DEFAUT.jpg';
            }
        },
    openModel(){
      this.myModel = true;
    },

  closeModal()
  {  this.myModel = false;
  },
    redirection (matricule) {
      this.closeModal();
     this.$router.push({ name: 'EditVehicule', params: { matricule: matricule } });
    
    },
    redirection2 (matricule) {
      this.closeModal();
     this.$router.push({ name: 'AgendaCrud', params: { matricule: matricule } });
    
    },

    deleteEmployee(voiture){
    var id = voiture;    
    this.$swal.fire({
    title: 'Voulez vous vraiment ?',
    text: "le supprimer",
    icon: 'warning',
    showCancelButton: true,
   // confirmButtonColor: '#2a2185',
   // cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, continuer.',
    cancelButtonText: 'Non, fermer.',
  }).then((result) => {
    if (result.isConfirmed) {
        this.removeEmployee(id);
    } else if (result.isDenied) {
      this.$swal.close()
    }
  })
     
    },
    async removeEmployee(voiture)
    {
      //  var url = `http://localhost:8800/vehicule/${voiture}`;
      const response = await axios.delete(`http://localhost:8800/vehicule/${voiture}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
                if (response.data.status == true){
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Vehicule supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.EmployeeLoad();
                } else {
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Vehicule non supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });

                }
        

    },

  }

 }
</script>
<style scoped>

  .tables {
    margin-top: 46px;
    height: 599px;
    background-color: var(--color-white);
    backdrop-filter: blur(7px);
    box-shadow: var(--box-shadow);
    border-radius: .8rem;
    overflow: hidden;
    
  }
  
  .table_header {
    color: var(--color-dark);
    margin-bottom: 20px;
    width: 100%;
    height: 15%;
    background-color: var(--color-info-light);
    padding: .8rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.table_header h2 {
  margin-top: 15px;
  margin-left: 0px;
  font-size: 25px;
}
 .input-groupe {
  width: 344px;
  height: 50px;
  background-color: var(--color-white);
  padding: 0 .8rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px;
  margin-top: 28px;
  transition: 0.2s;
}

 .input-groupe:hover {
  background-color: var(--color-white);
  box-shadow: 0 .1rem .4rem #0002;
}
 .input-groupe img {
  width: 1.2rem;
  height: 1.2rem;
}
 .input-groupe input {
  width: 100%;
  padding: 0 .5rem 0 .3rem;
  background-color: transparent;
  border: none;
  outline: none;
  color: var(--color-dark);
}
.table_body{
  width: 94%;
  max-height: calc(80% - 1.6rem);
  background-color: var(--color-white);
  margin: .8rem auto;
  border-radius: .6rem;
  overflow: auto;
  overflow: overlay;
}
.table_body table {
  width: 100%;
  text-align: center;
}

.table_body::-webkit-scrollbar{
  width: 0.5rem;
  height: 0.5rem;
}
.table_body::-webkit-scrollbar-thumb{
  border-radius: .5rem;
  background-color: #0004;
 
}
.table_body table tbody td {
  font-size: 13px;
  height: 3.8rem;
  border-bottom: 1px solid var(--color-light);
  color: var(--color-dark-variant);
}
.table_body table tbody tr:last-child td {
  border: none;
}
thead th {
  position: sticky;
  cursor: pointer;
  text-transform: capitalize;
}
.status {
  width: 50px;
  padding: .2rem 0;
  margin-right: 10px;
  border-radius: var(--border-radius-1);
  text-align: center;
  color: var(--lightHover);
  background: var(--lightHover) !important;
  box-shadow: 0 .1rem .2rem var(--color-dark);
  transition: 400ms ease-in-out;
}
.status:hover {
  box-shadow: none;
}
.status span {
  font-size: 20px;
}
.status.danger {
  color: var(--color-danger);
}
.status.success {
  color: var(--color-success);
}
.status.warning {
  color: var(--color-warning);
}
.add {
  color: var(--color-primary);
  font-size: 18px;
}

.modal-content {
  width: 800px;
}
.rowe {
  margin-top: -50px;
  align-items: center;
  justify-content: center;
}
.text-center {
  text-align: center;
}
.footer {
  padding: 10px 0;
}
.footer .btn-success {
  background: var(--color-success);
  border: none;
  margin-right: 10px;
}
.footer .btn-danger {
  background: var(--color-danger);
  border: none;
}
.footer .btn-success:hover {
  font-weight: bold;
}
.footer .btn-danger:hover {
  font-weight: bold;

}
p {
  font-size: 14px;
}
.title h2::before{
  position: absolute;
  content: "";
  width: 4px;
  height: 40px;
  background-color: var(--color-primary);
  top: -10px;
  left: -20px;
  top: 50%;
  -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
          transform: translateY(-50%);
}
.order-lg-0{
  height: 100%;
}
img {
  width: 100%;
  height: 100%;
}
.select-box2{
  color: #fff;
  text-align: center;
  width: 100%;
  font-size: 20px;
  appearance: none;
  border: none;
  padding: 0 30px 0 15px;
  background: #6B8E23;
}

/*--select-menu--*/
.select-menu {
  margin-top: 28px;
  width: 344px;
}
.select-menu .select-btn {
  display: flex;
  height: 55px;
  background: var(--color-white);
  padding: 20px;
  font-size: 18px;
  font-weight: 400;
  border-radius: 8px;
  align-items: center;
  cursor: pointer;
  justify-content: space-between;
}
.select-btn i {
  color: var(--color-primary);
  font-size: 25px;
  transition: 0.5s;
}
.select-btn .sBtn-text {
  background: transparent;
  font-size: 16px;
  color: var(--color-dark);
}
.select-menu.active .select-btn i {
  transform: rotate(-180deg);
}
.select-menu .options {
  display: none;
  z-index: 1;
  position: relative;
  padding: 20px;
  margin-top: 10px;
  border-radius: 8px;
  background: var(--color-white);
  box-shadow: var(--box-shadow);
}
.select-menu.active .options {
  display: block;
}
.options .option {
  display: flex;
  height: 55px;
  cursor: pointer;
  padding: 0 16px;
  border-radius: 8px;
  align-items: center;
  background: var(--color-white);
}
.options .option:hover {
  background: var(--color-hover-select);
}
.option i {
  color: var(--color-primary);
  font-size: 25px;
  font-weight: 400;
  margin-right: 12px;
}
.option .option-text {
  background: transparent;
  font-size: 18px;
  color: var(--color-dark-variant);
}
/* Ajouter*/
.add-product {
  width: 344px;
  background: transparent;
  border: 2px dashed var(--color-primary);
  border-radius: 2rem;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px!important;
  margin-top: 30px!important;
  margin-left: -80px;
  align-items: center;
  gap: 0.6rem;
  transition: 400ms ease;
}
.add-product span {
  color: var(--color-white);
  background: var(--color-primary)!important;
}

.add-product h3 {
  color: var(--color-primary);
}
.add-product:hover{
  background: var(--color-primary);
  color: white;
}
.add-product:hover h3{
  color: white;
}
.date-option {
  height: 100px!important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px 0;
  gap: 0rem; 
}
.date-option:first-child .btn{
  background: var(--color-danger);
}
.date-option:hover:last-child,
.date-option:hover:first-child {
  background: transparent;
}
.date-option input {
  color: var(--color-dark-variant);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  padding: 10px 10px;
  width: 200px;
  border-radius: .5rem;
  font-size: 14px;
  background: var(--color-white);
}
.date-option .btn {
  background: var(--color-primary);
  color: var(--color-white);
  border: none;
  width: 210px;
  padding: 10px;
  border-radius: .5rem;
  outline: none;
}
.status.primary {
  color: var(--color-primary);
}
.vehicule {
  margin-top: 10px;
}
.paginations {
  margin-top: 35px;
}
@media screen and (max-width: 768px) {
  .add-product {
    margin-left: 0px;
  }
}
</style>