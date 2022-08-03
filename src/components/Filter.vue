<script lang="ts">
import { defineComponent } from "vue";
import Form from "../components/Form.vue";

export default {
  name: "Filter",
  components: {Form},
  props: {
    filterId: {
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

  <div class="Card" v-bind:id="filterId" v-if="filterType==='number'">
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


  <div class="Card" v-bind:id="filterId" v-if="filterType==='string'">
    <Form
        placeholder="Содержит"
        inputType="text"
    ></Form>
    <Form
        placeholder="Не содержит"
        inputType="text"
    ></Form>
  </div>

  <div class="Card" v-bind:id="filterId" v-if="filterType==='bool'">
    <Form
        inputType="checkbox"
    ></Form>
  </div>


</template>

<style scoped>

</style>