
<script>
import Form from "../components/Form.vue";


export default {
  name: "number",

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
    validators: {}
  },

}
</script>


<template>
  <div class="Card" v-bind:id="filterId">
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

  </div>

</template>

<style scoped>

</style>