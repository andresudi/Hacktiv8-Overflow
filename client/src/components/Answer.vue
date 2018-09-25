<template>
    <v-container>
        <h1>Answers</h1>
        <br>
        <v-layout>
            <v-flex>
            <v-card v-for="(data,i) in answerProps" v-bind:key="i" class="tes">
                <v-card-title primary-title>
                <div>
                    <h1> {{ data.userId.name }} </h1>
                    <h3 class="headline mb-0"> {{ data.answer }} </h3>
                    <hr>
                    <i> Posted on : {{ data.createdAt.slice(0,10) }} </i>
                </div>
                </v-card-title>

                <v-card-actions v-if="token">
                <v-btn v-if="user_login === data.userId.email" flat color="orange" :to="`/forum/answer/${data._id}`">Update</v-btn>
                <v-btn flat @click="likeAnswer(data._id)">Like : {{ data.like.length }}</v-btn>
                <v-btn flat @click="dislikeAnswer(data._id)">Dislike : {{ data.dislike.length }}</v-btn>
                </v-card-actions>
                
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import axios from 'axios'
import swal from 'sweetalert';
export default {
    data() {
        return {
            tes: this.user_login
        }
    },
    props:['answerProps'],
    computed: {
        ...mapState([
            'token',
            'user_login'
        ])
    },
    methods: {
        ...mapActions([
            'getAllAnswer'
        ]),
        likeAnswer (id) {
            axios({
                method: 'put',
                url: `http://35.240.190.67/answers/like/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((result) => {
                    swal(result.data.message)
                })
                .catch((err) => {
                    
                });
        },
        dislikeAnswer (id) {
            axios({
                method: 'put',
                url: `http://35.240.190.67/answers/dislike/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((result) => {
                    console.log(result);
                    console.log(this.user_login);
                    swal(result.data.message)
                })
                .catch((err) => {
                    
                });
        }
    },
    watch: {
        answerProps: function () {
            this.getAllAnswer(this.$route.params.id)
        }
    }
}
</script>

<style>
</style>