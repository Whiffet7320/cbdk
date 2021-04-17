<template>
  <div ref="rootmap" id="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
// import mapconfig from "../../mapConfig/mapconfig";
import mapConfig1 from "../../mapConfig/MapConfig1";
import TileGrid from "ol/tilegrid/TileGrid";
import TileLayer from "ol/layer/Tile";
import TileImage from "ol/source/TileImage";
// import proj4 from "proj4";
// import { addProjection } from "ol/proj";
// import Projection from "ol/proj/Projection";
import * as olControl from "ol/control";
export default {
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    // proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
    // var projection_200000 = new Projection({
    //   code: "EPSG:4490",
    //   extent: [119, 26, 123, 29],
    //   units: "degree",
    //   axisOrientation: "neu",
    //   metersPerUnit: (Math.PI * 6378137) / 180,
    //   global: false,
    //   worldExtent: [-180, -90, 180, 90],
    // });
    // addProjection(projection_200000);
    var maplayer = null;
    var layer = mapConfig1.layers[0].subLayers[0];
    //设置切片的原点
    // var origin1 = layer.origin;
    //切片的方案
    var tileGrid = new TileGrid({
      tileSize: 256,
      // origin: [-180, 90],
      resolutions: mapConfig1.resolutions,
    });
    var mapcontainer = this.$refs.rootmap;
    this.map = new Map({
      controls: olControl
        .defaults({ attribution: false, zoom: false, rotate: false })
        .extend([]),
      view: new View(mapConfig1.option.view),
      target: mapcontainer,
      renderer: "canvas",
    });
    maplayer = new TileLayer({
      source: new TileImage({
        url: layer.url,
        crossOrigin: "anonymous",
        tileGrid: tileGrid,
        // tileUrlFunction: function (tileCoord) {
        //   console.log(tileCoord);
        //   var oo = "00000000";
        //   var zz = tileCoord[0];
        //   var z = "L" + zz;
        //   var xx = tileCoord[1].toString(16);
        //   var x = "C" + oo.substring(0, 8 - xx.length) + xx;
        //   var yy = (-tileCoord[2] - 1).toString(16); //注意此处，计算方式变了
        //   var y = "R" + oo.substring(0, 8 - yy.length) + yy;
        //   return (
        //     "D:/szdt_Tiledata/szdt_CAD_lianwuqujian/yantianlayer/_alllayers/" +
        //     z +
        //     "/" +
        //     y +
        //     "/" +
        //     x +
        //     ".png"
        //   );
        // },
      }),

      visible: layer.visible,
      name: layer.caption,
      groupCaption: layer.groupCaption,
      baseMap: layer.baseMap,
      thematicMap: layer.thematicMap,
    });
    this.map.addLayer(maplayer);
  },
};
</script>

  <style>
#map {
  height: 400px;
  width: 100%;
}
</style>