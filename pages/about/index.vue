<template>
	<section>
		<u-image width="100%" mode="widthFix" :src="img"></u-image>
	</section>
</template>

<script>
	export default{
		data(){
			return{
				img:require('static/image/package/about_us.jpg')
			}
		}
	}
</script>
