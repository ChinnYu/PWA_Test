<template>
    <div>
        <v-container fluid v-if="getdPage === 0">
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
                            <div class="px-12 pt-6 pb-12">
                                <!--                        <div class="text-h1 text-subtitle-1 grey&#45;&#45;text text-center transition-swing">STEP 1 OF 41</div>-->
                                <!--                        <div class="text-h1 text-center transition-swing">What's the occasion?</div>-->
                                <h5 class="text-center grey--text">STEP 1 OF 4</h5>
                                <h1 class="text-center">What's the occasion?</h1>
                                <div class="px-12 pt-6 pb-12">
                                    <v-text-field label="Title" prepend-icon="mdi-text-short" @change="setTitle"></v-text-field>
                                    <!--                        <v-text-field label="Location" prepend-icon="mdi-map-marker"></v-text-field>-->
                                    <v-select :items="items" label="Location" prepend-icon="mdi-map-marker" @change="setLoc">
                                        <template v-slot:selection="{ item }">
                                            <!--                                <v-icon>{{item.icon}}</v-icon>{{ item.name }}-->
                                            {{ item.name }}
                                        </template>
                                        <template v-slot:item="{ item }">
                                            <v-icon :color="item.color" class="mr-2">{{item.icon}}</v-icon>{{ item.name }}
                                        </template>
                                    </v-select>
                                    <v-text-field label="Note" prepend-icon="mdi-text-long" @change="setNote"></v-text-field>
                                </div>
                                <!--                        <v-card-text>-->
                                <!--&lt;!&ndash;                            <p class="justify-center">123</p>&ndash;&gt;-->
                                <!--                            <ValidationObserver ref="form" v-slot="{ handleSubmit, reset }">-->
                                <!--                                <form @submit.prevent="handleSubmit(signin)" @reset.prevent="reset">-->
                                <!--                                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">-->
                                <!--                                        <v-text-field v-model="email" :error-messages="errors" label="Email" outlined></v-text-field>-->
                                <!--                                    </ValidationProvider>-->
                                <!--                                    <ValidationProvider v-slot="{ errors }" name="Password" rules="required">-->
                                <!--                                        <p class="ma-0 text-right">-->
                                <!--                                            <v-btn text small class="pl-0 text-capitalize" color="primary" href="true">-->
                                <!--                                                Forget Password?-->
                                <!--                                            </v-btn>-->
                                <!--                                        </p>-->
                                <!--                                        <v-text-field v-model="password" type="password" :error-messages="errors" label="Password" outlined></v-text-field>-->
                                <!--                                    </ValidationProvider>-->
                                <!--                                    <div class="mt-6 d-flex justify-space-between">-->
                                <!--                                        <v-btn text small class="pl-0 text-capitalize" color="primary" router to="signup">-->
                                <!--                                            Create account-->
                                <!--                                        </v-btn>-->
                                <!--                                        <v-btn type="submit" class="primary" :loading="loading" depressed>Sign in</v-btn>-->
                                <!--                                    </div>-->
                                <!--                                </form>-->
                                <!--                            </ValidationObserver>-->
                                <!--                        </v-card-text>-->
                            </div>
                        </div>


                        <div class="mt-1 pb-3 pr-2 d-flex justify-end">
                            <v-btn color="#517D0F"  raised large class="white--text rounded-sm" :loading="loading" depressed @click.stop="signIn">Continue</v-btn>
                        </div>
                        <!--                    <v-btn type="submit" class="primary float-right" :loading="loading" depressed>Sign in</v-btn>-->
                    </v-card>

                </v-col>
            </v-row>

        </v-container>
        <DoodleOptions v-if="getdPage === 1"></DoodleOptions>
        <DoodleResult v-if="getdPage === 2"></DoodleResult>
    </div>

</template>

<script>
    import DoodleOptions from "./DoodleOptions";
    import {mapGetters} from "vuex";
    import DoodleResult from "./DoodleResult";
    // import {mapGetters} from "vuex";
    export default {
        name: 'DoodleHome',
        components: {DoodleResult, DoodleOptions},
        computed: {
            ...mapGetters(['getdPage'])},
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
                await vm.$store.dispatch('upDatePageChose',vm.getdPage + 1 );
                // this.$router.push({name: 'Home'})
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
            }
        },
    }
</script>

<style></style>
