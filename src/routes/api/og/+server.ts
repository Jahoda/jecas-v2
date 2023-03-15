// /routes/og/+server.ts
import OgPreview from '$lib/ogPreview/OgPreview.svelte';
import { getSinglePostBySlug } from '$lib/post/post';
import { getAllTagsByPageId, type Tag } from '$lib/tag/tag';
import { componentToImageResponse, ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const slug = url.searchParams.get('slug');

	if (!slug) return new Response('Missing slug', { status: 404 });

	let tags: Tag[] = [];
	const post = await getSinglePostBySlug(slug);
	if (post?.id) {
		tags = await getAllTagsByPageId(post.id);
	}

	if (!post) return new Response('Not found', { status: 404 });

	const fontFile = await fetch(
		'https://raw.githubusercontent.com/etherCorps/sveltekit-og/main/static/inter-latin-ext-700-normal.woff'
	);
	const fontData: ArrayBuffer = await fontFile.arrayBuffer();

	const date = new Date(post.last_modification).toLocaleDateString('cs-CZ', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	return await ImageResponse(
		`
    <div tw="p-8 flex w-full h-full" style="background-image: linear-gradient(to right top, #7957B0,#21bfd4,#feda3f, #5b63b9)">
      <div tw="flex w-full bg-slate-900/50 rounded-xl p-8 h-full gap-8 items-center">
        <div tw="flex w-[200px] h-[200px] mr-8">
          <img width="200" height="200" src="https://jecas.cz/files/article/ai-programovani.png" tw="rounded-md flex" />
        </div>
        <div tw="flex flex-1 flex-col justify-between space-y-8">
          <div tw="text-5xl text-white">${post.title}</div>
          
          <div tw="mt-8 flex"></div> 

          <div tw="flex flex-col text-2xl text-white w-full leading-8">${post.description}</div>

          <div tw="mt-8 flex"></div> 

          <div tw="flex items-center gap-2 flex-shrink-0 text-white">
            <time tw="whitespace-nowrap text-white">
              ${date}
            </time>
          </div>      
        </div>
      </div>  
    </div>`,
		{
			height: 630,
			width: 1200,
			fonts: [
				{
					name: 'Inter Latin',
					data: fontData,
					weight: 700
				}
			]
		}
	);
};
