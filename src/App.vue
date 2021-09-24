<template>
  <div class="app">模版--基于vue、webpack构建umd组件 {{ testData }}</div>
</template>

<script>
export default {
  components: {},
  props: {
    testData: {
      type: String,
      default: '',
    },
  },
  mixins: [],
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>

<style scoped src="./assets/css/app.scss" lang="scss"></style>
