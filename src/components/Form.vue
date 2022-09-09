<script lang="ts">
import {ref, reactive, defineComponent } from "vue";
import store from "../Store.js";
import { mapMutations } from "vuex";


export default defineComponent({
  name: "TextField",
  props: {
    textValue: {
      default: ref(null)
    },
    placeholder: {
      type: String,
      default: 'Поиск'
    },
    inputType: {
      type: String,
      default: "number"
    },
    filterParams: {
      type: String,
      default: ""
    },
    cardID: {
      type: String,
      default: ""
    }
  },
  emits: ['update:textValue', 'event.target.value'],
  setup(props, { attrs, slots, emit, expose }) {


    const onEnter = () => {
      emit('onEnter');
    }

    const searchText = (event: any) => {
      props.textValue.value = event.target.value
      store.commit("FILTER_FIELD", {
        code: props.cardID,
        params: props.filterParams,
        value: event.target.value
      })
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