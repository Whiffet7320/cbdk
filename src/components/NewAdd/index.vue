<template>
  <div class="newAdd">
    <div class="top">
      <!-- <el-button type="primary" icon="el-icon-arrow-left" size="small"
        >返回</el-button
      > -->
      <el-page-header @back="goBack" :content="pageTitle"> </el-page-header>
      <a-anchor class="leftNav" @click="handleClick">
        <a-anchor-link href="#anchor-0" title="1 地块基础信息" />
        <a-anchor-link href="#anchor-1" title="2 地块产权信息" />
        <a-anchor-link href="#anchor-2" title="3 添加各类规划用途" />
        <a-anchor-link href="#anchor-3" title="4 地块状态信息" />
        <!-- <a-anchor-link href="#anchor-4" title="5 管护及利用情况" /> -->
        <a-anchor-link href="#anchor-4" title="5 做地情况" />
      </a-anchor>
    </div>
    <div class="container">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div :id="'anchor-0'">
          <el-divider content-position="left">1 地块基础信息</el-divider>
          <el-row>
            <el-col :span="10">
              <el-form-item label="储备机构名称：" prop="cbjgmc">
                <el-input v-model="ruleForm.cbjgmc"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="入库地块电子编号：" prop="dkdzbh">
                <el-input v-model="ruleForm.dkdzbh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地块名称：" prop="dkmc">
                <el-input v-model="ruleForm.dkmc"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="10">
              <el-form-item label="拟收储地块编号：" prop="nscdkbh">
                <el-input v-model="ruleForm.nscdkbh"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="10">
              <el-form-item label="地块编号：" prop="dkbh">
                <el-input v-model="ruleForm.dkbh"></el-input>
              </el-form-item>
            </el-col>
            <!-- 文件上传 -->
            <el-col :span="10">
              <el-form-item label="界址点文件上传：" prop="jzdsc">
                <el-button type="primary" @click="upLoadFile" plain
                  >文件上传</el-button
                >
                <el-button v-if="isDetail" @click="detaliClick" plain
                  >详情</el-button
                >
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
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="入库时间：" prop="rksj">
                <el-date-picker
                  v-model="ruleForm.rksj"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所在行政区：" prop="szxzq">
                <el-cascader
                  v-model="ruleForm.szxzq"
                  :options="this.ruleForm.szxzqList"
                  @change="this.changeCity"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地块面积(公顷)：" prop="dkmj">
                <el-input v-model="ruleForm.dkmj"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="10">
              <el-form-item label="拟收储地块面积：" prop="nscmj">
                <el-input v-model="ruleForm.nscmj"></el-input>
              </el-form-item>
            </el-col> -->
            <el-col :span="10">
              <el-form-item label="在库面积：" prop="zjmj">
                <el-input v-model="ruleForm.zjmj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地块坐落：" prop="dkzl">
                <el-input v-model="ruleForm.dkzl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div
          :style="{ height: ruleForm.sfjxbdcdj == '是' ? '140px' : '80px' }"
          :id="'anchor-1'"
        >
          <el-divider content-position="left">2 地块产权信息</el-divider>
          <el-col :span="10">
            <el-form-item label="是否进行不动产登记：" prop="sfjxbdcdj">
              <el-radio-group v-model="ruleForm.sfjxbdcdj" size="small">
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.sfjxbdcdj == '是'">
            <el-form-item label="不动产权人：" prop="bdcqr">
              <el-input v-model="ruleForm.bdcqr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.sfjxbdcdj == '是'">
            <el-form-item label="不动产权证书号：" prop="bdcqzsh">
              <el-input v-model="ruleForm.bdcqzsh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.sfjxbdcdj == '是'">
            <el-form-item label="证载面积：" prop="zzmj">
              <el-input v-model="ruleForm.zzmj"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div style="height: 400px" :id="'anchor-2'">
          <el-divider content-position="left">3 添加各类规划用途</el-divider>
          <el-button class="tabBtn" @click="tabAdd" type="primary"
            >新增</el-button
          >
          <el-table :data="tableData" border style="width: 60%">
            <el-table-column fixed prop="ghyt" label="规划用途">
            </el-table-column>
            <el-table-column prop="mj" label="面积(亩)"> </el-table-column>
            <el-table-column prop="rjl" label="容积率"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="ghytEdit(scope)" type="text" size="small"
                  >修改</el-button
                >
                <el-button @click="ghytDelete(scope)" type="text" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-col :span="10">
            <el-form-item label="规划用途：" prop="ghyt">
              <el-select v-model="ruleForm.ghyt" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.ghytList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="住宅面积：" prop="zzydmj">
              <el-input v-model="ruleForm.zzydmj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商服面积：" prop="sfydmj">
              <el-input v-model="ruleForm.sfydmj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="其他面积：" prop="qtydmj">
              <el-input v-model="ruleForm.qtydmj"></el-input>
            </el-form-item>
          </el-col> -->
        </div>
        <div style="height: 350px" :id="'anchor-3'">
          <el-divider content-position="left">4 地块状态信息</el-divider>
          <el-col :span="24">
            <el-form-item label="前期开发情况：" prop="qqkfqk">
              <el-checkbox-group
                class="qqkfqk"
                v-model="ruleForm.qqkfqk"
                size="small"
              >
                <el-checkbox
                  v-for="item in this.qqkfqkList"
                  :key="item.id"
                  :label="item.value"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入库时管护方式：" prop="rksjhghfs">
              <el-input v-model="ruleForm.rksjhghfs"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="入库时利用方式：" prop="rksjhlyfs">
              <el-input v-model="ruleForm.rksjhlyfs"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地上物情况：" prop="dswqk">
              <el-input v-model="ruleForm.dswqk"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="临时利用情况：" prop="lslyqk">
              <el-input v-model="ruleForm.lslyqk"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="地上物情况说明 ：" prop="dswqksm">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="ruleForm.dswqksm"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </div>
        <div style="height: 740px" :id="'anchor-4'">
          <el-divider content-position="left">5 做地情况</el-divider>
          <!-- <el-col :span="10">
            <el-form-item label="操作人：" prop="czr">
              <el-input v-model="ruleForm.czr"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="10">
            <el-form-item label="做地是否完成：" prop="zdsfwc">
              <el-radio-group
                @change="zdsfwcChange"
                v-model="ruleForm.zdsfwc"
                size="small"
              >
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.zdsfwc">
            <el-form-item label="是否达到出让条件：" prop="sfddcrtj">
              <el-radio-group
                @change="sfddcrtjChange"
                v-model="ruleForm.sfddcrtj"
                size="small"
              >
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.zdsfwc">
            <el-form-item label="是否列入出让计划：" prop="crjh">
              <el-radio-group v-model="ruleForm.crjh" size="small">
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.crjh == '是'">
            <el-form-item label="计划年份：" prop="jhnf">
              <el-input v-model="ruleForm.jhnf"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" v-if="ruleForm.zdsfwc">
            <el-form-item label="基准地价：" prop="jzdj">
              <el-input v-model="ruleForm.jzdj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="楼面地价：" prop="lmdj">
              <el-input v-model="ruleForm.lmdj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="取得方式：" prop="qdfs">
              <el-input v-model="ruleForm.qdfs"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="能否出让：" prop="nfcr">
              <el-radio-group v-model="ruleForm.nfcr" size="small">
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="非经营性用地类型：" prop="fjyxydlx">
              <el-select v-model="ruleForm.fjyxydlx" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.fjyxydlxList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="坐地未完成：" prop="zdwwc">
              <el-select v-model="ruleForm.zdwwc" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.zdwwcList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="有临时利用：" prop="ylsly">
              <el-select v-model="ruleForm.ylsly" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.ylslyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="商业地块：" prop="sydk">
              <el-radio-group v-model="ruleForm.sydk" size="small">
                <el-radio
                  v-for="item in this.sydk"
                  :key="item.id"
                  :label="item.value"
                  border
                  >{{ item.value }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="不能出让原因：" prop="bncrbmyy">
              <el-select v-model="ruleForm.bncrbmyy" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.bncrbmyyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="10">
            <el-form-item label="状态：" prop="zt">
              <el-radio-group v-model="ruleForm.zt" size="small">
                <el-radio label="在库" border>在库</el-radio>
                <el-radio label="部分出库" border>部分出库</el-radio>
                <el-radio label="已出库" border>已出库</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <!-- <el-form-item label="不能出让原因 ：" prop="bncrbmyy">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="ruleForm.bncrbmyy"
              >
              </el-input>
            </el-form-item> -->
          </el-col>
          <!-- <el-col :span="24">
            <el-form-item label="出让计划 ：" prop="crjh">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="ruleForm.crjh"
              >
              </el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="24">
            <el-form-item label="备注 ：" prop="bz">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="ruleForm.bz"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <div class="btns">
                <el-button type="primary" @click="submitForm('ruleForm')"
                  >保存</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </div>
            </el-form-item>
          </el-col>
        </div>
      </el-form>
      <!-- 文件上传 -->
      <el-dialog
        title="是否更改以下数据"
        :visible.sync="SKUupLoaddialogVisible"
        width="46%"
      >
        <el-checkbox-group v-model="checkList">
          <el-row>
            <el-col :span="24">
              <el-checkbox
                :label="`地块名称：${ruleForm.dkmc} -> ${upLoadObj.dkmc}`"
              ></el-checkbox>
            </el-col>
            <el-col :span="24">
              <el-checkbox
                :label="`地块编号：${ruleForm.dkbh} -> ${upLoadObj.dkbh}`"
              ></el-checkbox>
            </el-col>
            <el-col :span="24">
              <el-checkbox
                :label="`在库面积：${ruleForm.zjmj} -> ${upLoadObj.zjmj}`"
              ></el-checkbox
            ></el-col>
            <el-col :span="24">
              <el-checkbox
                :label="`规划用途：${ruleForm.ghyt} -> ${upLoadObj.ghyt}`"
              ></el-checkbox>
            </el-col>
          </el-row>
        </el-checkbox-group>
        <span slot="footer" class="dialog-footer">
          <el-button @click="SKUupLoaddialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="isTrue">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 规划用途 -->
      <el-dialog
        title="修改规划用途"
        :visible.sync="ghytdialogVisible"
        width="46%"
      >
        <el-form ref="ghytform" :model="ghytform" label-width="80px">
          <el-form-item label="规划用途：" prop="ghyt">
            <el-select v-model="ghytform.ghyt" placeholder="请选择">
              <el-option
                v-for="item in ghytform.ghytList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="面积(亩)">
            <el-input v-model="ghytform.mj"></el-input>
          </el-form-item>
          <el-form-item label="容积率">
            <el-input v-model="ghytform.rjl"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="ghytonSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 地图模式 -->
      <el-dialog
        title="地图模式"
        :visible.sync="this.mapDialogVisible"
        width="50%"
        :before-close="maphandleClose"
      >
        <AMap />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AMap from "../AMap/index";
export default {
  components: {
    AMap,
  },
  data() {
    return {
      mapDialogID: true,
      shape: null,
      add_data: {},
      formData: new FormData(),
      sydk: [], //商业地块
      qqkfqkList: [], // 前期开发情况
      mapDialogVisible: false, //地图模式
      pageTitle: "",
      file: null,
      valid: false,
      checkList: [],
      upLoadObj: {},
      // 规划用途
      ghytdialogVisible: false,
      tableData: [],
      tableDataIndex: null,
      ghytAddorEdit: null,
      ghytform: {
        mj: "",
        rjl: "",
        ghyt: "",
        ghytList: [
          {
            value: "住宅",
            label: "住宅",
          },
          {
            value: "商服",
            label: "商服",
          },
          {
            value: "其他",
            label: "其他",
          },
          {
            value: "住宅与商服",
            label: "住宅与商服",
          },
          {
            value: "住宅与其他",
            label: "住宅与其他",
          },
          {
            value: "商服与其他",
            label: "商服与其他",
          },
        ],
      },
      // 文件上传
      SKUupLoaddialogVisible: false,
      header: "",
      fileList: [],
      // 详情按钮是否显示
      isDetail: false,

      ruleForm: {
        // 1 地块基础信息
        name: "",
        cbjgmc: "",
        dkdzbh: "",
        dkmc: "",
        // nscdkbh: "",
        dkbh: "",
        rksj: "",
        // 行政区
        szxzqList: [],
        szxzq: "",
        // 街道
        szjdList: [
          {
            value: "yz",
            label: "永中街道",
          },
          {
            value: "pz",
            label: "蒲州街道",
          },
          {
            value: "hb",
            label: "海滨街道",
          },
          {
            value: "yx",
            label: "永兴街道",
          },
          {
            value: "ws",
            label: "五山街道",
          },
        ],
        szjd: "",
        dkmj: "",
        // nscmj: "",
        zjmj: "",
        dkzl: "",
        // 2 地块产权信息
        sfjxbdcdj: "1-1",
        bdcqr: "",
        bdcqzsh: "",
        zzmj: "",
        // 3 添加各类规划用途
        // ghyt: "",
        // ghytList: [
        //   {
        //     value: "住宅",
        //     label: "住宅",
        //   },
        //   {
        //     value: "商服",
        //     label: "商服",
        //   },
        //   {
        //     value: "其他",
        //     label: "其他",
        //   },
        //   {
        //     value: "住宅与商服",
        //     label: "住宅与商服",
        //   },
        //   {
        //     value: "住宅与其他",
        //     label: "住宅与其他",
        //   },
        //   {
        //     value: "商服与其他",
        //     label: "商服与其他",
        //   },
        // ],
        // 4 地块状态信息
        qqkfqk: [],
        dswqk: "",
        dswqksm: "",
        // lslyqk: "",
        rksjhghfs: "",
        rksjhlyfs: "",
        // 6 拟收储情况
        czr: "",
        jzdj: "",
        lmdj: "",
        qdfs: "",
        nfcr: "3-1",
        // 非经营性用地类型
        fjyxydlx: "",
        fjyxydlxList: [
          // {
          //   value: "工业及仓储用地",
          //   label: "工业及仓储用地",
          // },
          // {
          //   value: "教育及科研用地",
          //   label: "教育及科研用地",
          // },
          // {
          //   value: "道路及绿化用地",
          //   label: "道路及绿化用地",
          // },
          // {
          //   value: "文化设施用地",
          //   label: "文化设施用地",
          // },
          // {
          //   value: "其他用地",
          //   label: "其他用地",
          // },
        ],
        // 坐地是否完成
        zdsfwc: null,
        crjh: "",
        sfddcrtj: "",
        // crjh:'',
        // 坐地未完成
        zdwwc: "",
        zdwwcList: [
          {
            value: "收储地块内部做地未完成",
            label: "收储地块内部做地未完成",
          },
          {
            value: "地块外部做地未完成",
            label: "地块外部做地未完成",
          },
          {
            value: "收储范围与红线范围不一致",
            label: "收储范围与红线范围不一致",
          },
        ],
        // 有临时利用
        ylsly: "",
        ylslyList: [
          // {
          //   value: "临时周转房",
          //   label: "临时周转房",
          // },
          // {
          //   value: "政府项目或政府单位临时利用",
          //   label: "政府项目或政府单位临时利用",
          // },
          // {
          //   value: "有偿出租",
          //   label: "有偿出租",
          // },
          // {
          //   value: "其他临时利用",
          //   label: "其他临时利用",
          // },
        ],
        sydk: "",
        // 住宅地块不出让原因
        bncrbmyy: "",
        bncrbmyyList: [
          // {
          //   value: "自身原因（价格低或没人要）",
          //   label: "自身原因（价格低或没人要）",
          // },
          // {
          //   value: "政府限制（市政府不让卖）",
          //   label: "政府限制（市政府不让卖）",
          // },
          // {
          //   value: "规划限制（如地铁、轨道交通）",
          //   label: "规划限制（如地铁、轨道交通）",
          // },
          // {
          //   value: "信访原因",
          //   label: "信访原因",
          // },
          // {
          //   value: "其他原因",
          //   label: "其他原因",
          // },
        ],
        zt: "5-1",
        bz: "",
      },
      rules: {
        bdcqzsh: [
          { required: true, message: "请输入不动产权证书号", trigger: "blur" },
        ],
        zzmj: [{ required: true, message: "请输入证载面积", trigger: "blur" }],
        // jzdsc: [{ required: true, message: "请上传文件", trigger: "change" }],
        cbjgmc: [
          { required: true, message: "请输入储备机构名称", trigger: "blur" },
        ],
        dkmc: [{ required: true, message: "请输入地块名称", trigger: "blur" }],
        dkbh: [{ required: true, message: "请输入地块编号", trigger: "blur" }],
        rksj: [
          {
            // type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        szxzq: [{ required: true, message: "请选择行政区", trigger: "change" }],
        dkmj: [{ required: true, message: "请输入地块面积", trigger: "blur" }],
        zjmj: [{ required: true, message: "请输入在库面积", trigger: "blur" }],
        sfjxbdcdj: [
          {
            required: true,
            message: "请选择是否进行不动产登记",
            trigger: "change",
          },
        ],
        ghyt: [
          {
            required: true,
            message: "请选择规划用途",
            trigger: "change",
          },
        ],
        zzydmj: [
          { required: true, message: "请输入住宅面积", trigger: "blur" },
        ],
        sfydmj: [
          { required: true, message: "请输入商服面积", trigger: "blur" },
        ],
        qtydmj: [
          { required: true, message: "请输入其他面积", trigger: "blur" },
        ],
        czr: [{ required: true, message: "请输入操作人", trigger: "blur" }],
        //  界址点文件上传还没验证***
        qdfs: [{ required: true, message: "请输入取得方式", trigger: "blur" }],
        nfcr: [
          { required: true, message: "请选择能否出让", trigger: "change" },
        ],
        zt: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
    };
  },
  computed: {
    ...mapState(["selectJbxxByIdObj"]),
  },
  async created() {
    // 获取行政区和街道
    const res = await this.$api.getXzs();
    res.data.forEach((ele) => {
      ele.value = ele.location;
      ele.label = ele.location;
      ele.children = [];
      this.$api.getJdsByXzId(ele.id).then((res) => {
        res.data.forEach((item) => {
          item.value = item.jie;
          item.label = item.jie;
          delete item.id;
          delete item.isCentralCity;
          delete item.jie;
          delete item.xzId;
          ele.children.push(item);
        });
      });
      delete ele.id;
      delete ele.location;
    });
    this.ruleForm.szxzqList = [...res.data];

    const res2 = await this.$api.selectEnums();
    res2.data.forEach((ele) => {
      if (ele.name == "前期开发情况") {
        // 前期开发情况
        this.qqkfqkList.push(ele);
      }
      if (ele.name == "非经营性用地类型") {
        //非经营性用地类型
        ele.label = ele.value;
        this.ruleForm.fjyxydlxList.push(ele);
      }
      if (ele.name == "有临时利用") {
        //有临时利用
        ele.label = ele.value;
        this.ruleForm.ylslyList.push(ele);
      }
      if (ele.name == "商业地块") {
        //商业地块
        ele.label = ele.value;
        this.sydk.push(ele);
      }
      if (ele.name == "不能出让原因") {
        //不能出让原因
        ele.label = ele.value;
        this.ruleForm.bncrbmyyList.push(ele);
      }
    });
    // console.log(this.ruleForm.fjyxydlxList);
    // console.log(this.selectJbxxByIdObj);
    if (this.selectJbxxByIdObj) {
      const shapeRes = await this.$api.getshape(this.selectJbxxByIdObj.id);
      let shape = shapeRes.data;
      //转换后的坐标
      this.shape = "MULTIPOLYGON(";
      for (var f = 0; f < shape.length; f++) {
        var polygon1 = shape[f];
        this.shape += "((";
        for (var h = 0; h < polygon1.length; h++) {
          this.shape += polygon1[h][0] + " " + polygon1[h][1] + ",";
        }
        this.shape = this.shape.substr(0, this.shape.length - 1);
        this.shape += ")),";
      }
      this.shape = this.shape.substr(0, this.shape.length - 1);
      this.shape += ")";
      this.isDetail = true;
      this.tableData = this.selectJbxxByIdObj.cbdkDkghxxes;
      this.ruleForm = { ...this.ruleForm, ...this.selectJbxxByIdObj };
      this.pageTitle = "修改页面";
    } else {
      this.pageTitle = "新增页面";
    }
    console.log(this.ruleForm.qqkfqk);
    if (this.ruleForm.qqkfqk && this.ruleForm.qqkfqk.length !== 0) {
      this.ruleForm.qqkfqk = this.ruleForm.qqkfqk.split(";");
      this.ruleForm.qqkfqk.splice(-1, 1);
    } else {
      this.ruleForm.qqkfqk = [];
    }
    console.log(this.ruleForm.qqkfqk);
    this.ruleForm.szxzq = [this.ruleForm.szxzq, this.ruleForm.szjd];
    if (this.ruleForm.rksj) {
      let time = Date.parse(this.ruleForm.rksj);
      this.ruleForm.rksj = new Date(time);
    } else {
      this.ruleForm.rksj = "";
    }
  },
  methods: {
    // 修改规划用途
    ghytEdit(scope) {
      console.log(scope.row, scope.$index);
      this.tableDataIndex = scope.$index;
      this.ghytdialogVisible = true;
      this.ghytform.ghyt = scope.row.ghyt;
      this.ghytform.mj = scope.row.mj;
      this.ghytform.rjl = scope.row.rjl;
      this.ghytAddorEdit = true;
    },
    tabAdd() {
      this.ghytdialogVisible = true;
      this.ghytform.ghyt = "";
      this.ghytform.mj = "";
      this.ghytform.rjl = "";
      this.ghytAddorEdit = false;
    },
    ghytonSubmit() {
      if (this.ghytAddorEdit) {
        // 修改
        this.tableData[this.tableDataIndex].ghyt = this.ghytform.ghyt;
        this.tableData[this.tableDataIndex].mj = +this.ghytform.mj;
        this.tableData[this.tableDataIndex].rjl = +this.ghytform.rjl;
      } else {
        let obj = {
          ...this.ghytform,
        };
        delete obj.ghytList;
        obj.mj = +obj.mj;
        obj.rjl = +obj.rjl;
        obj.cbjgmc = this.ruleForm.cbjgmc;
        obj.crjh = null;
        obj.jbxxId = this.ruleForm.id;
        obj.nfcr = null;
        obj.szjd = this.ruleForm.szjd;
        if (typeof this.ruleForm.szxzq != "string") {
          obj.szxzq = this.ruleForm.szxzq[0];
        } else {
          obj.szxzq = this.ruleForm.szxzq;
        }
        this.tableData.push(obj);
      }
      console.log(this.tableData);
      this.ghytdialogVisible = false;
    },
    // 删除规划用途
    ghytDelete(scope) {
      console.log(scope.$index);
      this.tableData.splice(scope.$index, 1);
    },
    sfddcrtjChange(val) {
      if (val == "否") {
        this.ruleForm.crjh = "否";
      }
    },
    zdsfwcChange(val) {
      if (val == "否") {
        this.ruleForm.sfddcrtj = "否";
        this.ruleForm.crjh = "否";
      }
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
      return year + "-" + month + "-" + date;
    },
    // 行政区
    changeCity(val) {
      console.log(val);
    },
    // 保存
    async submitForm(formName) {
      console.log(this.ruleForm.sfjxbdcdj);
      // 验证
      await this.$refs[formName].validate((valid) => {
        if (valid) {
          this.valid = true;
          console.log("submit!");
        }
      });
      if (this.valid) {
        this.valid = false;
        if (this.ruleForm.rksj) {
          this.ruleForm.rksj = this.formatDate(this.ruleForm.rksj);
        }
        let newSzxzq = this.ruleForm.szxzq;
        this.ruleForm.szxzq = newSzxzq[0];
        this.ruleForm.szjd = newSzxzq[1];
        this.ruleForm.qqkfqk = this.ruleForm.qqkfqk.toString();
        if (this.ruleForm.qqkfqk != "") {
          this.ruleForm.qqkfqk = this.ruleForm.qqkfqk.replace(/,/g, ";") + ";";
        }
        // console.log(this.ruleForm);
        let res = null;
        if (!this.selectJbxxByIdObj) {
          // 新增
          const myObj = { ...this.ruleForm };
          myObj.cbdkDkghxxes = this.tableData;
          myObj.czr = "user1"; //默认操作人
          myObj.zt = "在库";
          myObj.cjsj = null;
          // myObj.null = null;
          if (myObj.jzdj) {
            myObj.jzdj = myObj.jzdj.toString();
          }
          delete myObj.name;
          delete myObj.fjyxydlxList;
          delete myObj.szjdList;
          delete myObj.szxzqList;
          delete myObj.ylslyList;
          delete myObj.zdwwc;
          delete myObj.zdwwcList;
          delete myObj.bncrbmyyList;
          console.log(myObj);
          res = await this.$api.saveJbxx(myObj); //新增
          console.log(res);
          const res2 = await this.$api.saveYstx({
            cbdkId: res.data.id,
            shape: res.data.shape,
          });
          console.log(res2);
        } else {
          // 修改
          const myObj = { ...this.ruleForm };
          myObj.cbdkDkghxxes = this.tableData;
          myObj.czr = "user1"; //默认操作人
          myObj.zt = "在库";
          myObj.cjsj = null;
          // myObj.null = null;
          if (myObj.jzdj) {
            myObj.jzdj = myObj.jzdj.toString();
          }
          delete myObj.name;
          // delete myObj.shape;
          delete myObj.fjyxydlxList;
          delete myObj.szjdList;
          delete myObj.szxzqList;
          delete myObj.ylslyList;
          delete myObj.zdwwc;
          delete myObj.zdwwcList;
          delete myObj.bncrbmyyList;
          console.log(myObj);
          res = await this.$api.updateJbxx(myObj); //修改
          console.log(res);
        }
        if (res.code == "200") {
          this.$message({
            message: res.msg,
            type: "success",
          });
          setTimeout(() => {
            this.$router.push({ name: "Administration" });
          }, 1000);
        } else {
          this.$message.error(res.msg);
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.push({ name: "Administration" });
    },
    handleClick(e, link) {
      e.preventDefault();
      console.log(link.href);
      this.$el.querySelector(link.href).scrollIntoView();
    },
    // 详情
    async detaliClick() {
      if (
        this.selectJbxxByIdObj &&
        this.selectJbxxByIdObj.id &&
        this.mapDialogID
      ) {
        const res = await this.$api.getshape(this.selectJbxxByIdObj.id);
        console.log(res.data);
        this.$store.commit("getshape", res.data);
      }
      this.mapDialogVisible = true;
    },
    // 文件上传
    upLoadFile() {
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      if (!this.formData) {
        this.formData = new FormData();
      }
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
      // let formData = new FormData();
      this.formData.append("file", this.file);
      console.log(this.formData.getAll("file"));
      console.log(this.formData);
      let res = await this.$api.upload(this.formData);
      console.log(res);
      if (res.code == 200) {
        this.formData.delete("file");
        this.formData = null;
        this.$refs.fileInputList.value = "";
        this.isDetail = true;
        console.log(res.data);
        this.$store.commit("mapObj", res.data);
        this.$store.commit("getshape", null);
        this.mapDialogID = false;
        this.mapDialogVisible = true;
        const obj = {
          ghyt: res.data.dkyt,
          dkbh: res.data.qkbh,
          zjmj: res.data.tdmj,
          dkmc: res.data.zcdkmc,
        };
        // console.log(obj);
        this.upLoadObj = obj;
        // //原坐标
        // this.shape = "MULTIPOLYGON(((";
        // // console.log(res.data.multiPolyGon);
        // for (var i = 0; i < res.data.multiPolyGon.length; i++) {
        //   var polygon = res.data.multiPolyGon[i];
        //   for (var j = 0; j < polygon.length; j++) {
        //     if (j == polygon.length - 1) {
        //       this.shape += polygon[j][0] + " " + polygon[j][1];
        //     } else {
        //       this.shape += polygon[j][0] + " " + polygon[j][1] + ",";
        //     }
        //   }
        //   this.shape += ")))";
        // }
        this.SKUupLoaddialogVisible = true;
        //转换后的坐标
        var shape1 = "MULTIPOLYGON(";
        for (var f = 0; f < res.data.showMultiPolyGon.length; f++) {
          var polygon1 = res.data.showMultiPolyGon[f];
          shape1 += "((";
          for (var h = 0; h < polygon1.length; h++) {
            shape1 += polygon1[h][0] + " " + polygon1[h][1] + ",";
          }
          shape1 = shape1.substr(0, shape1.length - 1);
          shape1 += ")),";
        }
        shape1 = shape1.substr(0, shape1.length - 1);
        shape1 += ")";
        this.ruleForm.shape = shape1;
      } else {
        this.$message.error("地块文件格式错误");
      }
    },
    // SKUupLoadHandleClose() {
    //   this.file = null;
    //   this.SKUupLoaddialogVisible = false;
    // },
    isTrue() {
      console.log(this.checkList);
      this.checkList.forEach((ele) => {
        if (ele.indexOf("地块名称")) {
          this.ruleForm.dkmc = this.upLoadObj.dkmc;
        }
        if (ele.indexOf("地块编号")) {
          this.ruleForm.dkbh = this.upLoadObj.dkbh;
        }
        if (ele.indexOf("在库面积")) {
          this.ruleForm.zjmj = this.upLoadObj.zjmj;
        }
        if (ele.indexOf("规划用途")) {
          this.ruleForm.ghyt = this.upLoadObj.ghyt;
        }
        this.SKUupLoaddialogVisible = false;
      });
    },
    maphandleClose() {
      this.mapDialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  margin: 20px;
  position: relative;
  .leftNav {
    z-index: 999;
    position: fixed;
    right: 260px;
    height: 300px;
  }
}
.container {
  border: 1px solid #ddd;
  margin-bottom: 30px;
  padding: 10px;
}
// 验证
.el-form-item.is-required {
  display: flex;
  /deep/ .el-form-item__label {
    width: 200px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 0px !important;
    width: 280px;
  }
}
// 未验证
.el-form-item {
  display: flex;
  /deep/ .el-form-item__label {
    width: 200px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 0px !important;
    width: 280px;
  }
}

.el-checkbox-group {
  width: 900px;
  transform: translateY(4px);
  .el-checkbox {
    margin-right: 0;
  }
}
.el-radio-group {
  width: 300px;
  .el-radio {
    margin-right: 0;
  }
}
.btns {
  margin-left: 40px;
}
.el-table {
  transform: translate(4%, 6%);
}
.tabBtn {
  transform: translate(40px, 0);
}
</style>