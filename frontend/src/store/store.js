import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            events: []
        }
    },

    mutations: {
        ADD_EVENT: (state, event) => {
            state.events.push(event)
        }
    },
    actions: { },

    getters: {
        EVENTS: state => state.events
    }
})
export default store;
