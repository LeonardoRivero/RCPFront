<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page
        class="window-height window-width row justify-center items-center"
      >
        <div class="column q-pa-lg">
          <div class="row">
            <q-card
              square
              class="shadow-24"
              style="width: 400px; height: 540px"
            >
              <q-card-section class="bg-blue-7">
                <h4 class="text-h5 text-white q-my-md">Bienvenido</h4>
              </q-card-section>
              <q-card-section>
                <q-form class="q-px-sm q-pt-xl" ref="form">
                  <q-input
                    square
                    clearable
                    v-model="email"
                    type="email"
                    lazy-rules
                    :rules="[required, isEmail, short]"
                    label="Email"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <!-- <q-input
                    v-if="state.register"
                    square
                    clearable
                    v-model="state.username"
                    lazy-rules
                    :rules="[required, short, noSpaces]"
                    type="username"
                    label="Nombre Usuario"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" />
                    </template>
                  </q-input> -->
                  <q-input
                    square
                    clearable
                    v-model="password"
                    type="password"
                    lazy-rules
                    :rules="[required, short]"
                    label="Contraseña"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
                  <!-- <q-input
                    v-if="state.register"
                    square
                    clearable
                    v-model="state.repassword"
                    :type="state.passwordFieldType"
                    lazy-rules
                    :rules="[required, short, diffPassword]"
                    label="Confirmacion Contraseña"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="state.visibilityIcon"
                        @click="switchVisibility"
                        class="cursor-pointer"
                      />
                    </template>
                  </q-input> -->
                  <q-item-section>
                    <q-item-label class="text-center text-red">
                      {{ labelMessage }}
                    </q-item-label>
                  </q-item-section>
                </q-form>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="login()"
                  class="full-width text-white"
                  label="Ingresar"
                />
                <!-- <q-btn
                  v-if="state.register"
                  unelevated
                  size="lg"
                  color="secondary"
                  @click="register()"
                  class="full-width text-white"
                  label="Register"
                /> -->
              </q-card-actions>
              <q-card-section class="text-center q-pa-sm">
                <p class="text-grey-6">Olvidaste tu contraseña?</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { routerInstance } from 'src/boot/globalRouter';
import { QForm } from 'quasar';
import { UserService } from 'src/Application/Services/UserService';
import { login } from 'src/Domine/types';
import {
  ContextUser,
  DoctorStrategy,
  SecretaryStrategy,
} from 'src/Domine/StrategyUser';
import { StrategyUser } from 'src/Domine/IPatterns';

export default defineComponent({
  name: 'LoginUser',
  setup() {
    const form = ref<QForm>();
    const email = ref<string>('carmen@yopmail.com');
    const password = ref<string>('Rock1989#');
    const labelMessage = ref<string>('');
    const userService = new UserService();
    const profilesUser: Record<string, StrategyUser> = {
      Secretaria: new SecretaryStrategy(),
      Doctor: new DoctorStrategy(),
    };

    return {
      required(val: string) {
        return (val && val.length > 0) || 'Campo requerido';
      },
      // diffPassword(val: string) {
      //   return password.value == repassword.value || 'Password no coinciden!';
      // },
      short(val: string) {
        return (val && val.length > 3) || 'Longitud mayor a 3 caracteres';
      },
      isEmail(val: string) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || 'email Invalido';
      },
      noSpaces(val: string) {
        const noSpacesPattern = /^[-\w\.\$@\*\!]{8,150}$/;
        return (
          noSpacesPattern.test(val) ||
          'Minimo 8 caracteres. Únicamente letras, dígitos y @ . + - _'
        );
      },
      async login() {
        const isValid = await form.value?.validate();
        if (isValid == false) return;
        const payload: login = {
          email: 'carmen@yopmail.com',
          password: 'Rock1989#',
        };
        const response = await userService.login(payload);
        if (response == null) {
          labelMessage.value = 'algo salio mal';
          return;
        }
        // const namegroup = response.user.groups[0].name.toString();
        const namegroup = 'Secretaria';
        const strategy = profilesUser[namegroup];
        const contextUser = ContextUser.getInstance(strategy);
        contextUser.setUserData(response.user);
        await contextUser.execute();
        routerInstance.push('/index');
      },
      // async register() {
      //   const isValid = await form.value?.validate();
      //   if (isValid == false) return;
      //   user = {
      //     username: state.username,
      //     email: state.email,
      //     password: state.password,
      //     repassword: state.repassword,
      //   };
      //   await controller.register(user);
      // },
      // switchTypeForm() {
      //   form.value?.reset();
      //   controller.clear();
      //   btnLabel.value = state.register ? 'Registrar' : 'Ingresar';
      // },
      // switchVisibility(val: string) {
      //   console.log({ val });
      //   state.visibility = !state.visibility;
      //   state.passwordFieldType = state.visibility ? 'text' : 'password';
      //   state.visibilityIcon = state.visibility
      //     ? 'visibility_off'
      //     : 'visibility';
      // },

      form,
      email,
      password,
      labelMessage,
      // repassword,
      // btnLabel,
    };
  },
});
</script>
