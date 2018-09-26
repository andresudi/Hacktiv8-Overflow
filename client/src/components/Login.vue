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
    import axios from 'axios'
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
        computed: {
            ...mapState({
                errorMessage: 'errorMessage' 
            })
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
        },
    }
</script>

<style scoped>
    .kartu {
        margin-left: auto;
        margin-right: auto;
        border-radius: 20px;
        padding: 10px;
    }
    
</style>