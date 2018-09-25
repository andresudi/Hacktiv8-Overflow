<template>
    <v-container class="kontener">
        <h1>All Questions</h1>
        <br>
        <v-layout align-start justify-start row fill-height wrap>
            <v-flex xs12 sm12 v-for="(data,i) in question_list" v-bind:key="i" class="tes">
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
                    <hr>
                    <v-card-actions>
                        <v-btn flat icon color="blue lighten-2">
                            <v-icon>thumb_up</v-icon> 
                        </v-btn>
                        <p style="margin-left: 5px;">Upvote {{ data.likes.length }}</p>
                        <v-btn flat icon color="red lighten-2" style="margin-left: 20px;">
                            <v-icon>thumb_down</v-icon>
                        </v-btn>
                        <p style="margin-left: 5px;">Downvote {{ data.likes.length }}</p>
                        <router-link :to="`/forum/question/${data._id}`">
                            <v-btn style="margin-left: 260px; color: white;" flat class="indigo darken-3">Show Detail</v-btn>
                        </router-link>
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
                question_list: 'question_list'
            })
        },
        methods: {
            ...mapActions([
                'getAllQuestion',
            ])
        },
        created() {
            this.getAllQuestion()
        }
    }
</script>

<style scoped>

    .tes {
        margin-bottom: 50px;
        color: black;
    }
    
    .kontent {
        min-width: 100%;
        min-height: 80px;
    }
    
    .kontener {
        color: black;
    }
    
    .hoho {
        background-color: gainsboro;
        position: center;
        text-align: center;
        min-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
</style>