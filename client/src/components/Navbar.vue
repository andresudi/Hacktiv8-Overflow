<template>
    <v-toolbar class="nav">
        <v-toolbar-items class="hidden-sm-and-down" >
            <v-btn flat to="/">Home</v-btn>
            <v-btn flat to="/forum">Forum</v-btn>
            <v-btn flat to="/question" v-if="check_login">My Question</v-btn>
            <v-btn flat v-if="!check_login" to="/register" style="margin-left: 1150px;">Sign Up</v-btn>
            <v-btn flat v-if="!check_login" to="/login">Sign In</v-btn>
            <v-btn flat v-if="check_login" @click="logoutUser" style="margin-left: 1100px;">Sign Out</v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    export default {
        data() {
            return {
                check_login: false
            }
        },
        computed: {
            ...mapState({
                token: 'token'
            })
        },
        methods: {
            ...mapActions([
                'logout',
                'login'
            ]),
            logoutUser() {
                this.logout()
                this.check_login = false
            }
        },
    
        watch: {
            token() {
                this.check_login = this.token
            }
        },
    
        created() {
            let isToken = localStorage.getItem('token')
            if (isToken) {
                this.check_login = true
            } else {
                this.check_login = false
            }
        }
    }
</script>

<style scoped>
    .nav {
        background-color: brown;
        color: white;
    }
    
    .v-btn {
        color: white;
    }
</style>