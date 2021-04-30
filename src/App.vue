<template>
  <div id="app">
    <Layout>
      <template #header>
        <Header />
      </template>
      <template #default>
        <RouterView class="routerView" />
      </template>
    </Layout>
  </div>
</template>


<script>
import Layout from "./components/Layout";
import Header from "./components/Header";

export default {
  name: "App",
  components: {
    Layout,
    Header,
  },
  mounted() {
    const oScript = document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src = "https://iclient.supermap.io/web/libs/iclient8c/libs/SuperMap.Include.js";
    document.body.appendChild(oScript);
  },
};
</script>

<style>
@import "./assets/reset.css";
#app {
  height: 100vh;
}
.el-container.is-vertical {
  height: 100% !important;
}
.el-main {
  height: 100% !important;
  padding: 0 !important;
  background-color: #fff !important;
  color: #333;
  text-align: start !important;
  line-height: 16px !important;
  overflow-y: scroll !important;
}
.routerView {
  padding: 0 10%;
  /* overflow-y: scroll; */
}
</style>
