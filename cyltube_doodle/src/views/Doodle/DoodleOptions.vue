<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" xs="12" sm="12" md="12" lg="9" class="ma-auto">
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
                            <v-btn tile small outlined class="grey--text mr-2" :loading="loading" depressed>
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
                        <div class="px-12 pt-6 pb-5">
                            <!--                        <div class="text-h1 text-subtitle-1 grey&#45;&#45;text text-center transition-swing">STEP 1 OF 41</div>-->
                            <!--                        <div class="text-h1 text-center transition-swing">What's the occasion?</div>-->
                            <h5 class="text-center grey--text">STEP 2 OF 4</h5>
                            <h1 class="text-center font-weight-regular">What are the options?</h1>
                            <v-tabs v-model="tab" centered>
                                <v-tabs-slider color="blue"></v-tabs-slider>
                                <v-tab v-for="item in item_style" :key="item">
                                    {{ item }}
                                </v-tab>
                            </v-tabs>


                        </div>
                    </div>
                    <div class="px-12">
                        <v-tabs-items v-model="tab">
                            <v-tab-item v-for="item in item_style" :key="item">

                                <div class="d-flex" v-if="tab===0">
                                    <v-col cols="7" class="date_content">
                                        <v-card flat  >
                                            <div>
                                                <v-date-picker show-adjacent-months full-width show-current color="red" no-title v-model="pickDates" multiple @click:date="dblClick"></v-date-picker>
                                            </div>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="5" class="green_content">
                                        <v-card  flat color="#F9FDF1" height="100%" class="rounded-0 ">
                                            <div style="height: 100%" class="rounded-0 d-flex flex-column" v-if="dateTimeFlag || (pickDates.length === 0)">
                                                <v-spacer/>
                                                <div class="mt-2 px-4 py-3">
                                                    <!--                                                <div class="font-weight-medium blue-grey&#45;&#45;text" style="font-size: 0.5rem">SAME TIMES FOR ALL DATES (2)</div>-->
                                                    <div class="d-flex justify-center">
                                                        <v-btn tile small class="white--text" color="#2372E8" @click="setDateTimeFlag">
                                                            <v-icon small class="pr-1 white--text">mdi-clock-time-five-outline</v-icon>
                                                            <div class="white--text">Add Times</div>
                                                        </v-btn>
                                                    </div>
                                                    <div class="d-flex justify-center">
                                                        <div class="grey--text mt-2" style="font-size: 0.5rem">OPTIONAL</div>
                                                    </div>


                                                </div>
                                                <v-spacer/>
                                            </div>
                                            <div class="mt-2 px-4 py-3" v-if="!dateTimeFlag" style="">
                                                <div v-for="(item) in pickDates" :key="item">
                                                    {{changeTimeType(item)}}
                                                    <v-card  flat color="white" height="100%" class="rounded-0" >

                                                        <div v-for="(pe_item) in pickDateEvents(item)" :key="pe_item['pindex']">
<!--                                                            {{pe_item['pdate']+ pe_index}}-->
<!--                                                            {{changeTimeType(pe_item['start']) }}-->
                                                            <div class="d-flex white_line px-3 py-2" style="background: white">
                                                                <v-row>
                                                                    <v-col cols="5">
<!--                                                                        <v-overflow-btn :hide-spin-buttons=true dense editable :label="transferEventsTime(pe_item,2)" :items="transferEventsTime(pe_item,0)" class="mt-0"></v-overflow-btn>-->
                                                                        <v-overflow-btn :hide-spin-buttons=true dense editable :label="transferEventsTime(pe_item,2)" :items="transferEventsTime(pe_item,0)" @change="changeEventsTime($event,pe_item,'start')" class="mt-0"></v-overflow-btn>
                                                                    </v-col>
                                                                    <v-col cols="1">
                                                                        <div class="pt-2">-</div>
                                                                    </v-col>
                                                                    <v-col cols="5">
<!--                                                                        <v-overflow-btn :hide-spin-buttons="true" dense editable :label="transferEventsTime(pe_item,3)" :items="transferEventsTime(pe_item,1)" class="mt-0"></v-overflow-btn>-->
                                                                        <v-overflow-btn :hide-spin-buttons="true" dense editable :label="transferEventsTime(pe_item,3)" :items="transferEventsTime(pe_item,1)" @change="changeEventsTime($event,pe_item,'end')" class="mt-0"></v-overflow-btn>
                                                                    </v-col>
                                                                    <v-col cols="1" class="d-flex justify-center pb-6">
                                                                        <v-btn icon @click="delTimePic(pe_item['pindex'])">
                                                                            <v-icon small>mdi-close</v-icon>
                                                                        </v-btn>
                                                                    </v-col>
                                                                </v-row>
                                                            </div>
                                                            <v-divider></v-divider>
                                                        </div>
                                                        <div class="d-flex justify-center ">
                                                            <span class="grey--text " style="font-size: 0.5rem">Please add a time</span>
                                                        </div>
                                                    </v-card>
                                                </div>
                                            </div>

                                        </v-card>
                                    </v-col>
                                </div>
                                <div class="d-flex" v-else-if="tab===1">
                                    <v-col cols="12">
                                        <v-sheet height="600">
                                            <v-calendar
                                                    ref="calendar"
                                                    v-model="value"
                                                    color="primary"
                                                    type="week"
                                                    :events="pickEvents"
                                                    :event-color="getEventColor"
                                                    :event-ripple="false"
                                                    @change="getEvents"
                                                    @mousedown:event="startDrag"
                                                    @mousedown:time="startTime"
                                                    @mousemove:time="mouseMove"
                                                    @mouseup:time="endDrag"
                                                    @mouseleave.native="cancelDrag"
                                            >
                                                <template v-slot:event="{ event, timed, eventSummary }">
                                                    <div class="v-event-draggable" v-html="eventSummary()"></div>
                                                    <div v-if="timed" class="v-event-drag-bottom" @mousedown.stop="extendBottom(event)"></div>
                                                </template>
                                            </v-calendar>
                                        </v-sheet>
                                    </v-col>

                                </div>
                                <div class="d-flex" v-else-if="tab===2">
                                    <v-spacer></v-spacer>
                                    <v-col cols="9">
                                        <div class="px-12 pt-6 pb-12">
                                            <v-text-field label="Option">
                                                <v-icon slot="append" color="gray">
                                                    mdi-delete
                                                </v-icon>
                                                <v-icon slot="prepend" color="red">
                                                    mdi-numeric-1
                                                </v-icon>
                                            </v-text-field>
                                            <v-text-field label="Add Option">
                                                <v-icon slot="append" color="gray">
                                                    mdi-delete
                                                </v-icon>
                                                <v-icon slot="prepend" color="red">
                                                    mdi-numeric-2
                                                </v-icon>
                                            </v-text-field>
                                        </div>
                                    </v-col>
                                    <v-spacer></v-spacer>


                                </div>
                            </v-tab-item>
                        </v-tabs-items>
                    </div>

                    <div class="mt-1 pb-3 pr-2 d-flex justify-end">
                        <v-btn color="#517D0F" raised large class="white--text rounded-sm" :loading="loading" depressed @click.stop="signIn">Continue</v-btn>
                    </div>
<!--                    <v-btn type="submit" class="primary float-right" :loading="loading" depressed>Sign in</v-btn>-->
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters,mapState} from "vuex";
    import moment from "moment";

    export default {
        name: 'DoodleOptions',
        watch:{
            datePicks(){
                this.dates = this.pickDates;
                this.events = this.pickEvents;
                console.log("getDatePick");
            }
        },
        computed: {
            ...mapState([
                'datePicks'
            ]),
            ...mapGetters(['getDatePick','getdTitle','getdLoc','getdNote','getdPage']),
            pickDates:{
                get(){
                    let temp_date = [];
                    let temp_arr = this.getDatePick;
                    console.log(temp_arr);
                    temp_arr.forEach(function(value){
                        // array[index] = value + 1;
                        let flag = 0;
                        let i;
                        for (i=0;i <temp_date.length; i++){
                            if(temp_date[i] === moment(value['start']).format('YYYY-MM-DD')){
                                console.log("456");
                                console.log(moment(value['start']).format('YYYY-MM-DD'))
                                flag = 1;
                            }
                        }
                        if(flag === 0){
                            console.log("123");
                            console.log(moment(value['start']).format('YYYY-MM-DD'));
                            temp_date.push(moment(value['start']).format('YYYY-MM-DD'));
                        }
                    });
                    return temp_date;
                },
                set(){

                }

            },
            pickEvents(){
                // let temp_date = [];
                let temp_arr = this.getDatePick;
                console.log(temp_arr);
                // temp_arr.forEach(function(value){
                //     // array[index] = value + 1;
                //     let flag = 0;
                //     let i;
                //     for (i=0;i <temp_date.length; i++){
                //         if(temp_date[i] === value['pdate']){
                //             console.log("456");
                //             console.log(value['pdate'])
                //             flag = 1;
                //         }
                //     }
                //     if(flag === 0){
                //         console.log("123");
                //         console.log(value['pdate']);
                //         temp_date.push(value['pdate']);
                //     }
                // });
                return temp_arr;
            },

        },
        data (){
            // eslint-disable-next-line no-unused-vars
            let vm = this;
            return {
                dateTimeFlag:true,
                detailDate:null,
                email: '',
                password: '',
                loading: false,
                items:
                    [
                        { name: 'To be defined', icon: 'mdi-npm',color: 'yellow'},
                        { name: 'Conference call', icon: 'mdi-phone-check',color: 'green'},
                        { name: 'Phone', icon: 'mdi-phone',color: 'blue'},
                        { name: 'Skype', icon: 'mdi-skype-business',color: 'blue'}
                    ],
                tab: null,
                item_style: [
                    'Month', 'Week', 'Text',
                ],
                text: 'Lorem',
                dates: [],
                value: '',
                events: [],
                colors: ['#2196F3', '#3F51B5', '#673AB7', '#00BCD4', '#4CAF50', '#FF9800', '#757575'],
                names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
                dragEvent: null,
                dragStart: null,
                createEvent: null,
                createStart: null,
                extendOriginal: null,
            }
        },
        methods: {
            delTimePic(date_index){
                this.$store.dispatch('delDatePickByIndex',date_index );
            },
            TchangeEventsTime(e,ok){


                console.log(e);
                console.log(ok);

                // console.log(time_arr);
                // return [moment(date_item['start']).format("HH:MM A")]
            },
            async changeEventsTime(e,date_item,flag){
                let obj = date_item;
                obj['change_items'] = [flag];

                // console.log(date_item ['pdate']+ e);
                // console.log(moment(date_item ['pdate'] +' '+ e,["YYYY-MM-DD hh:mm A"]).format("YYYY-MM-DD hh:mm:ss"));
                obj[flag] = moment(date_item ['pdate'] +' '+ e,["YYYY-MM-DD hh:mm A"]).valueOf();
                await this.$store.dispatch('upDateDatePick',obj );
                console.log("change");
                // console.log(time_arr);
                // return [moment(date_item['start']).format("HH:MM A")]
            },
            transferEventsTime(date_item,flag){
                if(flag === 0){
                    let time_arr = [];
                    for(let i=0; i<96;i++){

                        time_arr.push(moment(moment(date_item['start']).format('YYYY-MM-DD').toString()).add(15*i,'m').format("hh:mm A"));
                    }
                    // console.log(time_arr);
                    // return [moment(date_item['start']).format("HH:MM A")]
                    return time_arr;
                }
                else if(flag === 1){
                    let time_arr = [];
                    for(let i=0; i<96;i++){
                        time_arr.push(moment(date_item['pdate']).add(15*i,'m').format("hh:mm A"));
                    }
                    return time_arr;
                }else if(flag === 2){
                    return moment(date_item['start']).format("hh:mm A")
                }else if(flag === 3){
                    return moment(date_item['end']).format("hh:mm A")
                }
            },
            pickDateEvents(date_item){
                let temp_date = [];
                let temp_arr = this.getDatePick;
                // console.log(temp_arr)
                temp_arr.forEach(function(value){
                    if(date_item === moment(value['start']).format('YYYY-MM-DD')){
                        temp_date.push(value);
                    }
                });
                // console.log(date_item)
                // console.log(temp_date)
                return temp_date;
            },
            changeTimeType(date){
                return moment(date).format('MMM DD')
            },
            setDateTimeFlag(){
                if(this.pickDates.length !== 0){
                    this.dateTimeFlag = !this.dateTimeFlag;
                }
            },
            startDrag ({ event, timed }) {
                if (event && timed) {
                    this.dragEvent = event
                    this.dragTime = null
                    this.extendOriginal = null
                }
            },
            startTime (tms) {
                console.log("mouseMove");
                const mouse = this.toTime(tms)

                if (this.dragEvent && this.dragTime === null) {
                    const start = this.dragEvent.start

                    this.dragTime = mouse - start
                } else {
                    this.createStart = this.roundTime(mouse);

                    this.createEvent = {
                        name: `Event #${this.events.length}`,
                        color: this.rndElement(this.colors),
                        start: this.createStart,
                        end: this.createStart,
                        timed: true,
                    }

                    this.events.push(this.createEvent)
                    // await this.$store.dispatch('addDatePick',obj );
                }
            },
            extendBottom (event) {
                console.log("adff");
                console.log(event);

                this.createEvent = event
                this.createStart = event.start
                this.extendOriginal = event.end
            },
            mouseMove (tms) {
                const mouse = this.toTime(tms)
                // console.log("mouseMove");
                if (this.dragEvent && this.dragTime !== null) {
                    const start = this.dragEvent.start
                    const end = this.dragEvent.end
                    const duration = end - start
                    const newStartTime = mouse - this.dragTime
                    const newStart = this.roundTime(newStartTime)
                    const newEnd = newStart + duration

                    this.dragEvent.start = newStart
                    this.dragEvent.end = newEnd
                } else if (this.createEvent && this.createStart !== null) {
                    const mouseRounded = this.roundTime(mouse, false)
                    const min = Math.min(mouseRounded, this.createStart)
                    const max = Math.max(mouseRounded, this.createStart)
                    this.createEvent.start = min
                    this.createEvent.end = max
                    // let obj = { "name": this.getdTitle,"change":false ,"color": "#2567CA", "start": this.createEvent.start, "end": this.createEvent.end, "timed": true,"pindex":(moment().unix()) + Math.random() };
                    // await this.$store.dispatch('addDatePick',obj );
                    // console.log("mouseMovesd");
                }
            },
            endDrag () {
                if (this.createEvent && this.createStart !== null) {
                    let obj = { "name": this.getdTitle,"change":false ,"color": "#2567CA", "start": this.createEvent.start, "end": this.createEvent.end, "timed": true,"pindex":(moment().unix()) + Math.random() };
                    this.$store.dispatch('addDatePick',obj );
                }
                this.dragTime = null
                this.dragEvent = null
                this.createEvent = null
                this.createStart = null
                this.extendOriginal = null
            },
            cancelDrag () {
                if (this.createEvent) {
                    if (this.extendOriginal) {
                        this.createEvent.end = this.extendOriginal
                    } else {
                        const i = this.events.indexOf(this.createEvent)
                        if (i !== -1) {
                            this.events.splice(i, 1)
                        }
                    }
                }

                this.createEvent = null
                this.createStart = null
                this.dragTime = null
                this.dragEvent = null
            },
            roundTime (time, down = true) {
                const roundTo = 15 // minutes
                const roundDownTime = roundTo * 60 * 1000

                return down
                    ? time - time % roundDownTime
                    : time + (roundDownTime - (time % roundDownTime))
            },
            toTime (tms) {
                return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
            },
            getEventColor (event) {
                const rgb = parseInt(event.color.substring(1), 16)
                const r = (rgb >> 16) & 0xFF
                const g = (rgb >> 8) & 0xFF
                const b = (rgb >> 0) & 0xFF

                return event === this.dragEvent
                    ? `rgba(${r}, ${g}, ${b}, 0.7)`
                    : event === this.createEvent
                        ? `rgba(${r}, ${g}, ${b}, 0.7)`
                        : event.color
            },
            // eslint-disable-next-line no-unused-vars
            getEvents ({ start, end }) {
                // const events = []
                //
                // const min = new Date(`${start.date}T00:00:00`).getTime()
                // const max = new Date(`${end.date}T23:59:59`).getTime()
                // const days = (max - min) / 86400000
                // const eventCount = this.rnd(days, days + 20)
                //
                // for (let i = 0; i < eventCount; i++) {
                //     const timed = this.rnd(0, 3) !== 0
                //     const firstTimestamp = this.rnd(min, max)
                //     const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
                //     const start = firstTimestamp - (firstTimestamp % 900000)
                //     const end = start + secondTimestamp
                //
                //     events.push({
                //         name: this.rndElement(this.names),
                //         color: this.rndElement(this.colors),
                //         start,
                //         end,
                //         timed,
                //     })
                // }
                // eslint-disable-next-line no-self-assign
                this.events = this.events
            },
            rnd (a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
            rndElement (arr) {
                return arr[this.rnd(0, arr.length - 1)]
            },
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
            async dblClick (date) {
                let vm = this;
                // console.log((moment().valueOf()));
                // console.log((moment(date).unix())*1000);
                // console.log((moment(date).add(30,'m').unix())*1000);
                console.log(vm.getdTitle);

                let obj = { "name": vm.getdTitle,"change":false ,"color": "#2567CA", "start": (moment(date).add(8,'h').valueOf()), "end": (moment(date).add(8,'h').add(120,'m').valueOf()), "timed": true,"pdate":date,"pindex":(moment().unix()) + Math.random() };
                // this.$set(this.done, 0, true)
                let flag = 0;
                this.getDatePick.forEach(function(value){
                    if (moment(value['start']).format('YYYY-MM-DD') === date){
                        flag = 1;
                    }
                });
                if(flag === 1){
                    await vm.$store.dispatch('delDatePick',date );
                }else {
                    await vm.$store.dispatch('addDatePick',obj );
                }

                // alert(`You have just double clicked the following date: ${date}`)
            },
        }
    }
</script>

<style>
     .green_content .v-card.v-sheet.theme--light {
         border-width:1px !important;
         border-style:solid !important;
         border-color:#ABDB61 !important;
    }
     .date_content .v-card.v-sheet.theme--light {
         border-width:1px !important;
         border-style:solid !important;
         border-color:#D3DCE3 !important;
    }
     /*.green_content .v-overflow-btn:before {*/
     /*    border-style: none !important;*/
     /*}*/
</style>
