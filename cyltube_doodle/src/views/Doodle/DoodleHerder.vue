<template>
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

</template>

<script>
    // import DoodleOptions from "./DoodleOptions";
    export default {
        name: 'DoodleHome',
        // components: {DoodleOptions},
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
            signIn() {
                if (this.loading) return
                this.loading = true
                console.log("123");
                this.steps = this.steps + 1;
                // this.$router.push({name: 'Home'})
            }
        }
    }
</script>

<style></style>
