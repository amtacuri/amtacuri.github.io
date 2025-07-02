<script>
export default {
  props: ['post', 'ind'],
  methods: {
  }
}
</script>
<template>
  <div class="card mb-3 focus-ring">
    <div class="card-header">
      <div class="d-flex">
        <span class="p-2"><img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png" width="24" height="24" alt=""></span>
        <span class="pt-2">{{ this.post.data.author }}</span>
        <span class="p-2">•</span>
        <span class="pt-2">{{ $filters.toAgoTime(this.post.data.created)  }} </span>
      </div>
    </div>
    <div class="card-body">
      <h6 class="p-2 text-black">
        <!-- <a v-bind:href="'https://reddit.com' + post.data.permalink" class="text-black link-underline-light"> -->
          {{ this.post.data.title }}
        <!-- </a> -->
      </h6>
      <div class="p-2 flex"> 
        <span>
          Comments: 
          {{ this.post.data.num_comments }}
        </span>
        <span> | </span>
        <span>
          Leido:
          {{ !this.post.data.clicked ? 'No' : 'Si' }}
        </span>
        </div>
    </div>
  </div>
</template>