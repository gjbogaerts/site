<script lang="ts">
	import { DashboardHeader } from '$components';
	import Delete from '$assets/delete.svg';
	import Edit from '$assets/edit.svg';
	let { data } = $props();

	$inspect(data);
</script>

<DashboardHeader />

<h2 class="mt-l mb-m">Berichtenlijst</h2>
<table>
	<thead>
		<tr>
			<th>ID#</th><th>Titel</th><th>Datum</th><th colspan="2">Actie</th>
		</tr>
	</thead>
	<tbody>
		{#each data.berichten as bericht}
			<tr>
				<td>{bericht.id}</td>
				<td>{bericht.title}</td>
				<td>{bericht.date}</td>
				<td
					><a href={`/prive/berichten/bewerk/${bericht.id}`}><img src={Edit} alt="Bewerken" /></a
					></td
				>
				<td
					><a href={`/prive/berichten/verwijder/${bericht.id}`}
						><img src={Delete} alt="Verwijderen" /></a
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>

<style>
	th {
		font-size: 1.6rem;
		text-align: left;
		padding: 0 1rem 1rem 0;
	}
	td {
		font-size: 1.4rem;
		padding: 0 1rem 1rem 0;
	}
</style>
