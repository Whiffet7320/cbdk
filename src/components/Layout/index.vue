<template>
  <el-container>
    <el-header>
        <slot name='header'></slot>
    </el-header>
    <el-main>
        <slot name='default'></slot>
    </el-main>
  </el-container>
</template> 


<style>
.el-header,
.el-footer {
  background-color: #409EFF;
  color: #fff;
  text-align: center;
  line-height: 60px;
}


.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>