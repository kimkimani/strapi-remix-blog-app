import {useLoaderData} from '@remix-run/react';
import {checkEnvVars,checkStatus} from '../utils/errorHandling';
import {
  Layout,
  BlogCard
} from '../components';
import styles from '../components/style.css';
export const links = () => [
    { rel: "stylesheet", href: styles },
];
export async function loader(){
  checkEnvVars();
  const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/blogs?populate=hero`,{
    method:"GET",
    headers:{
      "Authorization":`Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type":"application/json"
    }
  });

  checkStatus(response);

  const data = await response.json();

  if(data.error){
    throw new Response("Error loading data from strapi",{status:500});
  }

  return data.data;
}

export default function Index() {
  const blogs = useLoaderData();
  return (
   <Layout>
      {
        blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        ):(
          <p>No blog posts found!</p>
        )
      }
   </Layout>
  );
}
