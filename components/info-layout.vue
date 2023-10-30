<template>
  <main>
    <nav>
      <info-nav-link
        to="/info"
        :src="Insect1"
      >
        Info
      </info-nav-link>
      <info-nav-link
        to="/events"
        :src="Insect2"
      >
        Events
      </info-nav-link>
      <info-nav-link
        to="/credits"
        :src="Insect3"
      >
        Credits
      </info-nav-link>
    </nav>
    <div class="content">
      <slot />
    </div>
    <absolute-position
      vertical="bottom"
      horizontal="right"
    >
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
import Insect1 from '~/assets/img/insect_0.png'
import Insect2 from '~/assets/img/insect_1.png'
import Insect3 from '~/assets/img/insect_2.png'
</script>

<style scoped>
nav {
  position: sticky;
  top: 0;
  margin-top: calc(-1 * var(--padding));
  padding: calc(2 * var(--padding)) 0 var(--padding);

  display: flex;
  justify-content: space-around;

  background-color: black;
}
.content {
  font-size: 120%;
  padding: 0 calc(2 * var(--padding));
}
@media (max-width: 40rem) {
  .content {
    padding-bottom: 5rem;
  }
}
</style>