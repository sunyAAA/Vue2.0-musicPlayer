import {playMode} from 'common/js/config'
import {loadSearch,loadPlay} from 'common/js/cache'
const state = {
  singer: {},         //  歌手信息
  playing: false,     //  播放器状态
  fullScreen: false,  // 是否全屏
  playList:[],        // 播放歌曲列表
  sequenceList:[],    //  播放列表排序
  mode : playMode.sequence,
  currentIndex : -1,    //当前播放索引 
  disc : {},            //歌单数据
  searchHistory : loadSearch(),    //搜索历史
  playHistory: loadPlay()       //播放历史
}
export default state
