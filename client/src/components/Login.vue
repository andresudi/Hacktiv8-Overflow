<template>
    <v-container>
        <v-card class="kartu">
            <h1>Login Form</h1>
            <v-form v-model="valid">
                <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" type="password" :rules="passRules" label="Password" required></v-text-field>
                <h4>Don't Have an Account?
                    <router-link to="/register">Register here</router-link>
                </h4>
                <v-btn color="blue" @click="loginUser">Submit</v-btn>
            </v-form>
        </v-card>
    </v-container>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    import axios from 'axios'
    import swal from 'sweetalert'
    export default {
        data() {
            return {
                valid: false,
                password: '',
                passRules: [
                    v => !!v || 'Password is required',
                    v => v.length >= 6 || 'Password must be greater than 6 characters'
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ]
            }
        },
        methods: {
            ...mapActions([
                'login'
            ]),
            loginUser() {
                let obj = {
                    email: this.email,
                    password: this.password
                }
                this.login(obj)
            },
            loginfb() {
                this.checkLoginState()
            },
            checkLoginState() {
                console.log('masuk');
                FB.getLoginStatus(function(response) {
                    console.log(response);
                    if (response.status == 'connected') {
                        console.log(response);
                        axios.post('http://35.240.190.67/users/loginfb', response.authResponse)
                            .then((data_fb) => {
                                localStorage.setItem('token', data_fb.data.token)
                                swal({
                                    title: "Login Success!",
                                    icon: "success",
                                    button: "next",
                                });
                                this.$router.push('/')
                            })
                            .catch((err) => {
                                swal(err.message)
                            })
                    }
                });
            }
        },
    
        created() {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: "1783427051770530",
                    cookie: true,
                    xfbml: true,
                    version: "v2.8"
                });
            };
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "https://connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }
</script>

<style scoped>
    .kartu {
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        padding: 10px;
        background-color: bisque
    }
</style>