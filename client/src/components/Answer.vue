<template>
    <v-container>
        <h2 v-show="answer.length > 0">Answers</h2>
        <br>
        <v-layout align-start justify-start row fill-height wrap>
            <v-flex xs12 sm12 v-for="(data,i) in answer" v-bind:key="i" class="tes">
                <v-card class="hoho">
                    <v-card-title primary-title>
                        <div class="kontent">
                             <i class="material-icons"> person</i> 
                            <h2 v-if="data.userId.name"> 
                               {{ data.userId.name }} 
                            </h2>
                            <h2 v-else>
                              Anonymous 
                            </h2>
                            <hr>
                            <p class="headline mb-0" v-html="data.answer"> {{ data.answer }} </p>
                            <hr>
                            <i> Posted on {{ data.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} </i>
                        </div>
                    </v-card-title>
    
                    <v-card-actions>
                        <v-btn  flat class="mx-0 indigo darken-3" style="color: white;" :to="`/forum/answer/${data._id}`">Edit</v-btn>
                         <v-btn flat icon color="blue lighten-2" @click="likeAnswer(data._id)">
                            <v-icon>thumb_up</v-icon>
                        </v-btn>
                        <p style="margin-left: 5px;">Upvote {{ data.likes.length }}</p>
                        <v-btn flat icon color="red lighten-2" style="margin-left: 20px;" @click="dislikeAnswer(data._id)">
                            <v-icon>thumb_down</v-icon>
                        </v-btn>
                        <p style="margin-left: 5px;">Downvote {{ data.dislikes.length }}</p>
                    </v-card-actions>
    
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      resultLike: "",
      resultDislike: ""
    };
  },
  computed: {
    ...mapState(["token", "user_login", "baseUrl", "answer"])
  },
  methods: {
    ...mapActions(["getAllAnswer"]),
    likeAnswer(id) {
      axios({
        method: "put",
        url: `${this.baseUrl}/answers/like/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          console.log("LIKEEE answr=====>", result.data);
          // swal(result.data.message);
          this.resultLike = result;
        //   this.getAllAnswer();
        })
        .catch(err => {
          console.log("ERRRR like answer===>", err.response);
          swal(err.response.data.message, "", "error");
        });
    },
    dislikeAnswer(id) {
      axios({
        method: "put",
        url: `${this.baseUrl}/answers/dislike/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          console.log("DISS ansswr=====>", result.data.data);
          console.log(this.user_login);
          // swal(result.data.message);
          this.resultDislike = result;
        //   this.getAllAnswer();
        })
        .catch(err => {
          console.log(err.response);
          swal(err.response.data.message, "", "error");
        });
    }
  },
  watch: {
    resultLike() {
      this.getAllQuestion();
    },

    resultDislike() {
      this.getAllQuestion();
    }
  },
  created() {
    this.getAllAnswer(this.$route.params.id);
  }
};
</script>

<style scoped>
.hoho {
  background-color: white;
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

.tes {
  margin-bottom: 20px;
  color: black;
}
</style>