// 如果没有通过拦截器配置域名的话，可以在这里写上完整的URL(加上域名部分)
const baseUrl = "https://api.xingchukeji.com/api"

// 此处第二个参数vm，就是我们在页面使用的this，你可以通过vm获取vuex等操作，更多内容详见uView对拦截器的介绍部分：
// https://uviewui.com/js/http.html#%E4%BD%95%E8%B0%93%E8%AF%B7%E6%B1%82%E6%8B%A6%E6%88%AA%EF%BC%9F
const install = (Vue, vm) => {
	// 获取广告
	const getMiaosha = (params = {}) => {
		return vm.$u.get(`${baseUrl}/project/miaosha`, params);
	}
	// 获取按钮
	const getNavList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/other/homeIcon`, params);
	}
	// 获取广告
	const getAdList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/ad/list`, params);
	}
	// 获取文章列表
	const getTpList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/topic/page`, params);
	}
	// 获取项目列表
	const getProjectList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/project/page`, params);
	}
	// 获取项目详情
	const getProjectDetail = (url, params = {}) => {
		return vm.$u.get(`${baseUrl}${url}`, params);
	}
	// 获取新人项目
	const getNewList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/project/isNew`, params);
	}
	// 获取促销项目
	const getLableList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/project/lablePage`, params);
	}
	// 附近加油站
	const getGasStation = (params = {}) => {
		return vm.$u.post(`${baseUrl}/other/gasStation`, params);
	}
	// 下单-领取油卡
	const getOilOrderPlace = (params = {}) => {
		return vm.$u.post(`${baseUrl}/order/place`, params);
	}
	// 获取充值计划
	const getPlanList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/plan/list`, params);
	}
	// 获取首页推荐商品列表
	const getRecommendGoodsList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/goods/recommend`, params);
	}
	// 获取商品列表
	const getGoodsList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/goods/page`, params);
	}
	// 获取商品类别列表
	const getGoodsCategory = (params = {}) => {
		return vm.$u.get(`${baseUrl}/goods/categoryPage`, params);
	}
	// 获取商品详情
	const getGoodsDetail = (url, params = {}) => {
		return vm.$u.get(`${baseUrl}/goods/${url}`, params);
	}
	// 商品下单
	const getGoodsPlace = (params = {}) => {
		return vm.$u.post(`${baseUrl}/goods/place`, params);
	}
	// 获取商品订单列表
	const getGoodsOrder = (params = {}) => {
		return vm.$u.get(`${baseUrl}/goodsOrder/page`, params);
	}
	// 获取商品订单详情
	const getGoodsOrderDetail = (url, params = {}) => {
		return vm.$u.get(`${baseUrl}/goodsOrder/${url}`, params);
	}
	// 获取用户信息
	const getUserInfo = (params = {}) => {
		return vm.$u.get(`${baseUrl}/user/info`, params);
	}
	// 获取用户信息
	const getContact = (params = {}) => {
		return vm.$u.get(`${baseUrl}/other/contact`, params);
	}
	// 获取油卡列表
	const getOilCardList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/card/page`, params);
	}
	// 添加油卡
	const getOilCardAdd = (params = {}) => {
		return vm.$u.post(`${baseUrl}/card/add`, params);
	}
	// 删除加油卡
	const oilCardDelete = (url, params = {}) => {
		return vm.$u.delete(`${baseUrl}/card/${url}`, params);
	}
	// 获取优惠券列表
	const getCouponList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/coupon/page`, params);
	}
	// 获取积分信息
	const getAccount = (params = {}) => {
		return vm.$u.get(`${baseUrl}/account/index`, params);
	}
	// 获取积分纪录列表
	const getAccountList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/account/page`, params);
	}
	// 获取帮助列表
	const getIssueList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/issue/page`, params);
	}
	// 获取用户实际充值计划
	const getPlan = (params = {}) => {
		return vm.$u.get(`${baseUrl}/plan/page`, params);
	}
	// 获取油卡订单列表
	const getOilOrder = (params = {}) => {
		return vm.$u.get(`${baseUrl}/order/page`, params);
	}
	// 获取油卡订单详情
	const getOilOrderDetail = (url, params = {}) => {
		return vm.$u.get(`${baseUrl}/order/${url}`, params);
	}
	// 获取地址列表
	const getAddressList = (params = {}) => {
		return vm.$u.get(`${baseUrl}/address/page`, params);
	}
	// 添加地址
	const addressCreate = (params = {}) => {
		return vm.$u.post(`${baseUrl}/address/add`, params);
	}
	// 修改地址
	const addressUpdate = (params = {}) => {
		return vm.$u.post(`${baseUrl}/address/update`, params);
	}
	// 默认地址
	const addressDefault = (params = {}) => {
		return vm.$u.get(`${baseUrl}/address/defaultAddress`, params);
	}
	// 支付状态
	const getPayType = (params = {}) => {
		return vm.$u.get(`${baseUrl}/other/payType`, params);
	}
	// 微信支付
	const payWxpay = (params = {}) => {
		return vm.$u.post(`${baseUrl}/pay/payWxpay`, params);
	}
	// 微信支付回调
	const notifyWxPay = (params = {}) => {
		return vm.$u.post(`${baseUrl}/pay/notifyWxPay`, params);
	}
	// 支付宝支付
	const payAlipay = (params = {}) => {
		return vm.$u.post(`${baseUrl}/pay/payAlipay`, params);
	}
	// 支付宝支付回调
	const notifyAliPay = (params = {}) => {
		return vm.$u.post(`${baseUrl}/pay/notifyAliPay`, params);
	}
	// 获取图形验证码
	const getAuthImage = (params = {}) => {
		return vm.$u.get(`${baseUrl}/auth/authImage`, params);
	}
	// 获取短信验证码
	const getRegCaptcha = (params = {}) => {
		return vm.$u.post(`${baseUrl}/auth/regCaptcha`, params);
	}
	// 短信验证码注册-登录
	const loginCode = (params = {}) => {
		return vm.$u.post(`${baseUrl}/auth/loginCode`, params);
	}
	// 账号密码登录
	const loginAuth = (params = {}) => {
		return vm.$u.post(`${baseUrl}/auth/login`, params);
	}
	// 账号注销
	const logOff = (params = {}) => {
		return vm.$u.get(`${baseUrl}/user/zhuxiao`, params);
	}
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getMiaosha,
		getAdList,
		getNavList,
		getTpList,
		getProjectList,
		getProjectDetail,
		getNewList,
		getLableList,
		getGasStation,
		getOilOrderPlace,
		getPlanList,
		getRecommendGoodsList,
		getGoodsList,
		getGoodsCategory,
		getGoodsDetail,
		getGoodsPlace,
		getGoodsOrder,
		getGoodsOrderDetail,
		getUserInfo,
		getContact,
		getOilCardList,
		getOilCardAdd,
		oilCardDelete,
		getCouponList,
		getAccount,
		getAccountList,
		getIssueList,
		getPlan,
		getOilOrder,
		getOilOrderDetail,
		getAddressList,
		addressCreate,
		addressUpdate,
		addressDefault,
		getPayType,
		payWxpay,
		payAlipay,
		getAuthImage,
		getRegCaptcha,
		loginCode,
		loginAuth,
		logOff
	};
}

export default {
	install
}
