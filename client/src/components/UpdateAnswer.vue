<template>
    <v-container>
        <v-jumbotron class="jumbo">
            <v-container fill-height>
                <v-layout align-center>
                    <v-flex>
                        <h3 class="display-1">Edit Answer</h3>
                        <br>
    
                        <br>
                        <wysiwyg v-model="answer" />
    
                        <v-btn class="mx-0" color="black" @click="updateAnswer">
                            Submit
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-jumbotron>
    </v-container>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
import { mapState } from "vuex";
export default {
  data() {
    return {
      answer: ""
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
          answer: this.answer
        }
      })
        .then(result => {
          swal(result.data.message);
          this.$router.push("/forum");
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
  }
};
</script>

<style>
</style>