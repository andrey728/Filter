<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "TextField",
  props: {
    textValue: {
      type: String,
      default: '',
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
  setup(props, {emit}) {
    const onEnter = () => {
      emit('onEnter');
    }

    const searchText = (event: any) => {
      emit('update:textValue', event.target.value);
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
      @keydown.enter="onEnter"
      :placeholder="placeholder"
  />
</template>