<template>
    <v-container>
        <v-jumbotron class="jumbo">
            <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                <h3 class="display-1">Add Your Question</h3>
                <br>
                
                <v-text-field label="please type here..." v-model="title"></v-text-field>
                <br>
                <wysiwyg v-model="description"/>
                <v-btn class="mx-0" color="blue" @click="addQuestion">
                    Submit
                </v-btn>
                </v-flex>
            </v-layout>  
            </v-container>
        </v-jumbotron>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data () {
        return {
            title: '',
            description: ''
        }
    },

    methods: {
        ...mapActions([
            'createQuestion'
        ]),

        addQuestion() {
            let obj = {
                title: this.title,
                description: this.description
            }
            this.title = '',
            this.description = ''
            this.createQuestion(obj)
        }
    }
}
</script>

<style scoped>
    .jumbo {
        border: 1px solid black;
    }
</style>
 