<script lang="ts">
	import Container from '$lib/container/Container.svelte';
	import Newsletter from '$lib/newsletter/Newsletter.svelte';
</script>

<div class="bg-blue-light dark:bg-blue-light/30 relative py-8 text-white xl:py-16">
	<Container>
		<div class="mb-8">
			<Newsletter />
		</div>

		<div class="flex flex-col items-center gap-16 md:flex-row">
			<a aria-label="Je čas" href="/" class="flex">
				<span
					class="max-w-xs"
					title="Logo má samoúčelný přebarvovací efekt. Šel snadno vytvořit díky tomu, že se jedná o SVG."
				>
					<svg
						viewBox="0 0 500 95"
						style="background-color:#ffffff00"
						xmlns="http://www.w3.org/2000/svg"
						class="w-full"
						width="500"
						height="95"
						><path
							d="M16.2 92.4c9-.5 15-2 18-4 3.6-2.7 5.4-6.8 5.4-12.5l-.2-60h-15v58.4c0 5-1.3 8-4 9.2-2.7 1-8.8 1.7-18.2 1.7v7c5.7 0 10.4-.2 14-.4zm139.8-7v-7H88v-25h56V47H88V23h68v-7H73v69.7h83zm143.3-7.7c-12.6 1.2-23.6 2-32.8 2-9.3 0-16.3-.7-21-1.8-5-1.6-8.6-3-11-6-2.6-2.6-4.3-5.5-5-8.7-1-3.3-1.4-7.5-1.4-12.8 0-10.7 2.8-18.2 7-22.6 5-4.4 14.7-6.6 29-6.6 10.6 0 22 .6 35.7 1.8l.6-6.5c-14.2-1.5-26.6-2-37-2-10.6 0-19 .5-25.7 2-6.6 1.5-11.7 4-15.3 7-3.8 3.3-6.3 7-7.7 11.2-1.4 4-2 9.2-2 15.4 0 6.2.6 11.3 2 15.4 1.4 4 4 8 7.5 11s8.7 5.4 15.4 7c6.8 1.4 15.5 2.2 26 2.2 11 0 23-.7 36.8-2l-.6-6.8zM496 23.3l1.4-6.5-6.7-.5c-13.4-1-25-1.5-34.5-1.5-29.3 0-44 6.2-44 18.7 0 6.2 3.3 10.7 9.7 13.3 6 2.7 17 4.8 32.2 6.5 11.7 1 19.7 2.5 24 4.2 4.3 1.6 6.4 4.3 6.4 8 0 9.4-9.8 14-29.3 14-9.3 0-23-.6-40.8-1.8l-1.7 6.5 7 .5c14.5 1 26.5 1.7 36 1.7 29 0 43.7-7.2 43.7-21.4 0-5.8-3-10-8.6-12.5-5.8-2.5-15.6-4.5-29.5-6-14-1.7-23-3.2-27.7-4.8-4.6-1.6-7-4.5-7-8.7 0-7.6 10-11.4 29.7-11.4 7.7 0 20.7.6 39 1.7zM280.3 1.5h-8l-9 5.3-9.3-5.3h-7.8l13 8h8l13-8zM358 15l-38 65.3v8h9l34.5-59.5 24.3 27h8.7v-8L367 15h-9z"
							fill="#fff"
						/></svg
					>
				</span>
			</a>
			<p class="mb-0">
				Web
				<a href="/" class="underline hover:no-underline">jecas.cz</a>
				píše <b>Bohumil Jahoda</b>,
				<a rel="nofollow" href="/kontakt" class="underline hover:no-underline">kontakt</a>
				<br />
				<a href="/archiv" class="underline hover:no-underline">Seznam všech článků</a>
				<br />
				2013–{new Date().getFullYear()}
			</p>
		</div>
	</Container>
</div>
