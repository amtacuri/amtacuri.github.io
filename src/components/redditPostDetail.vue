<script>
import { toValue } from 'vue'
export default {
  props: ['postDetail', 'id'],
  data() {
    return {
      dataPost: {
        title: '',
        author: '',
        created: '',
        selftext_html: '',
        url: '',
        selftext: '', 
        media: {
          reddit_video: {
            width: '320',
            height: '240',
            scrubber_media_url: ''
          }
        },
        is_video: false,
        videoHtml: ''
      },
    }
  },
  methods: {
    loadVideo(media) {
      if (media !== null) {
        const versionedUrl = `${media.reddit_video.scrubber_media_url}?v=${Date.now()}`
        this.videoHtml  = `
          <video width="100%" height="auto" controls>
            <source src="${versionedUrl}" type="video/mp4">
          </video>
        `
      } else {
        this.videoHtml = ''
      }
    } 
  },
  mounted() {

  },
  watch: {
    postDetail: function(newValue) {
      this.dataPost = newValue.data;
      
      this.loadVideo(this.dataPost.media);
    },
  }
}
</script>
<template>
  <div class="card" v-if="this.id">
    <div class="card-header">
      <div class="d-flex">
        <span class="p-2"><img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png" width="24" height="24" alt=""></span>
        <span class="pt-2">{{ this.dataPost.author }}</span>
        <span class="p-2">-</span>
        <span class="pt-2">{{ $filters.toAgoTime(this.dataPost.created) }} </span>
      </div>
    </div>
    <div class="card-body">
      <p class="fw-bold">{{ (this.dataPost) ? this.dataPost.title : '' }}</p>
      <div>{{ (this.dataPost.selftext_html && this.dataPost.selftext_html == '') ? this.dataPost.selftext_html : this.dataPost.selftext }}</div>
      <div class="text-center">
        <div id="video-container" v-html="videoHtml"></div>
      </div>

      <div v-if="dataPost.url && dataPost !== ''" class="mt-2 pt-2 border-bottom pb-2">
        <div class="d-flex justify-content-between">
          <p class="mb-0">
            <a :href="dataPost.url" class="text-black link-underline-light">
              {{ dataPost.domain }}
            </a>
          </p>
          <p class="mb-0">
            <a :href="dataPost.url" class="btn btn-outline-primary">Abrir</a>
          </p>
        </div>
        
      </div>
      <div class="mt-5">
        <form action="" class="gy-2">
          <div class="row">
            <div class="col">
              <textarea name="" id="" cols="30" rows="10" class="form-control" placeholder="Agregar Comentario"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col pt-2">
              <button type="button" class="btn btn-secondary me-2">Cancelar</button>
              <button type="button" class="btn btn-primary">Comentar</button>
            </div>
          </div>
        </form>
        
        
      </div>
    </div>
  </div>
</template>