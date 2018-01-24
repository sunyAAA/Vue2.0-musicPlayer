//  在一个动作中 多次改变 mutation 使用 action 封装 
import * as types from './mutation-types'
//                                  commit用于 提交 mutation 行为   
//                                  state获取数据状态
export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_PLAYLIST,list)
    commit(types.SET_SEQUENCE_LIST,list)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_CURRENT_INDEX,index)
    commit(types.SET_PLAYING_STATE,true)                            
}