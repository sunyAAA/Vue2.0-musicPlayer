<template>
  <transition name='slide'>
    <music-list :title="title" :bgImage='bgImage'></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getSongList} from 'api/recommend'

export default {
  components:{MusicList},
  computed:{
    title() {
      return this.disc.songListDesc
    },
    bgImage() {
      return this.disc.picUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  methods: {
    _getSongList() {
      getSongList(this.disc.id).then((res)=>{
        console.log(res)
      })
    }
  },
  created() {
    this._getSongList();
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active,.slide-leave-active
    transition all 0.3s
  .slide-enter , .slide-leave-to
    transform translate3d(100%,0,0)
</style>
