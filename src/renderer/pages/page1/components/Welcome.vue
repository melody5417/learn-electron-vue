<template>
  <div id="welcome-context">
    <ul class="entry-list">
      <li class="entry" v-for="item in welcomeList" :key="item.id">
        <a class="entry-link" :href="item.originalUrl">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row"></div>
              <div class="info-row title-row">{{item.title}}</div>
              <div class="info-row action-row"></div>
            </div>
            <div class="thumb"></div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { getWelcomeList } from 'src/api/welcome'

export default {
  name: 'welcome',
  data () {
    return {
      welcomeList: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.fetchWelcome()
    }, 100)
  },
  methods: {
    fetchWelcome () {
      const params = {
        pageNum: 1,
        pageSize: 2
      }
      getWelcomeList(params).then(data => {
        console.log('fetchWelcom', data)
        this.welcomeList = data
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang='scss' scoped>
.info-row {
  width: 100%;
  height: 20px;
  line-height: 20px;
  color: black;
  font-size: 12px;
}
  
</style>
