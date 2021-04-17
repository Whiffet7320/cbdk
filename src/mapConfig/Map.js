
// import MapConfig from './MapConfig1';

import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
// import { Projection,addProjection } from 'ol/proj';

    proj4.defs('EPSG:21781',
        '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 ' +
        '+x_0=600000 +y_0=200000 +ellps=bessel ' +
        '+towgs84=660.077,13.551,369.344,2.484,1.783,2.939,5.66 +units=m +no_defs');
    register(proj4);

//使用proj4.defs()定义投影
proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
//使proj4中定义的投影在OpenLayers中可用。
register(proj4);
// var projection_200000 = new Projection({
//     code: 'EPSG:4490',
//     extent: [119, 26, 123, 29],
//     units: 'degree',
//     axisOrientation: 'neu',
//     metersPerUnit: (Math.PI * 6378137) / 180,
//     global: false,
//     worldExtent: [-180, -90, 180, 90]
// });
// addProjection(projection_200000);
// MapConfig.option.view.projection = projection_200000;

// export default new Map({
//   view: new View({
//     projection: swissProjection
//   })
// });