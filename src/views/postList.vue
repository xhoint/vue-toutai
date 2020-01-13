<template>
  <div class="postlist">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <!-- 边框 -->
    <el-table :data="postList" style="width: 100%;margin-top:20px" border>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="title" label="标题" width="380"></el-table-column>
      <el-table-column label="类型" width="100">
        <!-- 自定义模板---判断文章或者视频 -->
        <template slot-scope="scope">{{scope.row.type===1?'文章':'视频'}}</template>
      </el-table-column>
      <el-table-column prop="create_date" label="日期" width="180">
        <!-- 添加日期 ----使用自定义模板-->
        <template slot-scope="scope">{{scope.row.create_date | dataFormat}}</template>
      </el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="150"></el-table-column>
      <el-table-column label="操作">
        <!-- 自定义模板 -->
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top">
            <el-button type="info" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[`${pageSize}`, `${pageSize + 2}`, `${pageSize + 4 }`, `${pageSize + 6}`]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { dataFormat } from '../utils/myfilters'
import { getPostList } from '../apis/article'
export default {
  filters: {
    dataFormat
  },
  data () {
    return {
      postList: [],
      pageIndex: 1,
      pageSize: 2,
      total: 0
    }
  },
  mounted () {
    this.init()
  },

  methods: {
    edit (data) {
      console.log(data)
    },
    async init () {
      let res = await getPostList({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      console.log(res)
      if (res.status === 200) {
        this.postList = res.data.data
        // 获取总记录数，方便后期的分页属性的设置
        this.total = res.data.total
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.pageIndex = val
      // 发起数据请求
      this.init()
    }
  }
}
</script>

<style>
</style>
