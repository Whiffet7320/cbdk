<template>
  <div class="oss">
    <img :src="oss_imgurl" alt="" />
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="file_companyLogo"
      multiple="multiple"
      @change="companyLogo($event)"
    />
    <el-button type="primary" @click="uploading(true)">保存</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgFile: "",
      oss_imgurl: "",
    };
  },
  created() {
    console.log(window.OSS);
  },
  methods: {
    async companyLogo(event) {
      var file = event.target.files[0];
      let res = await this.readFileAsBuffer(file);
      console.log(res);
    },
    //将文件转为blob类型
    readFileAsBuffer(file) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
          if (typeof e.target.result === "object") {
            blob = new Blob([e.target.result]);
          } else {
            blob = e.target.result;
          }
        };
        reader.onload = function () {
          const base64File = reader.result.replace(
            /^data:\w+\/\w+;base64,/,
            ""
          );
          resolve(new window.OSS.Buffer(base64File, "base64"));
        };
      });
    },
    async uploading(flag) {
      // console.log(document.getElementById("file0").value);
      if (flag) {
        var file_re = await this.readFileAsBuffer(this.imgFile);
        console.log(this.imgFile);
        this.$api.ossststoken().then((res) => {
          console.log(res.data.data.date);
          let myData = res.data.data.date;
          let client = new window.OSS.Wrapper({
            region: "oss-cn-hangzhou", //oss地址
            accessKeyId: myData.Credentials.AccessKeyId, //ak
            accessKeySecret: myData.Credentials.AccessKeySecret, //secret
            stsToken: myData.Credentials.SecurityToken,
            bucket: "nxhzapp", //oss名字
          });
          // console.log(client);
          var imgtype = this.imgFile.type.substr(6, 4);
          var store = `${new Date().getTime()}.${imgtype}`;
          console.log(store);
          client.put(store, file_re).then((res) => {
            //这个结果就是url
            console.log(res);
            var a = client.signatureUrl(store);
            this.oss_imgurl = a;
            console.log(a);
          });
        });
      }
    },
  },
};
</script>