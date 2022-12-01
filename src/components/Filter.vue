<script lang="ts">
import {defineComponent, ref} from "vue";
import Form from "../components/Form.vue";
import FilterCardINT from "../components/FilterCardINT.vue";
import FilterCardSTRING from "../components/FilterCardSTRING.vue";
import FilterCardBOOL from "../components/FilterCardBOOL.vue";
import store from "../Store.js";
import {mapMutations,mapGetters} from "vuex";

export default {
  name: "Filter",
  data() {
    return {
      show: false,
    }
  },

  components: {Form, FilterCardINT, FilterCardSTRING, FilterCardBOOL},
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
    filterValue: {
      type: ref('гусеница')
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

  <div v-show="filterType==='number' && show">
    <FilterCardINT
        :filter-caption="filterCaption"
        :filter-id="filterId"
        :filterType="filterType"
        :validators="validators"
    ></FilterCardINT>
  </div>


  <div v-show="filterType==='string' && show">
    <FilterCardSTRING
        :filter-caption="filterCaption"
        :filter-id="filterId"
        :filterType="filterType"
        :validators="validators"
    ></FilterCardSTRING>
  </div>

  <div class="Card" v-bind:id="filterId" v-show="filterType==='bool' && show">
    <FilterCardBOOL
        :filter-caption="filterCaption"
        :filter-id="filterId"
        :filterType="filterType"
        :validators="validators"
    ></FilterCardBOOL>
  </div>


</template>

<style scoped>

</style>