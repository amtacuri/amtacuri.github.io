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
        is_video: false
      }
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
    }
  },
  mounted() {
    console.log('detail:', (this.dataPost) ? this.dataPost : 'null')
    console.log('id', this.id)
  },
  watch: {
    postDetail: function(newValue) {
      console.log('watch', newValue.data)
      this.dataPost = newValue.data;
      console.log('dataPost: ', this.dataPost);
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
      <div v-if="dataPost.is_video" class="text-center">
        <video width="100%" height="auto" controls>
          <source v-bind:src="dataPost.media.reddit_video.scrubber_media_url" type="video/mp4">
          <source v-bind:src="dataPost.media.reddit_video.scrubber_media_url">
        </video>
      </div>
      <div v-if="dataPost.url && dataPost !== ''" class="pt-5">
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
    </div>
  </div>
</template>