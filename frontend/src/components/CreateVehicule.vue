<template>
  <h1>Ajouter une voiture :</h1>
    <v-container class="ivelany offset-md-1 col-md-12 ">
        <v-row class="row">
            <div class="offset-md-1 col-md-12">
                <v-card class="card">
                    <v-card-title class="card-header" prepend-icon="mdi mdi-home">
                        <h2 class="text-grey">Ajouter un vehicule</h2>
                    </v-card-title>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <v-text-field label="matricule" color="primary"
                                    variant="outlined" density="compact" background="white" clearable name="matricule" class="" v-model="vehicule.matricule" :class="{'inputError': erreur.ErrMatricule}"></v-text-field>
                                    <span v-if="erreur.ErrMatricule" class="spanError">* {{ erreur.ErrMatricule }}</span>
                                </div>
                           </div>
                           <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Nom de voiture" name="nomVoiture" class="" v-model="vehicule.nomVoiture"></v-text-field>
                                <span v-if="erreur.ErrNomVoiture" class="spanError">* {{ erreur.ErrNomVoiture }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Marque" class="" name="marque" v-model="vehicule.marque"></v-text-field>
                                <span v-if="erreur.ErrMarque" class="spanError">* {{ erreur.ErrMarque }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-select variant="outlined" density="compact"
                                v-model="vehicule.idPropretaire"
                                :item-props="itemProps"
                                :items="proprietaires"
                                label="Select"
                                color="primary"
                              ></v-select>
                                <span v-if="erreur.ErrIdPropretaire" class="spanError">* {{ erreur.ErrIdPropretaire }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Prix de la location" type="number" class="" name="prix_location" v-model="vehicule.prix_location"></v-text-field>
                                <span v-if="erreur.ErrPrix_location" class="spanError">* {{ erreur.ErrPrix_location }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Pourcentage" type="number" class="" name="pourcentage" v-model="vehicule.pourcentage"></v-text-field>
                                <span v-if="erreur.ErrPourcentage" class="spanError">* {{ erreur.ErrPourcentage }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Nombre de place" type="number" class="" name="nbPlace" v-model="vehicule.nbPlace"></v-text-field>
                                <span v-if="erreur.ErrNbPlace" class="spanError">* {{ erreur.ErrNbPlace }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Type d'energie" type="text" class="" name="carburant" v-model="vehicule.carburant"></v-text-field>
                                <span v-if="erreur.ErrCarburant" class="spanError">* {{ erreur.ErrCarburant }}</span>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="form-group">
                                <v-text-field color="primary" variant="outlined" density="compact" label="Photo de la voiture" type="file" class="" name="attachment" placeholder="Mobile" v-on:change="fileSelected"></v-text-field>
                            </div>
                          </div>
                          <div class="col-md-6 img">
                            <img cover src="" id="image-preview" style="display: none;">
                          </div>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                          <v-btn prepend-icon="mdi mdi-content-save" height="45" width="399" color="success" v-on:click="save" class="btn mt-2" style="margin: 0 25px;">Enregistrer</v-btn>  
                          <v-btn prepend-icon="mdi mdi-content-save-move" height="45" width="400" color="danger" @click="formateInput" class="btn mt-2">Annuler</v-btn>
                    </div>
                </v-card>
            </div>
     
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert2';
 export default {
  name: "CreateVehicule",
  data () {
    return {
        vehicule: {
            matricule: '',
            nomVoiture: '',
            marque: '',
            idPropretaire: '',
            prix_location: '',
            pourcentage: '',
            nbPlace: '',
            carburant: '',
            disponibilite: '',
            attachment: null
        },
        erreur: {
            ErrMatricule: '',
            ErrNomVoiture: '',
            ErrMarque: '',
            ErrIdPropretaire: '',
            ErrPrix_location: '',
            ErrPourcentage: '',
            ErrNbPlace: '',
            ErrCarburant: '',
            ErrDisponibilite: '',
        },
        proprietaires: [],
        select: { state: 'Florida', abbr: 'FL' },
        items: [
          { state: 'Florida', abbr: 'FL' },
          { state: 'Georgia', abbr: 'GA' },
          { state: 'Nebraska', abbr: 'NE' },
          { state: 'California', abbr: 'CA' },
          { state: 'New York', abbr: 'NY' },
        ],
    }
  },
 async created () {
   await this.proprietaireLoad();
    console.log(this.proprietaires)
  },
  mounted() {
    console.log("mounted() called...............");
  },
  methods: {
    itemProps (item) {
        return {
          title: item.nom,
          subtitle: item.prenom,
          value: item.id_propretaire,
        }
      },
      itemValue (item) {
        return {
          title: item.nom,
          subtitle: item.prenom,
        }
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
  fileSelected: function (event) {
    this.vehicule.attachment = event.target.files[0];
    var src = URL.createObjectURL(event.target.files[0])
         var previewImagee = document.getElementById("image-preview")
         previewImagee.src = src
         previewImagee.style.display = "block";
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
save () {
  this.formaterErreur();
  if (this.vehicule.matricule != '' && this.vehicule.nomVoiture != '' && this.vehicule.marque != '' && this.vehicule.idPropretaire != '' && this.vehicule.prix_location != '' && this.vehicule.pourcentage != '' && this.vehicule.nbPlace != '' && this.vehicule.carburant != ''){
    this.saveData();
  } else {
              if (this.vehicule.matricule === '') {
                    this.erreur.ErrMatricule = "Le champs matricule ne peut pas etre vide et existe";
                }
                if (this.vehicule.nomVoiture === '') {
                    this.erreur.ErrNomVoiture = "Le champs nom de voiture ne peut pas etre vide";
                }
                if (this.vehicule.marque === '') {
                    this.erreur.ErrMarque= "Le champs marque de la voiture ne peut pas etre vide";
                }
                if (this.vehicule.idPropretaire === '') {
                    this.erreur.ErrIdPropretaire = "Le champs id_propretaire ne peut pas etre vide";
                }
                if (this.vehicule.prix_location === '') {
                    this.erreur.ErrPrix_location = "Le champs id_propretaire ne peut pas etre vide";
                }
                if (this.vehicule.pourcentage === '') {
                    this.erreur.ErrPourcentage = "Le champs Pourcentage ne peut pas etre vide";
                }
                if (this.vehicule.nbPlace === '') {
                    this.erreur.ErrNbPlace = "Le champs nombre de place  ne peut pas etre vide";
                }
                if (this.vehicule.carburant === '') {
                    this.erreur.ErrCarburant = "Le champs carburant ne peut pas etre vide";
                }
                swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Veuillez renseingnez tous les champs :(",
                    showConfirmButton: false,
                    timer: 1800
                });
  }
},

    saveData()
    {
      const formData = new FormData();
      formData.append('matricule', this.vehicule.matricule);
      formData.append('nomVoiture', this.vehicule.nomVoiture);
      formData.append('marque', this.vehicule.marque);
      formData.append('idPropretaire', this.vehicule.idPropretaire);
      formData.append('prix_location', this.vehicule.prix_location);
      formData.append('pourcentage', this.vehicule.pourcentage);
      formData.append('nbPlace', this.vehicule.nbPlace);
      formData.append('carburant', this.vehicule.carburant);
      formData.append('disponibilite', this.vehicule.disponibilite);
      formData.append('attachment', this.vehicule.attachment);

        axios.post("http://127.0.0.1:8800/vehicule", formData, {
            headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
        })
        .then(response =>{
                if (response.data.status == true){
                    swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Vehicule enregistrer dans la base de donnee",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.dialog1 = true;
                this.formateInput();
                } else {
                    swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "NO",
                    showConfirmButton: false,
                    timer: 1800
                });

                }

                console.log(response.data);
            }
        )
        .catch(error => {
    console.log('Error', error);
    console.log('Error response data:', error.response.data);
    if (error.response && error.response.data && error.response.data.message != 'Matricule already exists') {
            this.erreur.ErrMatricule = 'Le matricule du véhicule existe déjà.';
            swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Le numero de voiture existe deja :(',
            showConfirmButton: false,
            timer: 1800
        });

        }else {
        console.log('Error', error.message);
        
    }
});



    },
    formaterErreur () {
            this.erreur.ErrMatricule = '';
            this.erreur.ErrNomVoiture = '';
            this.erreur.ErrMarque = '';
            this.erreur.ErrIdPropretaire = '';
            this.erreur.ErrPrix_location = '';
            this.erreur.ErrPourcentage = '';
            this.erreur.ErrNbPlace = '';
            this.erreur.ErrCarburant = '';
            this.erreur.ErrDisponibilite = '';
    },
    formateInput () {
            this.formaterErreur();
            this.vehicule.matricule = '';
            this.vehicule.nomVoiture = '';
            this.vehicule.marque = '';
            this.vehicule.idPropretaire = '';
            this.vehicule.prix_location = '';
            this.vehicule.pourcentage = '';
            this.vehicule.nbPlace = '';
            this.vehicule.carburant = '';
            this.vehicule.disponibilite = '';
            this.vehicule.attachment = null;
            var previewImagee = document.getElementById("image-preview")
            previewImagee.src = ""
             previewImagee.style.display = "none"
    }


  },

 }
</script>
<style scoped>

.ivelany {
    margin-top: 20px;
    width: 100%;
    margin-left: 70px!important;
}
.row {
    padding: 30px;
}
.row .col-md-6 {
    padding: 10px;
}
.card {
    background: var(--color-white);
    padding: 10px;
    border-radius: var(--border-radius-1);
    box-shadow: var(--box-shadow);
}
.card .card-header {
  background: var(--color-white);
}
.card .card-footer {
  width: 100%;
  background: var(--color-white);
}
.card .card-footer .btn {
  width: 400px;
  color: white;
}
.v-text-field {
  color: var( --color-info-dark);
  font-size: 16px;
  background: var(--color-white);
}
label, input {
    font-size: 16px;
    color: var(--color-dark);
}
.img {
    padding: 0;
    margin-top: -30px;
    height: 150px;
}
.img img {
    width: 50%;
    margin-left: 150px;
    height: 100%;
}
.spanError {
    color: var(--color-danger);
}
@media screen and (max-width: 1200px) {
  .ivelany {
    margin-left: 50px!important;
  }
}
@media screen and (max-width: 768px) {
  .ivelany {
    margin-left: 0px!important;
  }
}
</style>