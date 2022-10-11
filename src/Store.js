import { createApp } from 'vue'
import { createStore } from 'vuex'

//const minLength = num => val => val.length >= num
const minLength = (num, val) => {
    return (val.length >= num)
}

const correctRange = (gt, lt) => {
    return !((gt - lt) >= 0)
}

// Create a new store instance.
const store = createStore({
    state: {
        inputed_json: [],
        recuest_objects: {},
        request_validators: {}
    },
    mutations: {
        SET_INPUTED_JSON_TO_STATE: (state, inputed_json) => {
            state.inputed_json = inputed_json;
        },

        GENERATE_RECURSE_OBJ: (state, field) => {
            state.request_validators[field.code] = {
                errors: null,
                select_range: false,
                minLength: {}
            }

            if (field.type === 'number') {
                state.recuest_objects[field.code] = {
                    GT: null,
                    LT: null,
                    GTE: null,
                    LTE: null,
                    EQ: null,
                    NEQ: null
                }


            }
            if (field.type === 'string') {
                state.recuest_objects[field.code] = {
                    Like: null,
                    NEQ: null
                }

            }
            if (field.type === 'bool') {
                state.recuest_objects[field.code] = {
                    EQ: null
                }

            }
            console.log('gen', state.recuest_objects)
        },

        REFRESH: (state) => {
            state.recuest_objects = []
            state.inputed_json = []
        },

        VALIDATORS_CHENGES: (state, payload) => {
            // отметка заполняемости
            state.request_validators[payload.code].minLength[payload.params] = minLength(
                1, state.recuest_objects[payload.code][payload.params]
            )
            // отметка заполнения диапозона
            state.request_validators[payload.code].select_range = !!(
                state.request_validators[payload.code].minLength['GT']
                &
                state.request_validators[payload.code].minLength['LT']
            )
            console.log(state.request_validators[payload.code])
            // проверка корявости диапозона
            if(state.request_validators[payload.code].select_range) {
                console.log('ща чекать будем')
                console.log(state.recuest_objects[payload.code])
                state.request_validators[payload.code].errors = !correctRange(
                    state.recuest_objects[payload.code]['GT'],
                    state.recuest_objects[payload.code]['LT']
                )
                console.log(state.request_validators[payload.code].errors)
            }
        },

        FILTER_FIELD: (state, payload) => {
            state.recuest_objects[payload.code][payload.params] = payload.value
            store.commit('VALIDATORS_CHENGES', payload)

        },

        TAKE (state, code) {
            for (const i in state.recuest_objects) {
                if (state.recuest_objects[i].code === code) {
                    return state.recuest_objects[i].values;
                }
            }
        }

        },

    actions: {
        INPUT_JSON({comit}, inputed_json) {
            commit('SET_INPUTED_JSON_TO_STATE', inputed_json.data);
            return inputed_json;
        },
        COUNT_CHANGE({comit}, new_count) {
            commit('NEW_COUNT_TO_STATE', new_count);
            return new_count;
        }
    },
    getters: {
        INPUTED_JSON(state){
            return state.inputed_json;
        },
        RECUEST_OBJECTS(state){
            return state.recuest_objects;
        },

    }
})

export default store;