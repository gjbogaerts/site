<script lang="ts">
	import '../app.css';
	import { Header, Sidebar, Footer } from '$components';
	import { invalidate } from '$app/navigation';
	import { setUserState } from '$lib/state/user-state.svelte';

	let { data, children } = $props();
	let { session, supabase, user, response } = $derived(data);
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

<div class="default-margin">
	<Header />
	<div class="main-container mt-l">
		<div class="main">{@render children()}</div>
		<Sidebar {response} />
	</div>
	<Footer />
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
