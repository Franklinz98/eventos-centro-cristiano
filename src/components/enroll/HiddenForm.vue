<template>
  <form
    method="post"
    action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
    ref="donation-form"
  >
    <input name="merchantId" type="hidden" :value="payload.merchantId" />
    <input name="accountId" type="hidden" :value="payload.accountId" />
    <input name="description" type="hidden" :value="payload.description" />
    <input name="referenceCode" type="hidden" :value="payload.referenceCode" />
    <input name="amount" type="hidden" :value="payload.amount" />
    <input name="tax" type="hidden" :value="payload.tax" />
    <input name="taxReturnBase" type="hidden" :value="payload.taxReturnBase" />
    <input name="currency" type="hidden" :value="payload.currency" />
    <input name="signature" type="hidden" :value="payload.signature" />
    <input name="test" type="hidden" :value="payload.test" />
    <input name="buyerFullName" type="hidden" :value="payload.buyerFullName" />
    <input name="buyerEmail" type="hidden" :value="payload.buyerEmail" />
    <input name="buyerDocument" type="hidden" :value="payload.buyerDocument" />
    <input name="buyerCountry" type="hidden" :value="payload.country" />
    <input name="lng" type="hidden" :value="payload.language" />
    <input name="responseUrl" type="hidden" :value="payload.responseUrl" />
    <input
      name="confirmationUrl"
      type="hidden"
      :value="payload.confirmationUrl"
    />
  </form>
</template>

<script lang="ts">
import { PayUBody } from "@/models/enrollment";
import { defineComponent, nextTick, PropType } from "vue";

export default defineComponent({
  name: "HiddenDonationForm",
  props: {
    payload: {
      type: Object as PropType<PayUBody>,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    sumbitForm(): void {
      console.log(this.payload);
      const form = this.$refs["donation-form"] as HTMLFormElement;
      nextTick(() => {
        if (this.payload.referenceCode) {
          form.submit();
        }
      });
    },
  },
});
</script>
