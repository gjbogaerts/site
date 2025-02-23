declare module 'dompurify' {
	export function sanitize(input: string, config?: any): string; // Using `any` for config for simplicity
	export function setConfig(config: any): void; // You can define specific shapes for config if needed
	interface DOMPurify {
		sanitize: typeof sanitize;
		setConfig: typeof setConfig;
	}
	const dompurify: DOMPurify;
	export default dompurify; // Default export
}
