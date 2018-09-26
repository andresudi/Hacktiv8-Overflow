<template>
    <v-container>
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-1">Edit Answer</h3>
                    <br>
    
                    <br>
                    <wysiwyg v-model="answer" />
    
                    <v-btn class="mx-0" color="green" style="color: white; " @click="updateAnswer">
                        Submit
                    </v-btn>
                     <v-btn class="mx-0" color="red" style="color: white;;" :to="`/forum/question/${idQ}`">
                        Back
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { mapState } from "vuex";
export default {
  data() {
    return {
      answer: "",
      idQ: '',
      idA: ''
    };
  },
  computed: {
    ...mapState({
      baseUrl: "baseUrl"
    })
  },
  methods: {
    updateAnswer() {
      axios({
        method: "put",
        url: `${this.baseUrl}/answers/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          answer: this.answer,
          
        }
      })
        .then(result => {
          console.log("das ist result von updateAnswre", result);
          this.$router.push(`/forum/question/${this.idQ}`);
        })
        .catch(err => {});
    }
  },
  mounted() {
    axios({
      method: "get",
      url: `${this.baseUrl}/answers/one/${this.$route.params.id}`,
      headers: {
        token: localStorage.getItem("token")
      }
    })
      .then(result => {
        this.answer = result.data.data.answer;
      })
      .catch(err => {});
  }, 
    created() {
        this.idQ = this.$route.params.question
        this.idA = this.$route.params.id
    }
};
</script>

<style>
</style>