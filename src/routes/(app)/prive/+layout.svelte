<script lang="ts">
	// import { supabase } from '$lib/supabaseClient';
	import { setUserState } from '$lib/state/user-state.svelte';
	let { data, children } = $props();
	let { session, supabase, user } = data;
</script>

{@render children()}
