<script lang="ts">
	let { user, content, title, publication_date, status, id } = $props();
	// console.log(user, content, title, publication_date, status, id);
	let userId = user.id != null ? user.id : user;
	let postId = id != null ? id : null;
</script>

<form method="post">
	<input type="text" name="title" placeholder="Titel" class="wide" value={title} />
	<textarea name="content" placeholder="Je tekst" class="wide">{content}</textarea>
	<div class="form-div-container">
		<input
			type="date"
			name="publication_date"
			placeholder="Publicatiedatum"
			value={publication_date}
		/>
		<select name="status">
			<option value="concept">Status</option>
			<option value="publiceren" label="Publiceren" selected={status == 'publiceren' ? true : false}
				>Publiceren</option
			>
			<option value="concept" label="Concept" selected={status == 'concept' ? true : false}
				>Concept</option
			>
		</select>
	</div>
	<input type="hidden" name="user_id" value={userId} />
	<input type="hidden" name="id" value={postId} />
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
