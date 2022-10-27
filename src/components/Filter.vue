<script lang="ts">
import {defineComponent, ref} from "vue";
import Form from "../components/Form.vue";
import store from "../Store.js";
import {mapMutations,mapGetters} from "vuex";

export default {
  name: "Filter",
  data() {
    return {
      show: false,
    }
  },


  methods: {
    take (code) {
      for (const i in store.state.recuest_objects) {
        if (store.state.recuest_objects[i].code === code) {
          return store.state.recuest_objects[i].values;
        }
      }
    }
  },

  components: {Form},
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
          <button class="PlussButton" @click="show = !show; take(filterId)">
            <span class="MainText" v-if="!show">Развернуть</span>
            <span class="MainText" v-if="show">Свернуть</span>
          </button>
  </span>

  <form class="Card" v-bind:id="filterId" v-show="filterType==='number' && show">

    <Form
        placeholder="Больше"
        inputType="number"
        :card-i-d="filterId"
        :filter-params="'GT'"
        :validators="validators"
    ></Form>

    <Form
        placeholder="Меньше"
        inputTypr="number"
        :card-i-d="filterId"
        :filter-params="'LT'"
        :validators="validators"
    ></Form>
    <Form v-if="!validators.select_range"
        placeholder="Равен"
        inputTypr="number"
        :card-i-d="filterId"
        :filter-params="'EQ'"
        :validators="validators"
    ></Form>
    <Form v-else
          placeholder="Равен"
          inputTypr="number"
          :card-i-d="filterId"
          :filter-params="'EQ'"
          :validators="validators"
          style="background: #9C9A9A"
          disabled
    ></Form>
    <Form v-if="!validators.select_range"
        placeholder="Не равен"
        inputTypr="number"
        :card-i-d="filterId"
        :filter-params="'NEQ'"
        :validators="validators"
    ></Form>
    <Form v-else
        placeholder="Не равен"
        inputTypr="number"
        :card-i-d="filterId"
        :filter-params="'NEQ'"
        :validators="validators"
          style="background: #9C9A9A"
          disabled
    ></Form>

    <div v-if="validators">
      <h1
          class="MainText"
          v-if="validators.errors"
          style="color: #ee4c4c; margin: 0px; font-size: 19px"> Некорректные данные диапозона! </h1>
    </div>

  </form>


  <div class="Card" v-bind:id="filterId" v-show="filterType==='string' && show">
    <Form
        placeholder="Содержит"
        inputType="text"
        :card-i-d="filterId"
        :filter-params="'Like'"
    ></Form>
    <Form
        placeholder="Не содержит"
        inputType="text"
        :card-i-d="filterId"
        :filter-params="'NEQ'"
    ></Form>
  </div>

  <div class="Card" v-bind:id="filterId" v-show="filterType==='bool' && show">
    <span class="Min_Panel">
          <h3 class="MainText">Переключатель</h3>
          <Form
              inputType="checkbox"
              :card-i-d="filterId"
              :filter-params="'NEQ'"
          ></Form>
  </span>
  </div>


</template>

<style scoped>

</style>