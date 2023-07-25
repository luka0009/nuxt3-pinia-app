<template>
	<div class="flex">
		<button class="btn" @click="cartStore.decQuantity(product)">-</button>

		<p class="py-1 px-4 mx-1 rounded-sm text-lg bg-black text-white">
			{{ product.quantity }}
		</p>

		<button class="btn" @click="cartStore.incQuantity(product)">+</button>
	</div>
</template>

<script setup lang="ts">
	import { useCartStore } from "~~/stores/cartStore";

	const cartStore = useCartStore();

	defineProps(["product"]);
</script>

<style scoped></style>
