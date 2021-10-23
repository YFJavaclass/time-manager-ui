<template>
  <div class="dashboard-editor-container">
    <time-group @handleSetLineChartData="handleSetLineChartData" />
  </div>
</template>

<script>
import TimeGroup from '@/views/dashboard/TimeGroup'
export default {
  name: 'Index',
  components: {
    TimeGroup,
  },
  data() {
    return {

    }
  },
  methods: {
    handleSetLineChartData(type) {

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
