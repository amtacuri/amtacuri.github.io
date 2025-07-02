<script>
import { getRedditPosts } from '../services/redditService'
import RedditPost from '../components/redditPost.vue'
import RedditPostDetail from '../components/redditPostDetail.vue'
export default {
  components: {
    RedditPost, RedditPostDetail
  },
  data(){
    return {
      dataRedditPosts: {},
      before: [],
      after: null,
      previousPage: false,
      currentPage: 0,
      postData: {},
      postId:'',
    }
  },
  mounted() {
    this.getAfterPostList()
  },
  methods: {
    async getPostList(param1, param2) {
      await getRedditPosts(param1, param2)
      .then((res)=>{
        this.after = res.data.after;
        this.dataRedditPosts = res.data.children;
      })
    },
    getAfterPostList() {
      this.before.push(this.after)
      this.currentPage++;
      this.getPostList(this.after, 'after')
      this.previousPage = this.before.length > 1;
    },

    getBeforePostList() {
      if (this.before.length < 2) return
      this.before.pop();
      const prevCursor = this.before[this.before.length -1]
      this.currentPage--;
      this.getPostList(prevCursor, 'after')
      this.previousPage = this.before.length > 1;
    },

    getDetailRedditPost(post) {
      this.postData = this.dataRedditPosts.find((item) => item.data.id==post); 
      this.postId = post;
      window.scrollTo(0,0);
    }
  }
}
</script>
<template>
  <div class="container text-left">
    <h1 class="pt-3">Reddit posts</h1>
    <div class="row">
      <div class="col mt-2 mb-3">
        <button 
          class="btn btn-outline-primary" 
          :class="{'btn-outline-secondary': !previousPage}" 
          :disabled="!previousPage"
          v-on:click="getBeforePostList()">Pag. anterior</button>
        <span class="ms-2">Pagina: {{ currentPage }}</span>
        <button class="ms-2 btn btn-outline-primary" v-on:click="getAfterPostList()">Pag. siguiente</button>
      </div>
    </div>
    <div class="row">
      <div class="col-5">
        
        <RedditPost 
          v-for="redditPost, ind in dataRedditPosts" 
          :key="redditPost.data.id"
          :post="redditPost"
          :ind="ind+1"
          v-on:click="getDetailRedditPost(redditPost.data.id)"
          ></RedditPost>
      </div>
      <div class="col-7">
        <RedditPostDetail :postDetail="postData" :id="postId"></RedditPostDetail>
      </div>
    </div>
    
  </div>
</template>