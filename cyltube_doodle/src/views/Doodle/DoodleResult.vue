<template>
    <div>
        <v-container fluid v-if="steps === 0">
            <v-row >
                <v-col cols="12" xs="12" sm="12" md="12" lg="8" class="ma-auto">
                    <v-card  :loading="loading">

                        <div class="px-3 pt-2 d-flex">
                            <span class="text-center font-weight-black" style="font-size: 1.5rem;color: #2372E8;">CYL</span>
                            <div>
                                <v-btn text small class="pl-0 text-capitalize grey--text ml-5 pt-3">
                                    ENGLISH
                                </v-btn>
                                <v-btn text small class="pl-0 text-capitalize grey--text ml-5 pt-3">
                                    HELP
                                </v-btn>
                                <v-btn text small class="pl-0 text-capitalize grey--text ml-5 pt-3">
                                    Legal Notice
                                </v-btn>
                                <v-btn text small class="pl-0 text-capitalize grey--text ml-5 pt-3">
                                    Privacy settings
                                </v-btn>
                            </div>
                            <v-spacer></v-spacer>
                            <div class="mt-1 pb-3  justify-end">
                                <v-btn tile small outlined class="grey--text mr-2" :loading="loading" depressed @click.stop="signIn">
                                    <v-icon small class="pr-1 black--text">mdi-account-circle</v-icon>
                                    <div class="black--text">Sign up</div>
                                </v-btn>
                                <v-btn tile small outlined class="grey--text mr-2" :loading="loading" depressed>
                                    <v-icon small class="pr-1 black--text">mdi-lock</v-icon>
                                    <div class="black--text">Log In</div>
                                </v-btn>
                            </div>
                        </div>
                        <div class="px-12">
                            <div class="px-12 pt-6 pb-12 d-flex">
                                <v-col cols="12" class="result_content">
<!--                                    <div  class="text-center" style="font-size: 2rem">INVITATION</div>-->
                                    <v-card  flat color="#FEFAEB" height="100%" class="rounded" >
                                        <div class="text-center" style="font-size: 2rem;color: #4682b4">INVITATION</div>
                                        <div style="height: 100%" class="rounded-0 d-flex flex-column">
                                            <v-spacer></v-spacer>
                                            <div class="mt-2 px-4 py-3">
                                                <v-text-field outlined readonly label="活動名稱" v-model="getdTitle">
                                                    <v-icon slot="prepend" color="#4682b4">
                                                        mdi-calendar-text-outline
                                                    </v-icon>
                                                </v-text-field>
                                                <v-text-field outlined readonly label="活動地點" v-model="getdLoc">
                                                    <v-icon slot="prepend" color="red">
                                                        mdi-map-marker
                                                    </v-icon>
                                                </v-text-field>
                                                <v-textarea outlined readonly label="活動內容" v-model="getdNote">
                                                    <v-icon slot="prepend" color="#4682b4">
                                                        mdi-table-of-contents
                                                    </v-icon>
                                                </v-textarea>
                                                <v-text-field outlined readonly label="活動時間" v-model="getdTime">
                                                    <v-icon slot="prepend" color="#4682b4">
                                                        mdi-clock-time-four
                                                    </v-icon>
                                                </v-text-field>
                                                <v-text-field outlined readonly label="人員" v-model="getUser">
                                                    <v-icon slot="prepend" color="#4682b4">
                                                        mdi-account-group
                                                    </v-icon>
                                                </v-text-field>
                                                <v-text-field outlined readonly label="回覆截止時間" v-model="getendTime">
                                                    <v-icon slot="prepend" color="red">
                                                        mdi-timeline-alert
                                                    </v-icon>
                                                </v-text-field>
                                            </div>
                                            <v-spacer></v-spacer>
                                        </div>


                                    </v-card>
                                </v-col>

                            </div>
                        </div>


                        <div class="mt-1 pb-3 pr-2 d-flex justify-end">
                            <v-btn color="#517D0F"  raised large class="white--text rounded-sm" :loading="loading" depressed @click.stop="signIn">finsh</v-btn>
                        </div>
                        <!--                    <v-btn type="submit" class="primary float-right" :loading="loading" depressed>Sign in</v-btn>-->
                    </v-card>

                </v-col>
            </v-row>

        </v-container>
        <DoodleOptions v-if="steps === 1"></DoodleOptions>
    </div>

</template>

<script>
    import DoodleOptions from "./DoodleOptions";
    import {mapGetters, mapState} from "vuex";
    import moment from "moment";
    export default {
        name: 'DoodleResult',
        components: {DoodleOptions},
        computed: {
            ...mapState([
                'datePicks'
            ]),
            ...mapGetters(['getdTitle','getdLoc','getdNote','getdPage','getDatePick']),
            getdTime(){
                console.log(this.getDatePick[0]['start']);
                return moment(this.getDatePick[0]['start']).format("YYYY-MM-DD hh:mm A");
            },
            getUser(){
                return "CY";
            },
            getendTime(){
                console.log(this.getDatePick[0]['start']);
                return moment(this.getDatePick[0]['start']).subtract(7, 'h').format("YYYY-MM-DD hh:mm A");
            }
        },
        data: () => ({

            email: '',
            password: '',
            loading: false,
            steps: 0,
            items:
                [
                    { name: 'To be defined', icon: 'mdi-npm',color: 'yellow'},
                    { name: 'Conference call', icon: 'mdi-phone-check',color: 'green'},
                    { name: 'Phone', icon: 'mdi-phone',color: 'blue'},
                    { name: 'Skype', icon: 'mdi-skype-business',color: 'blue'}
                ]
        }),
        methods: {
            getItemIcon(item){
                let a = item;
                item = a;
                return "mdi-text-long"
            },
            async signIn() {
                let vm = this;
                if (this.loading) return
                this.loading = true
                console.log("123");
                this.steps = this.steps + 1;
                await vm.$store.dispatch('upDatePageChose',0 );
                this.$router.push({name: 'Home'})
            },
            async setTitle(title){
                let vm = this;
                console.log(title);
                await vm.$store.dispatch('addDtitle',title );
            },
            async setLoc(loc){
                let vm = this;
                console.log(loc);
                await vm.$store.dispatch('addDLoc',loc['name'] );
            },
            async setNote(note){
                let vm = this;
                console.log(note);
                await vm.$store.dispatch('addDNote',note );
            },
        },
    }
</script>

<style>
    .result_content .v-card.v-sheet.theme--light {
        border-width:1px !important;
        border-style:solid !important;
        border-color:#F7BE00 !important;
    }
</style>
