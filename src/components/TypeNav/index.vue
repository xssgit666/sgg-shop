<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show2">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{
                  cur: currentIndex == index
                }"
              >
                <h3>
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <!-- 二级三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex == index ? 'block' : 'none'
                  }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em
                          v-for="c3 in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle' // 按需引入lodash
export default {
  name: 'TypeNav',
  components: {},
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      currentIndex: -1, // 属性的索引值
      show2: this.show // 接收props接收的show，后续需要修改
    }
  },
  computed: {
    ...mapState('home', ['categoryList'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 鼠标移入：加入了防抖
    changeIndex: throttle(function (index) {
      this.currentIndex = index // 修改currentIndex值
    }, 20),

    // 鼠标移出
    leaveIndex () {
      this.currentIndex = -1 // 二三级不展示

      // 判断是否在首页
      if (this.$route.path !== '/home') { // 不是在首页
        this.show2 = false // 则移出不显示
      }
    },

    // 路由跳转
    goSearch (event) {
      const node = event.target // 获取到的是触发事件的元素
      const { // 从.dataset中解构出4个自定义的属性
        categoryname,
        category1id,
        category2id,
        category3id
      } = node.dataset

      // 标签身上带有自定义属性categoryname一定是a标签,进入判断
      if (categoryname) {
        // 准备路由跳转的参数对象name
        const loction = { name: 'search' }
        // 准备路由跳转的参数对象query
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候带有params参数
        if (this.$route.params) {
          loction.params = this.$route.params
          loction.query = query
          // 路由跳转
          this.$router.push(loction)
        }
      }
    },

    // 当鼠标移入的时候，让商品分类列表进行展示
    enterShow () {
      // 判断是否在首页
      if (this.$route.path !== '/home') { // 不是在首页
        this.show2 = true // 则显示
      }
    }
  }
}
</script>

<style scoped lang="less">
a {
  cursor: pointer;
}

.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 510px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          h3 :hover {
            color: #e1251b;
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: #D9D9D9;
          a {
            text-decoration: none;
          }
        }
      }
    }

    //过渡动画的样式。须在transition标签中加name
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 510px; // 可定义为0，考虑到效果不好，故而未做设置
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 510px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
