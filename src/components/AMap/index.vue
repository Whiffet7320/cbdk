<template>
  <div>
    <div ref="rootmap" id="map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import proj4 from "proj4";
import mapConfig1 from "../../mapConfig/MapConfig";
import TileGrid from "ol/tilegrid/TileGrid";
import Tile from "ol/layer/Tile";
import TileImage from "ol/source/TileImage";
import TileWMS from "ol/source/TileWMS";
import { addProjection } from "ol/proj";
import Projection from "ol/proj/Projection";
import * as olControl from "ol/control";
import Overlay from "ol/Overlay";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Polygon from "ol/geom/Polygon";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import * as olExtent from "ol/extent";
// import Circle from "ol/geom/Circle";
import CircleStyle from "ol/style/Circle";
import TileArcGISRest from "ol/source/TileArcGISRest";

import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["mapObj", "getshape"]),
  },
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
      Ellipsoid: {
        name: "CGCS2000",
        semiMajorAxis: 6378137,
        semiMinorAxis: 6356752.3141403561,
        flatRate: 0.00335281068118232,
      },
      L0: 120.0,
      vetorLayer: null,
      selfIntersectionLayer: null,
      repeatLayer: null,
      angleLayer: null,
      longAndNarrowLayer: null,
    };
  },
  async created() {
    // let res = await this.$api.upload(formData);
    // this.$store.commit('mapObj',res.data)
  },
  mounted() {
    this.initMap();
    this.loadData();
  },
  methods: {
    XY2BL(ellipsoid, L0, point) {
      var L02 = (L0 / 180) * Math.PI;
      var B = (point.y / 180) * Math.PI;
      var L = (point.x / 180) * Math.PI;
      var ProjNo = 0;
      if (point.y > 0) {
        ProjNo = Number(point.y / 1000000); //查找带号

        if (ProjNo <= 10) {
          ProjNo = 0;
        }
      }
      var Y0 = ProjNo * 1000000 + 500000;
      var X0 = 0;
      var xval = point.x - X0;
      var yval = point.y - Y0; //带内大地坐标
      var e2 = 2 * ellipsoid.flatRate - ellipsoid.flatRate * ellipsoid.flatRate;
      var e1 = (1.0 - Math.sqrt(1 - e2)) / (1.0 + Math.sqrt(1 - e2));
      var ee = e2 / (1 - e2);
      var M = xval;
      var u =
        M /
        (ellipsoid.semiMajorAxis *
          (1 - e2 / 4 - (3 * e2 * e2) / 64 - (5 * e2 * e2 * e2) / 256));
      var fai =
        u +
        ((3 * e1) / 2 - (27 * e1 * e1 * e1) / 32) * Math.sin(2 * u) +
        ((21 * e1 * e1) / 16 - (55 * e1 * e1 * e1 * e1) / 32) *
          Math.sin(4 * u) +
        ((151 * e1 * e1 * e1) / 96) * Math.sin(6 * u) +
        ((1097 * e1 * e1 * e1 * e1) / 512) * Math.sin(8 * u);
      var C = ee * Math.cos(fai) * Math.cos(fai);
      var T = Math.tan(fai) * Math.tan(fai);
      var NN =
        ellipsoid.semiMajorAxis /
        Math.sqrt(1.0 - e2 * Math.sin(fai) * Math.sin(fai));
      var R =
        (ellipsoid.semiMajorAxis * (1 - e2)) /
        Math.sqrt(
          (1 - e2 * Math.sin(fai) * Math.sin(fai)) *
            (1 - e2 * Math.sin(fai) * Math.sin(fai)) *
            (1 - e2 * Math.sin(fai) * Math.sin(fai))
        );
      var D = yval / NN;

      // debugger;

      L =
        L02 +
        (D -
          ((1 + 2 * T + C) * D * D * D) / 6 +
          ((5 - 2 * C + 28 * T - 3 * C * C + 8 * ee + 24 * T * T) *
            D *
            D *
            D *
            D *
            D) /
            120) /
          Math.cos(fai);
      B =
        fai -
        ((NN * Math.tan(fai)) / R) *
          ((D * D) / 2 -
            ((5 + 3 * T + 10 * C - 4 * C * C - 9 * ee) * D * D * D * D) / 24 +
            ((61 + 90 * T + 298 * C + 45 * T * T - 256 * ee - 3 * C * C) *
              D *
              D *
              D *
              D *
              D *
              D) /
              720);
      //var o = {};
      point.y = (L * 180) / Math.PI;
      point.x = (B * 180) / Math.PI;

      return point;
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
      this.map.addOverlay(this._overlay);
      var maplayer = null;
      mapConfig1.layers.forEach((ele) => {
        if (ele.subLayers[0].layerType === "TileArcGISRest") {
          maplayer = new Tile({
            id: ele.subLayers[0].id,
            source: new TileArcGISRest({
              url: ele.subLayers[0].url,
              crossOrigin: "anonymous",
            }),
            visible: ele.subLayers[0].visible,
            name: ele.subLayers[0].caption,
            opacity: ele.subLayers[0].opacity,
            groupCaption: ele.subLayers[0].groupCaption,
            baseMap: ele.subLayers[0].baseMap,
            thematicMap: ele.subLayers[0].thematicMap,
          });
          if (
            ele.subLayers[0].opacity !== undefined &&
            typeof ele.subLayers[0].opacity === "number"
          ) {
            maplayer.setOpacity(ele.subLayers[0].opacity);
          }
          this.map.addLayer(maplayer);
        } else if (ele.subLayers[0].layerType == "TileXYZ") {
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
      this.vetorLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      this.map.addLayer(this.vetorLayer);

      this.selfIntersectionLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      this.map.addLayer(this.selfIntersectionLayer);

      this.repeatLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      this.map.addLayer(this.repeatLayer);

      this.angleLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      this.map.addLayer(this.angleLayer);

      this.longAndNarrowLayer = new VectorLayer({
        source: new VectorSource({
          features: [],
        }),
      });
      this.map.addLayer(this.longAndNarrowLayer);

      var coordinatesPolygon = new Array();
      // var isMulti = false;
      // console.log(this.mapObj);
      // if (this.mapObj.showMultiPolyGon.length > 1) {
      //   isMulti = true;
      // }
      var _polygon = null;
      console.log(this.getshape, this.mapObj);
      if (this.getshape) {
        _polygon = new Polygon(this.getshape);
      } else {
        _polygon = new Polygon(this.mapObj.showMultiPolyGon);
      }

      var feature = new Feature({
        geometry: _polygon,
      });
      feature.setStyle(
        new Style({
          // 默认矩形样式
          fill: new Fill({
            color: "rgba(0,0,0,0)",
          }),
          stroke: new Stroke({
            color: "rgb(0,0,255)",
            width: 2,
          }),
        })
      );
      this.vetorLayer.getSource().addFeature(feature);
      console.log(this.vetorLayer);
      var extent = olExtent.boundingExtent(
        feature.getGeometry().getCoordinates()[0]
      ); //获取一个坐标数组的边界，格式为[minx,miny,maxx,maxy]
      var center = olExtent.getCenter(extent); //获取边界区域的中心位置
      this.map.getView().setCenter(center);
      // this.intersect.innerHTML = "";
      // if (this.mapObj.intersect) {
      //   this.intersect.innerHTML = "与库中数据相交<br>";
      // }
      // if (isMulti) {
      //   this.intersect.innerHTML += "上传图形为多面";
      // }
      //自相交
      if (this.mapObj) {
        for (var i = 0; i < this.mapObj.selfIntersectionPoints.length; i++) {
          var point = [
            this.mapObj.selfIntersectionPoints[i].x,
            this.mapObj.selfIntersectionPoints[i].y,
          ];

          //var _point1 = this._g.XY2BL(this._Ellipsoid, this._L0, point1);
          //var point = [_point1.y, _point1.x];
          feature = new Feature({
            geometry: new Point(point),
          });
          feature.setStyle(
            new Style({
              // 默认点样式

              image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                  color: "red",
                }),
              }),
            })
          );
          this.selfIntersectionLayer.getSource().addFeature(feature);
        }
        //重复
        for (var a = 0; a < this.mapObj.repeat.length; a++) {
          //var point1 = { x: this.mapObj.repeat[a].y, y: this.mapObj.repeat[a].x };
          //var _point1 = this._g.XY2BL(this._Ellipsoid, this._L0, point1);
          var point_1 = [this.mapObj.repeat[a].x, this.mapObj.repeat[a].y];
          feature = new Feature({
            geometry: new Point(point_1),
          });
          feature.setStyle(
            new Style({
              // 默认点样式

              image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                  color: "yellow",
                }),
              }),
            })
          );
          this.repeatLayer.getSource().addFeature(feature);
        }

        //角度
        for (var b = 0; b < this.mapObj.angle.length; b++) {
          //var point1 = { x: this.mapObj.angle[b].y, y: this.mapObj.angle[b].x };

          //var _point1 = this._g.XY2BL(this._Ellipsoid, this._L0, point1);
          var point2 = [this.mapObj.angle[b].x, this.mapObj.angle[b].y];
          feature = new Feature({
            geometry: new Point(point2),
          });
          feature.setStyle(
            new Style({
              // 默认点样式

              image: new CircleStyle({
                radius: 6,
                fill: new Fill({
                  color: "black",
                }),
              }),
            })
          );
          this.angleLayer.getSource().addFeature(feature);
        }
        //狭长
        for (var c = 0; c < this.mapObj.longAndNarrow.length; c++) {
          coordinatesPolygon = new Array();
          for (var j = 0; j < this.mapObj.longAndNarrow[c].length; j++) {
            var polygon = [];
            for (var k = 0; k < this.mapObj.longAndNarrow[c][j].length; k++) {
              var point1 = {
                x: this.mapObj.longAndNarrow[c][j][k].y,
                y: this.mapObj.longAndNarrow[c][j][k].x,
              };
              var _point1 = this.XY2BL(this.Ellipsoid, this.L0, point1);
              var point_2 = [_point1.y, _point1.x];
              polygon.push(point_2);
            }
            coordinatesPolygon[j] = polygon;
            console.log(coordinatesPolygon);
          }
          feature = new Feature({
            geometry: new Polygon(coordinatesPolygon),
          });
          feature.setStyle(
            new Style({
              // 默认矩形样式
              fill: new Fill({
                color: "rgba(0,0,0,0)",
              }),
              stroke: new Stroke({
                color: "rgb(0,255,0)",
                width: 2,
              }),
            })
          );
          console.log(feature);
          this.longAndNarrowLayer.getSource().addFeature(feature);
        }
      }

      //var source = new VectorSource({
      //    features: (new ol.format.GeoJSON()).readFeatures(this.mapObj.allCoordinates)
      //});
    },
  },
  watch: {
    mapObj: function (mapObj) {
      this.$store.commit("mapObj", mapObj);
      // this.initMap();
      this.loadData();
    },
    getshape: function (getshape) {
      this.$store.commit("getshape", getshape);
      this.loadData();
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
