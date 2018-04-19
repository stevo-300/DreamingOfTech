<template>
  <div> 
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Processing Center</el-menu-item>
      <el-submenu index="2">
        <template slot="title">Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">Orders</a></el-menu-item>
    </el-menu>
    <div class="line"></div>
    
        <el-row>
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </el-row>

        <el-row>
          <el-button @click="visible = true">Button</el-button>
          <el-dialog :visible.sync="visible" title="Hello world">
            <p>Try Element</p>
          </el-dialog>
        </el-row>

        <el-row>
          <el-badge :value="12" class="item">
  <el-button type='danger' size="small">comments</el-button>
</el-badge>
<el-badge :value="3" class="item">
  <el-button size="small">replies</el-button>
</el-badge>
        </el-row>
        
    </div>
</template>

<script>
import Element from "element-ui";
export default {
  data: function() {
    return {
      visible: false,
      value1: "",
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {
    ElButton: Element.Button,
    ElRow: Element.Row,
    ElDialog: Element.Dialog,
    ElBadge: Element.Badge,
    ElMenu: Element.Menu,
    ElSubmenu: Element.Submenu,
    ElMenuItem: Element.MenuItem
  }
};
</script>

<style>
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>