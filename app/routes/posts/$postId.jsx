import {useLoaderData} from '@remix-run/react';
import {checkEnvVars,checkStatus} from '../../utils/errorHandling';
import url from '../../utils/url';
import {Layout} from '../../components';
import styles from '../../components/style.css';
export const links = () => [
    { rel: "stylesheet", href: styles },
];

export async function loader({params}) {
    const {postId} = params;
    checkEnvVars();
    const response = await fetch(`${process.env.STRAPI_URL_BASE}/api/blogs/${postId}?populate=hero`,{
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

export default function Post() {
    const blog = useLoaderData();
    const blogData = blog.attributes;
    return (
        <Layout>
            <div className="blog-post">
                <div className="blog-post-hero">
                    <img src={`${url}${blogData.hero.data.attributes.url}`} alt={`${blogData.hero.data.attributes.alternativeText}`} />
                </div>
                <div className="blog-post-title">
                    <h1>{blogData.title}</h1>
                </div>
                <div className="blog-post-content">
                    <div dangerouslySetInnerHTML={{__html: blogData.content}} />
                </div>
            </div>
        </Layout>
    )
}