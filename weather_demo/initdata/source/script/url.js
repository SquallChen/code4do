/**
 * @author louhyi
 * @explanation 请求路径
 *************************************************************************************/
var domain_1 = "http://app.scity.cn";
var domain_2 = "http://scity.cn";
var domain_3 = "http://benxi.scity.cn";
var domain_4 = "http://open.scity.cn/appstore/api/menu/";
var domain_5 = "http://192.168.30.57:8080/basic1/service/";
var domain6 =  "http://www.mybenxi.com/bx_phoneinterface/service/";
var domain7 = "http://test.dcdmt.cn/nanfen/";
var account = domain7 + "Api/Account/";
var mobile = domain7 + "Api/Mobile/";

var domain_2_1 = domain_2 + "/sso/service/";
var domain_3_1 = domain_3 + "/bx_portal/service/";
var domain_3_2 = domain_3 + "/bx_mo/service/";
var domain_1_1 = domain_1 + "/center_verifyserver/service/";
var domain_1_2 = domain_1 + "/center_userservice/service/";
var domain_1_3 = domain_1 + "/center_appservice/service/";
var domain_1_4 = domain_1+"/center_adservice/service/";
var domain_1_5 = domain_1 + "/center_mobilenews/service/";
var domain_1_6 = domain_1 + "/center_cityinformation/service/";
var domain_1_7 = domain_1 + "/center_evaluate/service/";
var domain_1_8 = domain_1 + "/center_complain/service/";
var domain_1_9 = domain_1 + "/center_notify/service/";
var domain_1_10 = domain_1 + "/center_spaceservice/service/";
var domain_1_11 = domain_1 + "/center_weatherserver/service/";

var url = {
    DOMAIN : [ domain_1, domain_2 ],
    GetAreaList: [false, domain_4 + "GetAreaList"],                //--获取城市列表
    GetCityInfo: [false, domain_4 + "GetCityInfo"],                //--获取城市信息
    GetAppMenus: [false, domain_4 + "GetAppMenus"],                //--获取应用列表
    PushService: [false, domain_4 + "PushService"],                //--获取推荐列表
    GetLastPackage: [false, domain_4 + "GetLastPackage"],          //--获取应用详细信息
    GetAppMenus_Special: [false, domain_4 + "GetAppMenus_Special"],//--获取应用和栏目列表~
    Version: "http://developer.z012.com/AppPublish/api/apppublish/getlastversion", //获取最后一个版本
    ios_Version:"http://itunes.apple.com/lookup",
    /*--------------------------------------------------------------------------------*/
    Weather: [false, domain_1_11 + "CW0101"],                      //--获取天气~
    WeatherFive: [false, domain_1_11 + "CW0102"],                  //--获取五天的天气~
    CW1313: [false, domain_1_5 + "CW1313"],                        //--获取资讯old
    CW1314: [false, domain_1_5 + "CW1314"],                        //--获取资讯new
    CW0101Ad: [false, domain_1_4 + "CW0101"],                      //--获取广告信息
    CW1314Ad: [false, domain_1_4 + "CW1314"],                      //--首页轮播资讯
    CityNewsTop: [false, domain_1_6 + "CW2004"],                   //--获取新闻top
    CityNewsList: [false, domain_1_6 + "CW2005"],                  //--获取新闻列表
    CityNewsInfo: [false, domain_1_6 + "CW2006"],                  //--获取新闻详细内容
    Login: [false, domain_2_1 + "CW6030"],                         //--登录获取票据
    LoginVoucher: [false, domain_2_1 + "CW6031"],                  //--验证票据
    CancelVoucher: [false, domain_2_1 + "CW6032"],                 //--注销登录票据
    UserInfo: [true, domain_3_1 + "CW0201"],                       //--获取用户信息
    updata_user_info_url: [true, domain_3_1 + "CW0202"],           //--更新用户信息
    CW0234: [true, domain_3_1 + "CW0234"],                         //--线上实名认证
    MyFootmark: [true, domain_1_10 + "CW1021"],                    //--用户数字足迹
    /*--------------------------------------------------------------------------------*/
    MY_Collection: [true, domain_1_3 + "CW0207"],                  //--我的收藏
    Collection: [true, domain_1_3 + "CW0203"],                     //--收藏服务
    Cancel_Collection: [true, domain_1_3 + "CW0204"],              //--取消收藏
    IsCollection: [true, domain_1_3 + "CW0210"],                   //--校验是否已收藏
    /*--------------------------------------------------------------------------------*/
    CW0101Notify: [true, domain_1_9 + "CW0101"],                   //--用户未读消息
    CW0102Notify: [true, domain_1_9 + "CW0102"],                   //--用户系统消息
    CW0103Notify: [true, domain_1_9 + "CW0103"],                   //--用户搜索消息
    CW0104Notify: [true, domain_1_9 + "CW0104"],                   //--用户删除消息
    /*--------------------------------------------------------------------------------*/
    SendCode: [false, domain_1_1 + "CW0301"],                      //--发送验证码
    register: [false, domain_1_2 + "CW0102"],                      //--用户注册
    CW0110: [true, domain_1_2 + "CW0110"],                         //--用户基本信息
    ResetPassword: [true, domain_1_2 + "CW0105"],                  //--重置用户登录密码
    TestLogin: [true, domain_1_2 + "CW0107"],                      //--验证用户登录密码
    ChangePassword: [true, domain_1_2 + "CW0108"],                 //--修改用户登录密码
    TestPhoneNumber: [false, domain_1_2 + "CW0103"],               //--验证手机号是否已注册
    BindPhoneNumber: [true, domain_1_2 + "CW0104"],                //--绑定手机号
    ModifyAvatar: [true, domain_1_2 + "CW7002"],                   //--修改头像
    GetEvaluate: [true, domain_1_7 + "CW0101"],                    //--评价列表
    Evaluate: [true, domain_1_7 + "CW0102"],                       //--添加评价
    Feedback: [true, domain_1_8 + "CW1001"],                       //--保存意见反馈
    /*--------------------------------------------------------------------------------*/
    CW1701: [false, domain_3_2 + "CW1701"],                        //--民心网在本溪
    CW1702: [false, domain_3_2 + "CW1702"],                        //--
    PublishList: [true, domain_3_2 + "CW1703"],                    //--我发表的
    AttentionList: [true, domain_3_2 + "CW1704"],                  //--我关注的
    CW1705: [true, domain_3_2 + "CW1705"],                         //--
    CW1706: [true, domain_3_2 + "CW1706"],                         //--
    CW1707: [true, domain_3_2 + "CW1707"],                         //--
    CW1708: [true, domain_3_2 + "CW1708"],                         //--
    CW1709: [true, domain_3_2 + "CW1709"],                         //--
    CW1717: [true, domain_3_2 + "CW1717"],                         //--
    CW1718: [true, domain_3_2 + "CW1718"],                         //--
    CW1719: [true, domain_3_2 + "CW1719"],                         //--
    CW1720: [true, domain_3_2 + "CW1720"],                         //--
    CW1721: [true, domain_3_2 + "CW1721"],                         //--
    /*--------------------------------------------------------------------------------*/
    CW0128: [false, domain_5 + "CW0128"],                          //--外部调用获得积分
    CW0123: [false, domain_5 + "CW0123"],                          //--获取用户当前积分
    CW0124: [false, domain_5 + "CW0124"],                          //--根据用户id和积分类型，查找某项功能是否增加过积分
    GetFund: "http://wx.mybenxi.com/benxiApp/GetFundIp",
    /*---------------------------------------------------------------------------------*/
    //行政服务中心
    queryQuestionContent:[false, domain6 + "CW5501"],	  //获取咨询回复内容            
	queryQuesByUserId: [false, domain6 + "CW5502"],   //我的在线咨询列表
	my_question_content:  [false, domain6 + "CW5503"],  //添加咨询
	notice_types: [false, domain6 + "CW5504"],   //获取公告分类的列表
	notice_tp: [false, domain6 + "CW5505"],      //获取公告列表
	notice_ChannelInfo: [false, domain6 + "CW5506"],      //获取公告的详细内容
	queryChannelInfoByName: [false, domain6 + "CW5507"],    //根据栏目名称获取该栏目下的公告列表
	GetToken: account + "GetToken",
	GetEmployerDetail: mobile + "GetEmployerDetail",
	GetDeptList: mobile + "GetDeptList",
	my_questions: domain6
};

module.exports.url = url;