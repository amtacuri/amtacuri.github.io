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
    formatDate(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      // console.log('totalSeconds: ', totalSeconds)

      const hours = Math.floor(totalSeconds / 3600);
      // console.log('hours: ', hours)
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      const days =  Math.floor(hours / 24)
      let timeString = '';
      if (days > 0) {
        timeString += `${days} dia`;
        timeString += (days > 1) ? 's' : '';
      } else {
        if (hours > 0) {
          timeString += `${hours} horas `;
        } else {
          if (minutes > 0) {
            timeString += `${minutes} minutos `;
          } else {
            if (seconds > 0) {
              timeString += `${seconds} segundos `;
            }
          }
        }
      }

      return `Hace ${timeString}`;
    },
    loadVideo(media) {
      console.log(media);
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
    console.log('detail:', (this.dataPost) ? this.dataPost : 'null')
    console.log('id', this.id)
  },
  watch: {
    postDetail: function(newValue) {
      
      console.log('watch', newValue.data);
      // setTimeout(()=>{
        // this.dataPost.media = null
        this.dataPost = newValue.data;
        // console.log(this.dataPost.media.reddit_video.scrubber_media_url)
      // }, 1000)
      console.log('dataPost: ', this.dataPost);
      this.loadVideo(this.dataPost.media);
    },
    id: (newId)=>{
      console.log('newId', newId)
    }
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
        <span class="pt-2">{{ this.formatDate(this.dataPost.created) }} </span>
      </div>
    </div>
    <div class="card-body">
      <p class="fw-bold">{{ (this.dataPost) ? this.dataPost.title : '' }}</p>
      <div>{{ (this.dataPost.selftext_html && this.dataPost.selftext_html == '') ? this.dataPost.selftext_html : this.dataPost.selftext }}</div>
      
      <!-- <p>{{ 'tiene video: ' + dataPost.is_video +' | '+ dataPost.media }}</p> -->


      <div class="text-center">
        <div id="video-container" v-html="videoHtml"></div>
        <!-- <div v-if="dataPost.is_video" class="text-center">
+        <video width="100%" height="auto" controls>
+          <source v-bind:src="dataPost.media.reddit_video.scrubber_media_url" type="video/mp4">
+          <source v-bind:src="dataPost.media.reddit_video.scrubber_media_url">
+        </video>
+      </div> -->
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