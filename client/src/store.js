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
    created: ''
  },

  mutations: {
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
        url: `http://localhost:3000/users/register`,
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
          swal({
            type: 'error',
            title: err.message,
          })
        });
    },

    login (context,data) {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/login',
        data: {
          email: data.email,
          password: data.password
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success')
          localStorage.setItem('token', result.data.token)
          context.commit('setToken', localStorage.getItem('token'))
          context.commit('setUserLogin',result.data.email)
          router.push('/')
        })
        .catch((err) => {
          swal(err.message)
        });
    },

    logout(context,data) {
      localStorage.removeItem('token')
      swal('Good Bye', '', 'success')
      context.commit('setToken', '')
      router.push('/')
    },

    getAllQuestion (context,data) {
      axios({
        method: 'get',
        url: 'http://localhost:3000/questions'
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
        url: 'http://localhost:3000/questions/me',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        context.commit('setMyQuestion', result.data.data)
      }).catch((err) => {
        
      });
    },

    getOneQuestion (context,data) {
      axios({
        method: 'get',
        url: `http://localhost:3000/questions/${data}`
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
        url: `http://localhost:3000/questions`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success')
          router.push('/question')
        })
        .catch((err) => {
          
        });
    },

    deleteQuestion (context, data) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/questions/${data}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success')
        })
        .catch((err) => {
          
        });
    },

    updateQuestion (context,data) {
      axios({
        method: 'put',
        url: `http://localhost:3000/questions/${data.id}`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          title: data.title,
          description: data.description
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success');
          router.push('/question')
          
        })
        .catch((err) => {
          
        });
    },

    createAnswer (context, data) {
      axios({
        method: 'post',
        url: `http://localhost:3000/answers`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          answer: data.answer,
          questionId: data.questionId,
        }
      })
        .then((result) => {
          swal(result.data.message, '', 'success')
        })
        .catch((err) => {
          
        });
    },

    getAllAnswer (context, data) {
      axios({
        method: 'get',
        url: `http://localhost:3000/answers/${data}`,
      })
        .then((result) => {
          context.commit('setAnswer', result.data.data)
        })
        .catch((err) => {
          
        });
    },

    sendEmail (context) {
      let token = localStorage.getItem('token')
      axios.post(baseUrl + '/users/sendmail', {
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