<script lang="ts">
import {defineComponent, ref} from "vue";
import Form from "../components/Form.vue";

export default {
  name: "Filter",
  data() {
    const RequestContent = ref({
      Like: null,
      GT: null,
      LT: null,
      GTE: null,
      LTE: null,
      EQ: null,
      NEQ: null
    })
    return {
      show: false
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
    }
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

  <div class="Card" v-bind:id="filterId" v-show="filterType==='number' && show">
    <Form
        placeholder="Больше"
        inputType="number"
    ></Form>
    <Form
        placeholder="Меньше"
        inputTypr="number"
    ></Form>
    <Form
        placeholder="Равен"
        inputTypr="number"
    ></Form>
    <Form
        placeholder="Не равен"
        inputTypr="number"
    ></Form>
  </div>


  <div class="Card" v-bind:id="filterId" v-show="filterType==='string' && show">
    <Form
        placeholder="Содержит"
        inputType="text"
    ></Form>
    <Form
        placeholder="Не содержит"
        inputType="text"
    ></Form>
  </div>

  <div class="Card" v-bind:id="filterId" v-show="filterType==='bool' && show">
    <span class="Min_Panel">
          <h3 class="MainText">Переключатель</h3>
          <Form
              inputType="checkbox"
          ></Form>
  </span>
  </div>


</template>

<style scoped>

</style>