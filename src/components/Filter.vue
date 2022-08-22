<script lang="ts">
import { defineComponent } from "vue";
import Form from "../components/Form.vue";

export default {
  name: "Filter",
  data() {
    return {
      show: true
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
  }
}
</script>


<template>
  <span class="Min_Panel">
          <h1 class="MainText">{{filterCaption}}</h1>
          <button class="PlussButton" @click="show = !show"> <span class="MainText">Развернуть</span> </button>
  </span>

  <div class="Card" v-bind:id="filterId" v-if="filterType==='number' && show">
    <Form
        placeholder="Больше"
        inputType="number"
        @on-enter="onEnter"
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


  <div class="Card" v-bind:id="filterId" v-if="filterType==='string' && show">
    <Form
        placeholder="Содержит"
        inputType="text"
    ></Form>
    <Form
        placeholder="Не содержит"
        inputType="text"
    ></Form>
  </div>

  <div class="Card" v-bind:id="filterId" v-if="filterType==='bool' && show">
    <Form
        inputType="checkbox"
    ></Form>
  </div>


</template>

<style scoped>

</style>