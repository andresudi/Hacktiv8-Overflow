<template>
    <v-content>
        <section>
            <v-parallax src="https://images.unsplash.com/photo-1496449903678-68ddcb189a24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e37a38ee23569d8e72896968903cf67a&auto=format&fit=crop&w=800&q=60" height="600">
                <v-layout column align-center justify-center class="white--text" style="margin-top: 300px;">
                    <h1 class="white--text mb-2 display-1 text-xs-center">Welcome To Hacktiv Overflow</h1>
                    <h4 class="subheading mb-3 text-xs-center">Think before you type!</h4>
                    <v-btn to="/forum" class="blue lighten-2 mt-5" dark large style="margin-bottom: 50px;">
                        Get Started
                    </v-btn>
                </v-layout>
            </v-parallax>
        </section>
        <section>
            <v-layout column wrap align-center>
                <v-flex xs12>
                    <v-container grid-list-xl>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">color_lens</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Upvote/Downvote</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Users can rank answers based on how relevant or helpful they found the answers to be. This feature helps maintain the quality of content posted online.[47] The more upvotes an answer receives, the higher it is ranked, and it shows up on top of the searches
                                        related to the question. If an answer is ranked poorly, it is “collapsed” and will not show up in people’s feeds.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">flash_on</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Suggest Edits</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Users make suggestions to improve an article by proposing changes to it. The proposed changes are also made visible to the original author of the question or answer and can be either approved and published or rejected.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Home feed questions recommendations</div>
                                    </v-card-title>
                                    <v-card-text>
                                        In this method, each user will have a timeline that is personalized to their preferences. Quora also provides "interesting" questions that are relevant to the user's preferences. This will lead to the user either answering that question or refers another
                                        user to better answer it.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>
    
        <section>
            <v-parallax src="https://images.unsplash.com/photo-1514580426463-fd77dc4d0672?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=802c875bf67a4dcaf275e11b1fa48d24&auto=format&fit=crop&w=800&q=60" height="400">
            </v-parallax>
        </section>
    
        <section>
            <v-container grid-list-xl>
                <v-layout row wrap justify-center class="my-5">
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-title primary-title class="layout justify-center">
                                <div class="headline">Company info</div>
                            </v-card-title>
                            <v-card-text>
                                Hacktiv-Overflow is a question-and-answer site where questions are asked, answered, edited, and organized by its community of users in the form of opinions. Its publisher, HO Inc., is based in Jakarta, Indonesia. The company was founded in June 2018,
                                and the website was made available to the public on September 21, 2018. Users can collaborate by editing questions and suggesting edits to answers that have been submitted by other users.[6] In September 2018, Quora reported
                                hitting 300 million monthly users.
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </v-content>
</template>

<script>
    import {
        mapActions
    } from "vuex";
    import firebase from "firebase"
    export default {
        data() {
            return {
                name: '',
                email: '',
                user: {}
            }
        },
    
        methods: {
            ...mapActions(["loginOath2"])
        },
    
        created() {
            this.user = firebase.auth().currentUser;
            if (this.user) {
                this.name = this.user.displayName;
                this.email = this.user.email;
            }
            let obj = {
                email: this.email,
                name: this.name
            }
            this.loginOath2(obj)
            console.log('=====> oath2 ', obj);
    
        }
    };
</script>

<style>
    
</style>
