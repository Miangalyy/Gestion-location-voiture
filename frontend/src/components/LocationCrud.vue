<template>
    <div>
     <!---- <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div v-if="myModel" id="myModal" class="modal fade" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <span class="material-icons-sharp">add_location_alt</span>
                    <h2 class="modal-title">Modification du voiture</h2>
                    <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"><span class="material-icons-sharp">close</span></button>
                  </div>
                  <div class="modal-body">
                    <div class="row">
                      <div class="col-md-6">
                        <label for="matricule">La voiture :</label>
                        <select v-model="matricule" class="form-control" @change="SearchMontantApayer">
                          <option :key="vehicule.matricule" :value="vehicule.matricule" v-for="vehicule in vehicules">{{ vehicule.matricule }} - {{ vehicule.nbPlace }} places</option>    
                      </select>
                      <span class="ErrorSpan" v-if="ErrorMatricule">* {{ ErrorMatricule }}</span>
                      </div>
                      <div class="col-md-6">
                        <label for="client">Client :</label>
                        <select v-model="client" class="form-control">
                          <option :key="client.id_client" :value="client.id_client" v-for="client in clients">{{ client.nom }} {{ client.prenom }}</option>    
                      </select>
                        <span class="ErrorSpan" v-if="ErrorClient">* {{ ErrorClient }}</span>
                      </div>
                      <div class="col-md-6">
                        <label for="montant">Montant (montant total: <b>{{ montantAPayer }} Ar</b>) :</label>
                        <input type="number" class="form-control" name="montant" v-model="montant">
                        <span class="ErrorSpan" v-if="ErrorMontant">* {{ ErrorMontant }}</span>
                      </div>
                      <div class="col-md-6">
                        <label for="client">Statut de payement :</label>
                        <select v-model="statut" class="form-control">
                          <option value="complet">Payement complet </option>    
                          <option value="avance">Payement en avance</option>    
                      </select>
                        <span class="ErrorSpan" v-if="ErrorClient">* {{ ErrorClient }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button class="btn success" type="button" @click="ajouter">Ajouter</button>
                    <button class="btn danger" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">Annuler</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>-->
    <h1>Filtrez vos donnees ici : </h1>
      <div class="insights">
        <div class="sales">
            <div class="middle">
                <div class="left">
                    <h3>.</h3>
                    <div class="input-groupe">
                      <input @keyup="SearchLoad" type="search" placeholder="Search Data..." class="rien" v-model="searchTerm">
                      <img src="../../public/images/search.png" alt="" style="cursor: pointer;">
                  </div>
                </div>
            </div>
        </div>
        <div class="expenses">
            <div class="middle">
                <div class="left">
                    <h3>De de debut :</h3>
                    <div class="date">
                        <input @change="calculerDifference" type="date" v-model="date_debut">
                    </div>
                </div>
            </div>
        </div>
         <!--end of expenses-->
        <div class="income">
            <div class="middle">
                <div class="left">
                    <h3>Date de fin :</h3>
                    <div class="date">
                        <input @change="calculerDifference" type="date" v-model="date_fin">
                    </div>
                </div>
            </div>
        </div>
            <div class="item add-product">
                <div>
                    <span class="material-icons-sharp">add</span>
                    <button @click="openModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal">Add Product</button>
                    <v-dialog v-model="myModel" width="auto" persistent>
                      <div class="modal-dialog dialogue">
                        <div class="modal-content">
                          <div class="modal-header">
                            <span class="material-icons-sharp">add_location_alt</span>
                            <h2 class="modal-title">Ajouter une location</h2>
                            <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"><span class="material-icons-sharp">close</span></button>
                          </div>
                          <div class="modal-body">
                            <div class="row">
                              <div class="col-md-12 mt-4 mb-4">
                               <!--- <label for="matricule">La voiture :</label>
                                <select v-model="matricule" class="form-control" @change="SearchMontantApayer">
                                  <option :key="vehicule.matricule" :value="vehicule.matricule" v-for="vehicule in vehicules">{{ vehicule.matricule }} - {{ vehicule.nbPlace }} places</option>    
                              </select>-->
                              <v-select density="comfortable" style="height: 40px; font-size: 16px;"
                              v-model="matricule"
                              :item-props="itemPropsVehi"
                              :items="vehicules"
                              label="Voiture"
                              @click="SearchMontantApayer"
                            ></v-select>
                              <span class="ErrorSpan" v-if="ErrorMatricule">* {{ ErrorMatricule }}</span>
                              </div>
                              <div class="col-md-12 mt-4 mb-4">
                              <!--- <label for="client">Client :</label>
                                <select v-model="client" class="form-control">
                                  <option :key="client.id_client" :value="client.id_client" v-for="client in clients">{{ client.nom }} {{ client.prenom }}</option>    
                              </select>-->
                              <v-select density="comfortable" style="height: 40px; font-size: 16px;"
                              v-model="client"
                              :item-props="itemProps"
                              :items="clients"
                              label="Client"
                            ></v-select>
                                <span class="ErrorSpan" v-if="ErrorClient">* {{ ErrorClient }}</span>
                              </div>
                              <div class="col-md-12 mt-4 mb-4">
                                <!--<label for="client">Statut de payement :</label>
                                <select v-model="statut" class="form-control">
                                  <option value="complet">Payement complet </option>    
                                  <option value="avance">Payement en avance</option>    
                              </select>-->
                              <v-select density="comfortable" style="height: 40px; font-size: 16px;"
                              v-model="statut"
                              :item-props="itemPropsDisp"
                              :items="items"
                              label="Mode de payment"
                            ></v-select>
                                <span class="ErrorSpan" v-if="ErrorClient">* {{ ErrorClient }}</span>
                              </div>
                              <div class="col-md-12 mt-4">
                                <label for="montant">Montant (montant total: <b>{{ montantAPayer }} Ar</b>) :</label>
                                <input type="number" class="form-control" name="montant" v-model="montant">
                                <span class="ErrorSpan" v-if="ErrorMontant">* {{ ErrorMontant }}</span>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <v-btn height="43" color="success" prepend-icon="mdi mdi-content-save" width="258.33" class="btn success" type="button" @click="ajouter">Ajouter</v-btn>
                            <v-btn height="43" color="danger" prepend-icon="mdi mdi-close" width="258.33" class="btn danger" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">Annuler</v-btn>
                          </div>
                        </div>
                      </div>
                    </v-dialog>
                </div>
            </div>
        <!--end of sales-->
    </div>
      <!--end of insights-->
      <div class="tables">
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
                        <th class="col">NumVehicule</th>
                        <th class="col">Client</th>
                        <th class="col">Date de debut</th>
                        <th class="col">Date de fin</th>
                        <th class="col">Nombre de jours</th>
                        <th class="col">Montant</th>
                        <th class="col">statut de paiment</th>
                        <th class="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="location.id_location" v-for="location in result">
                        <td>{{ location.matricule }}</td>
                        <td>{{ location.nom }} {{ location.prenom }}</td>
                        <td>{{ location.date_debut }}</td>
                        <td>{{ location.date_fin }}</td>
                        <td>{{ location.nombre_jours }}</td>
                        <td>{{ location.montant }}</td>
                        <td>{{ location.statut }}</td>
                        <td style="width: 180px;">
                          <button @click="redirection(location.id_location)" type="button" name="edit" class="status primary"><span class="material-icons-sharp">edit</span></button>
                          <button @click="deleteLocation(location.id_location)" type="button" class="status danger"><span class="material-icons-sharp">delete</span></button>
                      </td>
                    </tr>
                </tbody>
            </table>
          </section>
      </div>
    </div>
  </template>
  <script>
  import axios from 'axios'
  import swal from 'sweetalert2';
  export default {
  name: "LocationCrud",
  data () {
    return {
      enleveModale: false,
      valider: false,
      myModel : false,
      matricule: '',
      client: '',
      searchTerm: '',
      date_debut: '',
      date_fin: '',
      montant: '',
      statut: '',
      ErrorMontant: '',
      ErrorMatricule: '',
      ErrorClient: '',
      vehicules: [],
      result: [],
      clients: [],
      differenceJours: null,
      montantAPayer: null,
      items: [
          { nom: 'Payement complet', value: 'complet' },
          { nom: 'Payement en avance', value: 'avance' },
        ],
    }
  },
  computed: {
    isValide() {
        return this.matricule != '' && this.client != '' && this.montant != '';
      }
    },
  created() {
    this.LocationLoad();
    this.ClientLoad();
  },
  mounted() {
    console.log("mounted() called...............");
    //console.log(this.result);
  },
  methods : {
    async LocationLoad()
    {
        const response = await axios.get('http://localhost:8800/location', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.result = response.data.data;
        
    },
    itemProps (item) {
        return {
          title: item.nom,
          subtitle: item.prenom,
          value: item.id_client,
        }
      },
      itemPropsVehi (item) {
        return {
          title: item.nomVoiture,
          subtitle: item.matricule,
          value: item.matricule,
        }
      },
      itemPropsDisp (item) {
        return {
          title: item.nom,
          value: item.value
        }
      },
    calculerDifference () {
      var date1 = new Date(this.date_debut);
      var date2 = new Date(this.date_fin);
      var difference = Math.abs(date2 - date1);
      this.differenceJours = Math.ceil(difference / (1000*60 *60*24));
      console.log("La difference de date est : ", this.differenceJours);

    },
    async ClientLoad()
    {
        const response = await axios.get('http://localhost:8800/location/clients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.clients = response.data.data;
        
    },
    openModal () {
      if (this.date_debut != '' && this.date_fin != '') {
        this.listeVehicule();
        this.myModel = true;
      } else {

        this.ajouterNonOk();
      }
      
    },
    closeModal () {
      this.formatErreur();
      this.formatInput();
      this.myModel = false;
    },
    formatInput () {
      this.formatErreur();
      this.matricule = '';
      this.client = '';
      this.montant = '';
      this.date_debut = '';
      this.date_fin = '';
      this.montantAPayer = null
    },
    formatErreur () {
      this.ErrorMontant = '';
      this.ErrorClient = '';
      this.ErrorMatricule = '';
    },
    ajouter () {
      this.formatErreur();
      //alert(this.statut);
      if (this.matricule != '' && this.client != '' && this.montant != '') {
        this.enleveModale = true;
        this.ajouterOK();
      } else {
        if (this.matricule === '') {
          this.ErrorMatricule  = 'Le champs matricule ne peut pas etre vide:(';
          this.enleveModale = false;
        }
        if (this.client === '') {
          this.ErrorClient  = 'Le champs clent ne peut pas etre vide:(';
          this.enleveModale = false;
        }
        if (this.montant === '') {
          this.ErrorMontant  = 'Le champs montant ne peut pas etre vide:(';
          this.enleveModale = false;
        }
        swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Vous devez renseingner tous les champs :(",
                    showConfirmButton: false,
                    timer: 1800
                });
      }
        
    },
   async ajouterOK ()
    {
      try {
        const response = await axios.post("http://127.0.0.1:8800/location" , {
           matricule: this.matricule, client : this.client, date_debut: this.date_debut, date_fin: this.date_fin, montant: this.montant, statut: this.statut},
        {   headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
                if (response.data.status == true) {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Location enregistrer dans la base de donnée",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.LocationLoad();
                this.closeModal();
        } else {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Erreur de l'insertion dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });
        }
                console.log(response.result);
                

                
      }catch (err) {
        console.log(err);
      }

    },
    ajouterNonOk () {
      swal.fire('Attention', 'Vous devez renseignez la date de debut et fin pour enregistrer une location.', 'warning');
    },
    async listeVehicule() {
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

        this.vehicules = response.data.data;
        console.log(this.result);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},
deleteLocation(location){
    var id = location;    
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
        this.removeLocation(id);
    } else if (result.isDenied) {
      this.$swal.close()
    }
  })
     
    },
    async removeLocation(location)
    {
      //  var url = `http://localhost:8800/vehicule/${voiture}`;
      const response = await axios.delete(`http://localhost:8800/location/${location}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
                if (response.data.status == true){
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Location supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.LocationLoad();
                } else {
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Location non supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });

                }
        

    },
    async SearchLoad() {
    try {
        const response = await axios.post('http://localhost:8800/location/recherche', {
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
    async SearchMontantApayer() {
    try {
        const response = await axios.post('http://localhost:8800/location/montant', {
            searchTerm: this.matricule
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
         
        const responseData = response.data.data;
        if (responseData.length > 0) {
        var date1 = new Date(this.date_debut);
        var date2 = new Date(this.date_fin);
        var difference = Math.abs(date2 - date1);
        this.differenceJours = Math.ceil(difference / (1000*60 *60*24));
        
        const vehiculeData = responseData[0];
        this.montantAPayer = vehiculeData.prix_location * this.differenceJours;
        console.log("Le montant a payer est : ", this.montantAPayer);
      }
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},
    redirection (id) {
      this.closeModal();
     this.$router.push({ name: 'EditLocation', params: { id: id } });
    
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
  width: 380px;
  height: 55px;
  background-color: var(--color-white);
  padding: 0 .8rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 70px;
  margin-top: 38px;
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
.status.primary {
  color: var(--color-primary);
}
.status.warning {
  color: var(--color-warning);
}
.add {
  color: var(--color-primary);
  font-size: 18px;
}
.ErrorSpan {
  margin: 10px 0;
  color: red;
}
.form-group {
  padding: 10px;
}
.form-group label {
  font-size: 15px;
  color: var(--color-dark-variant);
}
.modal-header {
  color: var(--color-dark);
  background: var(--color-info-light);
}
.btn {
  padding: 10px 100px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-white);
  border: none;
  transition: .4s ease;
}
.btn.success {
  background: var(--color-success);
}
.btn.danger {
  background: var(--color-danger);
}
.btn.success:hover {
  background: #06c787;
}
.btn.danger {
background: var(--color-danger);
}
.btn.danger:hover {
  background: #fa606d;
}
.modal-content {
  border: none;
  width: 700px;
  padding: 5px;
  background: var(--color-primary);
}
.modal-header {
  display: flex;
  justify-content: flex-start;
  border: none;
  color: var(--color-white);
  background: var(--color-primary);
}
.modal-header span {
  margin-right: 10px;
}
.modal-header button {
  position: absolute;
  right: 10px;
  top: 20px;
  background: transparent;
  color: var(--color-white);
}
.modal-body {
  padding: 20px;
  background: var(--color-white);
}
.modal-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: var(--color-white);
}
.col-md-6 {
  padding: 10px;
}
.col-md-6 label {
  font-size: 15px;
  color: var(--color-dark-variant);
  margin-bottom: 7px;
}
.col-md-6 input,
.col-md-6 select {
  background: var(--color-white);
  font-size: 15px;
  color: var(--color-dark-variant);
  margin-bottom: 7px;
}
.dialogue {
  margin-top: -200px;
}
  </style>