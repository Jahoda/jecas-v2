import { error } from '@sveltejs/kit'
import matter from 'gray-matter';

export async function load({ params }) {
	try {
		const postFile = await import(`../../../content/posts/${params.slug}.md?raw`)
		const fileContent = postFile.default
		
		const { data, content } = matter(fileContent);

		return {
			post: {
				...data,
				text_html: content
			}
		}
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}