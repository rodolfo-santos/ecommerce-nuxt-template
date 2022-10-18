<script lang="ts">
import { ICategory } from '@/models/data';
import { IAuthStore, IUserStore } from '@/models/store';
import { auth, user } from '@/store';
import { Component, Prop, VModel, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  @auth.State public readonly isLoggedIn!: IAuthStore['isLoggedIn'];
  @user.State public readonly user!: IUserStore['user'];

  @Prop({ required: true }) public readonly categories!: ICategory[];
  @VModel({ type: Boolean }) public readonly show!: boolean;
}
</script>

<template>
  <v-navigation-drawer v-model="show" fixed temporary app>
    <v-list-item two-line link :to="{ name: 'Login' }">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title v-if="!!isLoggedIn">{{ user.name }}</v-list-item-title>
        <v-list-item-subtitle>Logado</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list>
      <v-list-item link :to="{ name: 'home' }">
        <v-list-item-content>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="item in categories" :key="item.name" link :to="{ name: 'category', params: { id: item.id } }">
        <v-list-item-content>
          <v-list-item-title> {{ item.name }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
