<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	// import type { PageProps } from './$types';
	let { data } = $props();
	// let slug = $Page.
	// $inspect(data);
	// console.log(data.id);
	const removePost = async (id: number) => {
		// console.log('Removing post with id ', id);
		let response = await data.supabase.from('berichten').delete().eq('id', id);
		goto('/prive/dashboard', { replaceState: true });
	};
</script>

<h2 class="mb-m">Verwijderen!!</h2>
<p class="mb-l">
	Je staat op het punt om het volgende artikel te verwijderen:
	<strong>{data.title}</strong>
</p>

<button onclick={() => removePost(data.id)}>Ja, mag weg</button>

<style>
	strong {
		display: block;
		margin: 2rem 0;
	}
	button {
		background-color: pink;
		padding: 1rem;
	}
</style>
