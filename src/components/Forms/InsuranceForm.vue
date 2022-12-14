<template>
  <q-card class="my-card" bordered>
    <q-card-section>
      <div class="text-h5 q-mt-sm q-mb-xs">Entidades</div>
      <div class="text-caption text-grey">
        Entidades Registradas:
        {{ allInsurance == null ? '' : allInsurance.length }}
      </div>
      <q-select
        dense
        clearable
        outlined
        v-model="insurance"
        :options="allInsurance"
        option-value="id"
        option-label="nameInsurance"
        map-options
        label="Descripcion"
        @update:model-value="(val) => insuranceChanged(val)"
        @clear="(val) => clearInsurance(val)"
        :hint="`Codigo Entidad: ${
          currentInsurance.entityCode == undefined
            ? ''
            : currentInsurance.entityCode
        }`"
      >
      </q-select>
    </q-card-section>
    <q-card-actions>
      <q-btn flat round color="primary" icon="mdi-plus" @click="add">
        <q-tooltip transition-show="scale" transition-hide="scale">
          Agregar
        </q-tooltip>
      </q-btn>
      <q-btn
        v-if="insurance != null"
        flat
        round
        color="green"
        icon="mdi-pencil"
        @click="edit"
      >
        <q-tooltip transition-show="scale" transition-hide="scale">
          Editar
        </q-tooltip>
      </q-btn>
      <q-space />
      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>
    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />
        <q-card-section class="text-subitle2">
          <q-form @submit="confirmChanges" ref="form">
            <q-input
              dense
              outlined
              v-model="currentInsurance.entityCode"
              label="Codigo Entidad"
              maxlength="10"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Codigo es requerido',
              ]"
            />
            <q-input
              dense
              outlined
              v-model="currentInsurance.nameInsurance"
              label="Descripcion Entidad"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Descripcion es requerida',
              ]"
            />
            <div>
              <q-btn label="Guardar" type="submit" color="primary" />
            </div>
          </q-form>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import {
  insuranceService,
  useStoreInsurance,
} from 'src/services/InsuranceService';
import 'src/css/app.sass';
import { IHealthInsurance } from 'src/models/IPatients';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'InsuranceForm',
  setup() {
    const { currentInsurance, insurance, expanded, form, error, allInsurance } =
      storeToRefs(useStoreInsurance());
    const service = insuranceService.getInstance();
    onMounted(async () => {
      await service.getAll();
    });

    return {
      insurance,
      allInsurance,
      currentInsurance,
      expanded,
      form,
      error,
      clearInsurance() {
        service.clear();
      },
      insuranceChanged(val: IHealthInsurance) {
        service.insuranceChanged(val);
      },
      edit() {
        service.edit();
      },
      add() {
        service.add();
      },
      async confirmChanges() {
        await service.processRequest();
      },
    };
  },
});
</script>
