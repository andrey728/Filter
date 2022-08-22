

<template>
  <header>
  </header>

  <div class="Main">

    <div>
      <textarea class="input_json" cols="35" rows="35" v-model="some_json" placeholder="add JSON"></textarea>
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
      <Post>

      </Post>
      <div class="Filter_Card"
           v-for="(jso, i) in json">
        <Filter
            :filter-caption="jso.caption"
            :filter-id="jso.code"
            :filterType="jso.type"
        ></Filter>

      </div>

    </div>

    
    <div class="visible" id='vis_1'></div>

  </div>

  <main></main>
</template>


//___________________________

<script setup>
import { ref } from 'vue'
import Form from "./components/Form.vue";
import Filter from "./components/Filter.vue";
import Post from "./components/Post.vue";

let type = ref({
  Num: false,
  Str: false,
  Bool: false
})

// в этом массиве будут храниться объекты, хранящие информацию, заполненную пользователем в фильтре
let Request_arrey = []


const selected = ref('')

// объекты, хранящие информацию полей
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

// используеться для создания файла json
let file = new Blob()

// объект json, используемый для выхоного запроса
let json_obj;
// массив входных объектов оыщт
var json = ref()
// флаг, отображающий поступление входного json
var inported = ref()
console.log(json)

//___________TEST JSON INPUT______________

// загоняю json из таска, чтобы не вводить его каждый раз
const some_json = ref('[\n' +
    '\t{\n' +
    '\t\t"code": "field1",\n' +
    '\t\t"caption": "Стоимость",\n' +
    '\t\t"type": "number"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"code": "field2",\n' +
    '\t\t"caption": "Цвет",\n' +
    '\t\t"type": "string"\n' +
    '\t},\n' +
    '\t{\n' +
    '\t\t"code": "field4",\n' +
    '\t\t"caption": "Работает",\n' +
    '\t\t"type": "bool"\n' +
    '\t}\n' +
    ']')

// функция импорта поступившего json в массив объектов
function JSON_import() {
  console.log(json)
  console.log(json.length)
  console.log(json.length!==undefined)
  json.value = JSON.parse(some_json.value);
  inported.value = true
  console.log(json.value)
  console.log(inported.value)

  // далее идет ряд функций, реализовывающий функционал фильтра, но через изменения дерева в рантайме
  // это достойно гифки "говно, переделывай", так что это дело я закоментил, но пока не почистил, пусть лежит
/*
  function createDiv(className, N, type){
    var div = document.createElement(type);
    div.className = className;
    div.id = className + "_" + N
    return div;
  }

  function take_div(id, obj){
    var header = obj.caption
    document.getElementById(id).innerHTML += header;
  }

  function createOne(Card, def, obj){
    var div = document.createElement("div");
    var span = document.createElement("span");
    var input = document.createElement("input");
    span.className = "MainText"
    span.innerHTML += def
    input.className = "cherecters"
    input.placeholder = def
    RequestContent_for_num.code = input.innerHTML
    var ti = obj
    input.addEventListener("change",function hh (inpt) {


      console.log(inpt.composedPath())
      var num_of_card = parseFloat(inpt.composedPath()[2].id.replace('Card_', ""))
      console.log(inpt.composedPath()[2].id)
      console.log(num_of_card)
      obj = inpt.composedPath()[0].value

      if (def === "Больше") Request_arrey[num_of_card].value.Values.GT = inpt.composedPath()[0].value
      if (def === "Меньше") Request_arrey[num_of_card].value.Values.LT = inpt.composedPath()[0].value
      if (def === "Равен") Request_arrey[num_of_card].value.Values.EQ = inpt.composedPath()[0].value
      if (def === "Не равен") Request_arrey[num_of_card].value.Values.NEQ = inpt.composedPath()[0].value
      if (def === "Содержит") Request_arrey[num_of_card].value.Values.Like = inpt.composedPath()[0].value
      if (def === "Не содержит") Request_arrey[num_of_card].value.Values.NEQ = inpt.composedPath()[0].value
      if (def === "Какой-то переключатель") Request_arrey[num_of_card].value.Values.GT = inpt.composedPath()[0].value
    })

    div.appendChild(span)
    div.appendChild(input)

    console.log("крафтим")


    Card.appendChild(div)


  }

  function Feel_Filter_card(Card, obj){

    if(obj.type === "number"){
      Request_arrey.push(RequestContent_for_num)
      console.log("1")
      createOne(Card,'Больше', RequestContent_for_num.value.Values.GT)
      createOne(Card,'Меньше')
      createOne(Card,'Равен')
      createOne(Card,'Не равен')
    }
    if(obj.type === "string"){
      Request_arrey.push(RequestContent_for_str)
      console.log("2")
      createOne(Card,'Содержит')
      createOne(Card,'Не содержит')
    }
    if(obj.type === "bool"){
      Request_arrey.push(RequestContent_for_bool)
      console.log("3")
      createOne(Card,'Какой-то переключатель')
    }
    console.log("hjvf gblh")
  }


  for (var i = 0; i < json.length; i++) {


    document.getElementById('n').appendChild(createDiv('Filter_Card', i, 'div'));
    document.getElementById('Filter_Card_{i}'.replace('{i}', i)).appendChild(createDiv('MainText', i, 'span'));
    take_div('MainText_{i}'.replace('{i}', i), json[i])

    document.getElementById('Filter_Card_{i}'.replace('{i}', i)).appendChild(createDiv('PlussButton', i, 'button'));
    document.getElementById('PlussButton_{i}'.replace('{i}', i)).innerHTML += "развернуть v";


    document.getElementById('Filter_Card_{i}'.replace('{i}', i)).appendChild(createDiv('Card', i, "div"));
    Feel_Filter_card(document.getElementById('Card_{i}'.replace('{i}', i)), json[i])


    document.getElementById('PlussButton_{i}'.replace('{i}', i)).addEventListener('click', function(button){
      var button_id = button.composedPath()[0].id
      var this_card = document.getElementById(button_id.replace('PlussButton_', "Card_"))
      console.log(button.composedPath()[0].innerHTML)
      console.log(this_card.style)
      if (this_card.style.display === "" || this_card.style.display === "none") {
        this_card.style.display = "flex"
        button.composedPath()[0].innerHTML = 'свернуть ^'
      } else {
        this_card.style.display = "none"
        button.composedPath()[0].innerHTML = 'развернуть v'
      }
    });
  }

  console.log(Request_arrey)


*/


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
  for (var i = 0; i < Request_arrey.length; i++) {
    create_requet(Request_arrey[i])
  }
}

// формируем вывод заполненных объектов в формате json
function create_requet (content){
  RequestContent.value.Type = selected.value
  json_obj = JSON.stringify(content.value, (key, value) =>
  {
    if (value !== null && value !== "") return value
    else if (key === "Value") return key.value
  })
  console.log(content)
  console.log(json_obj)

  ////// try to display
  // я понимаю, что тут я перевожу из объектов в json и обратно, но это я сделал специально для
  // собственного понимания работы с json
  var data = JSON.parse(json_obj);
  console.log(data)
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
