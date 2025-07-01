<script>
import { getRedditPosts } from '../services/redditService'
import RedditPost from '../components/redditPost.vue'
export default {
  components: {
    RedditPost
  },
  data(){
    return {
      dataRedditPosts: {}
    }
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    async getPostList() {
      await getRedditPosts()
      .then((res)=>{
        this.dataRedditPosts = res.data.children;
      })
    }
  }
}
</script>
<template>
  <div class="container text-left">
    <h1 class="pt-3">Reddit posts</h1>
    <RedditPost 
      v-for="redditPost in dataRedditPosts" 
      :key="redditPost.data.id"
      :post="redditPost"
      ></RedditPost>
  </div>
</template>