<template>
  <main class="content">
    <div class="login">
      <div class="logo">
        <img src="../images/logo.svg" alt="">
      </div>
      <form @submit.prevent="signIn">
        <label class="input">
          <input name="login" type="text" v-model="login" placeholder="Логин">
          <div v-show="errors[0]" class="error">
            <p>Поле логин обязательно</p>
          </div>
        </label>
        <label class="input">
          <input name="password" type="password" v-model="password" placeholder="Пароль">
          <div v-show="errors[1]" class="error">
            <p>Поле пароль обязательно</p>
          </div>
        </label>
        <button :disabled="disableButton[0] || disableButton[1]" @click="signIn">Войти</button>
        <div v-if="errors[2]" class="error">
          <p>Неверный логин или пароль</p>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
var moment = require('moment-timezone');
const device_tz = moment.tz.guess();
console.log(device_tz);
export default {
  name: 'Auth',
  data () {
    return {
      errors: [
        false,
        false,
        false
      ],
      login: '',
      password: '',
      disableButton: [true, true],
      submitted: false
    }
  },
  methods: {
      async signIn () {
        this.submitted = true;
        let response = await fetch('http://api.oko365.ru/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify({
            'oko-data': {
              login: this.login,
              password: this.password,
              device_datetime: device_tz
            }
          })
        }); 
        if (response.ok) {
          let result = await response.json();
          this.$router.push({ name: 'Hello', params: { name: this.login } });
        } else { this.$set(this.errors, 2, true); };
      }
  },
  watch: {
    login: function (val) {
      this.login = val;
      if (this.submitted) {
        this.errors[0] = this.login.length > 0 ? false : true; 
      };
      this.disableButton[0] = this.login.length > 0 ? false : true; 
    },
    password: function (val) {
      this.password = val;
      if (this.submitted) {
        this.errors[1] = this.password.length > 0 ? false : true; 
      };
      this.disableButton[1] = this.password.length > 0 ? false : true;
    }
  }
}
</script>

<style scoped>
.content {
  height: 100vh;
  overflow-x: scroll;
  overflow-y: hidden;
  background: url('../images/PageLogin-Bg.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content::-webkit-scrollbar {
    height: .5em;
    background-color: #fff;
}
.content::-webkit-scrollbar-thumb {
    background-color: #0271b0;
}
.content::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
}
.login {
  margin: 0;
  background: #fff;
  max-width: 335px;
  width: 335px;
  box-sizing: border-box;
  border-radius: 3px;
  position: relative;
  box-shadow: 0 0 172px rgba(59,61,130,.8);
  padding: 80px 40px 30px;
  vertical-align: baseline;
  display: block;
}
.logo {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: -60px;
  left: calc(50% - 60px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.logo img {
  max-height: 70%;
  max-width: 70%;
  display: block;
}
form {
  margin: 0;
  width: 100%;
  padding: 0;
  vertical-align: baseline;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.input {
  display: flex;
  flex-direction: column;
}
.input:first-child {
  margin-bottom: 10px;
}
input {
  width: 100%;
  padding-left: 15px;
  background-color: #f8f8f8;
  border: 1px solid hsla(0,0%,77.3%,.5);
  height: 30px;
  border-radius: 3px;
  vertical-align: middle;
  box-sizing: border-box;
  font-size: 14px;
}
button {
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 43px;
  background-color: #008acc;
  color: #fff;
  transition: all .25s ease-in-out;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
button:hover {
  background-color: #006899;
}
.error {
  padding: 7px 10px;
  background-color: #fce8e8;
  border: 1px solid #ff7f7f;
  border-radius: 3px;
}
.error p {
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-weight: 300;
  color: red;
  padding-left: 28px;
  position: relative;
}
.error p:before {
  content: "!";
  width: 16px;
  height: 16px;
  background-color: red;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  line-height: 16px;
  border-radius: 100%;
  position: absolute;
  top: -2px;
  left: 0;
}
button[disabled=disabled] {
    background: #c7c7c7!important;
    cursor: no-drop;
}
</style>
