<script>
import Form from "../components/Form.vue";


export default {
  name: "FilterCardSTRING",

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
</template>



<style scoped>

</style>