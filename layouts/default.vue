<template>
	<div>
		<header>
			<NuxtLink to="/">
				<h1>Adventure Store</h1>
			</NuxtLink>
			<NuxtLink to="/cart">Cart</NuxtLink>
		</header>

		<div>
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
