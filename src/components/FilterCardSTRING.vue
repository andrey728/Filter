<script>
import Form from "../components/Form.vue";


export default {
  name: "string",

  components: {Form},
  props: {
    feelInfo:{
    },
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
  <div class="Card" v-bind:id="feelInfo.code">
    <Form
        placeholder="Содержит"
        inputType="text"
        :card-i-d="feelInfo.code"
        :filter-params="'Like'"
    ></Form>
    <Form
        placeholder="Не содержит"
        inputType="text"
        :card-i-d="feelInfo.code"
        :filter-params="'NEQ'"
    ></Form>
  </div>
</template>



<style scoped>

</style>