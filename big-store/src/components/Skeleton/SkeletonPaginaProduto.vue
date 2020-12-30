<template>
    <div>
        <v-row>
            <v-row class="col-8">
            <div class="col-2">
                <v-skeleton-loader type="image" class="mb-2" height="115"></v-skeleton-loader>
                <v-skeleton-loader type="image" class="mb-2" height="115"></v-skeleton-loader>
                <v-skeleton-loader type="image" class="mb-2" height="115"></v-skeleton-loader>
            </div>
            <div class="col-10">
                <v-skeleton-loader type="image"></v-skeleton-loader>
                <v-skeleton-loader type="image"></v-skeleton-loader>
                <v-skeleton-loader type="image"></v-skeleton-loader>
            </div>
            </v-row>
            <v-col>
                <v-skeleton-loader type="heading" class="my-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="sentences" class=""></v-skeleton-loader>
                <v-skeleton-loader type="button" class="my-2"></v-skeleton-loader>
                <v-divider></v-divider>
                <v-skeleton-loader type="text" class="my-2"></v-skeleton-loader>
                <v-skeleton-loader type="chip" class="my-2"></v-skeleton-loader>
                <v-divider></v-divider>
                <v-skeleton-loader type="text" class="my-2"></v-skeleton-loader>
                <v-skeleton-loader type="text" class="my-2"></v-skeleton-loader>

                <v-skeleton-loader type="image" class="mt-8" height="60"></v-skeleton-loader>
                <v-skeleton-loader type="image" class="my-2" height="60"></v-skeleton-loader>
            </v-col>
        </v-row>
        <v-col>
            <section class="mt-15">
                <v-skeleton-loader type="heading" class="mb-5"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
                <v-skeleton-loader type="paragraph" class="mt-2"></v-skeleton-loader>
            </section>
            <v-divider></v-divider>
        </v-col>
    </div>
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SkeletonPaginaProduto extends Vue {

}
</script>

<style>

</style>