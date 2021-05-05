<template>
  <div class="statistics">
    <div class="header">
      <div class="left">
        <i class="el-icon-s-home"></i>
        <p class="title">当前界面：数据管理</p>
      </div>
      <div class="right">
        <p class="time">当前时间：{{ this.nowTime }}</p>
        <p>储备机构：xxx</p>
      </div>
    </div>
    <div class="container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="储备机构" name="first">
          <div class="top">
            <el-button icon="el-icon-download" type="danger" size="small">
              <a class="xlsExport_a" href="#" download="文件模板.xlsx">
                <span class="xlsExport">导出</span>
              </a>
            </el-button>
            <p>面积单位：亩</p>
          </div>
          <div class="tab">
            <el-table
              :data="getReportFormByJgmcOrSzxzqTableData"
              style="width: 100%"
              id="table1"
            >
              <el-table-column prop="date" label="储备机构">
                <el-table-column prop="condition" label="机构名称">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="name" label="总数">
                <el-table-column prop="numSum" label="总数"> </el-table-column>
                <el-table-column prop="sum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="经营性用地">
                <el-table-column prop="jyxydCount" label="总数">
                </el-table-column>
                <el-table-column prop="jyxydSum" label="面积">
                </el-table-column>
              </el-table-column>
              <el-table-column label="住宅">
                <el-table-column prop="zzcount" label="总数"> </el-table-column>
                <el-table-column prop="zzsum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="商业">
                <el-table-column prop="sfcount" label="总数"> </el-table-column>
                <el-table-column prop="sfsum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="非经营性用地">
                <el-table-column prop="qtcount" label="总数"> </el-table-column>
                <el-table-column prop="qtsum" label="面积"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="区域划分" name="second">
          <div class="top">
            <el-button icon="el-icon-download" type="danger" size="small">
              <a class="xlsExport_a" href="#" download="文件模板.xlsx">
                <span class="xlsExport">导出</span>
              </a>
            </el-button>
            <p>面积单位：亩</p>
          </div>
          <div class="tab">
            <el-table
              :data="getReportFormByJgmcOrSzxzqTableData2"
              style="width: 100%"
            >
              <el-table-column prop="date" label="区域">
                <el-table-column prop="condition" label="行政区">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="name" label="总数">
                <el-table-column prop="numCount" label="总数">
                </el-table-column>
                <el-table-column prop="sum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="经营性用地">
                <el-table-column prop="jyxydCount" label="总数">
                </el-table-column>
                <el-table-column prop="jyxydSum" label="面积">
                </el-table-column>
              </el-table-column>
              <el-table-column label="住宅">
                <el-table-column prop="zzcount" label="总数"> </el-table-column>
                <el-table-column prop="zzsum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="商业">
                <el-table-column prop="sfcount" label="总数"> </el-table-column>
                <el-table-column prop="sfsum" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="非经营性用地">
                <el-table-column prop="qtcount" label="总数"> </el-table-column>
                <el-table-column prop="qtsum" label="面积"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="经营性用地拟出让情况" name="third">
          <div class="top">
            <el-button icon="el-icon-download" type="danger" size="small">
              <a class="xlsExport_a" href="#" download="文件模板.xlsx">
                <span class="xlsExport">导出</span>
              </a>
            </el-button>
            <p>面积单位：亩</p>
          </div>
          <div class="tab">
            <el-table
              :data="getReportFormByJgmcOrSzxzqTableData3"
              style="width: 100%"
            >
              <el-table-column prop="date" label="区域">
                <el-table-column prop="cbjgmc" label="行政区">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="name" label="达成出让条件">
                <el-table-column prop="zs" label="总数"> </el-table-column>
                <el-table-column prop="mj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="已列入出让条件">
                <el-table-column prop="crjhzs" label="总数"> </el-table-column>
                <el-table-column prop="crjhmj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="未列入出让条件">
                <el-table-column prop="wcrjhzs" label="总数"> </el-table-column>
                <el-table-column prop="wcrjhmj" label="面积"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="住宅拟出让情况" name="fourth">
          <div class="top">
            <el-button
              @click="importExcal"
              icon="el-icon-download"
              type="danger"
              size="small"
            >
              <span class="xlsExport">导出</span>
            </el-button>
            <p>面积单位：亩</p>
          </div>
          <div class="tab">
            <el-table
              :data="getReportFormByJgmcOrSzxzqTableData4"
              style="width: 100%"
            >
              <el-table-column prop="date" label="区域">
                <el-table-column prop="cbjgmc" label="行政区">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="name" label="达成出让条件">
                <el-table-column prop="zs" label="总数"> </el-table-column>
                <el-table-column prop="mj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="已列入出让条件">
                <el-table-column prop="crjhzs" label="总数"> </el-table-column>
                <el-table-column prop="crjhmj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="未列入出让条件">
                <el-table-column prop="wcrjhzs" label="总数"> </el-table-column>
                <el-table-column prop="wcrjhmj" label="面积"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="商业拟出让情况" name="fifth">
          <div class="top">
            <el-button icon="el-icon-download" type="danger" size="small">
              <a class="xlsExport_a" href="#" download="文件模板.xlsx">
                <span class="xlsExport">导出</span>
              </a>
            </el-button>
            <p>面积单位：亩</p>
          </div>
          <div class="tab">
            <el-table
              :data="getReportFormByJgmcOrSzxzqTableData5"
              style="width: 100%"
            >
              <el-table-column prop="date" label="区域">
                <el-table-column prop="cbjgmc" label="行政区">
                </el-table-column>
              </el-table-column>
              <el-table-column prop="name" label="达成出让条件">
                <el-table-column prop="zs" label="总数"> </el-table-column>
                <el-table-column prop="mj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="已列入出让条件">
                <el-table-column prop="crjhzs" label="总数"> </el-table-column>
                <el-table-column prop="crjhmj" label="面积"> </el-table-column>
              </el-table-column>
              <el-table-column label="未列入出让条件">
                <el-table-column prop="wcrjhzs" label="总数"> </el-table-column>
                <el-table-column prop="wcrjhmj" label="面积"> </el-table-column>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import mixinsNowTime from "../../mixins/nowTime";
export default {
  mixins: [mixinsNowTime()],
  data() {
    return {
      activeName: "first",
      tableData: [],
      getReportFormByJgmcOrSzxzqTableData: [],
      getReportFormByJgmcOrSzxzqTableData2: [],
      getReportFormByJgmcOrSzxzqTableData3: [],
      getReportFormByJgmcOrSzxzqTableData4: [],
      getReportFormByJgmcOrSzxzqTableData5: [],
    };
  },
  methods: {
    // 表格导出
    importExcal() {},
    handleClick(tab) {
      console.log(tab);
    },
    // 金额显示.00格式
    NumFormat(value) {
      if (!value || value == "0") return "0";
      value = value.toFixed(2);
      var intPart = Math.trunc(value); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat + floatPart;
      }
    },
  },
  async created() {
    // 储备机构
    const res = await this.$api.getReportFormByJgmcOrSzxzq("cbjgmc");
    console.log(res)
    res.data.forEach((ele) => {
      console.log(ele);
      if (!ele.qtsum) {
        ele.qtsum = 0;
      }
      if (!ele.sfsum) {
        ele.sfsum = 0;
      }
      if (!ele.zzsum) {
        ele.zzsum = 0;
      }
      if (!ele.sum) {
        ele.sum = 0;
      }
      // ele.qtsum = this.NumFormat(+ele.qtsum)
      // ele.sfsum = this.NumFormat(+ele.sfsum)
      // ele.zzsum = this.NumFormat(+ele.zzsum)
      // ele.sum = this.NumFormat(+ele.sum)
      ele.numSum =
        parseInt(ele.qtcount) + parseInt(ele.zzcount) + parseInt(ele.sfcount);
      ele.jyxydCount = parseInt(ele.zzcount) + parseInt(ele.sfcount);
      ele.jyxydSum = ele.zzsum + ele.sfsum;
    });
    this.getReportFormByJgmcOrSzxzqTableData = res.data;
    // 区域
    const res2 = await this.$api.getReportFormByJgmcOrSzxzq("szxzq");
    res2.data.forEach((ele) => {
      if (!ele.qtsum) {
        ele.qtsum = 0;
      }
      if (!ele.sfsum) {
        ele.sfsum = 0;
      }
      if (!ele.zzsum) {
        ele.zzsum = 0;
      }
      if (!ele.sum) {
        ele.sum = 0;
      }
      // ele.qtsum = +ele.qtsum.toFixed(2);
      // ele.qtsum = this.NumFormat(+ele.qtsum);
      // ele.sfsum = +ele.sfsum.toFixed(2);
      // ele.zzsum = +ele.zzsum.toFixed(2);
      // ele.sum = +ele.sum.toFixed(2);
      ele.numCount =
        parseInt(ele.qtcount) + parseInt(ele.zzcount) + parseInt(ele.sfcount);
      ele.jyxydCount = parseInt(ele.zzcount) + parseInt(ele.sfcount);
      ele.jyxydSum = ele.zzsum + ele.sfsum;
    });
    this.getReportFormByJgmcOrSzxzqTableData2 = res2.data;
    // console.log(res2.data);
    // 经营性用地拟出让情况
    const res3 = await this.$api.getMercantileConstructiveLand();
    res3.data.forEach((ele) => {
      if (!ele.wcrjhzs) {
        ele.wcrjhzs = "0.00";
      }
      if (!ele.crjhzs) {
        ele.crjhzs = "0.00";
      }
      if (!ele.mj) {
        ele.mj = "0.00";
      } else {
        ele.mj = this.NumFormat(ele.mj);
      }
      if (!ele.crjhmj) {
        ele.crjhmj = "0.00";
      } else {
        ele.crjhmj = this.NumFormat(ele.crjhmj);
      }
      if (!ele.wcrjhmj) {
        ele.wcrjhmj = "0.00";
      } else {
        ele.wcrjhmj = this.NumFormat(ele.wcrjhmj);
      }
    });
    this.getReportFormByJgmcOrSzxzqTableData3 = res3.data;
    // console.log(res3.data);
    // 统计住宅用地拟出让情况
    const res4 = await this.$api.getResidentialLand();
    res4.data.forEach((ele) => {
      if (!ele.crjhzs) {
        ele.crjhzs = "0";
      }
      if (!ele.crjhmj) {
        console.log(ele.crjhmj);
        ele.crjhmj = "0.00";
      } else {
        ele.crjhmj = this.NumFormat(ele.crjhmj);
      }
      if (!ele.wcrjhzs) {
        ele.wcrjhzs = "0";
      }
      if (!ele.wcrjhmj) {
        ele.wcrjhmj = "0.00";
      } else {
        ele.wcrjhmj = this.NumFormat(ele.wcrjhmj);
      }
      ele.mj = this.NumFormat(ele.mj);
    });
    this.getReportFormByJgmcOrSzxzqTableData4 = res4.data;
    // console.log(res4.data);
    // 商业用地拟出
    const res5 = await this.$api.getCommercialLand();
    res5.data.forEach((ele) => {
      if (!ele.crjhzs) {
        ele.crjhzs = "0";
      }
      if (!ele.crjhmj) {
        console.log(ele.crjhmj);
        ele.crjhmj = "0.00";
      } else {
        ele.crjhmj = this.NumFormat(ele.crjhmj);
      }
      if (!ele.wcrjhzs) {
        ele.wcrjhzs = "0";
      }
      if (!ele.wcrjhmj) {
        ele.wcrjhmj = "0.00";
      } else {
        ele.wcrjhmj = this.NumFormat(ele.wcrjhmj);
      }
      ele.mj = this.NumFormat(ele.mj);
    });
    this.getReportFormByJgmcOrSzxzqTableData5 = res5.data;
    console.log(res5.data);
  },
};
</script>

<style lang="scss" scoped>
.header {
  p {
    margin-bottom: 0;
  }
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    align-items: center;
    font-size: 14px;
    .time {
      margin-right: 20px;
    }
  }
  .el-icon-s-home {
    font-size: 20px;
  }
  .title {
    font-size: 14px;
    margin-left: 10px;
  }
}
.container {
  border: 1px solid #ddd;
  margin-bottom: 30px;
  padding: 10px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin: 0 20px 10px 6px;
    .xlsExport_a {
      color: #fff;
      text-decoration: none;
    }
  }
  .tab {
    /deep/ .is-group.has-gutter tr th:not(.is-leaf) .cell {
      font-size: 16px !important;
      font-weight: bolder;
      color: rgb(19, 18, 18);
      //   text-align: center;
    }
    /deep/ .is-group.has-gutter tr th .cell {
      font-size: 14px !important;
      font-weight: bolder;
      //   text-align: center;
    }
  }
}
</style>