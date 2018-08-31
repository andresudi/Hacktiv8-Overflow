<template>
    <v-container class="kontener">
        <h1>All Questions</h1>
        <br>
        <v-layout align-start justify-start row fill-height wrap>
            <v-flex xs12 sm6 v-for="(data,i) in question_list" v-bind:key="i" class="tes">
                <v-card class="ho">
                    <v-card-title primary-title>
                        <div class="kontent">
                            <h3 class="headline mb-0"> {{ data.title }} </h3>
                            <hr>
                            <div> {{ data.description }} </div>
                        </div>
                    </v-card-title>
    
                    <v-card-actions>
                        <router-link :to="`/forum/question/${data._id}`">
                            <v-btn flat color="blue">Show Detail</v-btn>
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
                'getAllQuestion'
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
    
    .ho {
        background-color: gainsboro;
        position: center;
        text-align: center;
        min-width: 100%;
        margin-left: auto;
        margin-right: auto;
    }
</style>