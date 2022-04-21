import Head from 'next/head'
import Link from 'next/link';
import Header from '../components/Header'
import Hero from '../components/Hero'
import { post } from '../typings';
import urlFor, {sanityClient } from './../sanity';

interface Props {
posts : [post];

}

export default function Home({posts}:Props) {
  return (
    <div className="">
      <Head>
        <title>Not Medium</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <Hero/>
      <div className="w-full flex items-center justify-center">
      <div className=" xl:w-[65%] lg:w-[90%] w-full px-2 md:px-2 py-20 gap-4 lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 grid">
      {posts.map((post)=>(
        <Link href={`/post/${post.slug.current}`}>
          
        <div key={post._id} className="cursor-pointer border overflow-hidden pb-6 group">
          <div className="w-full bg-black z-100 overflow-hidden"> 
        <img className='w-full h-60 object-cover transition-all group-hover:scale-125 duration-500 ease-in-out transform' src={urlFor(post.mainImage).url()!} />
          </div>
          <div className="flex justify-between space-x-3 p-3">
        <h1 className=' text-xl break-words self-center text-left font-mono'>{post.title}</h1>
        <img className='w-10 h-10 object-cover self-center rounded-full' title ={post.author.name} src={urlFor(post.author.image).url()!} />
          </div>
        <p className=" text-sm  px-3 break-words border-t py-3 ">{post.description}</p>
        </div>
        </Link>
      ))}
      </div>
      </div>
    </div>
  )
}


export const getServerSideProps = async () => {
  const query = `*[_type=="post"]{
  _id,
  title,
  slug,
  body,
  "comments" : *[
    _type=="comment" &&
    post._ref==^._id &&
    approved==true],
  description,
  mainImage,
  author->{
  name,
  image
},
}`;
const posts = await sanityClient.fetch(query);
return {
  props:{
    posts,
  },
};
};