<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useIdle } from '@vueuse/core';
import { routerInstance } from 'src/boot/globalRouter';

export default defineComponent({
  name: 'App',
  setup() {
    const { idle, lastActive } = useIdle(20 * 60 * 1000);

    watch(idle, (idleValue) => {
      if (idleValue) {
        routerInstance.push('/');
        console.log(lastActive.value);
      }
      console.log(`Triggered ${lastActive.value} times`, idle.value);
    });
  },
});
</script>
