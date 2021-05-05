<template>
  <div>
    <div ref="rootmap" id="map"></div>
    <div id="popup" class="ol-popup">
      <a
        href="#"
        @click="closeBtn"
        id="popup-closer"
        class="ol-popup-closer"
      ></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import proj4 from "proj4";
import mapConfig1 from "../../mapConfig/MapConfig1";
import TileGrid from "ol/tilegrid/TileGrid";
import Tile from "ol/layer/Tile";
import TileImage from "ol/source/TileImage";
import TileWMS from "ol/source/TileWMS";
import { addProjection } from "ol/proj";
import Projection from "ol/proj/Projection";
import * as olControl from "ol/control";
import Overlay from "ol/Overlay";
// import Feature from "ol/Feature";
// import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
import GeoJSON from "ol/format/GeoJSON";
import Select from "ol/interaction/Select";
// import { toLonLat } from "ol/proj";
// import { toStringHDMS } from "ol/coordinate";
import { SuperMap } from "@supermap/iclient-classic";

export default {
  data() {
    return {
      map: null,
      fields: [
        { field: "cbjgmc", alias: "储备机构名称" },
        { field: "dkmc", alias: "地块名称" },
        { field: "dkdzbh", alias: "地块电子编号" },
        { field: "nscdkbh", alias: "拟收储地块编号" },
        { field: "dkbh", alias: "地块编号" },
        { field: "rksj", alias: "入库时间" },
        { field: "szxzq", alias: "所在行政区" },
        { field: "szjd", alias: "所在街道" },
        { field: "dkzl", alias: "地块坐落" },
        { field: "dkmj", alias: "地块面积" },
        { field: "nscmj", alias: "拟收储地块面积" },
        { field: "zjmj", alias: "在库面积" },
        { field: "sfjxbdcdj", alias: "是否进行不动产登记" },
        { field: "bdcqr", alias: "不动产权人" },
        { field: "bdcqzsh", alias: "不动产权证书号" },
        { field: "zzmj", alias: "证载面积" },
        { field: "ghyt", alias: "规划用途" },
        { field: "zzydmj", alias: "住宅用地面积" },
        { field: "sfydmj", alias: "商服用地面积" },
        { field: "qtydmj", alias: "其他用地面积" },
        { field: "dswqk", alias: "地上物情况" },
        { field: "dswqksm", alias: "地上物情况说明" },
        { field: "qqkfqk", alias: "前期开发情况" },
        { field: "rksjhghfs", alias: "入库时计划管护方式" },
        { field: "rksjhlyfs", alias: "入库时计划利用方式" },
        { field: "qdfs", alias: "取得方式" },
        { field: "nfcr", alias: "能否出让" },
        { field: "bncrbmyy", alias: "不能出让标明原因" },
        { field: "crjh", alias: "出让计划" },
        { field: "fjyxydlx", alias: "非经营性用地类型" },
        { field: "zdwwc", alias: "做地未完成" },
        { field: "ylsly", alias: "有临时利用" },
        { field: "sydk", alias: "商业地块" },
        { field: "zzdkbncrdyy", alias: "住宅地块不能出让的原因" },
        { field: "zt", alias: "状态" },
        { field: "bz", alias: "备注" },
        { field: "cjsj", alias: "记录创建时间" },
        { field: "lmdj", alias: "楼面地价" },
        { field: "jzdj", alias: "基准地价" },
        { field: "czr", alias: "操作人" },
      ],
    };
  },
  mounted() {
    // console.log(new SuperMap.Format.GeoJSON());
    this.initMap();
    this.loadData();
    this.bindEvent();
  },
  methods: {
    closeBtn() {
      this._overlay.setPosition(undefined);
      document.getElementById("popup-closer").blur();
      return false;
    },
    initMap() {
      proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
      var projection_200000 = new Projection({
        code: "EPSG:4490",
        extent: [119, 26, 123, 29],
        units: "degree",
        axisOrientation: "neu",
        metersPerUnit: (Math.PI * 6378137) / 180,
        global: false,
        worldExtent: [-180, -90, 180, 90],
      });
      addProjection(projection_200000);
      var view = {
        ...mapConfig1.option.view,
        projection: projection_200000,
      };
      this._overlay = new Overlay({
        element: document.getElementById("popup"),
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });
      this.map = new Map({
        controls: olControl
          .defaults({ attribution: false, zoom: false, rotate: false })
          .extend([]),
        view: new View(view),
        target: "map",
        renderer: "canvas",
      });
      this._selectSingleClick = new Select();
      this.map.addInteraction(this._selectSingleClick);
      this.map.addOverlay(this._overlay);
      // var content = document.getElementById("popup-content");
      var maplayer = null;
      mapConfig1.layers.forEach((ele) => {
        if (ele.subLayers[0].layerType == "TileXYZ") {
          //设置切片的原点
          var origin1 = ele.subLayers[0].origin;
          //切片的方案
          var tileGrid = new TileGrid({
            tileSize: 256,
            origin: origin1,
            resolutions: mapConfig1.resolutions,
          });
          maplayer = new Tile({
            id: ele.subLayers[0].id,
            source: new TileImage({
              url: ele.subLayers[0].url,
              crossOrigin: "anonymous",
              tileGrid: tileGrid,
            }),

            visible: ele.subLayers[0].visible,
            name: ele.subLayers[0].caption,
            groupCaption: ele.subLayers[0].groupCaption,
            baseMap: ele.subLayers[0].baseMap,
            thematicMap: ele.subLayers[0].thematicMap,
          });
          this.map.addLayer(maplayer);
        } else if (ele.subLayers[0].layerType == "WMS") {
          maplayer = new Tile({
            id: ele.subLayers[0].id,
            source: new TileWMS({
              url: ele.subLayers[0].url,
              params: ele.subLayers[0].params,
            }),
            visible: ele.subLayers[0].visible,
            name: ele.subLayers[0].caption,
            opacity: ele.subLayers[0].opacity,
            groupCaption: ele.subLayers[0].groupCaption,
            baseMap: ele.subLayers[0].baseMap,
            thematicMap: ele.subLayers[0].thematicMap,
            layerType: "WMS",
            queryUrl: ele.subLayers[0].queryUrl,
          });
          if (
            ele.subLayers[0].opacity !== undefined &&
            typeof ele.subLayers[0].opacity === "number"
          ) {
            maplayer.setOpacity(ele.subLayers[0].opacity);
          }
          this.map.addLayer(maplayer);
        }
      });
    },
    loadData() {
      var me = this;
      this._vetorLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
        style: function (e) {
          var pp = e.getProperties();
          var css = [];
          var line_color, fill_color;
          if (pp.zt != null && pp.zt != undefined && pp.zt != "") {
            if (pp.zt == "在库") {
              line_color = "#b8b95c";
              fill_color = "#b8b95c";
            } else if (pp.zt == "部分出库") {
              line_color = "#ff9966";
              fill_color = "#ff9966";
            } else if (pp.zt == "已出库") {
              line_color = "#00ffff";
              fill_color = "#00ffff";
            }
          } else {
            line_color = "#a0a4a8";
            fill_color = "#a0a4a8";
          }
          css.push(
            new Style({
              stroke: new Stroke({
                color: line_color,
                width: 1,
              }),
              fill: new Fill({
                color: fill_color,
              }),
            })
          );
          return css;
        },
      });
      this.map.addLayer(this._vetorLayer);
      var count = 0;
      var filter = "";
      var _where = "";
      var rksjEndTime = "";
      var rksjStartTime = "";
      for (var key in this.where) {
        if (key == "szxzq") {
          if (this.where[key] != "") {
            count++;
            var xzq = this.where[key].split(",");
            if (xzq.length > 1) {
              _where += "<Or>";
              for (var i = 0; i < xzq.length; i++) {
                _where +=
                  "<PropertyIsEqualTo>" +
                  "<PropertyName>" +
                  key +
                  "</PropertyName>" +
                  "<Literal>" +
                  xzq[i] +
                  "</Literal>" +
                  "</PropertyIsEqualTo > ";
              }
              _where += "</Or>";
            } else {
              _where +=
                "<PropertyIsEqualTo>" +
                "<PropertyName>" +
                key +
                "</PropertyName>" +
                "<Literal>" +
                this.where[key] +
                "</Literal>" +
                "</PropertyIsEqualTo > ";
            }
          }
        } else if (key == "endTime") {
          if (this.where[key] != "") {
            rksjEndTime = this.where[key];
          }
        } else if (key == "startTime") {
          if (this.where[key] != "") {
            rksjStartTime = this.where[key];
          }
        } else {
          if (this.where[key] != null && this.where[key] != "") {
            count++;
            _where +=
              "<PropertyIsEqualTo>" +
              "<PropertyName>" +
              key +
              "</PropertyName>" +
              "<Literal>" +
              this.where[key] +
              "</Literal>" +
              "</PropertyIsEqualTo > ";
          }
        }
      }
      if (count == 1) {
        filter += "<Filter>" + _where + "</Filter>";
      } else if (count > 1) {
        filter += "<Filter><And>" + _where + "</And></Filter>";
      }
      this.$myAxios({
        url:
          "http://192.168.1.131:8090/iserver/services/data-cbdk/wfs100/utf-8?service=wfs&version=1.1.0&request=GetFeature&TYPENAME=cbdk:cbdk_jbxx",
        method: "post",
        data: "filter=" + filter,
      }).then((data) => {
        var gml = new SuperMap.Format.GML().read(data.data);
        console.log(gml);
        var geoJsonString = new SuperMap.Format.GeoJSON().write(gml, false);
        data = JSON.parse(geoJsonString);
        console.log(data);
        var _data = { features: [], type: "FeatureCollection" };

        if (rksjStartTime != "" && rksjEndTime != "") {
          for (var i = 0; i < data.features.length; i++) {
            if (
              data.features[i].properties.data.rksj != undefined &&
              data.features[i].properties.data.rksj.split("T")[0] >=
                rksjStartTime &&
              data.features[i].properties.data.rksj.split("T")[0] <= rksjEndTime
            ) {
              _data.features.push(data.features[i]);
            }
          }
          if (_data.features.length > 0) {
            var features = new GeoJSON().readFeatures(_data);
            me._vetorLayer.getSource().addFeatures(features);
          }
        } else if (rksjStartTime != "" && rksjEndTime == "") {
          for (var a = 0; a < data.features.length; a++) {
            if (
              data.features[a].properties.data.rksj != undefined &&
              data.features[a].properties.data.rksj.split("T")[0] >=
                rksjStartTime
            ) {
              _data.features.push(data.features[a]);
            }
          }
          if (_data.features.length > 0) {
            var features1 = new GeoJSON().readFeatures(_data);
            me._vetorLayer.getSource().addFeatures(features1);
          }
        } else if (rksjStartTime == "" && rksjEndTime != "") {
          for (var b = 0; b < data.features.length; b++) {
            if (
              data.features[b].properties.data.rksj != undefined &&
              data.features[b].properties.data.rksj.split("T")[0] <= rksjEndTime
            ) {
              _data.features.push(data.features[b]);
            }
          }
          if (_data.features.length > 0) {
            var features2 = new GeoJSON().readFeatures(_data);
            me._vetorLayer.getSource().addFeatures(features2);
          }
        } else {
          var features3 = new GeoJSON().readFeatures(data);
          me._vetorLayer.getSource().addFeatures(features3);
        }
      });
    },
    bindEvent() {
      var me = this;
      this._selectSingleClick.on(
        "select",
        function (evt) {
          //要素选中事件
          console.log(evt);
          var features = evt.target.getFeatures().getArray();
          var coordinates = evt.mapBrowserEvent.coordinate;
          var content = document.getElementById("popup-content");
          content.innerHTML = "";
          if (features.length > 0) {
            var properties = features[0].getProperties();
            for (var i = 0; i < this.fields.length; i++) {
              // console.log(properties)
              content.innerHTML +=
                "<b>" +
                this.fields[i].alias +
                ":</b><span>" +
                (properties[this.fields[i].field] || "") +
                "</span><br/>";
            }
            me._overlay.setPosition(coordinates);
          } else {
            me._overlay.setPosition(undefined);

            document.getElementById("popup-closer").blur();
          }
        }.bind(this)
      );

      //   if (this._overlay !== null) {
      //     on(
      //       dojo.byId("popup-closer"),
      //       "click",
      //       function () {
      //         this._overlay.setPosition(undefined);
      //         this._selectSingleClick.getFeatures().clear();
      //         dojo.byId("popup-closer").blur();
      //         return false;
      //       }.bind(this)
      //     );
      //   }
    },
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 400px;
}
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
