<template>
  <div class="Management">
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
      <el-tabs v-model="activeName">
        <el-tab-pane label="枚举管理" name="first">
          <div class="top"></div>
          <div class="tab">
            <el-form
              :inline="true"
              :model="searchForm"
              class="demo-form-inline"
            >
              <el-form-item label="根据名称查询：">
                <el-input
                  v-model="searchForm.name"
                  placeholder="根据名称查询"
                  @keyup.enter.native="onSubmit"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onAdd">新增</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="enumerationTableData"
              style="width: 100%"
              id="table1"
            >
              <el-table-column prop="name" label="类型"> </el-table-column>
              <el-table-column prop="value" label="名称"> </el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    @click="editClick(scope.row)"
                    type="text"
                    size="small"
                    >修改</el-button
                  >
                  <el-button
                    @click="deleteClick(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="this.handleSizeChange"
              @current-change="this.handleCurrentChange"
              :current-page="this.enumerationpage"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="this.total"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="中心管理" name="second">
          <!-- <div class="top">
            <el-button icon="el-icon-download" type="danger" size="small">
              <a class="xlsExport_a" href="#" download="文件模板.xlsx">
                <span class="xlsExport">导出</span>
              </a>
            </el-button>
            <p>面积单位：亩</p>
          </div> -->
          <div class="tab">
            <el-table :data="xzqtableData" border style="width: 100%">
              <el-table-column fixed prop="id" label="ID"> </el-table-column>
              <el-table-column prop="location" label="行政区">
              </el-table-column>
              <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="xzqhandleClick(scope.row)"
                    type="text"
                    size="small"
                    >设置中心城区</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 附件 -->
    <el-dialog
      title="修改信息"
      :visible.sync="this.editDialogVisible"
      width="34%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="editForm" label-width="80px">
        <el-form-item label="枚举类型">
          <el-select v-model="editForm.region" placeholder="请选择枚举类型">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editonSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 设置中心城区 -->
    <el-dialog
      title="设置中心城区"
      :visible.sync="this.cityDialogVisible"
      width="34%"
      :before-close="cityhandleClose"
    >
      <el-table :data="citytableData" border style="width: 100%">
        <el-table-column fixed prop="id" label="ID"> </el-table-column>
        <el-table-column prop="jie" label="街道"> </el-table-column>
        <el-table-column label="设置中心城区">
          <template slot-scope="scope">
            <el-checkbox
              v-model="scope.row.mycheck"
              @change="check(scope.row)"
            ></el-checkbox>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import mixinsNowTime from "../../mixins/nowTime";
import { mapState } from "vuex";
export default {
  mixins: [mixinsNowTime()],
  computed: {
    ...mapState(["enumerationpageSize", "enumerationpage"]),
  },
  data() {
    return {
      activeName: "first",
      enumerationTableData: [],
      total: 0,
      searchForm: {
        name: "",
      },
      editDialogVisible: false,
      editForm: {
        name: "",
        region: "",
      },
      options: [],
      editName: null,
      xzqtableData: [],
      cityDialogVisible: false,
      citytableData: [],
      cityArr: [],
      row:null,
    };
  },
  async created() {
    const res = await this.$api.selectEnumsByName();
    console.log(res.data);
    this.options = res.data;
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.selectEnums();
      this.total = res.data.length;
      this.searchByPage();
      const xzq = await this.$api.getXzs();
      this.xzqtableData = xzq.data;
    },
    async searchByPage() {
      const res = await this.$api.selectEnumsByPage(
        this.searchForm.name,
        this.enumerationpage,
        this.enumerationpageSize
      );
      console.log(res.data);
      if (this.searchForm.name != "") {
        this.total = res.data.length;
      }
      this.enumerationTableData = res.data;
    },
    async check(row) {
      console.log(row);
      console.log(row.isCentralCity == 1);
      var myisCentralCity = null;
      if (row.isCentralCity == 1) {
        myisCentralCity = 0;
      } else {
        myisCentralCity = 1;
      }
      const obj = {
        id: row.id,
        isCentralCity: myisCentralCity,
        jie: row.jie,
        xzId: row.xzId,
      };
      const res = await this.$api.updateJd(obj);
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "保存成功",
          type: "success",
        });
        console.log(row);
        this.citytableData.forEach((ele) => {
            this.$set(ele, "mycheck", false);
        });
        this.xzqhandleClick(this.row)
      } else {
        this.$message.error("保存失败");
      }
    },
    // 行政区编辑
    async xzqhandleClick(row) {
      console.log(row);
      this.row = row
      this.cityDialogVisible = true;
      const res = await this.$api.getJdsByXzId(row.id);
      console.log(res.data);
      this.citytableData = res.data;
      this.citytableData.forEach((ele) => {
        if (ele.isCentralCity == 1) {
          ele.mycheck = true;
        } else {
          ele.mycheck = false;
        }
      });
    },
    // 新增
    onAdd() {
      this.editDialogVisible = true;
      this.editForm.region = "";
      this.editForm.name = "";
      this.editForm.id = null;
    },
    // 修改/新增
    editClick(row) {
      console.log(row);
      this.editDialogVisible = true;
      this.editName = row.name;
      if (this.editName) {
        this.editForm.region = this.editName;
        this.editForm.name = row.value;
        this.editForm.id = row.id;
      }
    },
    // 修改/新增保存
    async editonSubmit() {
      console.log(this.editForm.id);
      if (this.editForm.id) {
        const res = await this.$api.updateEnums({
          id: this.editForm.id,
          name: this.editForm.region,
          value: this.editForm.name,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.editDialogVisible = false;
          this.searchByPage();
        } else {
          this.$message.error("修改失败");
        }
      } else {
        const res = await this.$api.insertEnums({
          name: this.editForm.region,
          value: this.editForm.name,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: "保存成功",
            type: "success",
          });
          this.editDialogVisible = false;
          this.searchByPage();
        } else {
          this.$message.error("保存失败");
        }
      }
    },
    // 查询
    onSubmit() {
      this.$store.commit("enumerationpage", 1);
      this.getData();
    },
    // 删除
    async deleteClick(row) {
      console.log(row);
      await this.$api.deleteEnums(row.id);
      this.getData();
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("enumerationpageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("enumerationpage", val);
    },
    handleClose() {
      this.editDialogVisible = false;
    },
    cityhandleClose() {
      this.cityDialogVisible = false;
    },
  },
  watch: {
    enumerationpage: function (enumerationpage) {
      this.$store.commit("enumerationpage", enumerationpage);
      this.getData();
    },
    enumerationpageSize: function (enumerationpageSize) {
      this.$store.commit("enumerationpageSize", enumerationpageSize);
      this.getData();
    },
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