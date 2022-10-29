<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  props: [],
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
    // 派发一个action，避免多次网络请求
    this.$store.dispatch('home/categoryList')
  },
  mounted () {},
  methods: {}
}
</script>

<style scoped lang='less'>

</style>
