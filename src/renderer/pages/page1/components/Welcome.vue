<template>
  <div id="welcome-context">
    <ul class="entry-list">
      <li class="entry" v-for="item in welcomeList" :key="item.id">
        <a class="entry-link" :href="item.originalUrl">
          <div class="content-box">
            <div class="info-box">
              <div class="info-row meta-row">
                <ul class="meta-list">
                  <li class="item category">{{item.category.name}}</li>
                  <li class="item username">{{item.user.username}}</li>
                  <li class="item time">{{item.updatedAt}}</li>
                  <li class="item tag">{{getTags(item.tags)}}</li>
                </ul>
              </div>
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
    this.fetchWelcome()
  },
  methods: {
    fetchWelcome () {
      const params = {
        pageNum: 1,
        pageSize: 2
      }
      getWelcomeList(params).then(data => {
        console.log('fetchWelcome', data)
        this.welcomeList = data
      }).catch((err) => {
        console.log('fetchWelcome err: ', err)
      })
    },
    getTags (tags) {
      console.log('tags: ' + JSON.stringify(tags) + ' welcomelist: ' + JSON.stringify(this.welcomeList))
      return tags.map(item => {
        return item['title']
      }).join('/')
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
.entry-link {
  text-decoration: none;
}
.meta-list {
word-break: break-word;
list-style: none;
cursor: pointer;
font-size: 1rem;
color: #b2bac2;
padding: 0;
margin: 0;
display: flex;
align-items: baseline;
white-space: nowrap;
  .category {
    font-family: -apple-system,system-ui,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
    text-rendering: optimizeLegibility;
    line-height: normal;
    word-break: break-word;
    cursor: pointer;
    font-size: 1rem;
    white-space: nowrap;
    list-style: none;
    font-weight: 500;
    color: #b71ed7;
  }
  .item::after {
    content: "·";
    margin: 0 5px;
    color: #b2bac2;
  }
}
  
</style>
