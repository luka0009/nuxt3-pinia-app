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
		numberOfProducts(): number {
			return this.cart.length;
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
		async incQuantity(product: CartType) {
			let updatedProduct;

			this.cart = this.cart.map((p) => {
				if (p.id === product.id) {
					p.quantity++;
					updatedProduct = p;
				}
				return p;
			});

			await $fetch("http://localhost:4000/cart/" + product.id, {
				method: "put",
				body: JSON.stringify(updatedProduct),
			});
		},
		async decQuantity(product: CartType) {
			let updatedProduct;

			this.cart = this.cart.map((p) => {
				if (p.id === product.id) {
					p.quantity--;
					updatedProduct = p;
				}
				return p;
			});

			if (updatedProduct) {
				await $fetch("http://localhost:4000/cart/" + product.id, {
					method: "put",
					body: JSON.stringify(updatedProduct),
				});
			}
		},
		async addToCart(product: CartType) {
			const exists = this.cart.find((p) => p.id === product.id);

			if (exists) {
				this.incQuantity(product);
			}

			if (!exists) {
				this.cart.push({ ...product, quantity: 1 });

				await $fetch("http://localhost:4000/cart", {
					method: "post",
					body: JSON.stringify({ ...product, quantity: 1 }),
				});
			}
		},
	},
});
