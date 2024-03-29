<template>
  <q-card class="my-card" bordered>
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar square>
            <img :src="icons.womanAndMan" />
          </q-avatar>
        </q-item-section>
        <div class="text-h4 text_bold">Registro Usuarios</div>
      </q-item>
    </q-card-section>
    <q-separator inset></q-separator>
    <q-card-section>
      <div class="text-black">
        <q-toolbar>
          <q-space />
          <!-- <q-input
            label="Nº Documento usuario"
            clearable
            dense
            v-model="state.identification"
            type="number"
            @keydown.enter.prevent="searchPatient"
            lazy-rules
            :rules="[(val) => val > 0 || 'Numero invalido']"
          >
            <template v-slot:append
              ><q-btn
                flat
                round
                dense
                icon="search"
                class="q-mr-xs"
                @click="searchPatient"
              />
              <q-tooltip transition-show="scale" transition-hide="scale">
                Buscar usuario por N° identificacion
              </q-tooltip></template
            ></q-input
          > -->
        </q-toolbar>
      </div>
      <q-form @submit="confirmChanges" ref="form">
        <q-list>
          <q-item>
            <q-item-section>
              <div class="row q-col-gutter-x-md">
                <div class="col-6 col-md">
                  <q-input
                    v-model="state.name"
                    :readonly="disable"
                    outlined
                    dense
                    label="Nombres *"
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 0) || 'Nombres no validos',
                    ]"
                  />
                </div>
                <div class="col-6 col-md">
                  <q-input
                    v-model="state.lastName"
                    :readonly="disable"
                    outlined
                    dense
                    label="Apellidos *"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'Apellidos no validos',
                    ]"
                  />
                </div>
              </div>
              <div class="row q-col-gutter-x-md">
                <div class="col-6 col-md">
                  <q-input
                    v-model="state.identification"
                    outlined
                    :readonly="disable"
                    dense
                    type="number"
                    label="Numero Identificacion *"
                    :rules="[(val) => val > 0 || 'Numero invalido']"
                  />
                </div>
                <div class="col-6 col-md">
                  <q-select
                    v-model="state.idType"
                    :readonly="disable"
                    dense
                    outlined
                    :options="allIDTypes"
                    :option-value="(item) => (item === null ? null : item.id)"
                    option-label="abbreviation"
                    map-options
                    label="Tipo Documento *"
                    stack-label
                    emit-value
                  >
                  </q-select>
                </div>
              </div>
              <div class="row q-col-gutter-x-md">
                <div class="col-6 col-md">
                  <q-input
                    v-model="state.phoneNumber"
                    dense
                    outlined
                    label="Telefono *"
                    mask="##########"
                    unmasked-value
                    lazy-rules
                    :rules="[
                      (val) => (val && val.length > 9) || 'Celular no valido',
                    ]"
                  />
                </div>
                <div class="col-6 col-md">
                  <q-input
                    v-model="state.dateBirthday"
                    outlined
                    :readonly="disable"
                    dense
                    label="Fecha Nacimiento *"
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Fecha Nacimiento es requerida',
                    ]"
                  >
                    <template v-slot:append>
                      <q-icon name="event">
                        <q-popup-proxy
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date today-btn mask="YYYY-MM-DD">
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Cerrar"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
              <div class="row q-col-gutter-x-md">
                <div class="col-12 col-md">
                  <q-input
                    :readonly="disable"
                    label="Correo electronico"
                    dense
                    type="email"
                    :error="error"
                    @blur="(evt) => isValidEmail(evt.target.value)"
                  />
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-card-actions align="right" class="text-teal">
          <q-btn
            label="Guardar"
            type="submit"
            color="primary"
            icon-right="mdi-content-save"
          />
          <q-btn
            v-if="disable"
            color="secondary"
            icon-right="mdi-pencil"
            label="Editar"
            @click="enableEdition"
            class="q-ml-sm"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';
import { UserState } from 'src/Domine/IStates';
import { IconSVG } from 'src/Application/Utilities';
import { SettingsMediator } from 'src/Infraestructure/Mediators';
import { Group } from 'src/Domine/Responses';

export default defineComponent({
  name: 'UsersForm',
  setup() {
    const icons = IconSVG.getInstance();
    const state: UserState = reactive({
      name: '',
      lastName: '',
      email: '',
      IdType: null,
      identification: null,
      dateBirthday: '',
      phoneNumber: null,
      groups: [],
      isActive: true,
      lastLogin: '',
      dateJoined: '',
      repassword: '',
      password: '',
      username: '',
    });
    const mediator = SettingsMediator.getInstance();
    let allGroups = <Array<Group>>[];
    onMounted(async () => {
      allGroups = await mediator.getAllGroups();
    });
    return {
      icons,
      state,
      disable: false,
      allGroups,
    };
  },
});
</script>
