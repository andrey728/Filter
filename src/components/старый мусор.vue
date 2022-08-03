<template>

  <div class="FilterCraft" id = 'n' v-if="selected.valueOf() && type.Num">
    <div> <span class="MainText">Code: </span>   <input class="cherecters" v-model="RequestContent_for_num.Code" placeholder="Код поля" /> </div>
    <div> <span class="MainText">Caption: </span>   <input class="cherecters" v-model="RequestContent_for_num.Caption" placeholder="Имя поля" /> </div>
    <div> <span class="MainText">GT: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.GT" placeholder="Содержит" /> </div>
    <div> <span class="MainText">LT: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.LT" placeholder="Содержит" /> </div>
    <div> <span class="MainText">GTE: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.GTE" placeholder="Содержит" /> </div>
    <div> <span class="MainText">LTE: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.LTE" placeholder="Содержит" /> </div>
    <div> <span class="MainText">EQ: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.EQ" placeholder="Равно" /> </div>
    <div> <span class="MainText">NEQ: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.NEQ" placeholder="Не содержит" /> </div>
  </div>


  <div class="FilterCraft" v-if="selected.valueOf() && type.Str">
    <div> <span class="MainText">Code: </span>   <input class="cherecters" v-model="RequestContent_for_str.Code" placeholder="Код поля" /> </div>
    <div> <span class="MainText">Caption: </span>   <input class="cherecters" v-model="RequestContent_for_str.Caption" placeholder="Имя поля" /> </div>
    <div> <span class="MainText">Like: </span>   <input class="cherecters" v-model="RequestContent_for_str.Values.Like" placeholder="Содержит" /> </div>
    <div> <span class="MainText">EQ: </span>   <input class="cherecters" v-model="RequestContent_for_str.Values.EQ" placeholder="Равно" /> </div>
    <div> <span class="MainText">NEQ: </span>   <input class="cherecters" v-model="RequestContent_for_str.Values.NEQ" placeholder="Не содержит" /> </div>
  </div>



  <div class="FilterCraft" id="F" v-if="selected.valueOf() && type.Bool">
    <div> <span class="MainText">Code: </span>  <input class="cherecters" v-model="RequestContent_for_bool.Code" placeholder="Код поля" /> </div>
    <div> <span class="MainText">Caption: </span>  <input class="cherecters" v-model="RequestContent_for_bool.Caption" placeholder="Имя поля" /> </div>
    <div> <span class="MainText">EQ: </span>   <input class="cherecters" v-model="RequestContent_for_bool.Values.EQ" placeholder="Соответсвует" /> </div>
  </div>



  <Form v-if="jso.type === 'number'"
        v-bind:id="jso.code"
        v-model:text-value="text"
        :inputType="jso.type"
        @on-enter="onEnter"
  ></Form>

  <Form v-if="jso.type === 'string'"
        v-bind:id="jso.code"
        v-model:text-value="text"
        :inputType="jso.type"
        @on-enter="onEnter"
  ></Form>

  <Form v-if="jso.type === 'bool'"
        v-bind:id="jso.code"
        v-bind:text-value="text"
        inputType={{jso.type}}
        @on-enter="onEnter"
  ></Form>


</template>

<script>
export default {
  name: "старый мусор"
}
</script>

<style scoped>

</style>