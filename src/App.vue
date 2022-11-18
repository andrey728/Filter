
<template>
  <header>
  </header>

  <div class="Main">

    <div>
      <textarea class="input_json" cols="35" rows="35" v-model="store.state.inputed_json" placeholder="add JSON" @change="JSON_import"></textarea>

      <div class="Panel">
        <button class="AddButton" @click="JSON_import"> <span class="MainText">json import</span> </button>
        <button class="RecuestButton" @click="Request"> <span class="MainText">Link</span> </button>
      </div>
    </div>

    <div class="FilterCraft" id = 'n' v-if="store.state.imported">
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

<script setup>
import { ref } from 'vue'
import Form from "./components/Form.vue";
import Filter from "./components/Filter.vue";
import store from "./Store.js";

store.dispatch('fetchJSON')


// используеться для создания файла json
let file = new Blob()
// объект json, используемый для выхоного запроса
let json_obj;
// массив входных объектов оыщт
var json = ref()





//___________TEST JSON INPUT______________


// функция импорта поступившего json в массив объектов
function JSON_import() {
  store.commit("SET_INPUTED_JSON_TO_STATE", store.state.inputed_json)
  let field = JSON.parse(store.state.inputed_json)
  for (var i=0; i < field.length; i++) {
      store.commit("GENERATE_RECURSE_OBJ", field[i])
  }
  console.log('Формирование объектов',store.state.request_objects)
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
