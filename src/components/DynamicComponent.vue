<script lang="ts">
import {defineComponent, ref} from "vue";
import Form from "../components/Form.vue";
import number from "../components/FilterCardINT.vue";
import string from "../components/FilterCardSTRING.vue";
import bool from "../components/FilterCardBOOL.vue";
import store from "../Store.js";
import {mapMutations,mapGetters} from "vuex";

export default {
  name: "DynamicComponent",
  data() {
    return {
      show: false,
    }
  },

  components: {Form, number, string, bool},
  props: {
    filterId: {
      type: String,
      default: ""
    },
    filterCaption: {
      type: String,
      default: ""
    },
    filterType: {
      type: String,
      default: ""
    },
    validators: {}
  },
  setup(props) {
    console.log(props.filterType)
  }
}

</script>


<template>
  <span class="Min_Panel">
          <h1 class="MainText">{{filterCaption}}</h1>
          <button class="PlussButton" @click="show = !show">
            <span class="MainText" v-if="!show">Развернуть</span>
            <span class="MainText" v-if="show">Свернуть</span>
          </button>
  </span>

  <div v-show="show">
    <component
        :is="filterType"
        :filter-caption="filterCaption"
        :filter-id="filterId"
        :filterType="filterType"
        :validators="validators"
    ></component>
  </div>



</template>

<style scoped>

</style>