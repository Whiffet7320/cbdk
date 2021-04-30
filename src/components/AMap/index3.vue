<script>
import classic from '@/map/libs/SuperMap-8.1.1-14426'
var layer;
export default {
  name: "app",
  data() {
    return {
      map: null
    };
  },
  methods: {
    initMap() {
      this.map = new SuperMap.Map("map");
      var url = "//localhost:8091/iserver/services/map-world/rest/maps/World";
      layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, {
        maxResolution: "auto"
      });
      layer.events.on({ layerInitialized: this.addLayer });
    },
    addLayer() {
      this.map.addLayers([layer]);
      this.map.setCenter(new SuperMap.LonLat(0, 0), 0);
    }
  },
  mounted() {
    this.initMap();
  }
};
</script>