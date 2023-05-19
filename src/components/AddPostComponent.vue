<script setup lang="ts">
defineEmits(['close'])
</script>

<template>
  <div className="content">
    <h2>Create new post</h2>

    <form>
      <div class="field">
        <label class="label" for="`comment-author-name-${name}`" />
        <div class="control has-icons-left has-icons-right">
          <input
            type="text"
            class="input is-danger"
            name="name"
            id="`comment-author-name-${name}`"
            placeholder="Post title"
          />
          <span class="icon is-small is-left">
            <i class="fas fa-user"></i>
          </span>

          <span class="icon is-small is-right has-text-danger" data-cy="ErrorIcon">
            <i class="fas fa-exclamation-triangle"></i>
          </span>
        </div>

        <p class="help is-danger" data-cy="ErrorMessage">error</p>
      </div>

      <div class="field">
        <label class="label" for="comment-body" />
        <div class="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Post body"
            class="textarea is-danger"
          ></textarea>
        </div>

        <p class="help is-danger" data-cy="ErrorMessage">error</p>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button type="submit" className="button is-link">Save</button>
        </div>

        <div className="control">
          <button @click="$emit('close')" type="reset" className="button is-link is-light">
            Cancel
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
