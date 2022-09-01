import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
        inputed_json: [],
        recuest_objects: [],
        count: 0
    },
    mutations: {
        SET_INPUTED_JSON_TO_STATE: (state, inputed_json) => {
            state.inputed_json = inputed_json;
        },
        GENERATE_RECURSE_OBJ: (state, code) => {
            state.recuest_objects.push({
                code: code,
                values: {}
                });
        },
        REFRESH: (state) => {
            state.recuest_objects = []
            state.inputed_json = []
        },
        NEW_COUNT_TO_STATE: (state, new_count) => {
            state.count = new_count;
        }
    },

    actions: {
        INPUT_JSON({comit}, inputed_json) {
            comit('SET_INPUTED_JSON_TO_STATE', inputed_json.data);
            console.log(inputed_json.data)
            return inputed_json;
        },
        COUNT_CHANGE({comit}, new_count) {
            comit('NEW_COUNT_TO_STATE', new_count);
            console.log("yep")
            return new_count;
        }
    },
    getters: {
        INPUTED_JSON(state){
            return state.inputed_json;
        },
        RECUEST_OBJECTS(state){
            return state.recuest_objects;
        }
    }
})

export default store;