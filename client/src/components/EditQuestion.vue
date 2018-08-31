<template>
    <v-container>
        <v-jumbotron class="jumbo">
            <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                <h3 class="display-1">Edit Question</h3>
                <br>
                
                <v-text-field label="title" v-model="title"></v-text-field>
                <br>
                <wysiwyg v-model="description" />
                
                <v-btn class="mx-0" color="green" @click="update">
                    Submit
                </v-btn>

                <v-btn class="mx-0" color="red" to="/question">
                    Back
                </v-btn>
                </v-flex>
            </v-layout>
            </v-container>
        </v-jumbotron>
    </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    data () {
        return {
        }
    },
    computed: {
        ...mapState([
            'title',
            'description'
        ]),
        title: {
            get () {
                return this.$store.state.title
            },
             set (value) {
                 this.$store.commit('setTitle', value)
             }
        },
        description: {
            get () {
                return this.$store.state.description
            },
             set (value) {
                 this.$store.commit('setDescription', value)
             }
        }
    },
    methods: {
        ...mapActions([
            'getOneQuestion',
            'updateQuestion'
        ]),
        update () {
            let obj = {
                id: this.$route.params.id,
                title: this.title,
                description: this.description
            }
            this.updateQuestion(obj)
        }
    },
    created () {
        this.getOneQuestion(this.$route.params.id)
    }
}
</script>

<style scoped>
    .jumbo {
        border: 1px solid black;
    }
    v-btn {
        margin-right: 20px;
    }
</style>