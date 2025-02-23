<script lang="ts">
	import { DashboardHeader, PostForm } from '$components';
	let { data } = $props();
	let { user } = data;
	// $inspect(data);
</script>

<DashboardHeader />
<h1 class="mt-l mb-m">Nieuw bericht</h1>
<PostForm {user} content="" title="" publication_date="" status="" id="null" />
