<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="floor in floorList"
      :key="floor.id"
      :floor="floor"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer'
import Recommend from '@/views/Home/Recommend'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like'
import Floor from '@/views/Home/Floor'
import Brand from '@/views/Home/Brand'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  props: [],
  data () {
    return {}
  },
  computed: {
    ...mapState('home', ['floorList'])
  },
  watch: {},
  created () {},
  mounted () {
    // 派发action,获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
    this.$store.dispatch('user/getUserInfo')
  },
  methods: {}
}
</script>

<style scoped lang='less'>

</style>
