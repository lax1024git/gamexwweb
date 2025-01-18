// longKeep 设置，页面不会跟随登录状态刷新，其他都刷新新，数据存储在状态管理里的例外
const routes = [
  {
    path: "/",
    component: () => import("@/layout/Index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/Index.vue"),
        meta: {
          mobileHead: true,
          mobileTabbar: true,
          noLogin: true,
          longKeep: true,
        },
      },
      {
        path: "/Register",
        name: "Register",
        component: () => import("@/pages/register.vue"),
        meta: { 
          noLogin: true,
        }
      },
      {
        path: "/Login",
        name: "login",
        component: () => import("@/pages/Login.vue"),
        meta: { 
          noLogin: true,
        }
      },
      {
        path: "/sub-games",
        name: "sub-games",
        component: () => import("@/pages/SubGames.vue"),
        meta: {
          noLogin: true,
        },
      },
      {
        path: "/gameInfo/:id",
        name: "gameInfo",
        component: () => import("@/pages/GameInfo.vue"),
      },
      {
        path: "/agent",
        redirect: "/agent/shareLink",
        component: () => import("@/pages/Agent.vue"),
        name: "agent",
        children: [
          {
            path: "shareLink",
            name: "shareLink",
            component: () => import("@/components/page/agent/ShareLink.vue"),
          },
          {
            path: "agentNetwork",
            name: "agentNetwork",
            component: () => import("@/components/page/agent/AgentNetwork.vue"),
          },
          {
            path: "registerSubordinate",
            name: "registerSubordinate",
            component: () =>
              import("@/components/page/agent/RegisterSubordinate.vue"),
          },
          {
            path: "myCommission",
            name: "myCommission",
            component: () => import("@/components/page/agent/MyCommission.vue"),
          },
          {
            path: "myIncome",
            name: "myIncome",
            component: () => import("@/components/page/agent/MyIncome.vue"),
          },
          {
            path: "allData",
            name: "allData",
            component: () => import("@/components/page/agent/AllData.vue"),
          },
          {
            path: "subordinateBetting",
            name: "subordinateBetting",
            component: () =>
              import("@/components/page/agent/SubordinateBetting.vue"),
          },
          {
            path: "directMembers",
            name: "directMembers",
            component: () =>
              import("@/components/page/agent/DirectMembers.vue"),
          },
          {
            path: "directBonus",
            name: "directBonus",
            component: () => import("@/components/page/agent/DirectBonus.vue"),
          },
          {
            path: "rebateRatio",
            name: "rebateRatio",
            component: () => import("@/components/page/agent/RebateRatio.vue"),
          },
        ],
      },
      {
        path: "/report",
        name: "report",
        component: () => import("@/pages/Report.vue"),
      },
      {
        path: "/msgCenter",
        name: "msgCenter",
        component: () => import("@/pages/MsgCenter.vue"),
        meta: {
          noLogin: true,
        },
      },
      {
        path: "/retrieveTheBalance",
        name: "retrieveTheBalance",
        component: () => import("@/pages/RetrieveTheBalance.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/pages/Profile.vue"),
      },
      {
        path: "/securityCenter",
        name: "securityCenter",
        component: () => import("@/pages/SecurityCenter.vue"),
      },
      {
        path: "/phone",
        name: "phone",
        component: () => import("@/pages/Phone.vue"),
      },
      {
        path: "/email",
        name: "email",
        component: () => import("@/pages/Email.vue"),
      },
      {
        path: "/googleAuthenticator",
        name: "googleAuthenticator",
        component: () => import("@/pages/GoogleAuthenticator.vue"),
      },
      {
        path: "/loginPass",
        name: "loginPass",
        component: () => import("@/pages/LoginPass.vue"),
      },
      {
        path: "/withdrawalPass",
        name: "withdrawalPass",
        component: () => import("@/pages/WithdrawalPass.vue"),
      },
      {
        path: "/securityQuestion",
        name: "securityQuestion",
        component: () => import("@/pages/SecurityQuestion.vue"),
      },
      {
        path: "/linkThirdLogin",
        name: "linkThirdLogin",
        component: () => import("@/pages/LinkThirdLogin.vue"),
      },
      {
        path: "/withdraw",
        name: "withdraw",
        component: () => import("@/pages/Withdraw.vue"),
      },
      {
        path: "/WithdrawAccountManagement",
        name: "withdrawAccountManagement",
        component: () => import("@/pages/WithdrawAccountManagement.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path: "/BetRecord",
        name: "betRecord",
        component: () => import("@/pages/BetRecord.vue"),
      },
      {
        path: "/Transaction",
        name: "transaction",
        component: () => import("@/pages/Transaction.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path: "/playGameList",
        name: "playGameList",
        component: () => import("@/pages/playGameList.vue"),
      },
      {
        path: "/showGame",
        name: "showGame",
        component: () => import("@/pages/showGame.vue"),
      },
      {
        path: "/SiteMail",
        name: "siteMail",
        component: () => import("@/pages/SiteMail.vue"),
      },
      {
        path: "/Deposit",
        name: "Deposit",
        component: () => import("@/pages/Deposit.vue"),
      },
      {
        path: "/svgView",
        name: "svgView",
        component: () => import("@/pages/SvgView.vue"),
      },
      {
        path: "/interest",
        name: "interest",
        component: () => import("@/pages/Interest.vue"),
      },
      {
        path: "/activityShare",
        name: "activityShare",
        component: () => import("@/pages/ActivityShare.vue"),
      },
      {
        path: "/activityInfo/:id",
        name: "activityInfo",
        component: () => import("@/pages/ActivityInfo.vue"),
      },
      {
        path: "/activityDailyCumulativeRecharge",
        name: "activityDailyCumulativeRecharge",
        component: () => import("@/pages/ActivityDailyCumulativeRecharge.vue"),
      },
      {
        path: "/signIn",
        name: "signIn",
        component: () => import("@/pages/SignIn.vue"),
      },
      {
        path: "/turntable",
        name: "turntable",
        component: () => import("@/pages/Turntable.vue"),
      },
      {
        path:"/newactivity",
        name:"newactivity",
        component:()=>import("@/pages/newActivity.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path:"/activityContent",
        name:"activityContent",
        component:()=>import("@/pages/activityContent.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path:"/history",
        name:"history",
        component:()=>import("@/pages/History.vue"),
      },
      {
        path: "/userCenter",
        name: "userCenter",
        component: () => import("@/pages/UserCenter.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path: "/OnlineServices",
        name: "OnlineServices",
        component: () => import("@/pages/OnlineServices.vue"),
        meta: {
          noLogin: true,
          mobileTabbar: true,
        },
      },
      {
        path: "/RetrievePassword",
        name: "RetrievePassword",
        component: () => import("@/components/common/RetrievePassword.vue"),
        meta: {
          noLogin: true,
        },
      },
      {
        path: "/AddBank",
        name: "AddBank",
        component: () => import("@/components/common/AddBank.vue"),
      },
      {
        path: "/AddPIX",
        name: "AddPIX",
        component: () => import("@/components/common/AddPIX.vue"),
      },
      {
        path: "/AddUsdt",
        name: "AddUsdt",
        component: () => import("@/components/common/AddUsdt.vue"),
      },
      {
        path: "/AddElectronicWallet",
        name: "AddElectronicWallet",
        component: () => import("@/components/common/AddElectronicWallet.vue"),
      },
      {
        path: "/VIP",
        name: "VIP",
        component: () => import("@/pages/VipTwo.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path: "/RedemptionCenter",
        name: "RedemptionCenter",
        component: () => import("@/pages/RedemptionCenter.vue"),
        meta: {
          mobileTabbar: true,
        },
      },
      {
        path: "/BeginnerTeaching",
        name: "BeginnerTeaching",
        component: () => import("@/pages/BeginnerTeaching.vue"),
      },
      {
        path: "/BeginnerTeachingDetail/:id",
        name: "BeginnerTeachingDetail",
        component: () => import("@/pages/BeginnerTeachingDetail.vue"),
      },
      {
        path: "/promotion",
        name: "promotion",
        component: () => import("@/pages/Promotion.vue"),
        meta: {
          mobileTabbar: true,
        },
        redirect: "/promotion/activity/all",
        children: [
          {
            path: "activity",
            name: "activity",
            component: () => import("@/pages/Activity.vue"),
            redirect: "activity/all",
            meta: {
              mobileTabbar: true,
            },
            children: [
              {
                path: "all",
                name: "all",
                component: () => import("@/components/page/activity/All.vue"),
              },
            ],
          },
          /* {
            path: "history",
            name: "history",
            component: () => import("@/components/page/activity/History.vue"),
          },
          {
            path: "discount",
            name: "discount",
            component: () => import("@/components/page/activity/History.vue"),
          },
          {
            path: "mission",
            name: "mission",
            component: () => import("@/components/page/activity/History.vue"),
          }, */
        ],
      },
    ],
  },
  {
    path: "/luckysports",
    name: "luckysports",
    component: () => import("@/pages/Luckysports.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "404",
    component: () => import("@/pages/404.vue"),
  },
];
export default routes;
