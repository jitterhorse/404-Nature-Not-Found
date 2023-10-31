<template>
  <div
    ref="overlayContainer"
    class="overlay"
  >
    <div class="wrapper-header-404">
      <br>
      <header404 />
      <div
        v-if="isPageExpanded"
        class="button-container absolute"
      >
        <primary-button :click="scrollDown">
          <DownIcon />
        </primary-button>
      </div>
    </div>
    <main v-if="isPageExpanded">
      <gray-text>
        Diese 404 Seite wurde gespendet von:
      </gray-text>
      <h1 v-if="page404.name">
        {{ page404.name }}
      </h1>
      <h1 v-if="page404.nameAi">
        {{ page404.nameAi }}*
      </h1>
      <div v-if="page404.text">
        <gray-text>
          Text Spende
        </gray-text>
        <p>
          {{ page404.text }}
        </p>
      </div>
      <div v-if="page404.textAi">
        <gray-text>
          Text Spende*
        </gray-text>
        <p>
          {{ page404.textAi }}
        </p>
      </div>

      <div class="spacer" />

      <image404
        title="Foto Spende"
        :src="page404.photo"
      />
      <div class="spacer" />
      <image404
        title="Skizze Spende"
        :src="page404.painting"
      />

      <div v-if="page404.photosAi.length">
        <div class="spacer" />
        <gray-text>
          Fotos KI*
        </gray-text>
        <br>
        <img
          v-for="photo in page404.photosAi"
          :key="photo"
          :src="photo"
        >
      </div>
      <div v-if="page404.paintingsAi.length">
        <div class="spacer" />
        <gray-text>
          Skizze KI*
        </gray-text>
        <br>
        <img
          v-for="painting in page404.paintingsAi"
          :key="painting"
          :src="painting"
        >
      </div>

      <div class="button-container">
        <icon-button
          caption="schließen"
          :click="closePage404"
        >
          <ant-icon />
        </icon-button>
      </div>
      <footer>
        alle mit * gekennzeichneten Inhalte sind durch eine sogenannte künstliche Intelligenz entstanden und reagieren auf die menschliche 404 Spende oder schaffen eine eigene am Computer generierte Spende
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import {Page404} from "~/data/types";
import DownIcon from '~/assets/svg/down.svg'
import AntIcon from "assets/svg/ant2.svg";
import {closePage404} from "~/utils/pages404Logic";

const {page404} = defineProps<{ page404: Page404 }>()

const backgroundImage = `url('${(page404.painting || page404.paintingsAi[0]) as string}')`

const isPageExpanded = ref(false)
const overlayContainer = ref<HTMLElement | null>(null)

if (process.client) {
  setTimeout(() => {
    isPageExpanded.value = true;
  }, 2000)
}

const scrollDown = () => {
  overlayContainer.value!.scrollTo({ top: window.innerHeight, behavior: "smooth" })
}
</script>

<style scoped>
.overlay {
  background-color: black;
  overflow-y: auto;
}
.wrapper-header-404 {
  height: 100vh;

  background-image: v-bind('backgroundImage');
  background-size: cover;
  background-position: center;
}
.button-container {
  display: flex;
  justify-content: center;
  padding: var(--unit)
}
.button-container.absolute {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}
main {
  padding-top: calc(3 * var(--unit));
  font-size: 120%;
}
h1 {
  text-align: center;
}
img, :deep(img) {
  width: 100%;
}
.spacer {
  height: calc(2 * var(--unit));
}
footer {
  border-top: 2px solid currentColor;
  padding: var(--unit) 0;
  font-size: 0.9rem;
}
</style>