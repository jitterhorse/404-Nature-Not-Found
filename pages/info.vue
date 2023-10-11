<template>
  <main>
    <h1>Info</h1>
    <p>
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
      dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
      kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
      sanctus est Lorem ipsum dolor sit amet.
    </p>
    <absolute-position vertical="bottom" horizontal="right">
      <icon-button
          href="/"
        caption="exit"
        caption-position="above"
      >
        <ant-icon />
      </icon-button>
    </absolute-position>
  </main>
</template>

<script setup lang="ts">
import AntIcon from '~/assets/svg/ant.svg'
</script>