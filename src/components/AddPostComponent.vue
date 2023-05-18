<script setup lang="ts">
import InputFieldComponent from './InputFieldComponent.vue';
import TextareaFieldComponent from './TextareaFieldComponent.vue';
</script>

<template>
  <div className="content">
    <h2>Create new post</h2>

    <form>
      <InputFieldComponent :name="'title'" :placeholder="'Post title'">
        <template #title>Title</template>
      </InputFieldComponent>

      <TextareaFieldComponent :name="'body'" :placeholder="'Post body'">
      <template #body>Write post body</template>
      </TextareaFieldComponent>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Save</button>
        </div>
        <div className="control">
          <button type="reset" className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
