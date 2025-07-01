<script>
export default {
  props: ['post'],
  methods: {
    formatDate(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      console.log('totalSeconds: ', totalSeconds)
      const hours = Math.floor(totalSeconds / 3600);
      console.log('hours: ', hours)
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      let timeString = '';
      if (hours > 0) {
        timeString += `${hours} horas `;
      }
      if (minutes > 0) {
        timeString += `${minutes} minutos `;
      }
      if (seconds > 0) {
        timeString += `${seconds} segundos `;
      }
      return `Hace ${timeString}`;
    }
  }
}
</script>
<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="d-flex">
        <div class="p-2">
          {{ this.post.data.author }}
        </div>
        <div  class="p-2">
          {{ this.formatDate(this.post.data.created) }} - 
          {{ this.formatDate(this.post.data.created_utc) }}
        </div>
      </div>
    </div>
    <div class="card-body">
      <h2 class="p-2">{{ this.post.data.title }}</h2>
      <div class="p-2"> Comments: 
        <i class="bi bi-chat-right-text"></i>
        {{ this.post.data.num_comments }}</div>
    </div>
  </div>
</template>