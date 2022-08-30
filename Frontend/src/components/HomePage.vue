<template>
  <NavigationBar></NavigationBar>
  <p>HOME PAGE</p>
</template>

<script>
//import http from "../http-common";
import {mapActions} from 'vuex';
import Pusher from 'pusher-js';
import NavigationBar from "@/components/NavigationBar";

export default {
  name: "HomePage",
  components: {
    NavigationBar,
  },
  data() {
    return {
    };
  },
  computed:{
    local(){
        return localStorage.getItem('store')
    }
  },
  methods:{
    ...mapActions(['updateStorage']),
  },
  mounted() {
    var pusher = new Pusher('', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      console.log(data);
    });
  },
}
</script>

<style scoped>

</style>