

<template>
  <header>
  </header>

  <div class="Main">

    <div>
      <textarea class="input_json" cols="35" rows="35" v-model="store.state.inputed_json" placeholder="add JSON" @change="JSON_import"></textarea>
      <button class="AddButton" @click="JSON_import"> <span class="MainText">json import</span> </button>
    </div>

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


    <div class="FilterCraft" id = 'n' v-if="inported" >
      <div class="Filter_Card"
           v-for="(feel, i) in JSON.parse(store.state.inputed_json)">

        <Filter
            :filter-caption="feel.caption"
            :filter-id="feel.code"
            :filterType="feel.type"
            :validators="store.getters.REQUEST_VALIDATORS[feel.code]"

        ></Filter>

      </div>

    </div>

    <div class="visible" id='vis_1'>
      {{store.state.request_json}}
    </div>

  </div>

  <main></main>
</template>


//___________________________
// попробовать словарь с ключем в виде поля и значением в виде реактивного объекта, включаемого в Filter
<script setup>
import { ref } from 'vue'
import Form from "./components/Form.vue";
import Filter from "./components/Filter.vue";
import store from "./Store.js";

console.log('fetchJSON')
store.dispatch('fetchJSON')


let type = ref({
  Num: false,
  Str: false,
  Bool: false
})

// в этом массиве будут храниться объекты, хранящие информацию, заполненную пользователем в фильтре

const selected = ref('')


// используеться для создания файла json
let file = new Blob()

// объект json, используемый для выхоного запроса
let json_obj;
// массив входных объектов оыщт
var json = ref()
// флаг, отображающий поступление входного json
var inported = ref()


//___________TEST JSON INPUT______________


// функция импорта поступившего json в массив объектов
function JSON_import() {
  store.commit("SET_INPUTED_JSON_TO_STATE", store.state.inputed_json)
  let field = JSON.parse(store.state.inputed_json)
  for (var i=0; i < field.length; i++) {
      store.commit("GENERATE_RECURSE_OBJ", field[i])
  }
  console.log('Формирование объектов',store.state.request_objects)

  console.log(store.commit("TAKE",'field7'))

  inported.value = true

}


//___________TEST JSON INPUT______________



// старая функция для определения типа (я использовал ее для генератора запроса, но теперь скорее всего она не будет акктуальна)
function choise() {
  type.value.Num = (selected.value === "Number")
  type.value.Str = (selected.value === "String")
  type.value.Bool = (selected.value==="Bool")
  console.log(inported.value)
}

// пробег по массиву объектов, заполняемому на основе
function AddClick() {
  for (const i in store.state.request_objects) {
    console.log(i)
    create_request(store.state.request_objects[i])
  }
}

// формируем вывод заполненных объектов в формате json
function create_request (content){
  console.log('2')
  json_obj = JSON.stringify(content, (key, value) =>
  {
    if (value !== null && value !== "") return value
    else if (key === "Value") return key.value
  })
  console.log('content',content)
  console.log('json',json_obj)

  var data = JSON.parse(json_obj);
  console.log('obj',data)
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
        // (о чем и отмечал, что перевожу туда-обратно этот измученный json, мне было интересно глянуть как он себя ведет)
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

  // добавление ссылочки на скачивание json файла
  // создаем элемент
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
