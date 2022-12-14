<template>
  <div class="q-pa-md">
    <q-card class="my-card" bordered>
      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">Especialidades</div>
        <div class="text-caption text-grey">
          Especialidades existentes:
          {{ allSpecialities == null ? '' : allSpecialities.length }}
        </div>
        <q-select
          dense
          clearable
          outlined
          v-model="speciality"
          :options="allSpecialities"
          option-value="id"
          option-label="description"
          map-options
          label="Especialidad"
          :hint="`Especialidad Id:${
            speciality == undefined ? '' : speciality.id
          }`"
          @update:model-value="(val) => specialityChanged(val)"
          @clear="(val) => clearSpeciality(val)"
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
          v-if="speciality != null"
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
            <q-form @submit="confirmChanges" class="q-gutter-md" ref="form">
              <q-input
                dense
                outlined
                v-model="currentSpeciality.description"
                label="Descripcion"
                hint="Descripcion Especialidad"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Descripcion es requerida',
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { ISpeciality } from 'src/models/IConsults';
import {
  specialityService,
  useStoreSpeciality,
} from 'src/services/SpecialityService';
import 'src/css/app.sass';

export default defineComponent({
  name: 'SpecialityForm',
  setup() {
    const store = useStoreSpeciality();
    const { allSpecialities, currentSpeciality, speciality, expanded, form } =
      storeToRefs(store);
    const service = specialityService.getInstance();
    onMounted(async () => {
      await service.getAll();
    });

    return {
      expanded,
      speciality,
      allSpecialities,
      currentSpeciality,
      form,
      add() {
        service.add();
      },
      edit() {
        service.edit();
      },
      async confirmChanges() {
        await service.processRequest();
      },
      async specialityChanged(val: ISpeciality) {
        await service.specialityChanged(val);
      },
      clearSpeciality() {
        service.clear();
      },
    };
  },
});
</script>
