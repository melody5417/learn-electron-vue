<template>
  <div id="welcome-context">
    <ul class="entry-list">
      <li class="entry" v-for="(item, index) in welcomeList" :key="item.id">
        <!-- <a class="entry-link" :href="item.originalUrl"> -->
        <div class="content-box">
          <div class="info-box">
            <div class="info-row meta-row">
              <ul class="meta-list">
                <li class="item category">{{ item.category.name }}</li>
                <li class="item username">{{ item.user.username }}</li>
                <li class="item time">{{ item.updatedAt }}</li>
                <li class="item tag">{{ getTags(item.tags) }}</li>
              </ul>
              <button class="delete" @click="onDelete($event, index, item)"></button>
            </div>
            <div class="info-row title-row">{{ item.title }}</div>
          </div>
        </div>
        <!-- </a> -->
      </li>
    </ul>
  </div>
</template>

<script>
import * as request from 'src/api/welcome'

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
        pageNum: 0,
        pageSize: 5
      }
      request.getWelcomeList(params)
        .then(data => {
          console.log('fetchWelcome', data)
          this.welcomeList = data
        })
        .catch(err => {
          console.log('fetchWelcome err: ', err)
        })
    },
    getTags (tags) {
      console.log(
        'tags: ' +
          JSON.stringify(tags) +
          ' welcomelist: ' +
          JSON.stringify(this.welcomeList)
      )
      return tags
        .map(item => {
          return item['title']
        })
        .join('/')
    },
    onDelete (event, index, item) {
      console.log('onDelete', event, index, item)
      const params = { id: item.id }
      request.deleteWelcome(params).then(() => {
        console.log('delete succeed')
        this.welcomeList.splice(index, 1)
      }).catch(err => {
        console.log('delete error: ', err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.entry-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  .entry {
    list-style: none;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  }
  // .entry-link {
  //   text-decoration: none;
  //   cursor: pointer;
  // }
  .content-box {
    display: flex;
    align-items: center;
    padding: 1.5rem 2rem;
  }
  .info-box {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
  }
}
.meta-row {
  font-size: 1rem;
  color: #b2bac2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .meta-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: baseline;
    white-space: nowrap;
    .item:not(:last-child)::after {
      content: "·";
      margin: 0 0.4em;
      color: #b2bac2;
    }
    .category {
      font-weight: 500;
      color: #b71ed7;
    }
    .tag {
      min-width: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .delete {
    float: right;
    background: url("~assets/icon_delete.png") no-repeat center;
    width: 12px;
    height: 12px;
  }
}
.title-row {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  color: #2e3135;
  margin: 0.5rem 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
