<template>
    <div class="dashboard-editor-container" aria-label="center">
      <time-group @handleSetLineChartData="handleSetLineChartData" />
      <!-- 添加或修改数据列表对话框 -->
      <el-dialog :title="title" :visible.sync="open" append-to-body>
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item label="内容类型" prop="typeId">
            <treeselect v-model="form.typeId" :options="typeOptions" :show-count="true" placeholder="请选择内容类型" />
          </el-form-item>
          <el-form-item label="内容说明">
            <editor v-model="form.timeContent" :min-height="192"/>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import TimeGroup from '@/views/dashboard/TimeGroup'
import {treeselect} from "@/api/system/type";
import {addTime_data, getEndTimeIsNull, getTime_data, updateTime_data} from "@/api/time/time_data";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
export default {
  name: 'Index',
  components: {
    TimeGroup,
    Treeselect,
  },
  data() {
    return {
      typeOptions: undefined,
      // 遮罩层
      loading: true,
      // 表单参数
      form: {},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 表单校验
      rules: {
      }
    }
  },
  created() {
    this.getTreeselect();
    this.getIsEnd();
  },
  methods: {
    /** 查詢事件是否結束 */
    getIsEnd(){
      let _this = this;
      getEndTimeIsNull().then(response=>{
        if(response.data!=undefined){
          _this.$confirm('您有一条数据还没有结束"' , "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(function() {
            _this.reset();
            getTime_data(response.data.id).then(response => {
              _this.form = response.data;
              _this.open = true;
              _this.title = "修改数据列表";
            });
          }).catch(() => {
            _this.open = false;
          });

        }
      });
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        startTime: null,
        endTime: null,
        timeContent: null,
        typeId: null
      };
      this.resetForm("form");
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTime_data(this.form).then(response => {
              this.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTime_data(this.form).then(response => {
              this.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 查询类型下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        this.typeOptions = response.data;
      });
    },
    handleSetLineChartData(type) {

      this.reset();
      if(type=="start"){
        this.form.startTime = new Date();
        this.open = true;
        this.title = "请选择一个类型";
      }else if(type == "end"){
        this.form.endTime = new Date();
        getEndTimeIsNull().then(response=> {
          this.reset();
          getTime_data(response.data.id).then(response => {
            this.form = response.data;
            this.open = true;
            this.title = "修改数据列表";
          });
        });
      }else{}

    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
