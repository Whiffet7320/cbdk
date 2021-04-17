export default {
    baseUrl: 'http://192.168.1.121:18888/cbdk',
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
}