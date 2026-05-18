/// <reference types="mdsvex/globals" />

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '*.md' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;

	export const metadata: Record<string, unknown>;
}

declare module '*.svx' {
	import type { Component } from 'svelte';

	const component: Component;
	export default component;

	export const metadata: Record<string, unknown>;
}

export {};
