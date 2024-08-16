<template>
  <!----  <div class="container">
        <div class="row">
            <div class="offset-md-3 col-md-6 mt-5">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">
                        <h3>
                          Connectez vous
                        </h3>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="offset-md-3 col-md-6">
                            <form method="POST" v-on:submit.prevent="login">
                                <div class="form-group">
                                    <label for="email" class="text-black">Enter email</label>
                                    <input type="email" v-model="formData.email" class="form-control" name="email">
                                </div>
            
                                <br>
            
                                <div class="form-group">
                                    <label for="password" class="text-black">Enter password</label>
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
      <v-form v-model="form" class="form" @submit.prevent="login">
        <div class="d-flex text-start">
          <v-icon icon="mdi mdi-security"></v-icon>
          <h2>Se connecter</h2>
        </div>
        <div class="form-group mt-4">
         <!-- <span class="material-icons-sharp">mail_outline</span>
          <input v-model="formData.email"  type="email" name="email" placeholder="Enter Email Here">-->
          <v-text-field
          v-model="formData.email"
          prepend-inner-icon="mdi-email"
          :readonly="loading"
          :rules="[rules.required, rules.min, rules.email]"
          hint="At least 8 characters"
          class="input-group--focused mb-2"
          label="Email"
          type="email"
          name="email"
        ></v-text-field>
        </div>
       <div class="form-group mt-4">
        <!--<span class="material-icons-sharp">vpn_key</span>
        <input v-model="formData.password" type="password" name="password" placeholder="Enter Password Here"> -->
        <v-text-field
        v-model="formData.password"
        :readonly="loading"
        :rules="[rules.required, rules.min]"
        prepend-inner-icon="mdi-lock-outline"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        label="Password"
        class="input-group--focused"
        hint="At least 8 characters"
        placeholder="Enter your password"
        name="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>
       </div>
       <v-btn type="submit" 
       :disabled="!form"
       class="btn" 
       color="primary"
        size="large"
       :loading="loading"
       variant="elevated"
       block
       >Register</v-btn>
 
        <p class="link">Don't have an account<br><br>
        <router-link to="/registration">Sign up </router-link> here</p>
        </v-form>

</template>

<script>
   import axios from "axios";
import swal from "sweetalert2";

export default {
  data() {
    return {
      isLoading: false,
      formData: {
        email: '',
        password: ''
      },
      visible: false,  
      form: false,
      loading: false,
      rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',
          email: v => /.+@.+\..+/.test(v) || 'Veuillez saisir un email valide',
          emailMatch: () => (`The email and password you entered don't match`),
        },
    };
  },
  methods: {
    async login() {
      //this.isLoading = true;

      try {
        this.loading = true
        const response = await axios.post(this.$apiURL + "/login", this.formData);
        
        // Stocker le token JWT dans le localStorage
        localStorage.setItem('token', response.data.token);

        // Rediriger vers une autre page après la connexion réussie
        //this.$router.push('/');
        setTimeout(function () {
          this.loading = false
          window.location.href = "/vehicule"
        }, 2000);

      } catch (error) {
        this.loading = false
        console.error('Error registering user:', error);
        swal.fire("Error", "An error occurred while registering. Please try again later.", "error");
      } finally {
        this.isLoading = false;

      }
    },
    resetForm() {
      this.formData.email = '';
      this.formData.password = '';
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
 .v-form h2 {
  width: 220px;
  color: var(--color-primary);
  font-size: 22px; 
  background: var(--color-white);
  border-radius: 10px;
  padding: 8px;
 }
 .form .input {
  width: 240px;
  height: 35px;
  background: transparent;
  border-bottom: 1px solid var(--color-primary)!important;
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
 .v-text-field {
   font-size: 20px!important;
   height: 57px!important;
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
