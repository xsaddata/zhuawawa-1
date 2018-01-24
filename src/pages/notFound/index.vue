<template>
  <div class="notFound page">
    <div class="go_home" @click="$router.push('/home')">返回首页</div>
  </div>
</template>

<style scoped>
  .notFound {
    padding-top: 1px;
    background: white url(./noFound_bg.png) no-repeat left top / 100% auto;
  }

  .go_home {
    margin: 10.5rem auto 0;
    text-align: center;
  }
</style>
