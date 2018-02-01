//  在一个动作中 多次改变 mutation 使用 action 封装 
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
//                                  commit用于 提交 mutation 行为   
//                                  state获取数据状态
function findIndex(list,song) {
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_PLAYLIST,list)
    if(state.mode === playMode.random){
        let randomList = shuffle(list)
        commit(types.SET_PLAYLIST,randomList)
        index = findIndex(randomList,list[index])
    }else{
        commit(types.SET_PLAYLIST,list)
    }
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_PLAYING_STATE,true)                            
}

export const randomPlay = function({commit},{list}){
    commit(types.SET_PLAY_MODE,playMode.random)
    commit(types.SET_SEQUENCE_LIST,list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST,randomList)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,0)
    commit(types.SET_PLAYING_STATE,true)  

}