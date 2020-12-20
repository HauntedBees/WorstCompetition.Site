<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3" order="2">
        <v-sheet shaped min-height="268" class="px-4 py-2">
          <h4>Leaderboards for {{$dayjs().format("MMM Do")}}</h4>
          <ol>
            <li v-for="user in leaderboards" :key="user.ID">
              <router-link :to="'/users/' + user.ID"></router-link>{{user.Name}} ({{user.Score}})
            </li>
          </ol>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="7" order="3">
        <v-sheet rounded="lg" min-height="70vh">
          <div v-if="loggedIn" class="px-5 py-3">
            <p v-if="user.newUser">
              Welcome, {{user.name}}. Make your first action count!
            </p>
            <p v-if="!user.newUser">
              Welcome back, {{user.name}}. Today, your score 
              <span v-if="user.delta > 0">increased by {{user.delta}}!</span>
              <span v-if="user.delta < 0">decreased by {{user.delta}}!</span>
              <span v-if="user.delta === 0">did not change!</span>
            </p>
            <v-container>
              <v-row>
                <v-col v-for="action in actions" :key="action.ID">
                  <v-card style="min-width: 240px; min-height: 180px" color="accent" elevation="2">
                    <div :class="'corner ' + action.Type"><v-icon>mdi-{{typeIconXref[action.Type]}}</v-icon></div>
                    <v-card-title class="justify-center pb-1 pt-2">
                      {{$t(`a_${action.ID}_name`)}}
                    </v-card-title>
                    <v-card-title class="justify-center my-0 py-0 pb-2">
                      <v-icon x-large>mdi-{{action.Icon}}</v-icon>
                    </v-card-title>
                    <v-card-text>{{$t(`a_${action.ID}_desc`)}}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </div>
          <div v-if="!loggedIn" class="px-5 py-2">
            <h2>Welcome to <strong>The Worst Competition</strong></h2>
            <p class="pt-2">
              Are you motivated by having a bigger number next to your name than other people, regardless of 
              the actual work involved to raise that number or any other context? If so, Being Really Bad At 
              Golf may be the game for you, but if that's too much effort, then welcome to The Worst Competition!
            </p>
            <p>
              The goal of The Worst Competition is simple: have the highest score. Every day, each player has 
              the choice to take an action. At the end of that day, everyone's score changes based on those 
              actions. What kind of actions, you ask? Incredibly silly ones, like "raise my score by 10 points"
              or "lower the score of anyone who chose 'raise my score by 10 points' by 12 points" or "lower the 
              score of anyone in the Top 10 leaderboards by 20 points." At the end of the day, you probably 
              won't deserve your score, but if it's better than your friends' scores, who cares? You're winning!
            </p>
            <p>
              So if you want to join the fun, <strong>sign up</strong> or <strong>log in</strong> for your chance
              to have a bigger number next to your name than anyone else!
            </p>
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
  .corner {
    border-right: 50px solid transparent;
    border-left: 50px solid;
    border-bottom: 50px solid transparent;
    height: 0;
    width: 0;
    position: absolute;
    left: 0;
    z-index: 2;
    & > .v-icon {
      margin-left: -48px;
      margin-top: 4px;
    }
  }
  .corner.gain { border-left-color: rgb(80, 140, 60) }
  .corner.defense { border-left-color: rgb(80, 90, 160) }
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Home extends Vue {
  loggedIn = true;
  user = {
    name: "Jeff", delta: 10, newUser: false
  };
  leaderboards = [
    { Name: "Jeff", Score: 12, Emoji: "XD", ID: 12 }
  ];
  typeIconXref = {
    "gain": "arrow-up-thick",
    "defense": "shield"
  };
  actions = [
    { ID: "coll", Icon: "account-group", Type: "gain" },
    { ID: "bost", Icon: "gold", Type: "gain" },
    { ID: "hold", Icon: "pause-circle", Type: "defense" },
    { ID: "avrg", Icon: "equalizer" },
    { ID: "down", Icon: "trending-down" },
    { ID: "rise", Icon: "trending-up" },
    { ID: "cntr", Icon: "knife-military", Type: "defense" },
    { ID: "boom", Icon: "boomerang" },
    { ID: "dice", Icon: "dice-multiple" },
    { ID: "hart", Icon: "heart", Type: "gain" },
    { ID: "rand", Icon: "arrow-decision" },
    { ID: "bnki", Icon: "bank-transfer-in" },
    { ID: "bnko", Icon: "bank-transfer-out" },
    { ID: "bnkx", Icon: "bank-off" }
  ];
}
</script>
