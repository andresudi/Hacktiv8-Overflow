import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    question_list: [],
    my_questions: [],
    title: '',
    description: '',
    question: '',
    answer: '',
    token: '',
    user_login: '',
    created: '',
    baseUrl: 'http://localhost:3000',
    errorMessage : '',
    notif: ''
  },

  mutations: {
    setNotif (state, payload) {
      state.notif = payload
    },

    setErrorMessage (state, payload) {
      state.errorMessage = payload
    },

    setQuestionList (state, payload) {
      state.question_list = payload
    },

    setMyQuestion (state,payload) {
      state.my_questions = payload
    },

    setTitle (state,payload) {
      state.title = payload
    },

    setDescription (state,payload) {
      state.description = payload
    },

    setOneQuestion(state,payload) {
      state.question = payload
    },

    setAnswer(state,payload) {
      state.answer = payload
    },

    setToken(state,payload) {
      state.token = payload
    },

    setUserLogin(state, payload) {
      state.user_login = payload
    },

    setYangBuat(state,payload) {
      state.created = payload
    }
  },

  actions: {
    register (context,data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/users/register`,
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          swal({
            type: 'success',
            title: result.data.message,
          })
          router.push('/login')
        })
        .catch((err) => {    
          context.commit('setErrorMessage', err.response.data.message)
          setInterval(function () {
            context.commit('setErrorMessage', '')
          }, 3000)
        });
    },

    login (context,data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/users/login`,
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success')
          localStorage.setItem('token', result.data.token)
          localStorage.setItem('name', result.data.name)
          context.commit('setToken', localStorage.getItem('token'))
          context.commit('setUserLogin',result.data.email)
          router.push('/')
        })
        .catch((err) => {
          console.log(err.response.data.message);
          context.commit('setErrorMessage', err.response.data.message)
          setInterval(function () {
            context.commit('setErrorMessage', '')
          }, 3000)
        });
    },

    logout(context,data) {
      localStorage.removeItem('token')
      context.commit('setToken', '')
      router.push('/')
    },

    getAllQuestion (context,data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/questions`
      })
        .then((response) => {
          context.commit('setQuestionList', response.data.data)
        })
        .catch((err) => {
          
        });
    },

    getMyQuestion (context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/questions/me`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        context.commit('setMyQuestion', result.data.data)
      }).catch((err) => {
        
      });
    },

    getOneQuestion (context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/questions/${data}`
      })
        .then((result) => {
          context.commit('setTitle', result.data.data.title)
          context.commit('setDescription', result.data.data.description)
          context.commit('setOneQuestion', result.data.data)
          context.commit('setYangBuat', result.data.data.userId.name)
        })
        .catch((err) => {
          
        });
    },

    createQuestion (context, data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/questions`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
        .then((result) => {
          context.commit('setNotif', result.data.message)
          setInterval(function () {
            context.commit('setNotif', '')
          }, 5000)
          router.push('/question')
        })
        .catch((err) => {
          
        });
    },

    deleteQuestion (context, data) {
      axios({
        method: 'delete',
        url: `${this.state.baseUrl}/questions/${data}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    updateQuestion (context,data) {
      axios({
        method: 'put',
        url: `${this.state.baseUrl}/questions/${data.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
        .then((result) => {
          router.push('/question')
        })
        .catch((err) => {
          
        });
    },

    createAnswer (context, data) {
      axios({
        method: 'post',
        url: `${this.state.baseUrl}/answers`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: data.answer,
          questionId: data.questionId,
        }
      })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          
        });
    },

    getAllAnswer (context, data) {
      axios({
        method: 'get',
        url: `${this.state.baseUrl}/answers/${data}`,
      })
        .then((result) => {
          context.commit('setAnswer', result.data.data)
        })
        .catch((err) => {
          
        });
    },

    sendEmail (context) {
      let token = localStorage.getItem('token')
      axios.post(`${this.state.baseUrl}/users/sendmail`, {
        email: this.state.newUser.email,
        name: this.state.newUser.name
      }, {
        headers: {
          token: token
        }
      })
        .then(emailSent => {
          console.log('email sent')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})