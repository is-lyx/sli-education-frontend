import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'el-icon-house', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'Documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/activation-code',
    component: Layout,
    redirect: '/activation-code/index',
    children: [
      {
        path: 'index',
        name: '激活码管理',
        component: () => import('@/views/activation-code/index'),
        meta: { title: '激活码管理', icon: 'el-icon-thumb' }
      }
    ]
  },
  {
    path: '/school-management',
    component: Layout,
    redirect: '/school-management/learning-situation',
    name: '校务管理',
    meta: {
      title: '校务管理',
      icon: 'el-icon-office-building'
    },
    children: [
      {
        path: 'learning-situation',
        name: '学习情况',
        component: () => import('@/views/school-management/learning-situation/index'),
        meta: { title: '学习情况' }
      },
      {
        path: '/StudyReport',
        name: '学习报告',
        component: () => import('@/views/school-management/learning-situation/StudyReport'),
        meta: { title: '学习报告' },
        hidden: true
      },
      {
        path: '/WorkDetail',
        name: '作业详情',
        component: () => import('@/views/school-management/learning-situation/WorkDetail'),
        meta: { title: '作业详情' },
        hidden: true
      },
      {
        path: 'student-management',
        name: '学生管理',
        component: () => import('@/views/school-management/student-management/index'),
        meta: { title: '学生管理' }
      },
      {
        path: 'teacher-management',
        name: '教师管理',
        component: () => import('@/views/school-management/teacher-management/index'),
        meta: { title: '教师管理' }
      },
      {
        path: 'class-management',
        name: '班级管理',
        component: () => import('@/views/school-management/class-management/index'),
        meta: { title: '班级管理' }
      },
      {
        path: 'grade-management',
        name: '年级管理',
        component: () => import('@/views/school-management/grade-management/index'),
        meta: { title: '年级管理' }
      },
      {
        path: 'student-recycle-bin',
        name: '学生回收站',
        component: () => import('@/views/school-management/student-recycle-bin/index'),
        meta: { title: '学生回收站' }
      }
    ]
  },
  {
    path: '/course-management',
    component: Layout,
    redirect: '/course-management/error-correction',
    name: '课程管理',
    meta: {
      title: '课程管理',
      icon: 'el-icon-document-copy'
    },
    children: [
      {
        path: 'error-correction',
        name: '题目纠错',
        component: () => import('@/views/course-management/error-correction/index'),
        meta: { title: '题目纠错' }
      },
      {
        path: 'topic-entry-management',
        name: '题目录入管理',
        component: () => import('@/views/course-management/topic-entry-management/index'),
        meta: { title: '题目录入管理' }
      }
    ]
  },
  {
    path: '/operation-test',
    component: Layout,
    redirect: '/operation-test/student-work',
    name: '作业考试',
    meta: {
      title: '作业考试',
      icon: 'el-icon-edit'
    },
    children: [
      {
        path: '/student-work',
        name: '学生作业',
        component: () => import('@/views/operation-test/student-work/index'),
        meta: { title: '学生作业' }
      }, {
        path: '/AddStudentWork',
        name: '添加作业',
        component: () => import('@/views/operation-test/student-work/AddStudentWork'),
        meta: { title: '添加作业' },
        hidden: true
      }, {
        path: '/EditStudentWork',
        name: '编辑作业',
        component: () => import('@/views/operation-test/student-work/EditStudentWork'),
        meta: { title: '编辑作业' },
        hidden: true
      }, {
        path: 'class-work',
        name: '班级作业',
        component: () => import('@/views/operation-test/class-work/index'),
        meta: { title: '班级作业' }
      }, {
        path: '/DetailReport',
        name: '详情报告',
        component: () => import('@/views/operation-test/class-work/DetailReport'),
        meta: { title: '详情报告' },
        hidden: true
      },
      {
        path: 'test-distribution',
        name: '考试分发',
        component: () => import('@/views/operation-test/test-distribution/index'),
        meta: { title: '考试分发' }
      }
    ]
  },
  {
    path: '/intelligent-learning',
    component: Layout,
    redirect: '/intelligent-learning/group-center',
    name: '无电脑智能学习',
    meta: {
      title: '无电脑智能学习',
      icon: 'el-icon-monitor'
    },
    children: [
      {
        path: 'group-center',
        component: () => import('@/views/intelligent-learning/group-center/index'),
        name: '组卷中心',
        meta: { title: '组卷中心' }
      },
      {
        path: 'pre-school-test',
        component: () => import('@/views/intelligent-learning/pre-school-test/index'), // Parent router-view
        name: '学前测试',
        meta: { title: '学前测试' },
        redirect: '/intelligent-learning/pre-school-test/print-the-entry',
        children: [
          {
            path: 'print-the-entry',
            component: () => import('@/views/intelligent-learning/pre-school-test/print-the-entry'),
            name: '打印录入',
            meta: { title: '打印录入' }
          },
          {
            path: 'report-details',
            component: () => import('@/views/intelligent-learning/pre-school-test/report-details'),
            name: '报告详情',
            meta: { title: '报告详情' }
          }
        ]
      },
      {
        path: 'unit-operation',
        component: () => import('@/views/intelligent-learning/unit-operation/index'), // Parent router-view
        name: '单元作业',
        meta: { title: '单元作业' },
        redirect: '/intelligent-learning/unit-operation/print-the-entry',
        children: [
          {
            path: 'print-the-entry',
            component: () => import('@/views/intelligent-learning/unit-operation/print-the-entry'),
            name: '打印录入',
            meta: { title: '打印录入' }
          },
          {
            path: 'report-details',
            component: () => import('@/views/intelligent-learning/unit-operation/report-details'),
            name: '报告详情',
            meta: { title: '报告详情' }
          }
        ]
      },
      {
        path: 'paper-test',
        component: () => import('@/views/intelligent-learning/paper-test/index'), // Parent router-view
        name: '试卷考试',
        meta: { title: '试卷考试' },
        redirect: '/intelligent-learning/paper-test/print-the-entry',
        children: [
          {
            path: 'print-the-entry',
            component: () => import('@/views/intelligent-learning/paper-test/print-the-entry'),
            name: '打印录入',
            meta: { title: '打印录入' }
          },
          {
            path: 'report-details',
            component: () => import('@/views/intelligent-learning/paper-test/report-details'),
            name: '报告详情',
            meta: { title: '报告详情' }
          }
        ]
      },
      {
        path: 'wrong-topic-test',
        component: () => import('@/views/intelligent-learning/wrong-topic-test/index'), // Parent router-view
        name: '错题测试',
        meta: { title: '错题测试' },
        redirect: '/intelligent-learning/wrong-topic-test/print-the-entry',
        children: [
          {
            path: 'print-the-entry',
            component: () => import('@/views/intelligent-learning/wrong-topic-test/print-the-entry'),
            name: '打印录入',
            meta: { title: '打印录入' }
          },
          {
            path: 'report-details',
            component: () => import('@/views/intelligent-learning/wrong-topic-test/report-details'),
            name: '报告详情',
            meta: { title: '报告详情' }
          }
        ]
      }
    ]
  },
  {
    path: '/synchronous-test',
    component: Layout,
    redirect: '/synchronous-test/paper-bag/index',
    children: [
      {
        path: 'paper-bag/index',
        name: '同步试题包',
        component: () => import('@/views/synchronous-test/paper-bag/index'),
        meta: { title: '同步试题包', icon: 'el-icon-position' }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/icons/index'),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,

  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import('@/views/example/create'),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/example/list'),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/tab/index'),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import('@/views/error-log/index'),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import('@/views/excel/export-excel'),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import('@/views/excel/select-excel'),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import('@/views/excel/merge-header'),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import('@/views/excel/upload-excel'),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import('@/views/zip/index'),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/pdf/index'),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
