import { defineStore } from "pinia";

interface CartType {
	title: string;
	price: number;
	description: string;
	img: string;
	id: number;
	quantity: number;
}

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: [] as CartType[],
	}),
	actions: {
		async getCart() {
			const data = await $fetch<CartType[]>("http://localhost:4000/cart");
			this.cart = data;
			console.log(this.cart);
		},
	},
});
