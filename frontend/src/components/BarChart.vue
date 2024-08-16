<template>
  <div>
    <h1>Tableau de bord</h1>
    <div class="container">
      <div class="row box-row">
        <div class="col-md-4 col-sm-12">
          <div class="box">
            <span class="material-icons-sharp active">real_estate_agent</span>
            <h2>Total recette</h2>
            <div class="row d-flex justify-space-between">
              <div class="col-md-6 col-sm-6 col-lg-6 montant">
                {{ somme }} Ar
              </div>
              <div class="col-md-6 col-sm-6 col-lg-6 pourcentage">
                <v-progress-circular color="indigo-darken-2" :model-value="gain" class="btn" :size="110" :width="5">
                  <v-avatar size="90">
                    {{ formatPourcentage(gain) }} % l'entreprise
                </v-avatar>
                </v-progress-circular>
              </div>
              <p>Dont {{ formatPourcentage(dette) }} % sont encore des dettes</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="box client">
            <span class="material-icons-sharp">group</span>
            <h2>Total clients</h2>
            <div class="row d-flex justify-space-between">
              <div class="col-md-6 col-sm-6 col-lg-6 montant">
                {{ nbClient }} pers
              </div>
              <div class="col-md-6 col-sm-6 col-lg-6 pourcentage">
                <v-progress-circular color="amber" model-value="90" class="btn" :size="110" :width="5">
                  <v-avatar size="90">
                    90 % fideles
                </v-avatar>
                </v-progress-circular>
              </div>
              <p>Dont 90 % sont des clients fideles</p>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-12">
          <div class="box vehicule">
            <span class="material-icons-sharp active">directions_car</span>
            <h2>Total vehicule</h2>
            <div class="row d-flex justify-space-between">
              <div class="col-md-6 montant">
                {{ nbVehicule }} voiture
              </div>
              <div class="col-md-6 col-sm-6 col-md-6 pourcentage">
                <v-progress-circular color="red" :model-value="formatPourcentage(PropnbVehicule * 100 / nbVehicule)" class="btn" :size="110" :width="5">
                  <v-avatar size="90">
                    {{ formatPourcentage(PropnbVehicule * 100 / nbVehicule) }}  % l'entreprise
                </v-avatar>
                </v-progress-circular>
              </div>
              <p>Dont {{ formatPourcentage(PropnbVehicule * 100 / nbVehicule) }} % sont des voitures de l'entreprise</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8 myChart">
          <h2 class="title">Somme des benefices par mois</h2>
          <canvas id="myChart" style="box-shadow: 0 .1rem .4rem #0002"></canvas>
        </div>
        <div class="col-md-4 myChart">
          <h2 class="title">Somme des benefices par mois</h2>
          <canvas id="myChart2" height="305px" style="box-shadow:  0 .1rem .4rem #0002;"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Chart from 'chart.js/auto';
export default {
    data() {
        return {
          somme: '',
          gain: '',
          dette: '',
          nbClient: '',
          nbVehicule: '',
          PropnbVehicule: '',
          instance: null,

        }
    },
   async mounted() {
  //  const ctx = document.getElementById('myChart');
    
  try {
            await this.SommeLocationLoad();
            await this.GainLocationLoad();
            await this.nombreClient();
            await this.nombreVehicule();
            await this.DetteLocationLoad();
            await this.PropretairenombreVehicule();
            await this.afficherPourcentage(); 

            const response = await axios.get('http://localhost:8800/location/taux' ,
         {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        });
        const eventsFromDatabase = response.data.data;
     //   const eventsArray = Object.values(eventsFromDatabase); // Convertir l'objet en tableau
     const events = eventsFromDatabase.map(event => {
            console.log("mois:", event.mois);
            console.log("pourcentage:", event.pourcentageVola);
            return {
            mois: (event.mois),
            data: (event.pourcentageVola)};
        });
        const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

                // Formater les événements à partir des données de la base de données
  const data = {
  labels: events.map(event => monthNames[event.mois - 1]),
  datasets: [{
    label:'Le pourcentage recu par l\'agence',
    data: events.map(event => event.data),
    backgroundColor: [
      'rgb(75, 192, 192)',
    ],
    borderColor: 'rgb(75, 192, 192)',
    fill: false,
    tension: 0.1,
    hoverOffset: 4
  }]
};
const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      customCanvasBackgroundColor: {
        color: 'white',
      }
    }
  },
  plugins: [plugin],
};
  const Mychart =  new Chart (
    document.getElementById('myChart'),
    config
  );
  Mychart;
  console.log("prim", config.data);
        } catch (error) {
            console.log(error);
        }

    },
    methods: {
      async afficherPourcentage () {
        try {
            const response = await axios.get('http://localhost:8800/location/vambevola' ,
         {
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
            console.log("Nom voiture:", event.nomVoiture);
            console.log("pourcentageVola:", event.pourcentageVola);
            return {
            nomVoiture: (event.nomVoiture),
            data: (event.pourcentageVola)};
        });

  const data = {
  labels:  events.map(event => event.nomVoiture),
  datasets: [{
    label:'Le pourcentage recu par l\'agence',
    data: events.map(event => event.data),
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
    ],
    borderWidth: 1,
    fill: false,
    tension: 0.1,
    hoverOffset: 4
  }]
};
const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const {ctx} = chart;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color || '#99ffff';
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  }
};
const config = {
  type: 'bar',
  data: data,
  options: {
    plugins: {
      customCanvasBackgroundColor: {
        color: 'white',
      }
    }
  },
  plugins: [plugin],
};
if (this.instance) {
  this.instance.destroy();
}
  this.instance =  new Chart (
    document.getElementById('myChart2'),
    config
  );
 // Mychart;
  console.log("deux", config.data);
        console.log(events);
        } catch (error) {
            console.log(error);
        }
      },
      async SommeLocationLoad()
    {
        try {
            const response = await axios.get(`http://localhost:8800/location/somme`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.somme = vehiculeData.somme;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.somme);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },

    formatPourcentage(value) {
      // Vérifie si la valeur est un nombre
       if (typeof value === 'number' && !isNaN(value)) {
        return value.toFixed(2);
      } else {
        return '0.00'; // ou une autre valeur par défaut appropriée
      }
    },
    async GainLocationLoad()
    {
        try {
            const response = await axios.get(`http://localhost:8800/location/gain`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.gain = vehiculeData.gain;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.gain);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },
    async DetteLocationLoad()
    {
        try {
            const response = await axios.get(`http://localhost:8800/location/dette`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.dette = vehiculeData.pourcentage;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.dette);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },
    async nombreClient()
    {
        try {
            const response = await axios.get(`http://localhost:8800/client/nombre`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.nbClient = vehiculeData.nombre;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.gain);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },
    async nombreVehicule()
    {
        try {
            const response = await axios.get(`http://localhost:8800/vehicule/nombre`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.nbVehicule = vehiculeData.nombre;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.gain);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },

    async PropretairenombreVehicule()
    {
        try {
            const response = await axios.get(`http://localhost:8800/vehicule/propnombre`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const responseData = response.data.data;
        if (responseData.length > 0) {
        
        const vehiculeData = responseData[0];
        this.PropnbVehicule = vehiculeData.nombre;
         // Suppose que vous voulez le premier élément du tableau
        console.log(this.gain);
    }


        } catch (error) {
        console.error('Error loading vehicle:', error);
    }
    },
}
}

</script>
<style scoped>
 .container {
  margin-top: 56px;

 }
 .pourcentage {
  margin-top: -50px!important;
 }
 .box-row {
  margin-bottom: 10px;
 }
 .box-row .col-md-4 {
  gap: 1rem;
 }
.box {
  box-shadow:  0 .1rem .4rem #0002;
  padding: 20px;
  background: var(--color-white);
}
.box .row .montant {
  color: #181a1e!important;
  font-size: 25px;
}
.box .row p {
  margin-top: 15px;
}
.box{
  margin-bottom: 10px;
  max-height: 212px;
}
.box .row .btn {
  margin-top: -17px;
  background: var(--color-white);
}
.v-progress-circular{
  right: -28%;

}
.box .row .pourcentage .btn{
  border: none;
  padding: 5px;
  color: var(--color-white);
  font-weight: 500;
  font-size: 16px;
}
.box span {
  margin-top: 0px;
  color: cornflowerblue;
  font-size: 50px;
}
.client span {

  color: var(--color-warning);

}
.client .row .btn {
  
}
.vehicule span {
  color: var(--color-danger);
}
.vehicule .row .btn {
  
}
.title {
  margin: 20px 0;
}
@media screen and (max-width: 768px) {
  .box .row .btn {
    margin-top: 0px;
  }
}
</style>