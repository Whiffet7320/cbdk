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
        <a-anchor-link href="#anchor-2" title="3 地块规划信息" />
        <a-anchor-link href="#anchor-3" title="4 地块状态信息" />
        <a-anchor-link href="#anchor-4" title="5 管护及利用情况" />
        <a-anchor-link href="#anchor-5" title="6 拟收储情况" />
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
            <el-col :span="10">
              <el-form-item label="拟收储地块编号：" prop="nscdkbh">
                <el-input v-model="ruleForm.nscdkbh"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地块编号：" prop="dkbh">
                <el-input v-model="ruleForm.dkbh"></el-input>
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
            <el-col :span="24">
              <el-form-item label="所在行政区：" prop="szxzq">
                <el-cascader
                  v-model="ruleForm.szxzq"
                  :options="this.ruleForm.szxzqList"
                  @change="this.changeCity"
                ></el-cascader>
                <!-- <el-select v-model="ruleForm.szxzq" placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.szxzqList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="所在街道：" prop="szjd">
                <el-select v-model="ruleForm.szjd" placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.szjdList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="地块面积(公顷)：" prop="dkmj">
                <el-input v-model="ruleForm.dkmj"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="拟收储地块面积：" prop="nscmj">
                <el-input v-model="ruleForm.nscmj"></el-input>
              </el-form-item>
            </el-col>
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
        <div style="height: 146px" :id="'anchor-1'">
          <el-divider content-position="left">2 地块产权信息</el-divider>
          <el-col :span="10">
            <el-form-item label="是否进行不动产登记：" prop="sfjxbdcdj">
              <el-radio-group v-model="ruleForm.sfjxbdcdj" size="small">
                <el-radio label="是" border>是</el-radio>
                <el-radio label="否" border>否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="不动产权人：" prop="bdcqr">
              <el-input v-model="ruleForm.bdcqr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="不动产权证书号：" prop="bdcqzsh">
              <el-input v-model="ruleForm.bdcqzsh"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="证载面积：" prop="zzmj">
              <el-input v-model="ruleForm.zzmj"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <div style="height: 146px" :id="'anchor-2'">
          <el-divider content-position="left">3 地块规划信息</el-divider>
          <el-col :span="10">
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
          </el-col>
        </div>
        <div style="height: 250px" :id="'anchor-3'">
          <el-divider content-position="left">4 地块状态信息</el-divider>
          <el-col :span="24">
            <el-form-item label="前期开发情况：" prop="qqkfqk">
              <el-checkbox-group
                class="qqkfqk"
                v-model="ruleForm.qqkfqk"
                size="small"
              >
                <el-checkbox label="通路" border></el-checkbox>
                <el-checkbox label="供水" border></el-checkbox>
                <el-checkbox label="供气" border></el-checkbox>
                <el-checkbox label="供电" border></el-checkbox>
                <el-checkbox label="排水" border></el-checkbox>
                <el-checkbox label="通讯" border></el-checkbox>
                <el-checkbox label="通暖" border></el-checkbox>
                <el-checkbox label="土地平整" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地上物情况：" prop="dswqk">
              <el-input v-model="ruleForm.dswqk"></el-input>
            </el-form-item>
          </el-col>
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
        <div style="height: 80px" :id="'anchor-4'">
          <el-divider content-position="left">5 管护及利用情况</el-divider>
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
        </div>
        <div style="height: 740px" :id="'anchor-5'">
          <el-divider content-position="left">6 拟收储情况</el-divider>
          <el-col :span="10">
            <el-form-item label="操作人：" prop="czr">
              <el-input v-model="ruleForm.czr"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="基准地价：" prop="jzdj">
              <el-input v-model="ruleForm.jzdj"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="楼面地价：" prop="lmdj">
              <el-input v-model="ruleForm.lmdj"></el-input>
            </el-form-item>
          </el-col>
          <!-- 文件上传 -->
          <el-col :span="10">
            <el-form-item
              v-if="!this.selectJbxxByIdObj"
              label="界址点文件上传："
              prop="jzdsc"
            >
              <el-button type="primary" @click="upLoadFile" plain
                >文件上传</el-button
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
                <el-radio label="有意向单位" border>有意向单位</el-radio>
                <el-radio label="无意向单位" border>无意向单位</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="住宅地块不出让原因：" prop="zzdkbncrdyy">
              <el-select v-model="ruleForm.zzdkbncrdyy" placeholder="请选择">
                <el-option
                  v-for="item in ruleForm.zzdkbncrdyyList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="状态：" prop="zt">
              <el-radio-group v-model="ruleForm.zt" size="small">
                <el-radio label="在库" border>在库</el-radio>
                <el-radio label="部分出库" border>部分出库</el-radio>
                <el-radio label="已出库" border>已出库</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="不能出让原因 ：" prop="bncrbmyy">
              <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                :autosize="{ minRows: 3, maxRows: 5 }"
                v-model="ruleForm.bncrbmyy"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
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
          </el-col>
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
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pageTitle: "",
      file: null,
      valid: false,
      checkList: [],
      upLoadObj: {},
      // 文件上传
      SKUupLoaddialogVisible: false,
      header: "",
      fileList: [],
      ruleForm: {
        // 1 地块基础信息
        name: "",
        cbjgmc: "",
        dkdzbh: "",
        dkmc: "",
        nscdkbh: "",
        dkbh: "",
        rksj: "",
        // 行政区
        szxzqList: [
          {
            value: "鹿城区",
            label: "鹿城区",
            children: [
              {
                value: "五马街道",
                label: "五马街道",
              },
              {
                value: "七都街道",
                label: "七都街道",
              },
              {
                value: "滨江街道",
                label: "滨江街道",
              },
              {
                value: "南汇街道",
                label: "南汇街道",
              },
              {
                value: "松台街道",
                label: "松台街道",
              },
              {
                value: "双屿街道",
                label: "双屿街道",
              },
              {
                value: "仰以街道",
                label: "仰以街道",
              },
              {
                value: "大南街道",
                label: "大南街道",
              },

              {
                value: "蒲鞋市街道",
                label: "蒲鞋市街道",
              },
              {
                value: "南郊街道",
                label: "南郊街道",
              },
              {
                value: "广化街道",
                label: "广化街道",
              },
              {
                value: "丰门街道",
                label: "丰门街道",
              },
              {
                value: "藤桥镇",
                label: "藤桥镇",
              },
              {
                value: "山福镇",
                label: "山福镇",
              },
            ],
          },
          {
            value: "龙湾区",
            label: "龙湾区",
            children: [
              {
                value: "永中街道",
                label: "永中街道",
              },
              {
                value: "蒲州街道",
                label: "蒲州街道",
              },
              {
                value: "海滨街道",
                label: "海滨街道",
              },
              {
                value: "永兴街道",
                label: "永兴街道",
              },
              {
                value: "状元街道",
                label: "状元街道",
              },
              {
                value: "瑶溪街道",
                label: "瑶溪街道",
              },
            ],
          },
          {
            value: "瓯海区",
            label: "瓯海区",
            children: [
              {
                value: "景山街道",
                label: "景山街道",
              },
              {
                value: "梧田街道",
                label: "梧田街道",
              },
              {
                value: "南白象街道",
                label: "南白象街道",
              },
              {
                value: "茶山街道",
                label: "茶山街道",
              },
              {
                value: "娄桥街道",
                label: "娄桥街道",
              },
              {
                value: "新桥街道",
                label: "新桥街道",
              },
              {
                value: "三洋街道",
                label: "三洋街道",
              },
              {
                value: "瞿溪街道",
                label: "瞿溪街道",
              },

              {
                value: "郭溪街道",
                label: "郭溪街道",
              },
              {
                value: "潘桥街道",
                label: "潘桥街道",
              },
              {
                value: "潘桥街道",
                label: "潘桥街道",
              },
              {
                value: "仙岩街道",
                label: "仙岩街道",
              },
              {
                value: "泽雅镇",
                label: "泽雅镇",
              },
            ],
          },
          {
            value: "洞头区",
            label: "洞头区",
            children: [
              {
                value: "北岙街道",
                label: "北岙街道",
              },
              {
                value: "灵昆街道",
                label: "灵昆街道",
              },
              {
                value: "东屏街道",
                label: "东屏街道",
              },
              {
                value: "元觉街道",
                label: "元觉街道",
              },
              {
                value: "大门镇",
                label: "大门镇",
              },
              {
                value: "鹿西乡",
                label: "鹿西乡",
              },
            ],
          },
          {
            value: "永嘉县",
            label: "永嘉县",
            children: [
              {
                value: "东城街道",
                label: "东城街道",
              },
              {
                value: "北城街道",
                label: "北城街道",
              },
              {
                value: "南城街道",
                label: "南城街道",
              },
              {
                value: "三洋街道",
                label: "三洋街道",
              },
              {
                value: "黄田街道",
                label: "黄田街道",
              },
              {
                value: "乌牛街道",
                label: "乌牛街道",
              },
              {
                value: "瓯北街道",
                label: "瓯北街道",
              },
              {
                value: "桥头镇",
                label: "桥头镇",
              },

              {
                value: "桥下镇",
                label: "桥下镇",
              },
              {
                value: "大若岩镇",
                label: "大若岩镇",
              },
              {
                value: "碧莲镇",
                label: "碧莲镇",
              },
              {
                value: "岩头镇",
                label: "岩头镇",
              },
              {
                value: "枫林镇",
                label: "枫林镇",
              },
              {
                value: "岩坦镇",
                label: "岩坦镇",
              },

              {
                value: "沙头镇",
                label: "沙头镇",
              },
              {
                value: "鹤盛镇",
                label: "鹤盛镇",
              },

              {
                value: "金溪镇",
                label: "金溪镇",
              },
              {
                value: "云岭乡",
                label: "云岭乡",
              },
              {
                value: "茗岙乡",
                label: "茗岙乡",
              },
              {
                value: "溪下乡",
                label: "溪下乡",
              },
              {
                value: "界坑乡",
                label: "界坑乡",
              },
              {
                value: "县特产场场区",
                label: "县特产场场区",
              },
              {
                value: "四海山林场",
                label: "四海山林场",
              },
              {
                value: "正江山林场",
                label: "正江山林场",
              },
            ],
          },
          {
            value: "平阳县",
            label: "平阳县",
            children: [
              {
                value: "昆阳镇",
                label: "昆阳镇",
              },
              {
                value: "鳌江镇",
                label: "鳌江镇",
              },
              {
                value: "水头镇",
                label: "水头镇",
              },
              {
                value: "萧江镇",
                label: "萧江镇",
              },
              {
                value: "腾蛟镇",
                label: "腾蛟镇",
              },
              {
                value: "山门镇",
                label: "山门镇",
              },
              {
                value: "顺溪镇",
                label: "顺溪镇",
              },
              {
                value: "南雁镇",
                label: "南雁镇",
              },

              {
                value: "万全镇",
                label: "万全镇",
              },
              {
                value: "海西镇",
                label: "海西镇",
              },
              {
                value: "南麂镇",
                label: "南麂镇",
              },
              {
                value: "麻步镇",
                label: "麻步镇",
              },
              {
                value: "风卧镇",
                label: "风卧镇",
              },
              {
                value: "怀溪镇",
                label: "怀溪镇",
              },

              {
                value: "青街畲族乡",
                label: "青街畲族乡",
              },
              {
                value: "闹村乡",
                label: "闹村乡",
              },
              {
                value: "滨海新区",
                label: "滨海新区",
              },
            ],
          },
          {
            value: "苍南县",
            label: "苍南县",
            children: [
              {
                value: "灵溪镇",
                label: "灵溪镇",
              },
              {
                value: "宜山镇",
                label: "宜山镇",
              },
              {
                value: "钱库镇",
                label: "钱库镇",
              },
              {
                value: "金乡镇",
                label: "金乡镇",
              },
              {
                value: "藻溪镇",
                label: "藻溪镇",
              },
              {
                value: "桥墩镇",
                label: "桥墩镇",
              },
              {
                value: "矾山镇",
                label: "矾山镇",
              },
              {
                value: "赤溪镇",
                label: "赤溪镇",
              },

              {
                value: "马站镇",
                label: "马站镇",
              },
              {
                value: "炎亭镇",
                label: "炎亭镇",
              },
              {
                value: "大渔镇",
                label: "大渔镇",
              },
              {
                value: "莒溪镇",
                label: "莒溪镇",
              },
              {
                value: "南宋镇",
                label: "南宋镇",
              },
              {
                value: "霞关镇",
                label: "霞关镇",
              },

              {
                value: "沿浦镇",
                label: "沿浦镇",
              },
              {
                value: "凤阳畲族乡",
                label: "凤阳畲族乡",
              },
              {
                value: "岱岭畲族乡",
                label: "岱岭畲族乡",
              },
            ],
          },
          {
            value: "文成县",
            label: "文成县",
            children: [
              {
                value: "大峃镇",
                label: "大峃镇",
              },
              {
                value: "百丈漈镇",
                label: "百丈漈镇",
              },
              {
                value: "南田镇",
                label: "南田镇",
              },
              {
                value: "西坑畲族镇",
                label: "西坑畲族镇",
              },
              {
                value: "黄坦镇",
                label: "黄坦镇",
              },
              {
                value: "珊溪镇",
                label: "珊溪镇",
              },
              {
                value: "巨屿镇",
                label: "巨屿镇",
              },
              {
                value: "玉壶镇",
                label: "玉壶镇",
              },

              {
                value: "峃口镇",
                label: "峃口镇",
              },
              {
                value: "周壤镇",
                label: "周壤镇",
              },
              {
                value: "铜铃山镇",
                label: "铜铃山镇",
              },
              {
                value: "二源镇",
                label: "二源镇",
              },
              {
                value: "周山畲族乡",
                label: "周山畲族乡",
              },
              {
                value: "桂山乡",
                label: "桂山乡",
              },

              {
                value: "双桂乡",
                label: "双桂乡",
              },
              {
                value: "平和乡",
                label: "平和乡",
              },
              {
                value: "公阳乡",
                label: "公阳乡",
              },
            ],
          },
          {
            value: "泰顺县",
            label: "泰顺县",
            children: [
              {
                value: "罗阳镇",
                label: "罗阳镇",
              },
              {
                value: "司前畲族镇",
                label: "司前畲族镇",
              },
              {
                value: "百丈镇",
                label: "百丈镇",
              },
              {
                value: "筱村镇",
                label: "筱村镇",
              },
              {
                value: "泗溪镇",
                label: "泗溪镇",
              },
              {
                value: "彭溪镇",
                label: "彭溪镇",
              },
              {
                value: "雅阳镇",
                label: "雅阳镇",
              },
              {
                value: "仕阳镇",
                label: "仕阳镇",
              },

              {
                value: "三魁镇",
                label: "三魁镇",
              },
              {
                value: "南浦溪镇",
                label: "南浦溪镇",
              },
              {
                value: "龟湖镇",
                label: "龟湖镇",
              },
              {
                value: "西旸镇",
                label: "西旸镇",
              },
              {
                value: "竹里畲族乡",
                label: "竹里畲族乡",
              },
              {
                value: "包垟乡",
                label: "包垟乡",
              },

              {
                value: "凤垟乡",
                label: "凤垟乡",
              },
              {
                value: "东溪乡",
                label: "东溪乡",
              },
              {
                value: "柳峰乡",
                label: "柳峰乡",
              },
              {
                value: "雪溪乡",
                label: "雪溪乡",
              },
              {
                value: "大安乡",
                label: "大安乡",
              },
              {
                value: "乌岩岭自然保护区",
                label: "乌岩岭自然保护区",
              },
            ],
          },
          {
            value: "瑞安市",
            label: "瑞安市",
            children: [
              {
                value: "安阳街道",
                label: "安阳街道",
              },
              {
                value: "玉海街道",
                label: "玉海街道",
              },
              {
                value: "锦湖街道",
                label: "锦湖街道",
              },
              {
                value: "东山街道",
                label: "东山街道",
              },
              {
                value: "上望街道",
                label: "上望街道",
              },
              {
                value: "莘塍街道",
                label: "莘塍街道",
              },
              {
                value: "汀田街道",
                label: "汀田街道",
              },
              {
                value: "飞云街道",
                label: "飞云街道",
              },

              {
                value: "仙降街道",
                label: "仙降街道",
              },
              {
                value: "南滨街道",
                label: "南滨街道",
              },
              {
                value: "潘岱街道",
                label: "潘岱街道",
              },
              {
                value: "云周街道",
                label: "云周街道",
              },
              {
                value: "塘下镇",
                label: "塘下镇",
              },
              {
                value: "马屿镇",
                label: "马屿镇",
              },

              {
                value: "陶山镇",
                label: "陶山镇",
              },
              {
                value: "湖岭镇",
                label: "湖岭镇",
              },
              {
                value: "高楼镇",
                label: "高楼镇",
              },
              {
                value: "桐浦镇",
                label: "桐浦镇",
              },
              {
                value: "林川镇",
                label: "林川镇",
              },
              {
                value: "曹村镇",
                label: "曹村镇",
              },
              {
                value: "平阳坑镇",
                label: "平阳坑镇",
              },
              {
                value: "芳庄乡",
                label: "芳庄乡",
              },
              {
                value: "北麂乡",
                label: "北麂乡",
              },
            ],
          },
          {
            value: "乐清市",
            label: "乐清市",
            children: [
              {
                value: "城东街道",
                label: "城东街道",
              },
              {
                value: "乐成街道",
                label: "乐成街道",
              },
              {
                value: "城南街道",
                label: "城南街道",
              },
              {
                value: "盐盆街道",
                label: "盐盆街道",
              },
              {
                value: "翁垟街道",
                label: "翁垟街道",
              },
              {
                value: "白石街道",
                label: "白石街道",
              },
              {
                value: "石帆街道",
                label: "石帆街道",
              },
              {
                value: "天成街道",
                label: "天成街道",
              },

              {
                value: "大荆镇",
                label: "大荆镇",
              },
              {
                value: "仙溪镇",
                label: "仙溪镇",
              },
              {
                value: "雁荡镇",
                label: "雁荡镇",
              },
              {
                value: "芙蓉镇",
                label: "芙蓉镇",
              },
              {
                value: "虹桥镇",
                label: "虹桥镇",
              },
              {
                value: "清江镇",
                label: "清江镇",
              },

              {
                value: "淡溪镇",
                label: "淡溪镇",
              },
              {
                value: "柳市镇",
                label: "柳市镇",
              },
              {
                value: "北白象镇",
                label: "北白象镇",
              },
              {
                value: "湖雾镇",
                label: "湖雾镇",
              },
              {
                value: "南塘镇",
                label: "南塘镇",
              },
              {
                value: "南岳镇",
                label: "南岳镇",
              },
              {
                value: "蒲岐镇",
                label: "蒲岐镇",
              },
              {
                value: "磐石镇",
                label: "磐石镇",
              },
              {
                value: "智仁乡",
                label: "智仁乡",
              },
              {
                value: "龙西乡",
                label: "龙西乡",
              },
              {
                value: "岭底乡",
                label: "岭底乡",
              },
            ],
          },
          {
            value: "经开区",
            label: "经开区",
            children: [
              {
                value: "海城街道",
                label: "海城街道",
              },
              {
                value: "沙城街道",
                label: "沙城街道",
              },
              {
                value: "天河街道",
                label: "天河街道",
              },
              {
                value: "星海街道",
                label: "星海街道",
              },
            ],
          },
        ],
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
        nscmj: "",
        zjmj: "",
        dkzl: "",
        // 2 地块产权信息
        sfjxbdcdj: "1-1",
        bdcqr: "",
        bdcqzsh: "",
        zzmj: "",
        // 3 地块规划信息
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
        zzydmj: "",
        sfydmj: "",
        qtydmj: "",
        // 4 地块状态信息
        qqkfqk: [],
        dswqk: "",
        dswqksm: "",
        // 5 管护及利用情况
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
          {
            value: "工业及仓储用地",
            label: "工业及仓储用地",
          },
          {
            value: "教育及科研用地",
            label: "教育及科研用地",
          },
          {
            value: "道路及绿化用地",
            label: "道路及绿化用地",
          },
          {
            value: "文化设施用地",
            label: "文化设施用地",
          },
          {
            value: "其他用地",
            label: "其他用地",
          },
        ],
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
          {
            value: "临时周转房",
            label: "临时周转房",
          },
          {
            value: "政府项目或政府单位临时利用",
            label: "政府项目或政府单位临时利用",
          },
          {
            value: "有偿出租",
            label: "有偿出租",
          },
          {
            value: "其他临时利用",
            label: "其他临时利用",
          },
        ],
        sydk: "",
        // 住宅地块不出让原因
        zzdkbncrdyy: "",
        zzdkbncrdyyList: [
          {
            value: "自身原因（价格低或没人要）",
            label: "自身原因（价格低或没人要）",
          },
          {
            value: "政府限制（市政府不让卖）",
            label: "政府限制（市政府不让卖）",
          },
          {
            value: "规划限制（如地铁、轨道交通）",
            label: "规划限制（如地铁、轨道交通）",
          },
          {
            value: "信访原因",
            label: "信访原因",
          },
          {
            value: "其他原因",
            label: "其他原因",
          },
        ],
        zt: "5-1",
        bncrbmyy: "",
        crjh: "",
        bz: "",
      },
      rules: {
        jzdsc: [{ required: true, message: "请上传文件", trigger: "change" }],
        cbjgmc: [
          { required: true, message: "请输入储备机构名称", trigger: "blur" },
        ],
        dkdzbh: [
          {
            required: true,
            message: "请输入入库地块电子编号",
            trigger: "blur",
          },
        ],
        dkmc: [{ required: true, message: "请输入地块名称", trigger: "blur" }],
        nscdkbh: [
          { required: true, message: "请输入拟收储地块编号", trigger: "blur" },
        ],
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
        nscmj: [
          { required: true, message: "请输入拟收储地块面积", trigger: "blur" },
        ],
        zjmj: [{ required: true, message: "请输入在库面积", trigger: "blur" }],
        dkzl: [{ required: true, message: "请输入地块坐落", trigger: "blur" }],
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
        qqkfqk: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个前期开发情况",
            trigger: "change",
          },
        ],
        dswqk: [{ required: true, message: "请输入其他面积", trigger: "blur" }],
        rksjhghfs: [
          { required: true, message: "请输入入库时管护方式", trigger: "blur" },
        ],
        rksjhlyfs: [
          { required: true, message: "请输入入库时利用方式", trigger: "blur" },
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
  created() {
    console.log(this.selectJbxxByIdObj);
    if (this.selectJbxxByIdObj) {
      this.ruleForm = { ...this.ruleForm, ...this.selectJbxxByIdObj };
      this.pageTitle = "修改页面";
    } else {
      this.pageTitle = "新增页面";
    }
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
        this.ruleForm.qqkfqk = this.ruleForm.qqkfqk.replace(/,/g, ";") + ";";
        console.log(this.ruleForm.qqkfqk);
        // console.log(this.ruleForm);
        let res = null;
        if (!this.selectJbxxByIdObj) {
          // 新增
          const myObj = { ...this.ruleForm };
          myObj.null = null;
          myObj.jzdj = myObj.jzdj.toString();
          delete myObj.name;
          delete myObj.fjyxydlxList;
          delete myObj.szjdList;
          delete myObj.szxzqList;
          delete myObj.ylslyList;
          delete myObj.zdwwcList;
          delete myObj.zzdkbncrdyyList;
          console.log(myObj);
          res = await this.$api.saveJbxx(myObj); //新增
          console.log(res);
        } else {
          // 修改
          const myObj = { ...this.ruleForm };
          myObj.null = null;
          myObj.jzdj = myObj.jzdj.toString();
          delete myObj.name;
          delete myObj.shape;
          delete myObj.fjyxydlxList;
          delete myObj.szjdList;
          delete myObj.szxzqList;
          delete myObj.ylslyList;
          delete myObj.zdwwcList;
          delete myObj.zzdkbncrdyyList;
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
    // 文件上传
    upLoadFile() {
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      this.file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", this.file);
      let res = await this.$api.upload(formData);
      console.log(res);
      if (res.code == 200) {
        const obj = {
          ghyt: res.data.dkyt,
          dkbh: res.data.qkbh,
          zjmj: res.data.tdmj,
          dkmc: res.data.zcdkmc,
        };
        // console.log(obj);
        this.upLoadObj = obj;
        // console.log(
        //   this.ruleForm,
        //   this.ruleForm.ghyt,
        //   this.ruleForm.dkbh,
        //   this.ruleForm.zjmj,
        //   this.ruleForm.dkmc
        // );
        // this.SKUupLoadTableData = obj;
        this.SKUupLoaddialogVisible = true;
        this.rules.jzdsc[0].required = false;
        this.$refs.ruleForm.validateField("jzdsc", (val) => {
          console.log(val)
        });
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
</style>