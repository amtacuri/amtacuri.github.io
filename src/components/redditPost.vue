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
  }
}
</script>
<template>
  <div class="card mb-3">
    <div class="card-header">
      <div class="d-flex">
        <span class="p-2"><img src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_4.png" width="24" height="24" alt=""></span>
        <span class="pt-2">{{ this.post.data.author }}</span>
        <span class="p-2">-</span>
        <span class="pt-2">{{ this.formatDate(this.post.data.created) }} </span>
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