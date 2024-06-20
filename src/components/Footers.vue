<template>
    <div class="footer flex gap-4">
        <div v-for="rt in information" :key="rt.path" class="cursor-pointer">
            <router-link :to="rt.path">{{ rt.meta.title }}</router-link>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { information } from '@/router/routes'
</script>
<style></style>