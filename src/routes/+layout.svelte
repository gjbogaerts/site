<script lang="ts">
	import '../app.css';
	import { Header, Sidebar } from '$components';

	let { children } = $props();
</script>

<div class="default-margin">
	<Header />
	<div class="main-container mt-l">
		<div class="main">{@render children()}</div>
		<Sidebar />
	</div>
</div>

<style>
	.main-container {
		display: flex;

		gap: 5rem;
	}
	.main {
		flex: 3;
	}
</style>
