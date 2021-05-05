import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 1000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 1000,
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
    timeout: 1000,
})

myPost.interceptors.request.use(config => {
    // if (sessionStorage.getItem("token")) {
    // config.headers.token = sessionStorage.token;
    // config.data = {
    //     pageNum: 1,
    //     pageSize: 1,
    // };
    // config.headers = {
    //     // 'token': sessionStorage.token,
    //     'Access-Control-Allow-Origin': '*',
    //     "access-control-allow-credentials": "true"
    // }
    // }
    // console.log(config)
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myGet.interceptors.request.use(config => {
    // if (sessionStorage.getItem("token")) {
    // config.headers = {
    //     // 'token': sessionStorage.token,
    //     'Access-Control-Allow-Origin': '*',
    //     "access-control-allow-credentials": "true"
    // }
    // config.headers.token = sessionStorage.token;
    // }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({ path: "/" })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    selectJbxx(obj) {
        return myPost({
            url: urls.selectJbxx,
            data: {
                ...obj
            },
        })
    },
    selectJbxxById(id) {
        return myGet({
            url: urls.selectJbxxById,
            params: {
                id
            },
        })
    },
    getOperationLog(cbdkId) {
        return myGet({
            url: urls.getOperationLog,
            params: {
                cbdkId
            },
        })
    },
    fileUpload(file) {
        return myPost({
            url: urls.fileUpload,
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryLzKBBdTAAoU7HNb2'
            }
        })
    },
    insertGxxx(obj) {
        return myPost({
            url: urls.insertGxxx,
            data: {
                ...obj
            },
        })
    },
    getGxxx(cbdkId) {
        return myGet({
            url: urls.getGxxx,
            params: {
                cbdkId
            },
        })
    },
    deleteGxxx(cbdkId) {
        return myDelete({
            url: `${urls.deleteGxxx}/${cbdkId}`,
        })
    },
    fileDownload(fileName) {
        return `${urls.baseUrl}${urls.fileDownload}?fileName=${fileName}`
    },
    deleteOperationLog(id) {
        return myDelete({
            url: `${urls.deleteOperationLog}/${id}`,
        })
    },
    deleteJbxx(id) {
        return myDelete({
            url: `${urls.deleteJbxx}/${id}`,
        })
    },
    updateJbxx(obj) {
        return myPost({
            url: urls.updateJbxx,
            data: {
                ...obj
            },
        })
    },
    insertOperationLog(obj) {
        return myPost({
            url: urls.insertOperationLog,
            data: {
                ...obj
            },
        })
    },
    getckList(cbdkId) {
        return myGet({
            url: urls.getckList,
            params: {
                cbdkId
            },
        })
    },
    addck(obj) {
        return myPost({
            url: urls.addck,
            data: {
                ...obj
            },
        })
    },
    delck(id) {
        return myGet({
            url: urls.delck,
            params: {
                id
            },
        })
    },
    getReportFormByJgmcOrSzxzq(condition) {
        return myGet({
            url: urls.getReportFormByJgmcOrSzxzq,
            params: {
                condition
            },
        })
    },
    getMercantileConstructiveLand() {
        return myGet({
            url: urls.getMercantileConstructiveLand,
        })
    },
    getCommercialLand() {
        return myGet({
            url: urls.getCommercialLand,
        })
    },
    getResidentialLand() {
        return myGet({
            url: urls.getResidentialLand,
        })
    },
    saveJbxx(obj) {
        return myPost({
            url: urls.saveJbxx,
            data: {
                ...obj
            },
        })
    },
    download(id) {
        return `${urls.baseUrl}${urls.download}?id=${id}`
    },
    upload(file) {
        return myPost({
            url: urls.upload,
            data: file,
        })
    },
    selectEnums(name) {
        return myGet({
            url: urls.selectEnums,
            params: {
                name
            },
        })
    },
    selectEnumsByPage(name, pageNum, pageSize) {
        return myGet({
            url: urls.selectEnumsByPage,
            params: {
                name,
                pageNum,
                pageSize
            },
        })
    },
    deleteEnums(id) {
        return myDelete({
            url: `${urls.deleteEnums}/${id}`,
        })
    },
    selectEnumsByName(name) {
        return myGet({
            url: urls.selectEnumsByName,
            params: {
                name,
            },
        })
    },
    insertEnums(obj) {
        return myPost({
            url: urls.insertEnums,
            data: {
                ...obj
            },
        })
    },
    updateEnums(obj) {
        return myPost({
            url: urls.updateEnums,
            data: {
                ...obj
            },
        })
    },
    getXzs() {
        return myGet({
            url: urls.getXzs,
        })
    },
    getJdsByXzId(xzId) {
        return myGet({
            url: urls.getJdsByXzId,
            params: {
                xzId,
            },
        })
    },
    updateJd(obj) {
        return myPost({
            url: urls.updateJd,
            data: {
                ...obj
            },
        })
    },
    getshape(id) {
        return myGet({
            url: urls.getshape,
            params: {
                id,
            },
        })
    },
    saveYstx(obj){
        return myPost({
            url: urls.saveYstx,
            data: {
                ...obj
            },
        })
    },
}