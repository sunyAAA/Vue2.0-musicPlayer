//  在一个动作中 多次改变 mutation 使用 action 封装 
import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import { stat } from 'fs';
import {saveSearch,deleteSearch,clearSearch,savePlay} from 'common/js/cache'
//                                  commit用于 提交 mutation 行为   
//                                  state获取数据状态
function findIndex(list,song) {
    return list.findIndex((item)=>{
        return item.id === song.id
    })
}

function deleteFromArray(arr,item){
    let index = findIndex(arr,item)
    arr.splice(index,1)
    return index
}

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST, list)
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

export const insertSong = function({commit,state},song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex

    //记录当前歌曲
    let currentSong = playList[currentIndex]
    //查找当前列表中是否有待插入的歌曲
    let fpIndex = findIndex(playList,song)
    //因为是插入曲 所有索引+1
    currentIndex++
    //出入这首歌到当前索引位置
    playList.splice(currentIndex,0,song)
    if(fpIndex> -1) {
        //如果当前插入的序号大于列表中的序号
        if(currentIndex > fpIndex) {
            playList.splice(fpIndex,1)
            currentIndex--
        } else {
            playList.splice(fpIndex+1,1)
        }
    }

    let currentSIndex = findIndex(sequenceList, currentSong) + 1

    let fsIndex = findIndex(sequenceList, song)
  
    sequenceList.splice(currentSIndex, 0, song)
  
    if (fsIndex > -1) {
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
      } else {
        sequenceList.splice(fsIndex + 1, 1)
      }
    }

    commit(types.SET_PLAYLIST,playList)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)
    commit(types.SET_FULL_SCREEN,true)
    commit(types.SET_PLAYING_STATE,true)  
}

export const saveSearchHistory = function({commit},query) {
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const deleteSearchHistory = function({commit},query) {
    commit(types.SET_SEARCH_HISTORY,deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
    commit(types.SET_SEARCH_HISTORY,clearSearch())
    
}

export const deleteSong = function({commit,state},song) {
    let playList = state.playList.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    let pIndex = deleteFromArray(playList,song)
    let sIndex = deleteFromArray(sequenceList,song)

    if(currentIndex > pIndex || currentIndex === playList.length) {
        currentIndex-- 
    }
    commit(types.SET_PLAYLIST,playList)
    commit(types.SET_SEQUENCE_LIST,sequenceList)
    commit(types.SET_CURRENT_INDEX,currentIndex)

    const playState = playList.length > 0
    
    commit(types.SET_PLAYING_STATE,playState)  
}

export const deleteSongList = function({commit}) {
    commit(types.SET_PLAYLIST,[])
    commit(types.SET_SEQUENCE_LIST,[])
    commit(types.SET_CURRENT_INDEX,-1)
    commit(types.SET_PLAYING_STATE,false)  
}

export const savePlayHistory = function({commit},song) {
    commit(types.SET_PLAY_HISTORY,savePlay(song))
}