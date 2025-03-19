<script lang="ts">
	import { Sidebar } from '$components';

	let { data, children } = $props();
	// $inspect(data);
	let { berichten, stickies } = $derived(data);
	// $inspect(stickies);
</script>

<div class="main-container mt-l">
	<div class="main">{@render children()}</div>
	<Sidebar response={berichten} {stickies} />
</div>

<style>
	.main-container {
		display: flex;
		gap: 5rem;
	}
	.main {
		flex: 3;
	}

	@media screen and (max-width: 1100px) {
		.main-container {
			display: flex;
			flex-direction: column;
		}
		.main {
			width: 100%;
		}
	}
</style>
