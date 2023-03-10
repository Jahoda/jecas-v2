<script lang="ts">
	import { supabase } from '$lib/supabase/supabase';

	export let name: string;
	export let bucket: string;
	export let filePath: string;

	let uploading = false;

	async function handleFileUpload(event: Event) {
		try {
			uploading = true;

			const target = event.target as HTMLInputElement;

			if (target.files && target.files.length > 0) {
				const file = target.files[0];
				let { error } = await supabase.storage.from(bucket).upload(filePath, file, {
					upsert: true
				});

				if (error) {
					throw error;
				}
			}
		} catch (error) {
			console.error(error);
		} finally {
			uploading = false;
		}
		uploading = true;
	}
</script>

<div>
	<input type="file" {name} on:change={handleFileUpload} disabled={uploading} />

	<div class="mt-4" />
</div>
