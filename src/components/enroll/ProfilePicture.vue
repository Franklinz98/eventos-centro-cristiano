<template>
  <div class="pic-cnt">
    <div class="profile-pic">
      <img
        :src="pictureUrl"
        alt="Foto de Perfil"
        class="user-avatar"
        @click="handleImageAction"
        v-if="pictureUrl"
      />
      <div
        class="user-avatar pic-placeholder"
        @click="handleImageAction"
        v-else
      >
        <i class="las la-user-plus"></i>
      </div>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        ref="file"
        @change="onFileChange"
        hidden
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ImageManager from "@/controllers/media-manager";
import { SelectionState } from "@/models/common";
import PopUpMessage, { NotificationType } from "@/models/popup";
export default defineComponent({
  name: "ProfilePic",
  props: {
    modelValue: {
      type: File,
    },
    profilePic: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedUrl: "",
    };
  },
  emits: ["update:modelValue"],
  methods: {
    handleImageAction() {
      const input = this.$refs.file as HTMLInputElement;
      input.click();
    },
    onFileChange(event: Event) {
      const input = event.target as HTMLInputElement;
      const state = ImageManager.checkFile(input);
      const selection = ImageManager.getFile(input.files, state);
      if (state && state != SelectionState.Image) {
        var popUp = new PopUpMessage({
          title: "Error con el archivo",
          message: ImageManager.getMediaErrorMessage(),
          type: NotificationType.Error,
        });
        popUp.show();
        input.value = input.defaultValue;
        selection.url = this.profilePic;
      }
      this.value = selection.file;
      this.selectedUrl = selection.url;
    },
  },
  computed: {
    value: {
      get(): File | undefined {
        return this.modelValue;
      },
      set(value: File | undefined): void {
        this.$emit("update:modelValue", value);
      },
    },
    pictureUrl(): string {
      return this.selectedUrl ? this.selectedUrl : this.profilePic;
    },
  },
});
</script>

<style scoped>
.pic-cnt {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-pic {
  text-align: center;
}
.user-avatar {
  --avatar-size: 15rem;
  cursor: pointer;
  object-fit: cover;
  margin: 0 auto 2rem;
  display: block;
}

.user-avatar.pic-placeholder {
  background: var(--c-concrete);
  align-items: center;
  justify-content: center;
  display: flex;
}

.user-avatar.pic-placeholder > .las {
  color: var(--c-mid-gray);
  font-size: 4rem;
}
@media only screen and (min-width: 1280px) {
  .user-avatar {
    --avatar-size: 12rem;
  }
}
</style>
