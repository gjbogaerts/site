<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$components';
	import { page } from '$app/state';
	import { invalidate } from '$app/navigation';
	import { setUserState } from '$lib/state/user-state.svelte';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	injectSpeedInsights();
	injectAnalytics();

	let { data, children } = $props();
	let { session, supabase, user } = $derived(data);
	// $inspect(data);

	let userState = setUserState({ session: data.session, supabase: data.supabase, user: data.user });

	$effect(() => {
		userState.updateState({ session, supabase, user });
	});

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
	// $inspect(session);
	// $inspect(supabase);
</script>

<svelte:head>
	<title>{page.data.title === undefined ? 'Raker' : page.data.title}</title>
</svelte:head>

<div class="default-margin">
	<Header />
	<div class="main-container mt-l">
		<div class="main">{@render children()}</div>
	</div>
	<Footer />
</div>

<style>
	.main-container {
		max-width: 100rem;
		margin: 0 auto;
	}
</style>
