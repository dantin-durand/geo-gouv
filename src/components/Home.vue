<template>
  <ion-header translucent> </ion-header>
  <ion-content :fullscreen="true">
    <div id="container-home">
      <ion-grid>
        <h3 class="ion-margin ion-padding-bottom ion-text-center">
          Recherchez les communes, départements et régions de France.
        </h3>
        <ion-row class="ion-margin-start ion-margin-end">
          <ion-col>
            <ion-card class="ion-no-margin" id="inhabitant">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="man" class="icon-title-card" />

                <h1 class="ion-margin-bottom">
                  <b>{{ inhabitants.toLocaleString() }}</b>
                </h1>
                <h2>Habitants</h2>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-start ion-margin-end">
          <ion-col>
            <ion-card class="ion-no-margin" id="region">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="map" class="icon-title-card" />

                <h1 class="ion-margin-bottom">
                  <b>{{ regionCount.length.toLocaleString() }}</b>
                </h1>
                <h2>Régions</h2>
              </ion-card-content>
            </ion-card>
          </ion-col>
          <ion-col>
            <ion-card class="ion-no-margin" id="department">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="flag" class="icon-title-card" />

                <h1 class="ion-margin-bottom">
                  <b>{{ departmentCout.length.toLocaleString() }}</b>
                </h1>
                <h2>départements</h2>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row class="ion-margin-start ion-margin-end">
          <ion-col>
            <ion-card class="ion-no-margin" id="town">
              <ion-card-content class="ion-text-center">
                <ion-icon :icon="location" class="icon-title-card" />

                <h1 class="ion-margin-bottom">
                  <b>{{ townCout.length.toLocaleString() }}</b>
                </h1>
                <h2>Communes</h2>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </div>
  </ion-content>
</template>

<script>
import {
  IonHeader,
  IonContent,
  IonGrid,
  IonRow,
  IonCard,
  IonCardContent,
  IonIcon,
  IonCol,
} from "@ionic/vue";
import { location, flag, map, man } from "ionicons/icons";
import axios from "axios";

export default {
  name: "HomeBody",
  components: {
    IonHeader,
    IonContent,
    IonGrid,
    IonRow,
    IonCard,
    IonCardContent,
    IonIcon,
    IonCol,
  },
  data() {
    return {
      regionCount: "",
      departmentCout: [],
      townCout: [],
      inhabitants: 0,
    };
  },
  mounted() {
    axios
      .get(`https://geo.api.gouv.fr/regions`)
      .then((response) => {
        this.regionCount = response.data;
        for (const key in response.data) {
          axios
            .get(
              `https://geo.api.gouv.fr/regions/${response.data[key].code}/departements`
            )
            .then((response) => {
              for (const key in response.data) {
                this.departmentCout.push(key);
                axios
                  .get(
                    `https://geo.api.gouv.fr/departements/${response.data[key].code}/communes?fields=population`
                  )
                  .then((response) => {
                    for (const key in response.data) {
                      if (response.data[key].population) {
                        this.inhabitants =
                          this.inhabitants +
                          Number(response.data[key].population);
                      }
                      this.townCout.push(key);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    subtmitTown() {},
  },
  setup() {
    return {
      location,
      flag,
      map,
      man,
    };
  },
};
</script>
<style>
.icon-title-card {
  font-size: 40px;
}
#region {
  --color: #eef1f8;
  --background: linear-gradient(to top, #4481eb 0%, #04befe 100%);
}
#department {
  --color: #e5f3ea;
  --background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
}

#town {
  --color: #fff2e8;
  --background: linear-gradient(to right, #f99923 0%, #ff4e50 100%);
}
#inhabitant {
  --color: #fff0ef;
  --background: linear-gradient(
    to right,
    #f78ca0 0%,
    #f9748f 19%,
    #fd868c 60%,
    #fe9a8b 100%
  );
}
#container-home {
  height: calc(100vh - 50px);
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
}
</style>