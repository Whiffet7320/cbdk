<template>
  <div class="administration">
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
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item>
          <el-button type="primary" @click="getBtnName">{{
            btnName
          }}</el-button>
          <el-button type="primary" @click="mapBtnClick">地图模式</el-button>
        </el-form-item>
        <el-form-item label="行政区：" prop="szxzq">
          <el-checkbox-group v-model="form.szxzq" size="small">
            <el-checkbox
              v-for="item in xzqList"
              :key="item.id"
              :label="item.location"
              border
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item v-if="!btnFlag" label="年份：" prop="year">
          <el-radio-group v-model="form.year" size="small">
            <el-radio label="2021" border>2021</el-radio>
            <el-radio label="2020" border>2020</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="btnFlag" label="年份：" prop="year">
          <el-date-picker
            v-model="form.year"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="储备状态：" prop="zt">
          <el-radio-group v-model="form.zt" size="small">
            <el-radio v-for="item in this.form.ztList" :key="item.id" :label="item.value" border>{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="btnFlag" label="能否出让：" prop="nfcr">
          <el-radio-group v-model="form.nfcr" size="small">
            <el-radio label="是" border>是</el-radio>
            <el-radio label="否" border>否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="搜索：" prop="cbjgmc">
          <el-input
            v-model="form.cbjgmc"
            @keyup.enter.native="onSubmit"
            placeholder="请输入名称"
          ></el-input>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button @click="toNewAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-divider></el-divider>
      <div class="tab">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            prop="dkmc"
            label="地块名称"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="szxzq"
            :show-overflow-tooltip="true"
            label="行政区"
          >
          </el-table-column>
          <el-table-column prop="szjd" label="街道"> </el-table-column>
          <el-table-column prop="cbjgmc" label="储备机构名称">
          </el-table-column>
          <el-table-column prop="zt" label="储备状态"> </el-table-column>
          <el-table-column prop="rksj" label="入库时间"> </el-table-column>
          <el-table-column
            prop="fjyxydlx"
            label="非经营性用地"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="nfcr" label="能否出让"> </el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                @click="checkSee(scope.row)"
                type="text"
                size="small"
              ></el-button>
              <el-tooltip
                class="item"
                effect="dark"
                content="修改"
                placement="top"
              >
                <i class="el-icon-edit" @click="selectJbxxById(scope.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="界址点下载"
                placement="top"
              >
                <i class="el-icon-download" @click="myDownload(scope.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="日志"
                placement="top"
              >
                <i class="el-icon-tickets" @click="journal(scope.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="附件"
                placement="top"
              >
                <i class="el-icon-paperclip" @click="enclosure(scope.row)"></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="出库"
                placement="top"
              >
                <i class="el-icon-upload" @click="getckList(scope.row)"></i>
              </el-tooltip>
              <el-tooltip
                v-if="scope.row.zt"
                class="item"
                effect="dark"
                content="出库记录"
                placement="top"
              >
                <i
                  class="el-icon-s-finance"
                  @click="getckListRecord(scope.row)"
                ></i>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="删除"
                placement="top"
              >
                <i class="el-icon-delete" @click="deleteJbxx(scope.row)"></i>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.page"
          :page-sizes="[10, 15, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total"
        >
        </el-pagination>
      </div>
      <!-- 地图模式 -->
      <el-dialog
        title="地图模式"
        :visible.sync="this.mapDialogVisible"
        width="70%"
        :before-close="maphandleClose"
      >
        <AMap />
      </el-dialog>
      <!-- 附件 -->
      <el-dialog
        :title="this.journalTitle"
        :visible.sync="this.enclosureDialogVisible"
        width="34%"
        :before-close="handleClose"
      >
        <el-button type="primary" @click="enclosureUpLoad">上传</el-button>

        <input
          type="file"
          name="companyLogo"
          id="file0"
          class="displayN"
          multiple="multiple"
          @change="companyLogo($event)"
          ref="fileInputList"
          style="display: none"
        />
        <el-table :data="enclosureTableData" style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="xgyjfj"
            label="文件名"
            width="240"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="czsj"
            label="日期"
            width="140"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="czr"
            label="操作人"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="fileDownload(scope.row)"
                type="text"
                size="small"
                >下载</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteGxxxx(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 日志 -->
      <el-dialog
        :title="this.journalTitle"
        :visible.sync="this.journalDialogVisible"
        width="34%"
        :before-close="journalhandleClose"
      >
        <el-table :data="journalTableData" style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="descr"
            label="更新内容"
            width="240"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="operationName"
            label="操作人"
            width="140"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="operationTime"
            label="日期"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <!-- <el-button
                @click="fileDownload(scope.row)"
                type="text"
                size="small"
                >下载</el-button
              > -->
              <el-button
                type="text"
                size="small"
                @click="deleteOperationLog(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 出库 -->
      <el-dialog
        :title="this.journalTitle"
        :visible.sync="this.deliveryDialogVisible"
        width="50%"
        :before-close="deliveryhandleClose"
      >
        <el-form
          :model="deliveryForm"
          :rules="deliveryRules"
          ref="deliveryForm"
          label-width="100px"
          class="demo-deliveryForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="出库方式：" prop="ckfs">
                <el-select v-model="deliveryForm.ckfs" placeholder="请选择">
                  <el-option
                    v-for="item in deliveryForm.ckfsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出库面积：" prop="ckmj">
                <el-input v-model="deliveryForm.ckmj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="合同电子监管号：" prop="htdzjgh">
                <el-input v-model="deliveryForm.htdzjgh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="项目名称：" prop="xmmc">
                <el-input v-model="deliveryForm.xmmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="签订时间：" prop="qdsj">
                <el-date-picker
                  v-model="deliveryForm.qdsj"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '划转出库'">
              <el-form-item label="出库时间：" prop="cksj">
                <el-date-picker
                  v-model="deliveryForm.cksj"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '划转出库'">
              <el-form-item label="出库说明：" prop="cksm">
                <el-input v-model="deliveryForm.cksm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="受让人：" prop="ssr">
                <el-input v-model="deliveryForm.ssr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="金额：" prop="je">
                <el-input v-model="deliveryForm.je"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliveryForm.ckfs == '供应出库'">
              <el-form-item label="坐落：" prop="zl">
                <el-input v-model="deliveryForm.zl"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <el-button
                  type="primary"
                  @click="deliveryFormSubmit('deliveryForm')"
                  >出库</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <!-- 出库记录 -->
      <el-dialog
        :title="this.journalTitle"
        :visible.sync="this.deliveryRecordDialogVisible"
        width="34%"
        :before-close="deliveryRecordhandleClose"
      >
        <el-table :data="deliveryRecordTableData" style="width: 100%">
          <el-table-column
            :show-overflow-tooltip="true"
            prop="ckfs"
            label="出库方式"
            width="120"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="ckmj"
            label="出库面积"
            width="100"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="cjsj"
            label="出库时间"
            width="140"
          >
          </el-table-column>
          <el-table-column
            :show-overflow-tooltip="true"
            prop="czr"
            label="操作人"
          >
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="deliveryRecordSee(scope.row)"
                >查看</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deliveryRecordDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 出库记录详情 -->
      <el-dialog
        :title="this.journalTitle"
        :visible.sync="this.deliverySeeDialogVisible"
        width="50%"
        :before-close="deliverySeehandleClose"
      >
        <el-form
          :model="deliverySeeForm"
          :rules="deliveryRules"
          ref="deliverySeeForm"
          label-width="100px"
          class="demo-deliverySeeForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="出库方式：" prop="ckfs">
                <el-select v-model="deliverySeeForm.ckfs" placeholder="请选择">
                  <el-option
                    v-for="item in deliverySeeForm.ckfsList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出库面积：" prop="ckmj">
                <el-input v-model="deliverySeeForm.ckmj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="合同电子监管号：" prop="htdzjgh">
                <el-input v-model="deliverySeeForm.htdzjgh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="项目名称：" prop="xmmc">
                <el-input v-model="deliverySeeForm.xmmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="签订时间：" prop="qdsj">
                <el-date-picker
                  v-model="deliverySeeForm.qdsj"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '划转出库'">
              <el-form-item label="出库时间：" prop="cjsj">
                <el-date-picker
                  v-model="deliverySeeForm.cjsj"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '划转出库'">
              <el-form-item label="出库说明：" prop="cksm">
                <el-input v-model="deliverySeeForm.cksm"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="受让人：" prop="ssr">
                <el-input v-model="deliverySeeForm.ssr"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="金额：" prop="je">
                <el-input v-model="deliverySeeForm.je"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="deliverySeeForm.ckfs == '供应出库'">
              <el-form-item label="坐落：" prop="zl">
                <el-input v-model="deliverySeeForm.zl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import mixinsNowTime from "../../mixins/nowTime";
import { mapState } from "vuex";
import AMap from "../AMap/index2";
export default {
  mixins: [mixinsNowTime()],
  computed: {
    ...mapState(["page", "pageSize"]),
  },
  components: {
    AMap,
  },
  data() {
    return {
      total: 0,
      mapDialogVisible: false, //地图模式
      btnFlag: false,
      btnName: "高级筛选",
      form: {
        // name: "cyy",
        szxzq: [], //行政区
        newSzxzq: "", //搜索传的行政区
        year: "", //年份
        startTime: "",
        endTime: "",
        zt: "", //储备状态
        ztList: [],
        nfcr: "", //能否出让
        cbjgmc: "", //搜索
      },
      xzqList: [],
      tableData: [],
      enclosureDialogVisible: false, //附件弹出框
      enclosureTableData: [],
      cbdkGxxx: {}, //通过row传来的对象
      journalDialogVisible: false, //日志弹出框
      journalTitle: "", //日志标题
      journalTableData: [],
      cbdkOperationLog: {}, //通过row传来的对象
      deliveryDialogVisible: false, //出库弹出框,
      deliveryObj: {}, //通过row传来的对象
      deliveryForm: {
        ckfs: "供应出库",
        ckfsList: [
          {
            value: "供应出库",
            label: "供应出库",
          },
          {
            value: "划转出库",
            label: "划转出库",
          },
        ],
        ckmj: "",
        htdzjgh: "",
        xmmc: "",
        qdsj: "",
        ssr: "",
        je: "",
        zl: "",
        cksj: "",
        cksm: "",
      },
      deliveryRules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
      deliveryRecordDialogVisible: false, //日志记录弹出框
      deliveryRecordTableData: [],
      getckListRecordID: "", //出库记录row的ID
      deliverySeeDialogVisible: false, //出库记录详情
      deliverySeeForm: {},
    };
  },
  async created() {
    await this.getData();
    const res2 = await this.$api.selectEnums();
    res2.data.forEach((ele) => {
      if (ele.name == "状态") {
        // 状态
        this.form.ztList.push(ele);
      }
    });
  },
  watch: {
    page: function (page) {
      this.$store.commit("page", page);
      this.getData();
    },
    pageSize: function (pageSize) {
      this.$store.commit("pageSize", pageSize);
      this.getData();
    },
  },
  methods: {
    // 地图模式
    mapBtnClick() {
      this.mapDialogVisible = true;
    },
    maphandleClose() {
      this.mapDialogVisible = false;
    },
    // 界址点下载
    async myDownload(row) {
      const res = await this.$api.download(row.id);
      window.open(res);
    },
    // 出库记录详情 start
    deliveryRecordSee(row) {
      this.journalTitle = row.dkmc;
      this.deliverySeeDialogVisible = true;
      this.deliverySeeForm = row;
      console.log(this.deliverySeeForm);
    },
    deliverySeehandleClose() {
      this.deliverySeeDialogVisible = false;
    },
    // 出库记录start
    deliveryRecordhandleClose() {
      this.deliveryRecordDialogVisible = false;
    },
    async deliveryRecordDelete(row) {
      await this.$api.delck(row.id);
      this.getckListApi(this.getckListRecordID);
    },
    async getckListApi(id) {
      const res = await this.$api.getckList(id);
      res.data.forEach((ele) => {
        if (ele.cjsj) {
          ele.cjsj = ele.cjsj.substring(0, 10);
        }
      });
      this.deliveryRecordTableData = res.data;
      console.log(res);
    },
    getckListRecord(row) {
      this.journalTitle = row.dkmc;
      this.deliveryRecordDialogVisible = true;
      this.getckListRecordID = row.id;
      this.getckListApi(row.id);
    },
    // 出库start
    // async getckListApi(row) {
    //   const res = await this.$api.getckList(row.id);
    //   console.log(res);
    // },
    getckList(row) {
      console.log(row);
      this.journalTitle = row.dkmc;
      this.deliveryDialogVisible = true;
      // this.getckListApi(row.id);
      this.deliveryObj = row;
    },
    async deliveryFormSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      const obj = {
        cbdkId: this.deliveryObj.id,
        // cjsj: new Date(),
        ckfs: this.deliveryForm.ckfs,
        ckmj: +this.deliveryForm.ckmj,
        cksj: this.deliveryForm.cksj,
        cksm: this.deliveryForm.cksm,
        czr: "2",
        dkbh: "",
        htdzjgh: this.deliveryForm.htdzjgh,
        je: this.deliveryForm.je,
        qdsj: this.deliveryForm.qdsj,
        srr: this.deliveryForm.srr,
        xmmc: this.deliveryForm.xmmc,
        zl: this.deliveryForm.zl,
      };
      const resp = await this.$api.addck(obj);
      console.log(resp);
      if (resp.code == 200) {
        this.$message({
          message: resp.msg,
          type: "success",
        });
        setTimeout(() => {
          this.deliveryDialogVisible = false;
        }, 1000);
      } else {
        this.$message.error(resp.msg);
      }
    },
    deliveryhandleClose() {
      this.deliveryDialogVisible = false;
    },
    // 根据id获取基础信息
    async selectJbxxById(row) {
      let dataById = await this.$api.selectJbxxById(row.id);
      dataById = dataById.data;
      console.log(dataById);
      this.$store.commit("selectJbxxByIdObj", dataById);
      this.$router.push({ name: "NewAdd" });
    },
    // 删除基础信息
    async deleteJbxx(row) {
      await this.$api.deleteJbxx(row.id);
      this.getData();
    },
    // 日志
    async getOperationLog(id) {
      let res = await this.$api.getOperationLog(id);
      console.log(res);
      res.data.forEach((e) => {
        e.operationTime = e.operationTime.slice(0, 10);
      });
      this.journalTableData = res.data;
      console.log(this.journalTableData);
    },
    journal(row) {
      console.log(row);
      this.journalTitle = row.dkmc;
      this.journalDialogVisible = true;
      this.getOperationLog(row.id);
      this.cbdkOperationLog = row;
    },
    journalhandleClose() {
      this.journalDialogVisible = false;
    },
    // 删除日志信息
    async deleteOperationLog(row) {
      await this.$api.deleteOperationLog(row.id);
      this.getOperationLog(this.cbdkOperationLog.id);
    },
    // 附件
    async getGxxx(id) {
      let res = await this.$api.getGxxx(id);
      console.log(res);
      res.data.forEach((e) => {
        e.czsj = e.czsj.slice(0, 10);
      });
      this.enclosureTableData = res.data;
      console.log(this.enclosureTableData);
    },
    enclosure(row) {
      console.log(row);
      this.journalTitle = row.dkmc;
      this.enclosureDialogVisible = true;
      this.getGxxx(row.id);
      this.cbdkGxxx = row;
    },
    // 删除更新信息
    async deleteGxxxx(row) {
      await this.$api.deleteGxxx(row.id);
      this.getGxxx(this.cbdkGxxx.id);
    },
    // 文件下载
    async fileDownload(row) {
      console.log(row)
      window.open(await this.$api.fileDownload(row.xgyjfj));
    },
    // 附件上传
    enclosureUpLoad() {
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      var file = event.target.files[0];
      console.log(file)
      let formData = new FormData();
      formData.append("file", file);
      let res = await this.$api.fileUpload(formData);
      console.log(this.cbdkGxxx);
      console.log(res)
      let obj = {
        cbdkId: this.cbdkGxxx.id,
        czr: "2",
        czsj: new Date(),
        xgyjfj: res.data,
        id: 0,
      };
      let ress = await this.$api.insertGxxx(obj);
      console.log(ress);
      let obj2 = {
        cbdkId: this.cbdkGxxx.id,
        descr: res.data,
        id: 0,
        operationId: 1,
        operationName: "admin",
        operationTime: new Date(),
      };
      let res2 = await this.$api.insertOperationLog(obj2);
      console.log(res2);
      this.getGxxx(this.cbdkGxxx.id);
    },
    handleClose() {
      this.enclosureDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.pageSize = val;
      this.$store.commit("pageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // this.page = val;
      this.$store.commit("page", val);
    },
    // 查询基本信息
    async getData() {
      const obj = {
        cbjgmc: this.form.cbjgmc,
        endTime: this.form.endTime,
        nfcr: this.form.nfcr,
        pageNum: this.page,
        pageSize: this.pageSize,
        startTime: this.form.startTime,
        szxzq: this.form.newSzxzq,
        zt: this.form.zt,
      };
      console.log(obj);
      let data = await this.$api.selectJbxx(obj);
      this.total = data.total;
      this.tableData = data.data;
      console.log(this.tableData, data, this.total);
      this.searchDataById(50);
      let data1 = await this.$api.getXzs();
      this.xzqList = data1.data;
    },
    // 根据id获取基础信息
    async searchDataById(id) {
      let dataById = await this.$api.selectJbxxById(id);
      dataById = dataById.data;
      // console.log(dataById);
    },
    getBtnName() {
      if (this.btnFlag) {
        this.btnName = "高级筛选";
      } else {
        this.btnName = "普通筛选";
      }
      this.btnFlag = !this.btnFlag;
    },
    // 搜索
    onSubmit() {
      if (this.form.year && this.form.year.length == 2) {
        this.form.startTime = this.formatDate(this.form.year[0]);
        this.form.endTime = this.formatDate(this.form.year[1]);
      } else if (this.form.year && this.form.year.length == 4) {
        this.form.startTime = `${this.form.year}-01-01`;
        this.form.endTime = `${this.form.year}-12-31`;
      } else {
        this.form.startTime = "";
        this.form.endTime = "";
      }
      this.$store.commit('page',1)
      this.form.newSzxzq = this.form.szxzq.toString();
      this.getData();
    },
    // 重置
    resetForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].resetFields();
      this.form.endTime = "";
      this.form.startTime = "";
      this.form.newSzxzq = "";
      this.$store.commit('page',1)
      this.getData();
    },
    // 操作
    checkSee(row) {
      console.log(row);
    },
    // 跳转至新增页
    toNewAdd() {
      this.$store.commit("selectJbxxByIdObj", null);
      this.$router.push({ name: "NewAdd" });
    },
    formatDate(now) {
      var year = now.getFullYear(); //取得4位数的年份
      var month = now.getMonth() + 1; //取得日期中的月份，其中0表示1月，11表示12月
      var date = now.getDate(); //返回日期月份中的天数（1到31）
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      console.log(month, date);
      return year + "-" + month + "-" + date;
    },
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
  .el-form-item {
    display: flex;
    align-items: center !important;
    margin-bottom: 8px !important;
    .el-checkbox.is-bordered + .el-checkbox.is-bordered {
      margin-left: 0px !important;
    }
    .el-checkbox {
      margin-right: 10px !important;
    }
    .el-radio {
      margin-right: 0px !important;
    }
    /deep/ .el-form-item__label {
      width: 150px !important;
    }
    /deep/ .el-form-item__content {
      display: flex;
      .el-input {
        margin-right: 10px;
      }
      margin-left: 0px !important;
      .el-checkbox-group {
        display: flex;
        align-items: center !important;
        flex-flow: row wrap;
        align-content: flex-start;
      }
    }
  }
}

.tab {
  margin: 10px;
  .cell .el-icon-edit,
  .el-icon-download,
  .el-icon-tickets,
  .el-icon-paperclip,
  .el-icon-upload,
  .el-icon-s-finance,
  .el-icon-delete {
    font-size: 16px;
    margin: 0 4px;
    color: #409eff;
    cursor: pointer;
  }
  .el-pagination {
    margin: 16px 10px 0px 10px;
  }
}
</style>