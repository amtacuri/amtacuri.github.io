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
      currentPage: 1,
      postData: {},
      postId:''
    }
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    async getPostList() {
      await getRedditPosts()
      
      .then((res)=>{
        // console.log('data: ', res.data)
        this.after = res.data.after;
        this.dataRedditPosts = res.data.children;
      })
      this.before.push(this.after)
      this.previousPage = this.before.length > 1;
    },
    async getAfterPostList() {
      this.before.push(this.after)
      this.currentPage++;

      await getRedditPosts(this.after, 'after')
      .then((res) => {
        console.log('data after >>', res.data)
        this.after = res.data.after;
        this.dataRedditPosts = res.data.children;
      })
      this.previousPage = this.before.length > 1;
      
      console.log('>> after:', this.after)
      console.log('<< before:', this.before)
      console.log('previousPage: ', this.previousPage)
    },
    async getBeforePostList() {
      if (this.before.length < 2) return
      this.before.pop();
      const prevCursor = this.previousPage[this.previousPage.length -1]
      this.currentPage--;
      await getRedditPosts(prevCursor, 'after')
      .then((res) => {
        console.log('data before <<', res.data)
        this.after = this.after;
        this.dataRedditPosts = res.data.children;
      })
      this.previousPage = this.before.length > 1;
      console.log('>> after1:', this.after)
      console.log('<< before1:', this.before)
    },
    getDetailRedditPost(post) {
      console.log('detail home', this.dataRedditPosts)
      this.postData = this.dataRedditPosts.find((item) => item.data.id==post);
      console.log('pd', this.postData)
      this.postId = post;
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