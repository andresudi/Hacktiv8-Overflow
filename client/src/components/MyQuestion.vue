<template>
    <v-container>
        <h1 v-show="this.my_questions.length > 0">My Questions</h1>
        <br>
        <v-layout align-start justify-start row fill-height wrap>
            <v-flex xs12 sm12 v-for="(data,i) in my_questions" v-bind:key="i" class="tes">
                <v-card class="hoho">
                    <v-card-title primary-title>
                        <div class="kontent">
                            <h2 class="headline mb-0"><strong>{{ data.title }}</strong></h2>
                            <hr>
                            <br>
                            <div v-if="data.userId.name">
                                <p class="margin-left: 500px;"> Posted on {{ data.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ data.userId.name }}</p>
                            </div>
                            <div v-else>
                                <p class="margin-left: 500px;"> Posted on {{ data.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by Anonymous</p>
                            </div>
                            <h4 v-html="data.description"> {{ data.description }} </h4>
                        </div>
                    </v-card-title>
    
                    <v-card-actions>
                        <router-link :to="`/forum/question/${data._id}`">
                            <v-btn style="margin-left: 370px;" class="indigo darken-3" dark>Detail
                                <v-icon dark right>check_circle</v-icon>
                            </v-btn>
                        </router-link>
                        <router-link :to="`/forum/question/update/${data._id}`">
                            <v-btn class="indigo darken-4" style="margin-left: 20px;" dark>Edit
                                <v-icon dark right>build</v-icon>
                            </v-btn>
                        </router-link>
                        <v-btn left color="red" class="bg" @click="remove(data._id)">Delete</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {
        mapActions,
        mapState
    } from "vuex";
    export default {
    
        computed: {
            ...mapState({
                my_questions: 'my_questions'
            })
        },
    
        methods: {
            ...mapActions([
                'getMyQuestion',
                'deleteQuestion'
            ]),
    
            remove(data) {
                this.deleteQuestion(data)
            }
        },
    
        watch: {
            my_questions: function() {
                this.getMyQuestion()
            }
        },
    
        created() {
            this.getMyQuestion()
        }
    }
</script>

<style scoped>
    .v-btn {
        color: white;
        background-color: brown;
    }
    
    .tes {
        background-color: gainsboro;
        margin-bottom: 50px;
    }
    
    .hoho {
        background-color: gainsboro;
        position: center;
        text-align: center;
        min-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
    
    .kontent {
        min-width: 100%;
        min-height: 80px;
    }
</style>
