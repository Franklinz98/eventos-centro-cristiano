<template>
  <ProfilePic v-model="value.picture" :profilePic="value.profilePic" />
  <BaseButton
    text="Subir"
    :isSmall="true"
    :dark="true"
    :disabled="v$.$invalid"
    @click="uploadPhoto"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ProfilePic from "@/ui/components/enrollment/ProfilePicture.vue";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import { PropType } from "vue";
import { PhotoData } from "@/domain/interfaces/enrollment";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default defineComponent({
  name: "DetailsForm",
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    ProfilePic,
    BaseButton,
  },
  props: {
    modelValue: {
      type: Object as PropType<PhotoData>,
      required: true,
    },
  },
  emits: ["update:modelValue", "uploadPhoto"],
  computed: {
    value: {
      get(): PhotoData {
        return this.modelValue;
      },
      set(value: PhotoData): void {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    uploadPhoto(): void {
      this.$emit("uploadPhoto");
    },
  },
  validations() {
    return {
      value: {
        picture: { required },
      },
    };
  },
});
</script>

<style scoped></style>
