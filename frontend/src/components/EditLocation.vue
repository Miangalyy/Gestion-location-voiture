<template>
<h1>Modifier une location :</h1>
  <div class="container">
    <div class="row">
        <div class="col-md-6">
            <div class="card">
                <div class="card-header">
                    <h2>Modification de la location</h2>
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <label for="matricule">Le matricule : </label>
                        <input type="text" class="form-control" v-model="location.matricule" disabled />
                    </div>
                    <div class="form-group">
                      <!----<label for="matricule">Le client : </label>
                        <select v-model="location.client" class="form-control">
                            <option :key="client.id_client" :value="client.id_client" v-for="client in clients">{{ client.nom }} {{ client.prenom }}</option>    
                        </select>-->
                        <v-select density="comfortable" style="height: 40px; font-size: 16px;"
                        v-model="location.client"
                        :item-props="itemProps"
                        :items="clients"
                        label="Client"
                      ></v-select>
                        <span class="ErrorSpan" v-if="errorClient">* {{ errorClient }}</span>
                    </div>
                    <div class="form-group">
                        <label for="matricule">Date de debut : </label>
                        <input @change="PermisModifier" type="date" class="form-control" v-model="location.date_debut">
                        <span class="ErrorSpan" v-if="errorDateDeb">* {{ errorDateDeb }}</span>
                    </div>
                    <div class="form-group">
                        <label for="matricule">Date de fin : </label>
                        <input @change="PermisModifier" type="date" class="form-control" v-model="location.date_fin">
                        <span class="ErrorSpan" v-if="errorDateFin">* {{ errorDateFin }}</span>
                    </div>
                    <div class="form-group">
                        <label for="matricule">Le montant : ({{ montantAPayer }})</label>
                        <input type="number" class="form-control" v-model="location.montant">
                        <span class="ErrorSpan" v-if="errorMontant">* {{ errorMontant }}</span>
                    </div>
                    <div class="form-group">
                      <!--  <label for="client">Statut de payement :</label>
                        <select v-model="location.statut" class="form-control">
                          <option value="complet">Payement complet </option>    
                          <option value="avance">Payement en avance</option>    
                      </select>-->
                      <v-select density="comfortable" style="height: 40px; font-size: 16px;"
                      v-model="location.statut"
                      :item-props="itemPropsDisp"
                      :items="items"
                      label="Mode de payment"
                    ></v-select>
                      <span class="ErrorSpan" v-if="errorStatut">* {{ errorStatut }}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <v-btn color="primary" height="43" prepend-icon="mdi mdi-content-save" @click="Save" class="btn btn-primary mr-2">Modifier</v-btn>
                    <v-btn  color="danger" style="color: white;" height="43" prepend-icon="mdi mdi-close" @click="format" class="btn btn-danger">Annuler</v-btn>
                </div>
            </div>
        </div>
        <div class="col-md-6 mt-2">
            <div class="card">
                <div class="card-header">
                    <h2>Vehicule disponible</h2>
                    <button @click="PermisModifier" class="btn btn-primary"><span class="material-icons-sharp">refresh</span> Recharger</button>
                </div> 
                <div class="card-body">
                    <div class="select-menu">
                        <div class="select-btn">
                            <span class="sBtn-text">Select your option</span>
                            <i class="bx bx-chevron-down"></i>
                        </div>
                        <ul class="options">
                            <li class="option"  :key="vehicule.matricule" v-for="vehicule in vehicules" @click="selectVehicule(vehicule.matricule)">
                                <img :src="getAttachmentUrl(vehicule.attachment)" class="img-fluid" alt="">
                                <span class="option-text">{{ vehicule.nomVoiture }} - {{ vehicule.matricule }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-footer">
                    <h5>Footer</h5>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import swal from 'sweetalert2';
export default {
    data() {
        return {
            id: this.$route.params.id,
            permis: false,
            location: {
             matricule: '',
             client: '',
             date_debut: '',
             date_fin: '',
             montant: '',
             statut: ''
            },
            errorClient: '',
            errorDateDeb: '',
            errorDateFin: '',
            errorMontant: '',
            errorStatut: '',
            vehicules: [],
            clients: [],
            montantAPayer: null,
            differenceJours: null,
            items: [
          { nom: 'Payement complet', value: 'complet' },
          { nom: 'Payement en avance', value: 'avance' },
        ],

        }
    },
    created() {
       // this.LocationLoad(this.id);
         this.ClientLoad();
    //    if ((this.location.date_debut != null) && (this.location.date_fin != null)) {
    //        this.listeVehicule();
      //   //   this.SearchMontantApayer();
     //   } else {
     //       console.log("Ereur");
    //    }
    },
   async mounted() {
        await this.LocationLoad(this.id);
        await this.SearchMontantApayer();
        if ((this.location.date_debut != null) && (this.location.date_fin != null)) {
           await this.listeVehicule();
        }

        console.log("App mounted .......");
    },
    methods: {
        async LocationLoad(id)
    {
        try {
            const response = await axios.get(`http://localhost:8800/location/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const LocationData = responseData[0]; // Suppose que vous voulez le premier élément du tableau
        this.location = {
            matricule: LocationData.matricule,
            client: LocationData.client,
            date_debut: LocationData.date_debut,
            date_fin: LocationData.date_fin,
            montant: LocationData.montant,
            statut: LocationData.statut
        };
        console.log(this.location.statut);
    }
    

        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
        
    },
    itemProps (item) {
        return {
          title: item.nom,
          subtitle: item.prenom,
          value: item.id_client,
        }
      },
      itemPropsDisp (item) {
        return {
          title: item.nom,
          value: item.value
        }
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
    format () {
        this.formatInput();
        this.formatError();
    },
    PermisModifier () {
        this.permis = true;
        this.SearchMontantApayer();
        this.listeVehicule();
    },
    selectVehicule (vehicule) {
        this.location.matricule = vehicule;
        this.SearchMontantApayer();
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
    async listeVehicule() {
    try {
        const response = await axios.post('http://localhost:8800/vehicule/filtrerParDisponibilite', {
            searchTerm1: this.location.date_debut,
            searchTerm2: this.location.date_fin
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });

        this.vehicules = response.data.data;
        console.log(this.vehicules);
    } catch (error) {
        console.error("Une erreur s'est produite lors de la recherche:", error);
    }
},
async SearchMontantApayer() {
    try {
        const response = await axios.post('http://localhost:8800/location/montant', {
            searchTerm: this.location.matricule
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
         
        const responseData = response.data.data;
        if (responseData.length > 0) {
        var date1 = new Date(this.location.date_debut);
        var date2 = new Date(this.location.date_fin);
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
Save () {
    this.formatError();
    if (this.location.client != '' && this.location.date_debut != '' && this.location.date_fin && this.location.montant != '') {
        this.saveData();
    } else {
        if (!this.location.client) {
            this.errorClient = 'Le champs client ne peut pas etre vide :(';
        }
        if (!this.location.date_debut) {
            this.errorDateDeb = 'Vous devez renseignez la date de debut :(';
        }
        if (!this.location.date_fin) {
            this.errorDateFin = 'Vous devez renseignez la date de fin :(';
        }
        if (!this.location.montant) {
            this.errorMontant = 'Vous devez renseignez le champs montant :(';
        }
        if (!this.location.statut) {
            this.errorStatut = 'Vous devez renseignez le champs statut :(';
        }
        swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "Veuillez renseignez tous les champs :(",
                    showConfirmButton: false,
                    timer: 1800
                });
    } 
},
formatInput () {
     this.location.client = '';
     this.location.date_debut = '';
     this.location.date_fin = '';
     this.location.montant = '';
     this.location.statut = '';
},
formatError () {
    this.errorClient = '';
     this.errorDateDeb = '';
     this.errorDateFin = '';
     this.errorMontant = '';
     this.errorStatut = '';
},
 async saveData()
    {
    try {
        const response = await axios.put("http://127.0.0.1:8800/location/"+this.id, {
        matricule: this.location.matricule,
        client: this.location.client,
        date_debut: this.location.date_debut,
        date_fin: this.location.date_fin,
        montant: this.location.montant,
        statut: this.location.statut
    },
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        });
        if (response.data.result === "Location modifiée avec succès") {
            swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Location enregistrer dans la base de donnée",
                    showConfirmButton: false,
                    timer: 1800
                });
                this.formatInput();
                this.formatError();
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


        console.log(response.data.result);
    } catch (err) {
        console.log(err);
    }    
 },
    },
}
</script>
<style scoped>
  .container {
    margin-top: 80px;
  }
  .select-menu {
    width: 100%;
    
}
.select-menu .select-btn {
    display: flex;
    height: 55px;
    background: #fff;
    padding: 20px;
    font-size: 18px;
    font-weight: 400;
    border-radius: 8px;
    align-items: center;
    cursor: pointer;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
.select-btn i {
    font-size: 25px;
    transition: 0.5s;
}
.select-menu.active .select-btn i {
    transform: rotate(-180deg);
}
.select-menu .options {
    height: 420px;
    width: 100%;
    position: relative;
    padding: 20px; 
    margin-top: 10px;
    border-radius: 8px;
    background: var(--color-white);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    overflow: auto;
    overflow: overlay;
}
.select-menu .options::-webkit-scrollbar{
    width: 0.5rem;
    height: 0.5rem;
  }
  .select-menu .options::-webkit-scrollbar-thumb{
    border-radius: .5rem;
    background-color: #0004;
   
  }
.select-menu.active .options {
    display: block;
}
.options .option {
    display: flex;
    margin-bottom: 15px;
    cursor: pointer;
    padding: 16px;
    border-radius: 8px;
    align-items: center;
    background: var(--color-white);
}
.options .option span {
    color: var(--color-dark-variant);

}

.options .option:hover,
.option.active {
    background: #f2f2f2;
}
.option img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 12px;
    object-fit: cover;
    object-position: center;
}
.option .option-text {
    font-size: 18px;
    color: #333;
}
.card {
    border: none;
    background: var(--color-white);
    box-shadow: var(--box-shadow);
    border-radius: 1rem;
}
.card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--color-white);
    border-top-right-radius: 1rem;
    border-top-left-radius: 1rem;
    border: none;
}
.card .card-header .btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card .card-header button span {
    font-size: 20px;
    margin-right: 5px;
} 
.card .card-header h2 {
    margin: 20px;
}

.card .card-footer {
    background: var(--color-white);
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    border: none;
}
.card-body {
    width: 100%;
    padding: 5px 20px;
  }
  .card-body .form-group {
    padding: 10px 20px;
  }
  .card-footer .btn {
    margin: 10px;
  }
  .card-footer .btn-primary {
    margin-left: 20px;
  }
  .card-body .form-group label{
    font-size: 15px;
    margin-bottom: 5px;
  }
  .card-body .form-group input,
  .card-body .form-group select{
    font-size: 15px;
    color: var(--color-dark-variant);
    background: var(--color-white);
    padding: 10px;
  }
  .ErrorSpan {
    font-size: 15px;
    margin: 15px 0;
    color: red;
  }

</style>