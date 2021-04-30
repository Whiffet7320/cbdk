export default {
    baseUrl: 'http://192.168.1.195:8888/cbdk',
    selectJbxx: '/cbdk-jbxx/selectJbxx',//查询基本信息
    saveJbxx:'/cbdk-jbxx/saveJbxx',//存储基本信息(新增)
    selectJbxxById: '/cbdk-jbxx/selectJbxxById',//获取基础信息
    getGxxx: '/cbdk-gxxx/getGxxx',//查询更新信息
    fileUpload: '/cbdk-gxxx/fileUpload',//文件上传
    insertGxxx: '/cbdk-gxxx/insertGxxx',//添加更新信息
    deleteGxxx: '/cbdk-gxxx/deleteGxxx',//删除更新信息
    fileDownload: '/cbdk-gxxx/fileDownload',//文件下载
    getOperationLog: '/cbdk-gxxx/getOperationLog',//查询日志信息
    deleteOperationLog:'/cbdk-gxxx/deleteOperationLog',//删除日志信息
    deleteJbxx:'/cbdk-jbxx/deleteJbxx',//删除基础信息
    updateJbxx:'/cbdk-jbxx/updateJbxx',//更新基本信息
    insertOperationLog:'/cbdk-gxxx/insertOperationLog',//新增日志信息
    getckList:'/cbdk-ckxx/getckList',//获取出库列表
    addck:'/cbdk-ckxx/addck',//添加出库信息
    delck:'/cbdk-ckxx/delck',//删除出库信息
    download:'/cbdk-ystx/download',//信息下载
    upload:'/cbdk-jbxx/upload',//地块文件上传
    
    // 表格
    getReportFormByJgmcOrSzxzq:'/cbdk-bbxx/getReportFormByJgmcOrSzxzq',//按储备机构和区域查询的报表
    getMercantileConstructiveLand:'/cbdk-bbxx/getMercantileConstructiveLand',//统计经营性用地拟出让情况
    getCommercialLand:'/cbdk-bbxx/getCommercialLand',//统计商业用地拟出让情况
    getResidentialLand:'/cbdk-bbxx/getResidentialLand',//统计住宅用地拟出让情况
    // 枚举信息
    selectEnums:'/enums/selectEnums',//根据枚举名称查询枚举信息，不传参数则查全部
    selectEnumsByPage:'/enums/selectEnumsByPage',//分页查询枚举信息
    deleteEnums:'/enums/deleteEnums',//删除枚举信息
    selectEnumsByName:'/enums/selectEnumsByName',//根据枚举名称模糊查询枚举信息，不传参数则查全部
    insertEnums:'/enums/insertEnums',//存储枚举信息
    updateEnums:'/enums/updateEnums',//修改枚举信息
    // 行政
    getXzs:'/xz/getXzs',//获取所有行政区
    getJdsByXzId:'/jd/getJdsByXzId',//根据行政区获取所有街道
    updateJd:'/jd/updateJd',//修改是否为中心城区

}