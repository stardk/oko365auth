<template>
	<p>Здравствуйте, {{name}}</p>
</template>

<script>
	export default {
	  name: 'Hello',
	  props: {
	  	name: {
	  		type: String
	  	}
	  }
	}
</script>