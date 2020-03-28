<template>
  <article>
    <div class="container">
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-right">
          </div>
        </div>
      </div>
      
      <form class="sign-in">
        <span class="headline">LOGIN</span>
          <v-text-field type="username" placeholder="Username Account" v-model="form.username" required></v-text-field>
          <v-text-field type="password" placeholder="Password Account" v-model="form.password" required></v-text-field>
        <v-btn color="green" @click="signIn()">Log In</v-btn>
      </form>
    </div>
    <v-snackbar 
      v-model="snackbar"
      :color="color" 
      :multi-line="true" 
      :timeout="6000" 
      :top="y === 'top'"> {{ text }} 
      <v-btn dark text @click="snackbar = false"> Close </v-btn> 
    </v-snackbar> 
  </article>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      role: [],
      pegawais: [],
      snackbar: false,
      color: null,
      text: '',
      load: false,
      pegawai: new FormData,
      typeInput: 'new',
      errorType: false,
      errors: '',
      updatedId: '',
      x: null,
      y: 'top'
    }
  },

  methods: {
    getData() {
      axios.get("http://kouvee.xbanana.id/api/pegawai")
      .then(
        response => {this.pegawais = response.data},
      )
      .catch(e => {
        this.errors.push(e)
      });
    },

    signIn() {
        var uri = "http://kouvee.xbanana.id/api/pegawai/login"
        this.pegawai = new FormData();
        this.pegawai.append('username',this.form.username);
        this.pegawai.append('password',this.form.password);
        this.$http.post(uri,this.pegawai).then(response =>{
          this.errorType = response.data.error;
          console.log(this.errorType);
          if (this.errorType == true) {
            this.snackbar = true;
            this.text = "Username/Password Salah";
            this.color = 'red';
            this.load = false;
          }
          else 
          {
            this.$session.set('dataPegawai', response.data);
            console.log(response.data);

            if(this.$session.get('dataPegawai').role == "CS")
            {
                this.$router.push({
                path: "/dashboardCS"
                });
            }
            else if(this.$session.get('dataPegawai').role == "Owner")
            {
                this.$router.push({
                path: "/dashboardOwner"
                });
            }
          }
        }).catch(error =>{ 
            this.errors = error;
            this.snackbar = true;
            this.text = "Username/Password Salah";
            this.color = 'red';
            this.load = false;
      });
    },
  },

  resetForm(){
    this.form = {
    username : '',     
    password : '',        
    }
  },

  mounted() {
    this.getData();
  },
}
</script>

<style lang="scss" scoped>
  .container {
    max-width: none;
    position: relative;
    height: 593px;
    overflow: hidden;
    box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
                0 10px 10px rgba(0, 0, 0, .2);
    background: linear-gradient(to bottom, #efefef, #ccc);
  }
    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform .5s ease-in-out;
      z-index: 4;
    }
    .overlay {
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      background: linear-gradient(to bottom right, #a4b0ab, black);
      color: #fff;
      transform: translateX(0);
      transition: transform .5s ease-in-out;
    }
    @mixin overlays($property) {
      position: absolute;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: space-around;
      flex-direction: column;
      padding: 200px 40px;
      width: 50%;
      height: 100%;
      text-align: center;
      transform: translateX($property);
      transition: transform .5s ease-in-out;
    }
    .overlay-left {
      @include overlays(-20%);
    }
    .overlay-right {
      @include overlays(0);
      background-image: url("WelcomeBG.gif");
      background-size: cover;
      right: 0;
    }

  h2 {
    margin: 0;
  }
  p {
    margin: 20px 0 30px;
  }
  a {
    color: #222;
    text-decoration: none;
    margin: 15px 0;
    font-size: 1rem;
  }
  .v-btn {
    border-radius: 20px;
    border: 1px solid #009345;
    background-color: #009345;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    padding: 10px 40px;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: transform .1s ease-in;
  }
  .v-btn.invert {
    background-color: transparent;
    border-color: #fff;
  }
  
  form {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    padding: 200px 70px;
    width: 50%;
    height: 100%;
    text-align: center;
    background: linear-gradient(to bottom, white, white);
    transition: all .5s ease-in-out;
  }

  .v-text-field {
      flex: none;
      border: 10px;
      width: calc(60%);
      overflow: hidden;
    }
  
  .sign-in {
    left: 0;
    z-index: 1;
  }
  @keyframes show {
    0% {
      opacity: 0;
      z-index: 1;
    }
    49% {
      opacity: 0;
      z-index: 1;
    }
    50% {
      opacity: 1;
      z-index: 3;
    }
  }
</style>