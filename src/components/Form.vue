<script lang="ts">
import {ref, reactive, defineComponent } from "vue";


export default defineComponent({
  name: "TextField",
  props: {
    textValue: {
      default: ref(0),
    },
    placeholder: {
      type: String,
      default: 'Поиск'
    },
    inputType: {
      type: String,
      default: "number"
    }
  },
  emits: ['update:textValue', 'onEnter'],
  setup(props, { attrs, slots, emit, expose }) {
    const onEnter = () => {
      emit('onEnter');
    }

    const searchText = (event: any) => {
      props.textValue =  event.target.value
      emit("update:textValue", event.target.value);
      console.log(props.textValue)
      console.log(event.target.value)
    }

    return {

      onEnter,
      searchText,
    }
  }
})
</script>

<style scoped>

</style>

<template>


  <input
      class="cherecters"
      :type="inputType"
      :value="textValue"
      @input="searchText"
      :placeholder="placeholder"
  />
</template>