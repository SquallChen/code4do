using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

/// <summary>
/// DemoData 的摘要说明
/// </summary>
public class DemoData
{
    public static DemoData Instance = new DemoData();
	private DemoData()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
        this.Init();
	}

    private List<string> allNewsIndex = new List<string>();
    private List<string> allNewsShow = new List<string>();

    public string getNewList(string _type)
    {
        return this.getOnePage();
    }

    public string getNewsShow()
    {
        StringBuilder _strB = new StringBuilder();
        _strB.Append("[");
        for (int i = 0; i < allNewsShow.Count; i++)
        {
            if (i > 0) _strB.Append(",");
            _strB.Append(this.allNewsShow[i]);
        }
        _strB.Append("]");
        return _strB.ToString();
    }

    private string getOnePage()
    {
        Random _random = new Random();
        Dictionary<int, int> cach = new Dictionary<int, int>();
        StringBuilder _strB = new StringBuilder();
        _strB.Append("[");
        for (int i = 0; i < 10; i++)
        {
            if (i > 0) _strB.Append(",");
            while (true)
            {
                int idx = _random.Next(0, this.allNewsIndex.Count);
                if (!cach.ContainsKey(idx))
                {
                    cach.Add(idx, 1);
                    _strB.Append(this.allNewsIndex[idx]);
                    break;
                }
            }
        }
        _strB.Append("]");
        return _strB.ToString();
    }

    private void Init()
    {
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/gn/2016-03-02/detail-ifxqafrm6694199.d.html?vt=4&pos=8&cid=56261"", 
""title"":""湖南祁东原副局长宾馆坠亡"", 
""desc"":""湖南省衡阳市祁东县原轻工业局副局长彭许生自当地一宾馆坠楼身亡"", 
""image"":""http://k.sinaimg.cn/n/news/transform/20160302/KCaf-fxqaffy3520038.jpg/w120h90l50t150f.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/gn/2016-03-02/detail-ifxpvysx1847434.d.html?&cid=56261"", 
""title"":""上海团委公布29岁美女副书记"", 
""desc"":""29岁美女晋级副厅了吗？2月的最后一天，上海团市委公布了首批挂职、兼职副书记名单"", 
""image"":""http://k.sinaimg.cn/n/news/transform/20160302/wHMG-fxpvysv5120574.jpg/w120h90l50t1d77.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/2016-03-02/detail-ifxpvysv5108948.d.html?&cid=56261"", 
""title"":""释永信未随河南代表团抵京"", 
""desc"":""全国人大代表、少林寺方丈释永信没有出现在随团抵达的代表中"", 
""image"":""http://k.sinaimg.cn/n/news/crawl/20160302/H_ar-fxpvytf8819635.jpg/w120h90l50t1eaf.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/gn/2016-03-02/detail-ifxpvysx1835243.d.html?&cid=56261"", 
""title"":""刘翔两会报到.被问恋爱状况"", 
""desc"":""3月2日中午，全国政协委员刘翔现身北京会议中心报到。刘翔一进门便被媒体围住"", 
""image"":""http://k.sinaimg.cn/n/news/crawl/20160302/Zp97-fxpvysv5106930.jpg/w120h90l50t163f.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/gn/2016-03-02/detail-ifxpvysx1833969.d.html?&cid=56261"", 
""title"":""勿让“二次元”动漫成监管盲区"", 
""desc"":""3月1日，首批住粤全国政协委员抵达北京。他们准备了不少提案、建议，涉及房价、司法体制改革、文化教育、食品安全等"", 
""image"":""http://k.sinaimg.cn/n/news/transform/20160302/va-3-fxpvysx1833972.jpg/w120h90l50t1386.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/2016-03-02/detail-ifxpvutf3861225.d.html?&cid=56261"", 
""title"":""香港红十字会新总部正式启用"", 
""desc"":""香港红十字会新总部正式启用 成全港最大捐血站.香港特区行政长官梁振英说，该会每年得到超过16万名捐血者支持"", 
""image"":""http://k.sinaimg.cn/n/translate/20160302/x-Wt-fxpvyss1343619.jpg/w120h90l50t1159.jpg""}");

        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/2016-03-03/detail-ifxqafrm6760450.d.html?vt=4&pos=8&cid=56261"", 
""title"":""赴日中国游客从爆买转向体验"", 
""desc"":""日本政府观光局统计的访日外国观光客数据新鲜出炉。2016年1月，来自中国大陆地区的游客数突破47万人"", 
""image"":""http://k.sinaimg.cn/n/translate/20160303/0-gb-fxqafqi8590632.jpg/w120h90l50t11fb.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/gn/2016-03-03/detail-ifxpzzhk2039559.d.html?vt=4&pos=8&cid=56261"", 
""title"":""专家辟谣中日军舰对峙半小时"", 
""desc"":""“中日军舰日前在钓鱼岛海域对峙半小时”这一说法一经中国某网络媒体报道，就受到极大关注"", 
""image"":""http://k.sinaimg.cn/n/translate/20160303/9G68-fxqafnq6268290.jpg/w120h90l50t11d1.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://video.sina.cn/news/i/2016-03-03/detail-ifxqafha0305430.d.html?vt=4&pos=8&cid=56261"", 
""title"":""网报导游辱骂三亚游客"", 
""desc"":""导游辱骂三亚游客被视频曝光"", 
""image"":""http://p.v.iask.com/512/854/139843552_0.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://video.sina.cn/news/i/2016-03-03/detail-ifxqafha0303677.d.html?vt=4&pos=8&cid=56261"", 
""title"":""王国庆：这场考试我刚及格"", 
""desc"":""政协发言人王国庆自评表现：刚及格吧"", 
""image"":""http://p.v.iask.com/602/11/139842960_0.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://news.sina.cn/2016-03-03/detail-ifxpzzhk2024855.d.html?vt=4&pos=8&cid=56261"", 
""title"":""多部门开展云盘涉黄整治行动"", 
""desc"":""多部门联合开展云盘涉黄集中整治行动，遏制利用云盘传播淫秽色情信息牟利活动蔓延的态势"", 
""image"":""http://k.sinaimg.cn/n/news/transform/20160303/V5d4-fxqafhk7407099.jpg/w120h90l50t10a4.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/2016-03-03/detail-ifxqafha0301368.d.html?vt=4&pos=12"", 
""title"":""傅艺伟儿子替母道歉：对不起"", 
""desc"":""傅艺伟儿子高乐男发文替母亲向公众道歉“对不起，让你们失望了，我相信这也是我母亲现在最想做的”"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/Lrju-fxqaffy3526946.png/w120h90l50t1add.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://blog.sina.cn/dpool/blog/s/blog_5e92ffb70102wddh.html?mtch=ent&pos=12&vt=4"", 
""title"":""躲过了春晚的扫射却没躲过奶酪陷阱的暗袭"", 
""desc"":""最近有一部韩剧让我各种脑仁上火食欲不振，嗯呢既不是《太阳的后裔》也不是《回来吧大叔》，米有错！"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/9uFK-fxqafhk7410254.jpg/w120h90l50t1f2c.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/star/hk_tw/2016-03-03/detail-ifxqaffy3526082.d.html?vt=4&pos=12"", 
""title"":""小S甩蔡依林登娇小界天后宝座"", 
""desc"":""小S最近被媒体票选为“娇小也能万丈光芒女艺人”第1名，狠甩位居第2名的天后蔡依林"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/LJGo-fxqafhk7406059.jpg/w120h90l50t1828.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/zy/2016-03-03/detail-ifxqafha0311364.d.html?vt=4&pos=12"", 
""title"":""邓紫棋起码比许晴适合华晨宇"", 
""desc"":""花花说过，不谈恋爱就写不出情歌来，前段接受采访说“最近写了首情歌”。看来爱情与灵感同步"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160302/1dea-fxpvytf8819537.jpg/w120h90l50t12d9.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/film/foreign/2016-03-03/detail-ifxqaffy3539991.d.html?vt=4&cid=34979"", 
""title"":""电影漫画书《死侍》引进出版"", 
""desc"":""电影漫画书《死侍1：秘密入侵》中文版已经引进出版，这个诞生于1991年的另类英雄是漫威群雄中的人气角色。"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/3lPa-fxqafhk7410527.jpg/w120h90l50t1497.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/film/chinese/2016-03-03/detail-ifxqaffy3538618.d.html?vt=4&cid=34979"", 
""title"":""《同城邂逅》发布终极预告"", 
""desc"":""电影《同城邂逅》出品方发布了影片的终极预告，姜潮醉酒讲出周韦彤“劈腿”的内幕时，让所有人“大跌眼镜”"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/c3z_-fxqafhk7409896.jpg/w120h90l50t152e.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://ent.sina.cn/review/media/2016-03-03/detail-ifxqafha0311502.d.html?vt=4&cid=34979"", 
""title"":""《间谍之桥》闪现《善之中心》"", 
""desc"":""间谍之桥》写两个敌对阵营男人之间不可能的友谊，作品中缓缓升起的是一种超越的精神"", 
""image"":""http://k.sinaimg.cn/n/ent/transform/20160303/KfWb-fxpwmrp0411174.jpg/w120h90l50t1557.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://sports.sina.cn/cba/china/2016-03-03/detail-ifxqaffy3531321.d.html?vt=4&pos=10"", 
""title"":""曝火箭签下CBA双料MVP"", 
""desc"":""在签下古德洛克后，火箭又签下了一位本赛季效力CBA的球员，比斯利得到了一份到本赛季结束的合同"", 
""image"":""http://k.sinaimg.cn/i0/dy/slidenews/2_img/2016_04/792_1703206_158451.jpg/w120h90l50t16da.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/i/usstock/2016-03-03/detail-ifxqaffy3534039.d.html?vt=4&pos=18"", 
""title"":""谷歌推出不用掏手机的付款App"", 
""desc"":""谷歌周三发布了一款测试性的支付应用Hands Free。通过这款应用，用户在店内付款时不需要拿出手机。"", 
""image"":""http://k.sinaimg.cn/n/tech/transform/20160303/ZIsM-fxpwmrp0409055.jpg/w120h90l50t1eb5.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/d/qy/2016-03-03/detail-ifxqaffy3538320.d.html?vt=4&pos=18"", 
""title"":""两专家获图灵奖:发明公共密钥"", 
""desc"":""斯坦福大学著名密码技术与安全技术专家怀菲德-迪菲和马丁-赫尔曼成为本年度“图灵奖”得主"", 
""image"":""http://k.sinaimg.cn/n/tech/20160303/TEZP-fxqafhk7409762.jpg/w120h90l50t160e.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/d/qy/2016-03-03/detail-ifxqaffy3537228.d.html?vt=4&pos=18"", 
""title"":""超轻光伏电池可以放肥皂泡上"", 
""desc"":""科学家们已经发明了一种至纤至薄，轻盈柔韧的光伏电池。它们身轻如羽，甚至可以放置在泡沫上。"", 
""image"":""http://k.sinaimg.cn/n/tech/20160303/sX7A-fxqafha0309438.jpg/w120h90l50t1f69.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/digi/znjj/2016-03-03/detail-ifxqaffy3537216.d.html?vt=4&pos=18"", 
""title"":""智能睡眠垫帮你营造良好睡眠"", 
""desc"":""生活中，打呼噜的现场非常常见，相信在不少家庭中都会有出现，但严重的呼噜声不仅影响自身的睡眠质量"", 
""image"":""http://k.sinaimg.cn/n/tech/20160303/cdqx-fxpwmrp0410336.jpg/w120h90l50t1f0f.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/i/gn/2016-03-03/detail-ifxqafha0309418.d.html?vt=4&pos=18"", 
""title"":""为什么VC突然青睐内容营销？"", 
""desc"":""这个词在创业界意味着大量迅速、果断的反应， 从好的（“没有我的投资人，就没有今天的我”）到稍次些的。"", 
""image"":""http://k.sinaimg.cn/n/tech/20160303/ljkm-fxqaffy3537136.jpg/w120h90l50t1941.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://zhuanlan.sina.cn/article?vt=4&pos=18&id=49532&ch=tech"", 
""title"":""围棋人机大战，我为何认为李世石会输"", 
""desc"":""许多年后，当我们谈论人工智能时，一定不能避开两个时间节点，一个是1997年的5月，另一个则是2016年的3月。"", 
""image"":""http://k.sinaimg.cn/n/csj/20160303/vRdl-fxpwmrp0409578.jpg/w120h90l50t14c4.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/digi/znjj/2016-03-03/detail-ifxqafha0310148.d.html?vt=4&pos=18"", 
""title"":""Moto时尚运动穿戴设备图赏"", 
""desc"":""Vervelife品牌时尚运动穿戴设备的发布还是让人眼前一亮，橙色与黑色的组合彰显年轻与运动元素，时尚的外观也足够引人注目"", 
""image"":""http://k.sinaimg.cn/n/tech/20160303/IDDI-fxqaffy3537891.jpg/w120h90l50t13b1.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/i/gn/2016-03-03/detail-ifxqaffy3537912.d.html?vt=4&pos=18"", 
""title"":""为啥早餐外卖不是一门好生意"", 
""desc"":""早餐外卖的确是有人做的，比如早餐佳，饿了么早餐，已关闭的美团早餐和不知道还在不在做的聚美优品早餐“美天”"", 
""image"":""http://k.sinaimg.cn/n/tech/transform/20160303/4sh0-fxpwmrp0410659.jpg/w120h90l50t1527.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://tech.sina.cn/digi/dc/2016-03-03/detail-ifxqafha0313190.d.html?vt=4&pos=18"", 
""title"":""众测:大疆精灵4无人机免费玩"", 
""desc"":""大疆最新款无人机大疆精灵4，可感知前方障碍物并自动绕行；通过视觉识别自动跟拍移动物体；"", 
""image"":""http://k.sinaimg.cn/n/tech/transform/20160303/AqTy-fxpwmrp0412144.jpg/w120h90l50t1e8b.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://mil.sina.cn/zgjq/2016-03-03/detail-ifxqaffy3535362.d.html?vt=4&pos=24"", 
""title"":""德国支招:中国可退出海洋公约"", 
""desc"":""多年以来，中国一直都是《联合国海洋法公约》的坚定支持者。可是最近，中国却体会到，《公约》、尤其是其中有关强制性争端解决的条款，"", 
""image"":""http://k.sinaimg.cn/n/mil/transform/20160303/NZMF-fxpwmrp0409486.jpg/w120h90l50t17a6.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://mil.sina.cn/zgjq/2016-03-03/detail-ifxqafha0313037.d.html?vt=4&pos=24"", 
""title"":""美:中国15年内将增2000架战机"", 
""desc"":""到2030年，中国人民解放军空军（PLAAF）在作战飞机数量上将能够持平或超过美国空军”"", 
""image"":""http://k.sinaimg.cn/n/mil/crawl/20160303/Su2O-fxqafhk7410721.jpg/w120h90l50t175e.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://mil.sina.cn/zgjq/2016-03-03/detail-ifxqaffy3537453.d.html?vt=4&pos=24"", 
""title"":""张召忠:半岛危机让谁获利最大"", 
""desc"":""六方会谈是2003年针对朝鲜核问题确定的中方主导、多方参加的平等对话机制，期间取得了一些进展，但朝鲜在这个机制里面一直起到了比较负面的作用"", 
""image"":""http://k.sinaimg.cn/n/mil/transform/20160303/RyaS-fxqafhk7409138.jpg/w120h90l50t1009.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://edu.sina.cn/a/lxcg/2016-03-03/detail-ifxpvysv5113017.d.html?vt=4&pos=45"", 
""title"":""丑哭了!世界小姐日本冠军诞生"", 
""desc"":""世界小姐日本区冠军由来自滋贺县的大学生中泽沙理（22岁）纳入囊中，中泽沙理将代表日本参加今年夏季召开的世界小姐选举大会"", 
""image"":""http://k.sinaimg.cn/n/edu/transform/20160302/fszP-fxpvysx1840391.jpg/w120h90l50t1458.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://edu.sina.cn/2016-03-03/detail-ifxqaffy3542557.d.html?vt=4&pos=45"", 
""title"":""女博士求职:先自报生娃与否"", 
""desc"":""师姐妹当中流传着一句话：“找工作，已婚有子的女博士（硕士）要比未婚的好找，未婚的要比已婚未孕的好找。”"", 
""image"":""http://k.sinaimg.cn/n/edu/20160303/xZS9-fxqafhk7411924.jpg/w120h90l50t1c8b.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://edu.sina.cn/a/lxcg/2016-03-03/detail-ifxpvysx1839233.d.html?vt=4&pos=45"", 
""title"":""华裔女子奇遇:两人同名同姓"", 
""desc"":""36岁华裔女子米歇尔•张（Michelle Cheung，音译）乘坐从柏斯回悉尼的维珍澳洲航班时，花了好些时间办完登机手续，上了飞机，坐上了自己的座位。"", 
""image"":""http://k.sinaimg.cn/n/edu/transform/20160302/NFRQ-fxpvytf8820771.jpg/w120h90l50t1e67.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://sports.sina.cn/nba/all/2016-03-03/detail-ifxqaffy3527814.d.html?vt=4&pos=113"", 
""title"":""巴克利:除了勇马雷船谁都不看"", 
""desc"":""巴克利从来都是一个想说什么就脱口而出的人，心性耿直的他经常会有惊人的言论。真性情的大嘴近来又开炮了"", 
""image"":""http://k.sinaimg.cn/n/sports/transform/20160303/Lu4s-fxqafhk7406249.jpg/w120h90l50t1dbb.jpg""}");
        this.allNewsIndex.Add(@"{""url"":""http://sports.sina.cn/nba/all/2016-03-03/detail-ifxqafha0311977.d.html?vt=4&pos=113"", 
""title"":""乔丹连续两年进全球富豪榜"", 
""desc"":""基于球员时代奠定的巨大影响力，乔丹在商业领域大展拳脚，他不仅拥有夏洛特黄蜂俱乐部的所有权，同时还为佳得乐、恒适等品牌代言，另外，飞人品牌的系列运动产品"", 
""image"":""http://k.sinaimg.cn/i0/dy/slidenews/2_img/2016_07/786_1714073_853183.jpg/w120h90l50t1237.jpg""}");



        this.allNewsShow.Add(@"{""url"":""http://photo.sina.cn/album_1_2841_96045.htm?ch=1&vt=4&pos=108"", 
""title"":""全国人大代表行囊里都装了啥？"", 
""image"":""http://k.sinaimg.cn/n/default/20160304/wK_A-fxqaffy3577172.jpg/w640h320z1l50t1769.jpg""}");
        this.allNewsShow.Add(@"{""url"":""http://photo.sina.cn/album_1_75648_96050.htm?ch=1&vt=4&pos=108"", 
""title"":""不简单一杯茶 历届两会女服务员颜值大PK"", 
""image"":""http://k.sinaimg.cn/n/news/20160304/OEGH-fxqafhk7426447.jpg/w640h320z1l50t1bcb.jpg""}");
        this.allNewsShow.Add(@"{""url"":""http://photo.sina.cn/album_1_2841_96042.htm?ch=1&vt=4&pos=108"", 
""title"":""笨贼半夜行窃未遂 掉进排污池被泡4小时"", 
""image"":""http://k.sinaimg.cn/n/default/20160304/nKyv-fxqaser8998170.jpg/w640h320z1l50t1c5b.jpg""}");
        this.allNewsShow.Add(@"{""url"":""http://photo.sina.cn/album_1_2841_96048.htm?ch=1&vt=4&pos=108"", 
""title"":""美国4名中学生被停课 纵火烧毁校长房子"", 
""image"":""http://k.sinaimg.cn/n/default/20160304/dB5W-fxqaffy3577182.jpg/w640h320z1l50t14e2.jpg""}");
        this.allNewsShow.Add(@"{""url"":""http://photo.sina.cn/album_1_2841_96049.htm?ch=1&vt=4&pos=108"", 
""title"":""江西高校“食堂女神”走红 网友：别人的学校"", 
""image"":""http://k.sinaimg.cn/n/default/20160304/RnNO-fxqafha0344034.jpg/w640h320z1l50t168b.jpg""}");

    }



    
}