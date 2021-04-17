<template>
  <div class="nav">
    <div class="nav-left">
      <p class="title">土地储备中心-储备地块管理</p>
      <el-menu
        :default-active="activeIndex"
        class="header-nav"
        mode="horizontal"
        @select="handleSelect"
        :router="true"
      >
        <el-menu-item
          index="Administration"
          :route="{ name: 'Administration' }"
        >
          <i class="el-icon-document"></i>
          <p>数据管理</p>
        </el-menu-item>
        <el-menu-item index="Statistics" :route="{ name: 'Statistics' }">
          <i class="el-icon-document-copy"></i>
          <p>数据统计</p>
        </el-menu-item>
      </el-menu>
    </div>

    <p class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>管理员1</el-dropdown-item>
          <el-dropdown-item disabled>管理员2</el-dropdown-item>
          <el-dropdown-item divided>管理员3</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: "",
    };
  },
  created() {
    // console.log(this.$route);
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/Administration/") {
        this.activeIndex = 'Administration'
      } else if (to.path == "/Statistics") {
        this.activeIndex = 'Statistics'
      } 
    },
  },
};
</script>

<style lang="scss">
.header-nav.el-menu--horizontal.el-menu {
  height: 61px !important;
}
.nav {
  display: flex;
  justify-content: space-between;
  margin: 0 42px;
  .nav-left {
    display: flex;
  }
  .title {
    font-size: 26px;
    font-weight: bold;
  }
  .header-nav {
    margin-left: 30px;
    background-color: #409eff !important;
    color: #fff !important;
    .el-menu-item {
      color: inherit !important;
      font-size: 16px;
      display: flex !important;
      justify-content: center;
      align-items: center;
      p {
        margin-bottom: 0;
      }
      .el-icon-document,
      .el-icon-document-copy {
        color: inherit !important;
      }
    }
    .el-menu-item.is-active {
      background-color: rgb(28, 127, 253) !important;
      border-bottom: 2px solid #fff !important;
    }
    .el-menu-item:hover {
      background-color: rgb(28, 127, 253) !important;
      border-bottom: 2px solid #fff !important;
    }
  }
  .user {
    float: right;
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
}
</style>