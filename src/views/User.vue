<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" order="2">
        left
      </v-col>
      <v-col cols="12" sm="7" order="3">
        <v-sheet rounded="lg" min-height="70vh">
          <div class="px-5 py-3">
            <canvas id="userchart"></canvas>
            <div class="py-2 text-center">
              <emoji :emoji="userInfo.emoji" />
              <div class="emoji-side px-3">{{userInfo.name}}</div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip v-bind="attrs" v-on="on" :color="badgecolor">Rank #{{userInfo.rank}}</v-chip>
                </template>
                <span>Top {{userInfo.percentile}}%</span>
              </v-tooltip>
            </div>
            <v-calendar type="month" :weekdays="[0,1,2,3,4,5,6]">
              <template v-slot:day="{date}">
                <v-sheet color="#00000000" class="fill-height text-center pb-2" v-if="userInfo.calendardata[date]">
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip small v-bind="attrs" v-on="on" :color="badgecolor">Rank #{{userInfo.calendardata[date].rank}}</v-chip>
                    </template>
                    <span>Top {{userInfo.calendardata[date].percentile}}%</span>
                  </v-tooltip>
                  <v-tooltip bottom v-if="userInfo.calendardata[date].action !== ''">
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon v-bind="attrs" v-on="on">mdi-{{actions[userInfo.calendardata[date].action].Icon}}</v-icon>
                    </template>
                    <span>{{$t(`a_${userInfo.calendardata[date].action}_name`)}}</span>
                  </v-tooltip>
                </v-sheet>
              </template>
            </v-calendar>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="2" order="1" order-md="4">
        right
      </v-col>
    </v-row>
  </v-container>
</template>
<style lang="scss">
.emoji { vertical-align: middle }
.emoji-side {
  display: inline-block;
  height: 32px;
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Chart from 'chart.js';
import { Actions } from 'src/data/actions';
@Component
export default class User extends Vue {
  actions = Actions;
  userInfo = {
    emoji: "1F476",
    name: "Fart Pete",
    rank: 19,
    percentile: 25,
    calendardata: {
      "2020-12-16": { action: "gamb", rank: 10, percentile: 15 }
    },
    chartdata: [
      { date: "Jan 1", score: 100, rank: 15, action: "gamb" },
      { date: "Jan 2", score: 10, rank: 32, action: "gamb" },
      { date: "Jan 3", score: 153, rank: 10, action: "" },
      { date: "Jan 4", score: 153, rank: 12, action: "" },
      { date: "Jan 5", score: 1530, rank: 3, action: "" },
      { date: "Jan 6", score: 0, rank: 60, action: "gamb" },
      { date: "Jan 7", score: 100, rank: 19, action: "" }
    ]
  }
  get badgecolor() { return this.GetBadgeColorInner(this.userInfo.rank, this.userInfo.percentile); }
  GetBadgeColor(event: any) {
    return this.GetBadgeColorInner(event.rank, event.percentile);
  }
  GetBadgeColorInner(rank: number, percentile: number) {
    if(rank === 1) {
      return "success";
    } else if(percentile <= 10) {
      return "primary";
    } else if(percentile <= 25) {
      return "secondary";
    } else if(percentile <= 50) {
      return "accent";
    }
    return "error";
  }
  mounted() {
    const canvas = document.getElementById("userchart") as HTMLCanvasElement;
    if(canvas === null) { return; }
    const ctx = canvas.getContext("2d");
    if(ctx === null) { return; }
    const chartset = {
      labels: [] as string[],
      datasets: [
        { label: this.$t("score").toString(), fill: false, backgroundColor: "#00ACC1", borderColor: "#00ACC1", data: [] as number[], yAxisID: "y1" },
        { label: this.$t("rank").toString(), fill: false, backgroundColor: "#81C784", borderColor: "#81C784", data: [] as number[], yAxisID: "y2" },
        { label: this.$t("action").toString(), backgroundColor: "#99999944", data: [] as number[], yAxisID: "y3", pointRadius: 0, lineTension: 0 }
      ]
    };
    this.userInfo.chartdata.forEach(f => {
      chartset.labels.push(f.date);
      chartset.datasets[0].data.push(f.score);
      chartset.datasets[1].data.push(f.rank);
      chartset.datasets[2].data.push(f.action === "" ? 1 : 0);
    });
    new Chart(ctx, { type: "line", data: chartset, options: {
      scales: {
        yAxes: [
          { type: "linear", display: true, position: "left", id: "y1" },
          { type: "linear", display: true, position: "right", id: "y2", gridLines: { drawOnChartArea: false } },
          { type: "linear", display: false, id: "y3", gridLines: { drawOnChartArea: false } }
        ]
      },
      tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem, data) => {
            if(data.datasets === undefined || tooltipItem.datasetIndex === undefined) { return ""; }
            const label = data.datasets[tooltipItem.datasetIndex].label || "";
            if(label === this.$t("action").toString()) {
              let key = "t_no-action";
              if(tooltipItem.yLabel !== 1) {
                const item = this.userInfo.chartdata[tooltipItem.index || 0];
                key = item.action ? `a_${item.action}_name` : "t_un-action";
              }
              return this.$t(key).toString();
            } else {
              return label + ": " + tooltipItem.yLabel;
            }
          }
        }
      }
    } });
  }
}
</script>