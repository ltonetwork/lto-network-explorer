<script lang="ts">
  import { Doughnut, mixins } from 'vue-chartjs'
  import { Component, Mixins, Prop } from 'vue-property-decorator'
  import { ChartData, ChartOptions } from 'chart.js'

  const { reactiveProp } = mixins

  @Component({
    extends: Doughnut,
    mixins: [reactiveProp]
  })
  class DoughnutChart extends Mixins(Doughnut) {
    @Prop({ default: {} })
    chartData!: ChartData;

    @Prop({ default: {} })
    chartOptions!: ChartOptions;

    mounted(): void {
      this.renderChart(this.chartData, this.chartOptions)
    }
  }

  export default DoughnutChart
</script>
