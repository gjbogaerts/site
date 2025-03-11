import { Feed } from 'feed';
import { ENVIRONMENT } from '$env/static/private';
import { supabase } from '$lib/supabaseClient';
import slugify from 'typescript-slugify';
import { truncateAtFirstBlankLine, convertDatetime } from '$lib/utils/strings';

let blogUrl = '';
if (ENVIRONMENT === 'dev') {
	blogUrl = 'http://localhost:5173';
} else {
	blogUrl = 'https://raker.nl';
}

export const prerender = true;

async function getPosts() {
	const { data, error } = await supabase
		.from('berichten')
		.select('id, title, publication_date, content')
		.gt('publication_date', '2025-01-01')
		.order('publication_date', { ascending: false })
		.limit(20);
	if (error) throw error;
	// console.log(data);
	return data;
}

export async function GET() {
	const feed = new Feed({
		title: 'Raker',
		description: 'Weblog van Geert-Jan Bogaerts',
		id: blogUrl,
		link: blogUrl,
		copyright: `${new Date().getFullYear().toString()}, CC-BY-SA Geert-Jan Bogaerts - Raker`,
		feedLinks: { rss: `${blogUrl}/rss.xml` },
		author: {
			name: 'Geert-Jan Bogaerts',
			link: `${blogUrl}/over`,
			email: 'gj@raker.nl' // 'https://social.publicspaces.net/@geertjan'
		},
		ttl: 60
	});
	const articles = await getPosts();
	// console.log(articles);

	for (const article of articles) {
		// console.log(article);
		feed.addItem({
			title: article.title,
			description: truncateAtFirstBlankLine(article.content),
			content: `<p>${truncateAtFirstBlankLine(article.content)}</p> <div style="margin-top: 50px; font-style: italic;"> <strong><a href="${blogUrl}/${slugify(article.title)}/${article.id}">Lees verder</a>.</strong> </div> <br /> <br />`,
			date: new Date(article.publication_date), // '2025-01-01', //article.publication_date,
			// date: new Date(2025, 3, 11),
			link: 'https://raker.nl',
			// link: `${blogUrl}/${slugify(article.title)}/${article.id}`
			author: [
				{
					name: 'Geert-Jan Bogaerts',
					email: 'gj@raker.nl', //'https://social.publicspaces.net/@geertjan',
					link: `${blogUrl}/over`
				}
			]
		});
	}

	return new Response(feed.rss2(), {
		headers: { 'Content-Type': 'application/xml; charset=utf-8' }
	});
}
//
// import { supabase } from '$lib/supabaseClient';
// import RSS from 'rss';
// // import RSS from 'rss';

// export const GET = async () => {
// 	// Fetch posts from Supabase
// 	const { data: posts, error } = await supabase
// 		.from('posts')
// 		.select('id, title, content, created_at, slug');

// 	if (error) {
// 		return {
// 			status: 500,
// 			body: 'Failed to fetch posts'
// 		};
// 	}

// 	// Create a new RSS feed
// 	const feed = new RSS({
// 		title: 'Your Blog Title',
// 		description: 'Your Blog Description',
// 		site_url: 'https://your-blog-url.com',
// 		feed_url: 'https://your-blog-url.com/rss.xml'
// 	});

// 	// Add posts to the RSS feed
// 	posts.forEach((post) => {
// 		feed.item({
// 			title: post.title,
// 			description: post.content,
// 			url: `https://your-blog-url.com/posts/${post.slug}`,
// 			date: post.created_at
// 		});
// 	});

// 	// Return the RSS feed as XML
// 	return new Response(feed.xml({ indent: true }), {
// 		headers: {
// 			'Content-Type': 'application/rss+xml'
// 		}
// 	});
// };
