<template>
    <div>
     <!---- <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div v-if="myModel" id="myModal" class="modal fade" tabindex="-1">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <span class="material-icons-sharp">group_add</span>
                    <h2 class="modal-title">{{ dynamicTitle }}</h2>
                    <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"><span class="material-icons-sharp">close</span></button>
                  </div>
                  <div class="modal-body">
                    <form action="POST" name="form" id="form" @submit.prevent="Save">
                        <div class="row">
                            <div class="col-md-6">
                                <label for="matricule">Nom :</label>
                                <input type="text" class="form-control" v-model="client.nom" name="nom" required>
                              <span class="ErrorSpan" v-if="ErrorNom">* {{ ErrorNom }}</span>
                              </div>
                              <div class="col-md-6">
                                <label for="client">Prenom :</label>
                                <input type="text" class="form-control" name="prenom" v-model="client.prenom" required>
                                <span class="ErrorSpan" v-if="ErrorPrenom">* {{ ErrorPrenom }}</span>
                              </div>
                              <div class="col-md-6">
                                <label for="montant">Adresse email :</label>
                                <input type="email" class="form-control" name="email" v-model="client.email" required>
                                <span class="ErrorSpan" v-if="ErrorEmail">* {{ ErrorEmail }}</span>
                              </div>
                              <div class="col-md-6">
                                <label for="montant">Mot cle :</label>
                                <input type="text" class="form-control" name="password" v-model="client.password" required>
                                <span class="ErrorSpan" v-if="ErrorPassword">* {{ ErrorPassword }}</span>
                              </div>
                              <div class="col-md-6">
                                <label for="montant">Telephone :</label>
                                <input type="text" class="form-control" name="telephone" v-model="client.telephone" required>
                                <span class="ErrorSpan" v-if="ErrorTelephone">* {{ ErrorTelephone }}</span>
                              </div>
                              <div class="col-md-6">
                                <label for="montant">Adresse :</label>
                                <input type="text" class="form-control" name="adresse" v-model="client.adresse" required>
                                <span class="ErrorSpan" v-if="ErrorAdresse">* {{ ErrorAdresse }}</span>
                              </div>
                        </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button form="form" class="btn success" type="submit">{{ dynamicButton }}</button>
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
                    <div class="input-groupe">
                      <input @keyup="SearchLoad" type="search" placeholder="Search Data..." class="rien" v-model="searchTerm">
                      <img src="../../public/images/search.png" alt="" style="cursor: pointer;">
                  </div>
                </div>
            </div>
        </div>
        <div class="sales">
            <div class="middle">
                <div class="left">
                  <div class="select-menu">
                    <div class="select-btn" @click="ouvrirSelect">
                        <span v-if="textSelected" class="sBtn-text">{{ textSelected }}</span>
                        <span v-else class="sBtn-text">Filtrer par mode de paiement</span>
                        <i class="bx bx-chevron-down"></i>
                    </div>
            
                    <ul class="options">
                   <li class="option">
                        <span class="option-text" @click="FonctionSelectedTextParDefaut()">Filtrer par mode de paiment</span>
                    </li>
                        <li class="option">
                          <span class="material-icons-sharp">attach_money</span>
                            <span class="option-text" @click="FonctionSelectedText('complet')">Paiement complet</span>
                        </li>
                        <li class="option">
                          <span class="material-icons-sharp">attach_money</span>
                          <span class="option-text" @click="FonctionSelectedText('avance')">Paiement en avance</span>
                      </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>
        <div class="sales">
          <div class="middle">
            <div class="left">
              <div class="add_product">
                <span class="material-icons-sharp">add</span>
                <button class="btne" @click="openModal" type="button" data-bs-toggle="modal" data-bs-target="#myModal">Add Product</button>
                <v-dialog v-model="myModel" width="auto" persistent>
                  <div class="container">
                    <div class="row">
                      <div class="col-md-12 col-sm-6 col-lg-6">
                        <div class="modal-dialog dialogue">
                          <v-card class="modal-content">
                            <div class="modal-header">
                              <span class="material-icons-sharp">group_add</span>
                              <h2 class="modal-title">{{ dynamicTitle }}</h2>
                              <button type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"><span class="material-icons-sharp">close</span></button>
                            </div>
                            <div class="modal-body">
                              <form action="POST" name="form" id="form" @submit.prevent="Save">
                                  <div class="row">
                                      <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Nom" type="text" class="" v-model="client.nom" name="nom" required></v-text-field>
                                        <span class="ErrorSpan" v-if="ErrorNom">* {{ ErrorNom }}</span>
                                        </div>
                                        <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Prenom" type="text" class="" name="prenom" v-model="client.prenom" required></v-text-field>
                                          <span class="ErrorSpan" v-if="ErrorPrenom">* {{ ErrorPrenom }}</span>
                                        </div>
                                        <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Adresse E-mail" type="email" class="" name="email" v-model="client.email" required></v-text-field>
                                          <span class="ErrorSpan" v-if="ErrorEmail">* {{ ErrorEmail }}</span>
                                        </div>
                                        <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Mot cle" type="text" class="" name="password" v-model="client.password" required></v-text-field>
                                          <span class="ErrorSpan" v-if="ErrorPassword">* {{ ErrorPassword }}</span>
                                        </div>
                                        <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Telephone" type="text" class="" name="telephone" v-model="client.telephone" required></v-text-field>
                                          <span class="ErrorSpan" v-if="ErrorTelephone">* {{ ErrorTelephone }}</span>
                                        </div>
                                        <div class="col-md-6">
                                          <v-text-field color="primary" variant="outlined" density="compact" label="Adresse" type="text" class="" name="adresse" v-model="client.adresse" required></v-text-field>
                                          <span class="ErrorSpan" v-if="ErrorAdresse">* {{ ErrorAdresse }}</span>
                                        </div>
                                  </div>
                              </form>
                            </div>
                            <div class="modal-footer">
                              <v-btn v-if="editerr" height="43" color="primary" prepend-icon="mdi mdi-content-save" width="258.33" form="form" class="btn" type="submit">{{ dynamicButton }}</v-btn>
                              <v-btn v-else height="43" prepend-icon="mdi mdi-content-save" width="258.33" form="form" class="btn success" type="submit">{{ dynamicButton }}</v-btn>
                              <v-btn height="43" prepend-icon="mdi mdi-close" width="258.33" class="btn danger" @click="closeModal">Annuler</v-btn>
                            </div>
                          </v-card>
                        </div>
                      </div>
                    </div>
                  </div>
                </v-dialog>
            </div>
            </div>
          </div>

        </div>
         <!--end of expenses-->
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
            <table v-if="afficheStatut">
                <thead>
                    <tr>
                        <th class="col">id_client</th>
                        <th class="col">Nom</th>
                        <th class="col">Prenom</th>
                        <th class="col">Email</th>
                        <th class="col">Telephone</th>
                        <th class="col">Adresse</th>
                        <th class="col">Reste a payer</th>
                        <th class="col">Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="client.id_client" v-for="client in result">
                        <td>{{ client.id_client }}</td>
                        <td>{{ client.nom }}</td>
                        <td>{{ client.prenom }}</td>
                        <td>{{ client.email }}</td>
                        <td>{{ client.telephone }}</td>
                        <td>{{ client.adresse }}</td>
                        <td>{{ client.reste_payer }} Ar</td>
                        <td style="width: 180px;">
                          <button @click="editer(client)" type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="status primary"><span class="material-icons-sharp">edit</span></button>
                          <button @click="deleteClient(client.id_client)" type="button" class="status danger"><span class="material-icons-sharp">delete</span></button>
                      </td>
                    </tr>
                </tbody>
            </table>
            <table v-else>
              <thead>
                  <tr>
                      <th class="col">id_client</th>
                      <th class="col">Nom</th>
                      <th class="col">Prenom</th>
                      <th class="col">Email</th>
                      <th class="col">Telephone</th>
                      <th class="col">Adresse</th>
                      <th class="col">Options</th>
                  </tr>
              </thead>
              <tbody>
                  <tr :key="client.id_client" v-for="client in result">
                      <td>{{ client.id_client }}</td>
                      <td>{{ client.nom }}</td>
                      <td>{{ client.prenom }}</td>
                      <td>{{ client.email }}</td>
                      <td>{{ client.telephone }}</td>
                      <td>{{ client.adresse }}</td>
                      <td style="width: 180px;">
                        <button @click="editer(client)" type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="status primary"><span class="material-icons-sharp">edit</span></button>
                        <button @click="deleteClient(client.id_client)" type="button" class="status danger"><span class="material-icons-sharp">delete</span></button>
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
      editerr: false,
      valider: false,
      myModel : false,
      afficheStatut: false,
      textSelected: '',
      dynamicTitle: "Ajouter un client",
      dynamicButton: "Ajouter",
      searchTerm: '',
      nom: '',
      client: {
      id_client: '',  
      nom: '',
      prenom: '',
      email: '',
      password: '',
      telephone: '',
      adresse: '',
      nombre_jours: '',
      nombremin: 0,
      reste_payer: ''
      },
      ErrorNom: '',
      ErrorPrenom: '',
      ErrorEmail: '',
      ErrorTelephone: '',
      ErrorPassword: '',
      ErrorAdresse: '',
      vehicules: [],
      result: []
    }
  },
  created() {
     this.ClientLoad();
    //this.proprietaireLoad();
  },
  mounted() {

  // await this.calculerMinimal();
    console.log("mounted() called...............");
    //console.log(this.result);
  },
  methods : {
    async ClientLoad()
    {
        const response = await axios.get('http://localhost:8800/client', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.result = response.data.data;
        this.afficheStatut = false;
        console.log(this.result);
        
    },
    calculerMinimal () {
      this.nombremin = Math.min(...this.result.map(item=>item.id_client));
      console.log('Le nombre minimal est :', this.nombremin);
    },
    ouvrirSelect () {
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.toggle("active");
    },
    FonctionSelectedText (text) {
      this.textSelected = text;
      this.FiltrerParStatut();
      this.afficheStatut = true;
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.remove("active");
    },
    FonctionSelectedTextParDefaut() {
      this.ClientLoad();
      this.textSelected = '';
      this.afficheStatut = false;
      this.searchTerm = '';
      const optionMenu = document.querySelector(".select-menu");
      optionMenu.classList.remove("active");
    },
    openModal () {
        this.myModel = true;
      
    },
    closeModal () {
      this.formatErreur();
      this.ClientLoad();
      this.formatInput();
      this.myModel = false;
      this.editerr = false;
      this.client.id_client = '';
    },
    formatInput () {
      this.formatErreur();
      this.dynamicTitle = "Ajouter un client";
      this.dynamicButton = "Ajouter";
      this.client.nom = '';
      this.client.prenom = '';
      this.client.email = '';
      this.client.password = '';
      this.client.telephone = '';
      this.client.adresse = '';
    },
    formatErreur () {
      this.ErrorNom = '';
      this.ErrorPrenom = '';
      this.ErrorEmail = '';
      this.ErrorPassword = '';
      this.ErrorTelephone = '';
      this.ErrorAdresse = '';
    },
    editer (client) {
        this.client = client;
        this.editerr = true;
        this.myModel = true;
        this.dynamicTitle = "Modifier un client";
        this.dynamicButton = "Modifier";
        const optionMenu = document.querySelector(".v-btn");
        optionMenu.classList.add("active");
    },
    Save () {
        if (this.dynamicButton != 'Modifier') {
            this.ajouter();
        } else {
            this.modifier();
        }
    },
    ajouter () {
      this.formatErreur();
      const { nom, telephone, password, adresse } = this.client;
        if (nom.length >= 4 && telephone.length >= 10 && password.length === 4 && adresse.length >= 3) { 
            this.ajouterOK(); 
        }  else {
        if ( nom.length < 4) {
          this.ErrorNom  = 'Le nom doit etre superieur a 4 lettre :(';
        }
        if (telephone.length < 10) {
          this.ErrorTelephone  = 'Le telephone doit contenir 10 nombre :(';
        }
        if (password.length != 4) {
          this.ErrorPassword  = 'Le mot cle doit etre en 4 lettre:(';
        }
        if (adresse.length < 3 ) {
          this.ErrorAdresse  = 'Le mot cle doit etre en 4 lettre:(';
        }
        swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Vous devez renseingner bien tous les champs :(",
                    showConfirmButton: false,
                    timer: 1800
                });
      }
        
    },
    modifier () {
      this.formatErreur();
      const { nom, telephone, password, adresse } = this.client;
        if (nom.length >= 4 && telephone.length >= 10 && password.length === 4 && adresse.length >= 3) { 
            this.modifierOK(); 
        }  else {
        if ( nom.length < 4) {
          this.ErrorNom  = 'Le nom doit etre superieur a 4 lettre :(';
        }
        if (telephone.length < 10) {
          this.ErrorTelephone  = 'Le telephone doit contenir 10 nombre :(';
        }
        if (password.length != 4) {
          this.ErrorPassword  = 'Le mot cle doit etre en 4 lettre:(';
        }
        if (adresse.length < 3 ) {
          this.ErrorAdresse  = 'Le mot cle doit etre en 4 lettre:(';
        }
        swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Vous devez renseingner bien tous les champs :(",
                    showConfirmButton: false,
                    timer: 1800
                });
      }
        
    },
   async ajouterOK ()
    {
      try {
        const response = await axios.post("http://127.0.0.1:8800/client" , {
           nom: this.client.nom, prenom : this.client.prenom, email: this.client.email, password: this.client.password, telephone: this.client.telephone, adresse: this.client.adresse},
        {   headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
            if (response.data.retour === "Client ajouté avec succès") {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Client enregistrer dans la base de donnée",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.ClientLoad();
                this.closeModal();
               // window.location.reload();
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
    async modifierOK ()
    {
      try {
        const response = await axios.put("http://127.0.0.1:8800/client/"+this.client.id_client , {
           nom: this.client.nom, prenom : this.client.prenom, email: this.client.email, password: this.client.password, telephone: this.client.telephone, adresse: this.client.adresse},
        {   headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
            if (response.data.retour == "Client modifié avec succès") {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Client enregistrer dans la base de donnée",
                    showConfirmButton: false,
                    timer: 1800
                });
                console.log('return', response.data.retour);
                this.ClientLoad();
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
    async SearchLoad() {
      this.afficheStatut = false;
    try {
        const response = await axios.post('http://localhost:8800/client/recherche', {
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
async FiltrerParStatut() {
    try {
        const response = await axios.post('http://localhost:8800/client/filtrerParStatut', {
            statut: this.textSelected
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

deleteClient(location){
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
        this.removeClient(id);
    } else if (result.isDenied) {
      this.$swal.close()
    }
  })
     
    },
    async removeClient(location)
    {
      //  var url = `http://localhost:8800/vehicule/${voiture}`;
      const response = await axios.delete(`http://localhost:8800/client/${location}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
                if (response.data.retour === "Client supprimé avec succès"){
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Client supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.ClientLoad();
                } else {
                    this.$swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Client non supprimer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });

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
    margin-top: 0px;
    height: 630px;
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
  margin-top: 0px;
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
  font-size: 14px;  
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
  /*    --color-danger: #ff7782;
    --color-success: #41f1b6;*/
}
.btn.success.active {
  background: rgb(93, 93, 221)!important;
  display: none!important;
}
.btn.success.active:hover {
  background: rgb(77, 77, 206);
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
  .col-md-6 input {
    background: var(--color-white);
    font-size: 15px;
    color: var(--color-dark-variant);
    margin-bottom: 7px;
  }
  /*--select-menu--*/
.select-menu {
  margin-top: 0px;
  width: 375px;
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
.option i{
  color: var(--color-primary);
  font-size: 25px;
  font-weight: 400;
  margin-right: 12px;
}
.option span {
  background: transparent;
  color: var(--color-primary);
}
.option .option-text {
  background: transparent;
  font-size: 18px;
  color: var(--color-dark-variant);
}
.insights {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.insights .sales {
  margin-top: 40px;
  width: 380px;
}
.insights .sales .add_product {
  display: flex;
  align-items: center;
  border-radius: 2rem;
  justify-content: center;
  border: 1px dashed var(--color-primary);
  width: 380px;
  height: 55px;
  transition: 0.4s ease-in-out;
}
.insights .sales .add_product:hover {
  color: #fff;
  background: var(--color-primary);
}
.insights .sales .add_product:hover .btne {
  color: #fff;
}
.insights .sales .add_product .btne {
  padding: 10px;
  background: transparent;
  color: var(--color-primary);
  font-size: 16px;
  font-weight: 500;
}
.dialogue {
  margin-top: -200px;
}
.v-text-field {
  border-color: var(--color-dark-variant)!important;
  color: var(--color-dark-variant);
}
@media screen and (max-width: 768px) {
  .insights {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .table_body{
    width: 600px;
  }
  .status {
    margin: 5px;
  }
}
  </style>