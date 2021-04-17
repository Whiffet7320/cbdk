import TileLayer from "ol/layer/Tile"
import TileArcGISRest from 'ol/source/TileArcGISRest'
import OSM from "ol/source/OSM"
import XYZ from 'ol/source/XYZ'
import TileImage from 'ol/source/TileImage';
import mapConfig1 from './MapConfig1'
import TileGrid from 'ol/tilegrid/TileGrid'

let maptype = 3          //0表示部署的离线瓦片地图，1表示OSM,2表示使用Arcgis在线午夜蓝地图服务

var streetmap = function () {
    var maplayer = null;
    switch (maptype) {
        case 0:
            maplayer = new TileLayer({
                source: new XYZ({
                    url: 'https://kjpt.wzgt.gov.cn/wzgt16/arcgis/rest/services/CGCS2000/yingxiang/MapServer/tile/{z}/{y}/{x}'
                })
            })
            break;
        case 1:
            maplayer = new TileLayer({
                source: new OSM()
            })
            break;
        case 2:
            maplayer = new TileLayer({
                source: new TileArcGISRest({
                    url: 'https://kjpt.wzgt.gov.cn/wzgt16/arcgis/rest/services/CGCS2000/yingxiang/MapServer/tile/{z}/{y}/{x}'
                })
            })
            break;
        case 3:
            //设置切片的原点
            var origin1 = mapConfig1.layers[0].subLayers.origin;
            //切片的方案
            var tileGrid = new TileGrid({
                tileSize: 256,
                origin: origin1,
                resolutions: mapConfig1.resolutions
            });
            maplayer = new TileLayer({
                source: new TileImage({
                    url: 'https://kjpt.wzgt.gov.cn/wzgt16/arcgis/rest/services/CGCS2000/yingxiang/MapServer/tile/{z}/{y}/{x}',
                    crossOrigin: 'anonymous',
                    tileGrid: tileGrid
                })
            })
            break;
    }
    return [maplayer];
}

var mapconfig = {
    x: 114.064839,     //中心点经度和纬度
    y: 22.548857,
    zoom: 15,          //地图缩放级别
    streetmap: streetmap
};

export default mapconfig
