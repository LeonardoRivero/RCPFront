<template>
  <q-list>
    <q-item clickable tag="a" link to="/index">
      <q-item-section avatar>
        <q-icon name="home" color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label style="color: white">{{ 'Inicio' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable tag="a" link to="/appointment">
      <q-item-section avatar>
        <q-icon name="mdi-notebook" color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label style="color: white">{{ 'Cita Medica' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable tag="a" link to="/patient">
      <q-item-section avatar>
        <q-icon name="mdi-account-multiple-plus" color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label style="color: white">{{ 'Pacientes' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable tag="a" link to="/schedule">
      <q-item-section avatar>
        <q-icon name="mdi-calendar" color="white" />
      </q-item-section>
      <q-item-section>
        <q-item-label style="color: white">{{ 'Agenda' }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item :content-inset-level="0.5" label="Admisiones">
      <template v-slot:header>
        <q-item-section avatar>
          <q-icon>
            <img :src="icons.schedule_single" />
          </q-icon>
        </q-item-section>
        <q-item-section style="color: white">Admisiones</q-item-section>
      </template>
      <!-- <q-item clickable tag="a" link to="/appointment/list">
        <q-item-section avatar>
          <q-icon name="mdi-calendar-multiple-check" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ 'Listado' }}</q-item-label>
        </q-item-section>
      </q-item> -->
      <q-item clickable tag="a" link to="/admission" style="color: white">
        <q-item-section avatar>
          <q-icon>
            <img :src="icons.scheduleCalendar" />
          </q-icon>
        </q-item-section>
        <q-item-section>Nueva Admision</q-item-section>
      </q-item>
    </q-expansion-item>
    <!-- <q-item clickable tag="a" link to="/clinichistory">
      <q-item-section avatar>
        <q-icon name="mdi-notebook" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ 'Historia Clinica' }}</q-item-label>
        <q-item-label caption>{{ 'Gestiona Historia Pacientes' }}</q-item-label>
      </q-item-section>
    </q-item> -->

    <!-- <q-item clickable tag="a" link to="/settings">
      <q-item-section avatar>
        <q-icon name="mdi-cog" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ 'Configuraciones' }}</q-item-label>
        <q-item-label caption>{{ 'Configuraciones Generales' }}</q-item-label>
      </q-item-section>
    </q-item> -->
  </q-list>
  <q-list v-if="canAccessAdmin || canAccessDoctor">
    <q-expansion-item
      v-for="item in menuItems"
      :key="item.label"
      :icon="item.icon"
      :label="item.label"
      expand-separator
      :content-inset-level="1"
      style="color: white"
    >
      <q-list v-if="item.children">
        <q-item
          v-for="child in item.children"
          :key="child.label"
          v-ripple
          clickable
          link
          :to="child.linkTo"
        >
          <q-item-section avatar>
            <q-icon :name="child.icon" color="white" />
          </q-item-section>
          <q-item-section style="color: white">{{
            child.label
          }}</q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </q-list>
</template>

<script setup lang="ts">
  import { IconSVG } from 'src/Application/Utilities';
  import { IHandleUserState } from 'src/Domine/IPatterns';
  import { GroupUser } from 'src/Domine/Types';
  import { inject, ref } from 'vue';

  const menuItems = ref([
    {
      icon: 'settings',
      label: 'Configuración',
      children: [
        { icon: 'person', label: 'Usuarios', linkTo: '/users' },
        { icon: 'place ', label: 'Consultorio', linkTo: '/medicaloffice' },
        // { icon: 'notifications', label: 'Notificaciones' },
      ],
    },
  ]);
  const icons = IconSVG;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dependenciesLocator = inject<any>('dependenciesLocator');
  const handleUserState = <IHandleUserState>(
    dependenciesLocator.provideHandleUserState()
  );
  const isAuthenticated = handleUserState.store.isAuthenticated;
  const userRoles = handleUserState.store.token.roles;
  const canAccessAdmin = isAuthenticated && userRoles.includes(GroupUser.ADMIN);
  const canAccessDoctor =
    isAuthenticated && userRoles.includes(GroupUser.DOCTOR);
  const canAccessViewer = isAuthenticated && userRoles.includes('viewer');
</script>
