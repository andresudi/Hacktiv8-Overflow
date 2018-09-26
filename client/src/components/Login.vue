<template>
    <v-container>
        <v-card class="kartu blue-grey lighten-4">
            <h1>Login Form</h1>
            <v-form v-model="valid">
                <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" type="password" :rules="passRules" label="Password" required></v-text-field>
                <h4>Don't Have an Account?
                    <router-link to="/register">Register here</router-link>
                </h4>
                <v-btn class="mx-0 indigo darken-3" style="color: white;" @click="loginUser">Submit</v-btn>
                <!-- <g-signin-button :params="googleSignInParams" class="v-btn" @success="onSignInSuccess" @error="onSignInError">
                    Sign in with Google
                </g-signin-button> -->
                <div id="firebaseui-auth-container"></div>
            </v-form>
        </v-card>
        <br>
        <div>
            <v-alert v-if="errorMessage" :value="true" type="error" class="red darken-2">
                <h4 class="text-md-center">{{errorMessage}}</h4>
            </v-alert>
        </div>
    
    </v-container>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    import axios from "axios";
    import firebase from "firebase";
    import firebaseui from "firebaseui";
    import {
        config
    } from "../helpers/firebaseConfig";
    export default {
        data() {
            return {
                valid: false,
                password: "",
                passRules: [
                    v => !!v || "Password is required",
                    v => v.length >= 6 || "Password must be greater than 6 characters"
                ],
                email: "",
                emailRules: [
                    v => !!v || "E-mail is required",
                    v => /.+@.+/.test(v) || "E-mail must be valid"
                ],
                googleSignInParams: {
                    client_id: '466835311800-7htdh7h02oegaf8cli7nb86komerd0c4.apps.googleusercontent.com'
                }
            };
        },
        computed: {
            ...mapState({
                errorMessage: "errorMessage"
            })
        },
        methods: {
            ...mapActions(["login", "loginOath2"]),
            loginUser() {
                let obj = {
                    email: this.email,
                    password: this.password
                };
                this.login(obj);
            },
            onSignInSuccess(googleUser) {
                // `googleUser` is the GoogleUser object that represents the just-signed-in user.
                // See https://developers.google.com/identity/sign-in/web/reference#users
                const profile = googleUser.getBasicProfile() // etc etc
                console.log(profile, 'xxxx');
                let obj = {
                    name: profile.ig,
                    email: profile.U3,
                    password: profile.U3
                }
                this.loginOath2(obj)
            },
            onSignInError(error) {
                // `error` contains any error occurred.
                console.log('OH NOES', error)
            }
        },
        mounted() {
            var uiConfig = {

                signInOptions: [
                    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                ]
            };
            // var ui = new firebaseui.auth.AuthUI(firebase.auth());
            let ui = firebaseui.auth.AuthUI.getInstance();
            if (!ui) {
                ui = new firebaseui.auth.AuthUI(firebase.auth());
            }
            ui.start("#firebaseui-auth-container", uiConfig);
        }
    };
</script>

<style scoped>
    .kartu {
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        padding: 10px;
    }
    
    .g-signin-button {
        /* This is where you control how the button looks. Be creative! */
        display: inline-block;
        padding: 4px 8px;
        border-radius: 3px;
        background-color: #3c82f7;
        color: #fff;
        box-shadow: 0 3px 0 #0f69ff;
    }
</style>