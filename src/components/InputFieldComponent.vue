<script setup lang="ts">
const props = defineProps<{
  name: string
  placeholder: string
}>()
</script>

<template>
  <div class="field" data-cy="NameField">
    <label class="label" :for="`comment-author-name-${name}`">
      <slot name="title"></slot>
    </label>
    <div class="control has-icons-left has-icons-right">
      <input
        type="text"
        class="input is-danger"
        :name="name"
        :id="`comment-author-name-${name}`"
        :placeholder="placeholder"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-user"></i>
      </span>

      <span class="icon is-small is-right has-text-danger" data-cy="ErrorIcon">
        <i class="fas fa-exclamation-triangle"></i>
      </span>
    </div>

    <p class="help is-danger" data-cy="ErrorMessage"><slot name="errorMessage"></slot></p>
  </div>
</template>

<style></style>
