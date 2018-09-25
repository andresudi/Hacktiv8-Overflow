<template>
    <v-container>
        <v-card class="kartu blue-grey lighten-4">
            <h1>Register Form</h1>
            <v-form v-model="valid">
                <v-text-field v-model="name" type="text" label="Name" required></v-text-field>
                <v-text-field v-model="email" type="email" :rules="emailRules" label="E-mail" required></v-text-field>
                <v-text-field v-model="password" type="password" :rules="passRules" label="Password" required></v-text-field>
                <h4>Already Have an Account?
                    <router-link to="/login">Login here</router-link>
                </h4>
                <v-btn color="blue" @click="registerUser">submit</v-btn>
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
    export default {
        data() {
            return {
                valid: false,
                name: '',
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
                'register'
            ]),
    
            registerUser() {
                let obj = {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
                this.register(obj)
            }
        },
        computed: {
            ...mapState({
                errorMessage: 'errorMessage'
            })
        }
    }
</script>

<style scoped>
    .kartu {
        margin-left: auto;
        margin-right: auto;
        padding: 10px;
        border-radius: 20px;
        background-color: burlywood
    }
    
    .top {
        margin-top: -20px;
    }
</style>