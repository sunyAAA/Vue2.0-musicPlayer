<template>
  <div class="song-list">
    <ul></ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
  @import "~common/style/variable"
  @import "~common/style/mixin"

  .song-list
    .item
      display flex
      align-items center
      box-sizing border-box
      height 64px
      font-size $font-size-medium
      .content
        flex 1
        line-height 20px
        overflow hidden
        .name
          no-wrap()
          color  $color-text
        .desc
          no-wrap()
          margin-top 4px
          color $color-text-d
</style>
