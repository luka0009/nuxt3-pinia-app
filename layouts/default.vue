<template>
	<div class="m-8">
		<header class="wrapper flex justify-between">
			<NuxtLink to="/">
				<h1 class="text-secondary text-5xl">Store</h1>
			</NuxtLink>
			<NuxtLink to="/cart">
				<span class="material-icons-outlined text-secondary text-5xl">
					shopping_bag
				</span>
				<span class="text-white bg-black p-2 rounded-2xl font-bold badge">
					{{ cartStore.numberOfProducts }}
				</span>
			</NuxtLink>
		</header>

		<div class="wrapper">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useCartStore } from "~~/stores/cartStore";

	const cartStore = useCartStore();

	cartStore.getCart();
	console.log(cartStore.numberOfProducts);
	
</script>

<style scoped>
	.badge {
		position: relative;
		left: -15px;
	}
</style>
