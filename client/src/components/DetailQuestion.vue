<template>
    <v-container>
        <v-layout>
            <v-flex class="tes">
            <v-card>
                <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0"> {{ question.title }} </h3>
                    <div> {{ question.description }} </div>
                </div>
                </v-card-title>
                <v-container>
                    <h2>Please Answer Here</h2>
                    <br>
                    <wysiwyg v-if="check_login" v-model="answerNew" class="he" />
                    <div v-if="!check_login">
                        <h3>Please Login First to Answer</h3>
                        <v-btn color="blue" to="/login">Login</v-btn>
                    </div>
                </v-container>
                <v-card-actions>
                <v-btn flat color="orange" to="/forum">Back</v-btn>
                <v-btn flat v-if="token" color="orange" @click="submitAnswer">Answer</v-btn>
                <v-btn flat v-if="token" color="orange" @click="likeQuestion(question._id)">Like : {{ question.like.length }}</v-btn>
                <v-btn flat v-if="token" color="orange" @click="dislikeQuestion(question._id)">Dislike : {{ question.dislike.length }}</v-btn>
                </v-card-actions>
            </v-card>
            </v-flex>
        </v-layout>
        <Answer :answerProps="answer"></Answer>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from "vuex";
// import Answer from '@/components/Answer.vue';
import swal from 'sweetalert';
export default {
    components: {
        Answer
    },
    data () {
        return {
            answerNew: '',
            check_login: localStorage.getItem('token')
        }
    },
    computed: {
        ...mapState({
            question: 'question',
            answer: 'answer',
            token: 'token'
        })
    },
    methods: {
        ...mapActions([
            'createAnswer',
            'getOneQuestion',
            'getAllAnswer'
        ]),
        submitAnswer () {
            let obj = {
                answer: this.answerNew,
                questionId: this.$route.params.id
            }
            this.createAnswer(obj)
            this.answerNew = ''
        },
        likeQuestion (id) {
            axios({
                method: 'put',
                url: `http://35.240.190.67/questions/like/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((result) => {
                    console.log(result);
                    swal(result.data.message)
                })
                .catch((err) => {
                    
                });
        },
        dislikeQuestion (id) {
            axios({
                method: 'put',
                url: `http://35.240.190.67/questions/dislike/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
                .then((result) => {
                    console.log(result);
                    swal(result.data.message)
                })
                .catch((err) => {
                    
                });
        },
    },
    created () {
        this.getAllAnswer(this.$route.params.id)
        this.getOneQuestion(this.$route.params.id)
    }
}
</script>

<style scoped>
    .tes {
        background-color: gainsboro;
    }
    .he {
        background-color: white
    }
    
</style>