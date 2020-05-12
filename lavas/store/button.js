export const state = () => {
    return {
        count : 0
    }
}

export const mutations={
    increase(state) {
        state.count++;
    }
}

export const actions = {
    click({commit}){
        commit('increase')
    }
}
