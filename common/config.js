export const Channel = "ios"
export const Version = "2.1.1"
export const KefuUrl = "http://kefu.xingchukeji.com"
export const Base_Url = "https://h5.xingchukeji.com"
export const PrivacyUrl = `${Base_Url}/#/pages/privacy/privacy`
export const ServiceUrl = `${Base_Url}/#/pages/service/service`
export const LogOffUrl = `${Base_Url}/#/pages/withdraw/withdraw`
export const AboutUrl = `${Base_Url}/act/activity.html#/about`
export const InviteUrl = `${Base_Url}/act/activity.html#/invite`

export const NavList = [{
		image: '/static/image/home_nav1.png',
		title: '油卡套餐',
		url: 'pages/oilRecharge/oilRecharge',
		params: {
			mode: 1
		}
	},
	{
		image: '/static/image/home_nav2.png',
		title: '油卡充值',
		url: 'pages/oilRecharge/oilRecharge',
		params: {
			mode: 2
		}
	},
	{
		image: '/static/image/home_nav3.png',
		title: '办理油卡',
		url: 'pages/oilCardReceive/oilCardReceive',
	},
	{
		image: '/static/image/home_nav4.png',
		title: '油卡介绍',
		url: '/pages/discountScreen/discountScreen'
	},
	{
		image: '/static/image/home_nav5.png',
		title: '话费套餐',
		url: 'pages/phoneRecharge/phoneRecharge',
		params: {
			mode: 1
		}
	},
	{
		image: '/static/image/home_nav6.png',
		title: '话费充值',
		url: 'pages/phoneRecharge/phoneRecharge',
		params: {
			mode: 2
		}
	},
	{
		image: '/static/image/home_nav7.png',
		title: '分享赚钱',
		link: InviteUrl,
	},
	{
		image: '/static/image/home_nav8.png',
		title: '车主商城',
		url: 'pages/mallScreen/mallScreen',
		// type: 'tab'
	}
]
