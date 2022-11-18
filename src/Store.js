import { createApp } from 'vue'
import { createStore } from 'vuex'
import {minLength, correctRange} from "./use/Valid.js";



// Create a new store instance.
const store = createStore({
    state: {
        imported: false,
        inputed_json: [],
        request_objects: {},
        request_validators: {},
        request_json: ''

    },
    mutations: {
        SET_INPUTED_JSON_TO_STATE: (state, inputed_json) => {
            state.inputed_json = inputed_json
        },

        GENERATE_RECURSE_OBJ: (state, field) => {
            state.request_validators[field.code] = {
                errors: false,
                select_range: false,
                minLength: {}
            }

            if (field.type === 'number') {
                state.request_objects[field.code] = {
                    GT: null,
                    LT: null,
                    GTE: null,
                    LTE: null,
                    EQ: null,
                    NEQ: null
                }
            }
            if (field.type === 'string') {
                state.request_objects[field.code] = {
                    Like: null,
                    NEQ: null
                }
            }
            if (field.type === 'bool') {
                state.request_objects[field.code] = {
                    EQ: null
                }
            }
            state.imported = true
        },

        REFRESH: (state) => {
            state.request_objects = {}
            state.inputed_json = []
        },

        VALIDATORS_CHENGES: (state, payload) => {
            // отметка заполняемости
            state.request_validators[payload.code].minLength[payload.params] = minLength(
                1, state.request_objects[payload.code][payload.params]
            )
            // отметка заполнения диапозона
            state.request_validators[payload.code].select_range = !!(
                state.request_validators[payload.code].minLength['GT']
                ||
                state.request_validators[payload.code].minLength['LT']
            )


            // проверка корявости диапозона
            if(state.request_validators[payload.code].select_range) {
                state.request_validators[payload.code].errors = (!correctRange(
                    state.request_objects[payload.code]['GT'],
                    state.request_objects[payload.code]['LT']
                    )
                    &&
                    !!(
                    state.request_validators[payload.code].minLength['GT']
                    &&
                    state.request_validators[payload.code].minLength['LT']
                    )
                )
            }
        },

        FILTER_FIELD: (state, payload) => {
            state.request_objects[payload.code][payload.params] = payload.value
            store.commit('VALIDATORS_CHENGES', payload)
            let error_flag = false
            for (const i in state.request_validators){
                if(state.request_validators[i].errors) error_flag = true
            }
            if(!error_flag) store.commit('REQUEST_JSON')
        },

        REQUEST_JSON: (state) => {
            state.request_json = JSON.stringify(state.request_objects, (key, value) =>
            {
                if (value !== null && value !== "") {
                    return value
                }
            },4)
        },

        TAKE (state, code) {
            for (const i in state.request_objects) {
                if (state.request_objects[i].code === code) {
                    return state.request_objects[i].value
                }
            }
        }

        },

    actions: {
        async fetchJSON(ctx) {
            const res = await fetch(
                'http://127.0.0.1:8000/config'
            )
            const json = await res.json()
            console.log('json', json)
            ctx.commit('SET_INPUTED_JSON_TO_STATE', json)
        }
    },
    getters: {
        INPUTED_JSON(state){
            return state.inputed_json
        },
        REQUEST_OBJECTS(state){
            return state.request_objects
        },
        REQUEST_VALIDATORS: (state) => {
            return state.request_validators
        },
        VAL_LEN(state){
            return state.inputed_json.length
        }
    }
})

export default store