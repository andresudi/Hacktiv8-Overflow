<template>
    <v-container>
        <v-layout>
            <v-flex class="tes">
                <v-card class="hoho">
                    <v-card-title primary-title>
                        <div class="kontent">
                            <h2>Question</h2>
                            <br>
                            <h2 class="headline mb-0"> {{ question.title }} </h2>
                            <hr>
                            <br>
                            <div v-if="question.userId.name">
                                <p class="margin-left: 500px;"> Posted on {{ question.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by {{ question.userId.name }}</p>
                            </div>
                            <div v-else>
                                <p class="margin-left: 500px;"> Posted on {{ question.createdAt | moment("dddd, MMMM Do YYYY, h:mm a")}} by Anonymous</p>
                            </div>
                            <div v-html="question.description"> {{ question.description }} </div>
                        </div>
                    </v-card-title>


                    <v-container>
                        <h2 v-show="answer.length > 0">Answers</h2>
                        <br>
                        <v-layout align-start justify-start row fill-height wrap>
                            <v-flex xs12 sm12 v-for="(data,i) in answer" v-bind:key="i" class="toss">
                                <v-card class="hihi">
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
                                        <v-btn flat icon color="blue lighten-2" @click="likeAnswer(data._id)">
                                            <v-icon>thumb_up</v-icon>
                                        </v-btn>
                                        <p style="margin-left: 5px;">Upvote {{ data.likes.length }}</p>
                                        <v-btn flat icon color="red lighten-2" style="margin-left: 20px;" @click="dislikeAnswer(data._id)">
                                            <v-icon>thumb_down</v-icon>
                                        </v-btn>
                                        <p style="margin-left: 5px; margin-right: 245px;">Downvote {{ data.dislikes.length }}</p>
                                         <v-btn flat v-if="check_login && userLogin == data.userId.email" class="mx-0 indigo darken-3" style="color: white;" :to="`/forum/answer/${question._id}/${data._id}`" >Edit</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>


                    <v-container>
                        <h2 v-show="check_login">Your Answer</h2>
                        <br>
                        <wysiwyg v-if="check_login" v-model="answerNew" class="he" />
                    </v-container>
                    <v-card-actions>
                        <v-btn flat v-if="check_login" class="green darken-2" style="color: white; margin-left: 465px;" @click="submitAnswer">Submit</v-btn>
                        <v-btn flat v-if="check_login" class="red darken-4" to="/forum" style="color: white; margin-left: 10px;">Back</v-btn>
                    </v-card-actions>
                </v-card>
                <br>
                <div>
                    <v-alert v-if="errorMessage" :value="true" type="error" class="red darken-2">
                        <h4 class="text-md-center">{{errorMessage}}</h4>
                    </v-alert>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import swal from "sweetalert";
export default {
  components: {},
  data() {
    return {
      answerNew: "",
      check_login: localStorage.getItem("token"),
      resultLike: "",
      resultDislike: "",
      userLogin: localStorage.getItem("email")
    };
  },
  computed: {
    ...mapState({
      question: "question",
      answer: "answer",
      token: "token",
      baseUrl: "baseUrl",
      errorMessage: "errorMessage"
    })
  },
  methods: {
    ...mapActions(["createAnswer", "getOneQuestion", "getAllAnswer"]),
    submitAnswer(data) {
      let obj = {
        answer: this.answerNew,
        question: this.$route.params.id
      };
      this.createAnswer(obj);
      this.answerNew = "";
    },

    likeAnswer(id) {
      axios({
        method: "put",
        url: `${this.baseUrl}/answers/like/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(result => {
          this.resultLike = result;
        })
        .catch(err => {
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
          this.resultDislike = result;
        })
        .catch(err => {
          swal(err.response.data.message, "", "error");
        });
    }
  },
  created() {
    this.getAllAnswer(this.$route.params.id);
    this.getOneQuestion(this.$route.params.id);
  },
  watch: {
    resultLike() {
      this.getAllAnswer(this.$route.params.id);
    },

    resultDislike() {
      this.getAllAnswer(this.$route.params.id);
    },

    answer() {
        this.getAllAnswer(this.$route.params.id);
    }
  }
};
</script>

<style scoped>
.tes {
  background-color: gainsboro;
}

.he {
  background-color: white;
}

.hoho {
  background-color: gainsboro;
  position: center;
  text-align: center;
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.hihi {
  background-color: white;
  position: center;
  text-align: center;
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.toss {
  margin-bottom: 20px;
  color: black;
}

.kontent {
  min-width: 100%;
  min-height: 80px;
}
</style>