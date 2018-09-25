<template>
    <div class="footer">
        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
                <v-card-title class="deep-orange darken-4">
                    <strong>Get connected with us on social networks!</strong>
    
                    <v-spacer></v-spacer>
    
                    <v-btn v-for="icon in icons" :key="icon" class="mx-3" dark icon>
                        <v-icon class="icon" msize="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-title>
    
                <v-card-actions class="grey darken-3 justify-center">
                    &copy;2018 — <strong>Hacktiv Overflow</strong>
                </v-card-actions>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
    export default {
        data: () => ({
            icons: [
                "fa fa-facebook",
                "fa fa-twitter",
                "fa fa-google-plus",
                "fa fa-linkedin",
                "fa fa-instagram"
            ]
        })
    };
</script>

<style>
    .footer {
        background-color: #293d52;
        color: #293d52;
        position: sticky;
        width: 100%;
        background: #d4d4d4;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        /* display: block; */
    }
</style>