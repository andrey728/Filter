
<template>
  <header>
  </header>

  <div class="Main">
    <div class="Panel">
    <button class="AddButton" @click="AddClick"> <span class="MainText">Add</span> </button>
      <button class="RecuestButton" @click="Request"> <span class="MainText">Request</span> </button>
    <select class="choise" v-model="selected" @change="choise">
      <option disabled value=""> Please select one </option>
      <option>Number</option>
      <option>String</option>
      <option>Bool</option>
    </select>


  </div>
    <div class="FilterCraft" v-if="selected.valueOf() && type.Num">

      <div> <span class="MainText">Code: </span>   <input class="cherecters" v-model="RequestContent_for_num.Code" placeholder="Код поля" /> </div>
      <div> <span class="MainText">Caption: </span>   <input class="cherecters" v-model="RequestContent_for_num.Caption" placeholder="Имя поля" /> </div>
      <div> <span class="MainText">GT: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.GT" placeholder="Содержит" /> </div>
      <div> <span class="MainText">LT: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.LT" placeholder="Содержит" /> </div>
      <div> <span class="MainText">GTE: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.GTE" placeholder="Содержит" /> </div>
      <div> <span class="MainText">LTE: </span>   <input class="cherecters" v-model="RequestContent_for_num.Values.LTET" placeholder="Содержит" /> </div>
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


    <div class="visible" id='vis_1'></div>
  </div>

  <main></main>
</template>


/*___________________________

<script setup>
import { ref } from 'vue'

let type = ref({
  Num: false,
  Str: false,
  Bool: false
})

const selected = ref('')

const RequestContent = ref({
  Code: null,
  Caption: null,
  Type: selected.value,
  Like: null,
  GT: null,
  LT: null,
  GTE: null,
  LTE: null,
  EQ: null,
  NEQ: null
})

const RequestContent_for_num = ref({
  Code: null,
  Caption: null,
  Type: "Number",
  Values: {
    GT: null,
    LT: null,
    GTE: null,
    LTE: null,
    EQ: null,
    NEQ: null
  }
})

const RequestContent_for_str = ref({
  Code: null,
  Caption: null,
  Type: "String",
  Values: {
    Like: null,
    EQ: null,
    NEQ: null
  }
})

const RequestContent_for_bool = ref({
  Code: null,
  Caption: null,
  Type: "Bool",
  Values: {
    EQ: null
  }
})

let file = new Blob()

let json_obj;



function choise() {
  type.value.Num = (selected.value === "Number")
  type.value.Str = (selected.value === "String")
  type.value.Bool = (selected.value==="Bool")
}

function AddClick() {
  RequestContent.value.Type = selected.value
  if (type.value.Num) {
    json_obj = JSON.stringify(RequestContent_for_num.value, (key, value) =>
    {
      if (value !== null && value !== "") return value
      else if (key === "Value") return key.value
    })

    console.log(json_obj)
  } else if (type.value.Str) {
    json_obj = JSON.stringify(RequestContent_for_str.value, (key, value) =>
    {
      if (value !== null && value !== "") return value
      else if (key === "Value") return key.value
    })
  } else if (type.value.Bool) {
    json_obj = JSON.stringify(RequestContent_for_bool.value, (key, value) =>
    {
      if (value !== null && value !== "") return value
      else if (key === "Value") return key.value
    })
  }



  ////// try to display
  var data = JSON.parse(json_obj);
  var header = '<h3>Name for User: ' + data.Caption + '</h3>';
  var list = '';
  for (var i in data) {
    if(typeof data[i] === "object"){
      console.log(data[i])
      list += '<li>' + i + ': ' + '\r\n' + '[' + '\r\n';
      for (var j in data[i]){
        console.log(j)
        console.log(data[i][j])
        list += "  " + j + ': ' + data[i][j] + '\r\n';
      }
      list += ']' + '\r\n' + '</li>';
    } else {
      list += '<li>' + i + ': ' + data[i] + '</li>';
    }
  }



  document.getElementById('vis_1').innerHTML += header;
  document.getElementById('vis_1').innerHTML +=  list;



  // создаем файл
  if (file.type==='application/json'){
    file = new Blob(
        // сериализуем данные
        [file,",", JSON.stringify(data)], {
          type: 'application/json'
        }
    )
  }
  else {
    file = new Blob(
        // сериализуем данные
        [JSON.stringify(data)], {
          type: 'application/json'
        }
    )
  }

}


function Request() {
  file = new Blob(
      // сериализуем данные
      ["[",file,"]"], {
        type: 'application/json'
      }
  )

  // создаем элемент "a"
  const link = document.createElement('a')
  // привязываем атрибут "href" тега "a" к созданному файлу
  link.setAttribute('href', URL.createObjectURL(file))
  // атрибут "download" позволяет скачивать файлы, на которые указывает ссылка
  // значение этого атрибута - название скачиваемого файла
  link.setAttribute('download', 'data.json')
  // текстовое содержимое ссылки
  link.textContent = 'DOWNLOAD DATA'
  // помещаем элемент в контейнер с классом "main"
  document.querySelector('.visible').append(link)
  // удаляем ссылку на файл
  URL.revokeObjectURL(file)
}

</script>


<style>
@import './assets/base.css';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }



  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
