<script lang="ts">
import {ref, reactive, defineComponent } from "vue";
import store from "../Store.js";
import { mapMutations, mapGetters } from "vuex";


export default defineComponent({
  name: "TextField",

  computed: mapGetters(['REQUEST_VALIDATORS', 'VAL_LEN']),


  props: {
    textValue: {
      default: ""
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
    },
    validators: {},

  },
  emits: ['update:textValue', 'event.target.value'],
  setup(props, { attrs, slots, emit, expose }) {

    let val = true

    const onEnter = () => {
      emit('onEnter');
    }

    const searchText = (event: any) => {
      if(props.inputType === "checkbox") {
        store.commit("FILTER_FIELD", {
          code: props.cardID,
          params: props.filterParams,
          value: event.target.checked
        })
      }
      else store.commit("FILTER_FIELD", {
        code: props.cardID,
        params: props.filterParams,
        value: event.target.value
      })
    }

    return {
      val,
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