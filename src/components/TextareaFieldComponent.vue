<script setup lang="ts">
const props = defineProps<{
  name: string
  placeholder: string
}>()
</script>

<template>
  <div class="field" data-cy="BodyField">
    <label class="label" :for="`comment-${name}`"> <slot name="body"></slot> </label>
    <div class="control">
      <textarea
        :id="`comment-${name}`"
        :name="name"
        :placeholder="placeholder"
        class="textarea is-danger"
      ></textarea>
    </div>

    <p class="help is-danger" data-cy="ErrorMessage"><slot name="errorMessage"></slot></p>
  </div>
</template>

<style lang="scss" scoped></style>
