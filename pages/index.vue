<template>
  <main>
    <nav>
      <primary-button :absolute-position="['top', 'left']">
        <BackIcon />
      </primary-button>
      <primary-button :absolute-position="['top', 'right']">
        <ForwardIcon />
      </primary-button>
      <primary-button :absolute-position="['bottom', 'right']">
        <ChatIcon />
      </primary-button>
    </nav>
  </main>
</template>

<script>
import BackIcon from '~/assets/svg/back.svg'
import ForwardIcon from '~/assets/svg/forward.svg'
import ChatIcon from '~/assets/svg/chat.svg'

export default {
  components: { BackIcon, ForwardIcon, ChatIcon }
}
</script>

<style scoped>
nav {
  position: relative;
  z-index: 10;
}
</style>