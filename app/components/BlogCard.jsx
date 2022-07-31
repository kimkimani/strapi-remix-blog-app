
import {Link} from '@remix-run/react';
import url from '../utils/url';


export default function BlogCard({blog}) {
    let data = blog.attributes;
    return (
        <div className="card">
            <div className="card-content">
                <div className="card-img">
                    <img src={`${url}${data.hero.data.attributes.url}`} alt={data.hero.data.attributes.alternativeText} />
                </div>
                <div className="card-details">
                    
                    <Link to={`/posts/${blog.id}`} className="card-title">
                        {data.title}
                    </Link>
                    
                    <p className="card-excerpt">{data.excerpt}</p>
                </div>
            </div>
        </div>
    )
}