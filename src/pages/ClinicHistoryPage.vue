<template>
  <q-page>
    <ClinicHistory />
  </q-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ClinicHistory from 'src/components/Forms/ClinicHistoryForm.vue';
import 'src/css/app.sass';
export default defineComponent({
  components: { ClinicHistory },
});
</script>
