<template>
  <component :is="icon" :strokeWidth="strokeWidth" :spin="spin" :size="size" :strokeLinecap="strokeLinecap" :strokeLinejoin="strokeLinejoin"></component>
</template>
<script>
export default {
  name: 't-icon',
  props: {
    icon: {
      type: String,
      default: ''
    },
    strokeWidth: {
      type: Number,
      default: 2
    },
    spin: {
      type: Boolean,
      default: false
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    strokeLinejoin: {
      type: String,
      default: 'miter'
    },
    size: {
      type: [Number, String],
      default: ''
    }
  }
}
</script>
