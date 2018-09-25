<template>
    <v-container>
            <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                <h3 class="display-1">Add Your Question</h3>
                <br>
                <v-text-field label="please type here..." v-model="title"></v-text-field>
                <br>
                <wysiwyg v-model="description"/>
                <v-btn class="mx-0 indigo darken-3" style="color: white;" @click="addQuestion">
                    Submit
                </v-btn>
                </v-flex>
            </v-layout>  
            </v-container>
           <div>
            <v-alert v-if="notif" :value="true" type="success" class="green accent-4">
                <h4 class="text-md-center">{{notif}}</h4>
            </v-alert>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    },
    
    computed: {
        ...mapState({
           notif: 'notif'
        })
    }
}
</script>

<style scoped>
    .jumbo {
        border: 1px solid black;
    }
</style>
 