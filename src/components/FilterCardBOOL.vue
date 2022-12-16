<script>
import Form from "../components/Form.vue";


export default {
  name: "bool",

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
  <div>
    <span class="Min_Panel">
      <h3 class="MainText">Переключатель</h3>
      <Form
          inputType="checkbox"
          :card-i-d="feelInfo.code"
          :filter-params="'NEQ'"
      ></Form>
    </span>
  </div>
</template>



<style scoped>

</style>