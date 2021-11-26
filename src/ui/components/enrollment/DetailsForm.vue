<template>
  <ProfilePic v-model="value.picture" :profilePic="value.profilePic" />
  <form action="" method="post" class="enrollment-form">
    <BaseField
      class="half"
      v-model="value.name"
      type="text"
      label="Nombre:"
      placeholder="Nombres"
    />
    <BaseField
      class="half"
      v-model="value.lastname"
      type="text"
      placeholder="Apellidos"
    />
    <BaseField
      class="half"
      v-model="value.address"
      type="text"
      label="Dirección:"
      placeholder="Dirección"
    />
    <BaseField
      class="half"
      v-model="value.city"
      type="text"
      label="Ciudad:"
      placeholder="Ciudad"
    />
    <BaseField
      class="all"
      v-model="value.whatsapp"
      type="number"
      label="Whatsapp:"
      placeholder="Whatsapp"
    />
  </form>
  <BaseButton
    text="Confirmar"
    :isSmall="true"
    :dark="true"
    @click="confirmEnroll"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import ProfilePic from "@/ui/components/enrollment/ProfilePicture.vue";
import BaseField from "@/ui/components/common/BaseField.vue";
import BaseButton from "@/ui/components/common/BaseButton.vue";
import { PropType } from "vue";
import { DetailsData } from "@/domain/interfaces/enrollment";

export default defineComponent({
  name: "DetailsForm",
  components: {
    ProfilePic,
    BaseField,
    BaseButton,
  },
  props: {
    modelValue: {
      type: Object as PropType<DetailsData>,
      required: true,
    },
    staff: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "confirmEnroll"],
  computed: {
    value: {
      get(): DetailsData {
        return this.modelValue;
      },
      set(value: DetailsData): void {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    confirmEnroll(): void {
      this.$emit("confirmEnroll");
    },
  },
});
</script>

<style scoped>
.enrollment-form {
  margin-bottom: 2rem;
  font-size: 1rem;
  width: 100%;
  text-align: start;
  align-items: end;
  grid-template-columns: repeat(6, calc(16.66% - 1em));
  column-gap: 1.2em;
  row-gap: 1em;
  display: grid;
}

.two.columns {
  grid-column: span 2;
}

.three.columns {
  grid-column: span 3;
}

.four.columns {
  grid-column: span 4;
}

.five.columns {
  grid-column: span 5;
}

.six.columns {
  grid-column: span 6;
}

.seven.columns {
  grid-column: span 7;
}

.eight.columns {
  grid-column: span 8;
}

.nine.columns {
  grid-column: span 9;
}

.half.columns {
  grid-column: span 3;
}

.all.columns {
  grid-column: span 6;
}
</style>
