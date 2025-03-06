<script lang="ts">
	let {
		user,
		content,
		title,
		publication_date = '',
		status,
		id,
		tags = '',
		mastodon_summary = ''
	} = $props();
	// console.log(user, content, title, publication_date, status, id);
	let userId = user.id != null ? user.id : user;
	let postId = id != null ? id : null;
	let mastodonSummary = mastodon_summary !== '' ? mastodon_summary : '';
	let timeElapsed = Date.now();
	let today = new Date(timeElapsed);
	let dateValue = today.toISOString().slice(0, 10);
	if (publication_date === '') {
		publication_date = dateValue;
	}
</script>

<form method="post" enctype="multipart/form-data">
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
	<input
		type="text"
		name="tags"
		placeholder="Een of meerdere, door een komma gescheiden, tags"
		class="wide"
		value={tags}
	/>
	<input type="file" name="image" />
	<textarea name="mastodon_summary" placeholder="Tekst voor Mastodon" class="wide"
		>{mastodonSummary}</textarea
	>
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
