<!--<template>
    <div class="agenda">
        <Fullcalendar
            :options="calendarPlugins"
        />
    </div>
</template>

<script>
import Fullcalendar from '@fullcalendar/vue3';
import DayGridPlugin from '@fullcalendar/daygrid';
import TimeGridPlugin from '@fullcalendar/timegrid';
import InteractionPlugin from '@fullcalendar/interaction';
import ListPlugin from '@fullcalendar/list';
import { mapGetters } from 'vuex';

export default {    data() {
        return {
            calendarPlugins: {
                locale:"fr",
                plugins: [DayGridPlugin, TimeGridPlugin, InteractionPlugin, ListPlugin],
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                },
                dateClick: this.handleSelect,
                buttonText: {
                    today: 'Aujourd\'hui',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                    list: 'Liste'
                },
                selectable: true,
                weekends: false,
                events: "EVENTS"

            }
        }
    },

    components: {
        Fullcalendar
    },
    computed: {
        ...mapGetters(["EVENTS"])
    },
    methods: {
        handleSelect: function(arg) {
            console.log(arg.startStr);
          //console.log(arg.start);
            this.$store.commit("ADD_EVENT", {
               title: "Something",
               start: arg.startStr,
               end: arg.endStr,
               allDay: arg.allDay
            })
           
        }
    },
}
</script>

<style scoped>
.agenda {
    margin-top: 100px;
}
</style>-->

<template>
    <div class="ivelany">
        <h1>A propos de la voiture :</h1>
        <v-container class="about">
            <v-card>
                <v-row class="row gy-lg-5 align-items-center cards">
                    <div class="col-lg-6 order-lg-1 text-center text-lg-start tsisary">
                        <div class="title pt-3 pb-5">
                            <h2 class="position-relative d-inline-block ms-4 nom">
                                {{ vehicule.nomVoiture }}
                            </h2>
                        </div>
                        <div class="id">
                            <div class="row">
                                <div class="col-md-6">
                                    <p class="texte"><b class="titre"> <span class="material-icons-sharp">manage_accounts</span></b> Njarasoa Tommy</p>
                                    <p class="texte"><b class="titre"><span class="material-icons-sharp">token</span></b> {{ vehicule.marque }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="texte"><b class="titre"><span class="material-icons-sharp">app_registration</span></b> {{ vehicule.matricule }}</p>
                                    <p class="texte"><b class="titre"><span class="material-icons-sharp">oil_barrel</span></b> {{ vehicule.carburant }}</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="texte"><b class="titre"><span class="material-icons-sharp">chair</span></b> {{ vehicule.nbPlace }} places</p>
                                </div>
                                <div class="col-md-6">
                                    <p class="texte"><b class="titre"><span class="material-icons-sharp paid">paid</span></b> <span class="vidy">{{ vehicule.prix_location }} Ariary/Jours</span></p>
                                </div>

                            </div>
                        </div>
                        <v-row>
                            <v-col cols="12" sm="6">
                                <div class="boutton">
                                    <v-btn prepend-icon="mdi mdi-database-edit" color="primary" height="45" width="234" @click="redirection(vehicule.matricule)" class="btn btn-primary">Modifier</v-btn>
                                </div> 
                            </v-col>
                            <v-col cols="12" sm="6">
                                <div class="boutton">
                                    <v-btn prepend-icon="mdi mdi-content-save-move" color="warning" @click="redirectionLocation" height="45" width="234" class="btn">Reserver</v-btn>
                                </div>
                            </v-col>
                        </v-row>  
                    </div>
                    <div class="col-lg-6 order-lg-0 image">
                        <div class="img">
                            <v-img :src="getAttachmentUrl(vehicule.attachment)" alt="" class="ml-4 img-fluid" height="400" cover></v-img>
                        </div>
                    </div>
                </v-row>
            </v-card>
            </v-container>
        <v-container class="container fullcalendar">
            <v-card>
                <v-row class="row justify-content-center">
                    <div class="col-lg-12">
                        <div class="card">
                            <v-card-title class="card-header text-center mt-4">
                                <h2>La disponibilite de la voiture </h2>
                            </v-card-title>
                            <div class="card-body">
                                <div ref="calendar" class="calendrier text-center"></div>
                            </div>
                        </div>
                    </div>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
  import axios from 'axios'
import { Calendar } from '@fullcalendar/core'
import dayGrid from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'
export default {
   data() {
    return {
        matricule: this.$route.params.matricule,
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
    }
   }, 
   mounted() {
    let ViewModal = this, calendarEl=ViewModal.$refs.calendar;
    ViewModal.calendar = new Calendar(calendarEl, {
        plugins: [interaction, dayGrid],
        defaultView: 'dayGridMonth',
        locale: 'fr',
        editable: true,
        firstDay: 1,
        eventDurationEditable: false,
        selectLongPressDelay: 0,
       // events: this.getEvents(),
        eventDrop: function(info) {
            ViewModal.editEventDate(info)
        },
        eventClick: function(info){
            ViewModal.showModal = true;
            ViewModal.event={info:info.event};

        },
        dateClick:(info) =>{
            ViewModal.showModal = true;
            ViewModal.event={info:info};
        },
        buttonText: {
            today: 'Aujourd\'hui',
            month: 'Mois',
            week: 'Semaine',
            day: 'Jour',
            list: 'Liste'
        },
    })
    ViewModal.calendar.render();
    
    // Appeler getEvents() et fournir les événements au calendrier
    this.getEvents().then(events => {
        ViewModal.calendar.setOption('events', events);
    });
   },
   created () {
    this.VehiculeLoad(this.matricule);
  },
   methods: {
    async getEvents() {
        try {
            const response = await axios.post('http://localhost:8800/vehicule/agenda', {
            searchTerm: this.matricule
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        const eventsFromDatabase = response.data.data;
     //   const eventsArray = Object.values(eventsFromDatabase); // Convertir l'objet en tableau
        console.log("FromDatabase",eventsFromDatabase);

                // Formater les événements à partir des données de la base de données
        const events = eventsFromDatabase.map(event => {
            console.log("Start date:", event.date_debut);
            console.log("End date:", event.date_fin);
            return {
            title: "reserver",
            start: new Date(event.date_debut),
            end: new Date(event.date_fin)};
        });
        console.log(events);

        return events;
        } catch (error) {
            console.log(error);
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
    async VehiculeLoad(matricule)
    {
        try {
            const response = await axios.get(`http://localhost:8800/vehicule/${matricule}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0]; // Suppose que vous voulez le premier élément du tableau
        this.vehicule = {
            matricule: vehiculeData.matricule,
            nomVoiture: vehiculeData.nomVoiture,
            marque: vehiculeData.marque,
            idPropretaire: vehiculeData.idPropretaire,
            prix_location: vehiculeData.prix_location,
            pourcentage: vehiculeData.pourcentage,
            nbPlace: vehiculeData.nbPlace,
            carburant: vehiculeData.carburant,
            disponibilite: vehiculeData.disponibilite,
            attachment: vehiculeData.attachment // Suppose que vous n'obtenez pas cette donnée directement du backend
        };
        console.log("vehicule",this.vehicule);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
        
    },
    redirectionVehicule () {
     this.$router.push({ name: 'EmployeeCrud' }); 
    },
    redirectionLocation () {
     this.$router.push({ name: 'LocationCrud' }); 
    },
    redirection(matricule) {
     // this.closeModal();
     this.$router.push({ name: 'EditVehicule', params: { matricule: matricule } });
    
    },
        
   }
}
</script>
<style scoped>
.ivelany {
    width: 100%;
}
.cards {
    padding-bottom: 40px;
    background: var(--color-white);
}
  .fullcalendar {
    margin-top: 50px;
    margin-bottom: 50px;
    width: 100%;
    padding: 0;
    background: var(--color-white);
  }
  .about {
    margin-top: 36px;
  }
  .calendrier {
    width: 100%;
    border: none;
    height: 450px;
  }
  .card .card-body {
    background: var(--color-white);
  }
  .card .card-header {
    background: var(--color-white);
  }
  .boutton {
    padding-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-content: center;
  }
  .boutton .btn {
    font-size: 16px;
    width: 100%;
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px 50px;
  }
  .lead {
    font-size: 16px;
    font-weight: bolder;
    letter-spacing: .15rem;
  }
  .texte {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: 1px;
  }
  .titre {
    margin-right: 10px;
  }
  .titre span {
    font-size: 30px;
    color: var(--color-primary);
  }
  .id {
    margin-left: 20px;
  }
  .img {
    width: 100%;
    overflow: hidden;
    height: 400px;

  }
  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .prix {
    position: absolute;
    top: 100px;
    right: 70px;
    display: flex;
    margin-right: 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-danger);
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }
  .prix::before {
    position: absolute;
    content: "";
    background: var(--color-danger);
    width: 50px;
    height: 50px;
    top: 75px;
    right: 73px;
    transform: rotate(95deg);

  }
  .prix .price {
    font-size: 20px;
    font-weight: 500;
    color: #fff;
  }
  .prix .jours {
    z-index: 1009;
    font-size: 15px;
    color: var(--color-dark-variant);
  }
  .nom {
    color: var(--color-primary);
  }
  .vidy {
    font-size: 20px;
    font-weight: bold;
    color: var(--color-danger);
  }
  .paid {
    color: var(--color-danger)!important;
  }
</style>