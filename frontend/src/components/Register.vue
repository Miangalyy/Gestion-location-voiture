<template>
  <!--- <div class="container">
        <div class="row">
            <div class="offset-md-3 col-md-6 mt-5">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                        <h3>
                          Inscrivez vous
                        </h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="offset-md-3 col-md-6">
                            <form method="POST" v-on:submit.prevent="doRegister">
                                <div class="form-group">
                                    <label for="" class="text-white">Enter name</label>
                                    <input type="text" v-model="formData.name" class="form-control" name="name">
                                </div>
            
                                <br>
                                <div class="form-group">
                                    <label for="" class="text-white">Enter email</label>
                                    <input type="email" v-model="formData.email" class="form-control" name="email">
                                </div>
            
                                <br>
            
                                <div class="form-group">
                                    <label for="" class="text-white">Enter password</label>
                                    <input type="password" v-model="formData.password" class="form-control" name="password">
                                </div>
                                <br>
            
                                <input type="submit" class="btn btn-primary" 
                                v-bind:value="isLoading ? 'Loading...' : 'Register'" 
                                v-bind:disabled="isLoading"  name="submit">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>--> 

      <v-form v-model="form" method="POST" @submit.prevent="doRegister" class="form">
        <div class="d-flex text-start mb-3">
          <v-icon icon="mdi mdi-clipboard-account"></v-icon>
          <h2>S'inscrire</h2>
        </div>
        <div class="form-group">
          <v-text-field 
          class="mb-2"
          type="text" 
          prepend-inner-icon="mdi-account-circle"
          :rules="[rules.required, rules.minNom]"
          label="Name"
          hint="At least 5 characters"
          name="name" 
          v-model="formData.name"
          :readonly="loading"
          ></v-text-field>
        </div>
        <div class="form-group d-block text-center px-0 py-0">
          <v-text-field
          v-model="formData.email"
          prepend-inner-icon="mdi-email"
          :rules="[rules.required, rules.min, rules.email]"
          :readonly="loading"
          hint="At least 8 characters"
          class="input-group--focused"
          label="Email"
          type="email"
          name="email"
          required
        ></v-text-field>
        <span v-if="errorEmail" class="spanError">* {{ errorEmail }}</span>
        </div>

       <div class="form-group">
        <v-text-field
        v-model="formData.password"
        :readonly="loading"
        :rules="[rules.required, rules.min]"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        label="Password"
        class="input-group--focused mt-2"
        hint="At least 8 characters"
        placeholder="Enter your password"
        name="password"
        @click:append-inner="visible = !visible"
      ></v-text-field> 
       </div>
        <v-btn 
        :disabled="!form"
        type="submit" 
        class="btn"
        color="primary"
        size="large"
       :loading="loading"
       variant="elevated"
       block
        >Enregistrer
      </v-btn>
 
        <p class="link">Do have an account<br><br>
        <router-link to="/">Login </router-link> here</p>
        </v-form>
</template>
<script>
import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      visible: false,
      formData: {
        name: '',
        email: '',
        password: ''
      },
      errorEmail: '',
      form: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          minNom: v => v.length >= 4 || 'Min 4 characters',
          email: v => /.+@.+\..+/.test(v) || 'Veuillez saisir un email valide',
          emailMatch: () => (`The email and password you entered don't match`),
        },
    };
  },
  methods: {
    async doRegister() {
      this.isLoading = true;
      
      try {
        this.loading = true;
        this.errorEmail = '';
        const response = await axios.post(this.$apiURL + "/register", this.formData);

        if (response.data.status === true) {

          setTimeout(() => (this.loading = false,
          swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: "Compte creer avec success !",
                    showConfirmButton: false,
                    timer: 2000
                }),
                this.resetForm()
          ), 2000)

        }
      } catch (error) {
        if (error.response.data.message === 'Email already exists') {
          this.errorEmail  = "L'adresse email existe deja :(";
          swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "L'adresse email existe deja !",
                    showConfirmButton: false,
                    timer: 2000
                });
        }
        this.loading = false
        console.error('Error registering user:', error);
        
      } finally {
        this.isLoading = false;
      }
    },
    resetForm() {
      this.formData.name = null;
      this.formData.email = null;
      this.formData.password = null;
    }
  },
};
</script>
<style scoped>

 .form {
  width: 400px;
  background: var(--color-white);
  top: 150px;
  left: 750px;
  position: absolute;
  border-radius: 10px;
  padding: 10px 25px;
  box-shadow: var(--box-shadow);
  text-align: center;
 }
 .spanError {
  font-size: 14px;
  color: var(--color-danger);
}
 .form h2 {
  width: 220px;
  color: var(--color-primary);
  font-size: 22px; 
  background: var(--color-white);
  border-radius: 10px;
  padding: 8px;
 }
 .form input {
  width: 240px;
  height: 35px;
  background: transparent;
  border-bottom: 1px solid var(--color-primary);
  border-top: none;
  border-right: none;
  font-size: 15px;
  letter-spacing: 1px;
  margin-top: 30px;
  color: var(--color-dark);


 }

 .form input:focus {
  outline: none;
 }
 .btn {
  width: 240px;
  height: 40px;
  background: var(--color-primary)!important;
  color: #fff;
  margin-top: 30px;
  font-size: 18px;
  border-radius: 10px;
  cursor: pointer;
  transition: .4s ease;
 }
 .btn a {
  text-decoration: none;
  font-weight: bold;
  
 }
 .form .link {
  font-size: 17px;
  padding-top: 20px;
  text-align: center;
 }
 .form .link a {
  text-decoration: none;
  color: var(--color-primary);
 }
 .liw {
  padding-top: 15px;
  padding-bottom: 10px;
  text-align: center;
 }
 .form-group {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
 }
 .form-group span{
  position: relative;
  margin-top: 26px;
  margin-right: 10px;

 }
 .v-icon {
  color: var(--color-primary);
  font-size: 30px;
  margin-top: 7px;
 }
 @media screen and (max-width: 768px) {
  .form {
    left: 120px;
    top: 250px;
  }
 }
</style>