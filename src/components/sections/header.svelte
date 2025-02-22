<script lang="ts">
	import Logo from '$assets/logo.png';
	import { getUserState } from '$lib/state/user-state.svelte';
	let userContext = getUserState();
	let { user } = $derived(userContext);
</script>

<header class="header mt-m">
	<a href="/"> <img src={Logo} alt="Logo Raker" class="logo" /></a>
	<p>Het weblog van Geert-Jan Bogaerts</p>
	<nav class="nav">
		<ul>
			{#if user}
				<li class="tiny-text">Je bent ingelogd {user.email}</li>
				<!-- svelte-ignore a11y_invalid_attribute -->
				<li><a href="#" onclick={() => userContext.logout()}>Uitloggen</a></li>
			{/if}
			<li><a href="/archief">Archief</a></li>
			<li><a href="/over">Over mij</a></li>
		</ul>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo {
		width: 200px;
	}
	.nav ul {
		display: flex;
		flex-direction: row;
		gap: 3rem;
	}

	.nav a {
		text-decoration: none;
		font-weight: bold;
	}
</style>
