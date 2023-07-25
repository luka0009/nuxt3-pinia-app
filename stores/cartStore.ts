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
	getters: {
		cartTotal(): number {
			return this.cart.reduce((total: number, item: CartType) => {
				return total + item.price * item.quantity;
			}, 0);
		},
	},
	actions: {
		async getCart() {
			const data = await $fetch<CartType[]>("http://localhost:4000/cart");
			this.cart = data;
			console.log(this.cart);
		},
		async deleteFromCart(product: CartType) {
			this.cart = this.cart.filter((item) => item.id !== product.id);

			await $fetch("http://localhost:4000/cart/" + product.id, {
				method: "delete",
			});
		},
	},
});
