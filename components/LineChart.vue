<script>
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    chartOptions: {
      type: Object,
      default: null
    }
  },
  watch: {
    data () {
      this._chart.destroy()
      // this.renderChart(this.data, this.options);
      this.renderLineChart()
    }
  },
  mounted () {
    this.renderLineChart()
  },
  methods: {
    renderLineChart () {
      this.renderChart(this.chartData, this.chartOptions)
    }
  }
}
</script>
