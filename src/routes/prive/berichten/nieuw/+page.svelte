<script lang="ts">
	import { DashboardHeader } from '$components';
	let { data } = $props();
	let { user } = data;
	// $inspect(data);
</script>

<DashboardHeader />
<h1 class="mt-l mb-m">Nieuw bericht</h1>
<form method="post">
	<input type="text" name="title" placeholder="Titel" class="wide" />
	<textarea name="content" placeholder="Je tekst" class="wide"></textarea>
	<div class="form-div-container">
		<input type="date" name="publication_date" placeholder="Publicatiedatum" />
		<select name="status">
			<option value="concept" selected>Status</option>
			<option value="publiceren" label="Publiceren">Publiceren</option>
			<option value="concept" label="Concept">Concept</option>
		</select>
	</div>
	<input type="hidden" name="user_id" value={user!.id} />
	<button>Opslaan</button>
</form>

<style>
	.wide {
		width: 100%;
	}
	textarea {
		height: 30rem;
	}
	.form-div-container {
		display: flex;
		gap: 5rem;
	}
	select,
	option {
		width: 30rem;
	}
	.form-div-container input {
		flex: 1;
	}
</style>
