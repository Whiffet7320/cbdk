export default {
    option: {
        view: {
            center: [120.8211403940166, 27.8582649137488],
            zoom: 16
            //maxZoom: 15,
            //minZoom: 6
        }
    },
    resolutions: [
        1.406250026231581,
        0.7031250131157905,
        0.3515625065578952,
        0.1757812532789476,
        0.0878906266394738,
        0.0439453133197369,
        0.02197265665986845,
        0.010986328329934226,
        0.005493164164967113,
        0.0027465820824835565,
        0.0013732910412417782,
        6.866455206208891E-4,
        3.4332276031044456E-4,
        1.7166138015522228E-4,
        8.583069007761114E-5,
        4.291534503880557E-5,
        2.1457672519402785E-5,
        1.0728836259701392E-5,
        5.364418129850696E-6,
        2.682209064925348E-6,
        1.341104532462674E-6
    ],
    layers: [
        {
            layerType: "GroupLayer",
            name: "ImageMap",
            caption: "影像地图",
            baseMap: true,
            logo: "image/tiledImage.png",
            opacity: 0.5,
            subLayers: [{
                id: "WZImageMap",
                layerType: "TileXYZ",
                caption: "温州影像地图",
                origin: [-180, 90],
                url: "https://kjpt.wzgt.gov.cn/wzgt16/arcgis/rest/services/CGCS2000/yingxiang/MapServer/tile/{z}/{y}/{x}",
                visible: true,
                opacity: 1
            }]
        }, {
            layerType: "GroupLayer",
            name: "CBDK",
            caption: "储备地块",
            thematicMap: true,
            subLayers: [
                {
                    id: "GCS_CBDK",
                    layerType: "WMS",
                    caption: "储备地块",
                    url: "http://192.168.1.131:8090/iserver/services/map-cbdk/wms130/cbdk_jbxx",
                    params: {
                        'LAYERS': 'cbdk_jbxx@cbdk',
                        'FORMAT': 'image/png'
                    },
                    queryUrl: "http://192.168.1.131:8090/iserver/services/data-cbdk/wfs100/utf-8?service=wfs&version=1.1.0&request=GetFeature&TYPENAME=cbdk:cbdk_jbxx",
                    visible: true
                }
            ]
        }

    ]

}
