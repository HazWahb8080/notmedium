import { GetStaticProps } from 'next';
import React, { useState } from 'react'
import PortableText from 'react-portable-text';
import Header from '../../components/Header';
import urlFor, { sanityClient } from '../../sanity';
import { post } from '../../typings';
import { useForm, SubmitHandler } from "react-hook-form";



interface IFormInput {
  _id:string;
  name: String;
  email: string;
  comment: string;
}

interface Props {
    post: post;
}


function Post({post}: Props) {
    const [submitted,setsubmitted]= useState(false);
     const { register, handleSubmit, formState:{errors} } = useForm <IFormInput>();
     const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        fetch('/api/createComment',{
            method: "POST",
            body: JSON.stringify(data),
        }).then( 
            ()=>{
                console.log(data)
                setsubmitted(true)
            }
            
        )
        .catch(
        (err) => {
            console.log(err)
            setsubmitted(false)
        }
        )
    
    };
  
  
        return (
      <>
      <Header/>
    <div className="p-1 items-center justify-center flex">
        <div className="lg:w-[65%] w-full  px-5 py-10 border-x border-gray-300 pb-10">
            <div className="flex  items-center space-x-4 mb-10 mt-5 px-10">
                <img className="h-12 w-12 rounded-full object-cover" src={urlFor(post.author.image).url()!}/>
                <div>
                    <h3 className="font-serif self-cnter brea-words">{post.author.name}</h3>
                    <p className="text-xs italic text-gray-500">{new Date(post._createdAt).toLocaleString()}</p>
                </div>
            </div>
            <div className="border-b px-10 pb-3 sm:pb-10 ">
              <h1 className="md:text-4xl text-2xl font-serif break-words ">
                  {`hello to post! ${post.title}`}
                  </h1> 
                  <h3 className="text-2xl pt-3 text-gray-600 font-mono break-words">{post.description}</h3>
            </div>
            <div className="items-start px-10 justify-start flex mt-3 md:mt-16 ">
                <img className="md:w-[800px] md:h-[400px] object-cover object-center" src={urlFor(post.mainImage).url()!}/>
            </div>
            <div className="w-full px-10 my-5">
        <PortableText
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        serializers={{
                    h1: (props:any) => (<h1 className="text-2xl font-bold my-5" {...props}/>),
                    h2: (props:any) => (<h2 className="text-xl font-bold my-5" {...props}/>),
                    li: ({children} : any) => (<li className="ml-4 list-disc " >{children}</li>),
                    link: ({children,href} : any) => (<a className="text-blue-500 hover:underline" >{children}</a>),
        }}
        content = {post.body}
        />
        </div> 
        <div className=" px-5 py-5 mt-36">
            <div className="border-t border-gray-300 border-dotted px-4 py-5">

                {
                    submitted ? (
                        <div className="border bg-teal-200 py-10 mb-5 mt-3  font-mono rounded-lg space-y-5 items-center justify-center flex flex-col border-green-400 shadow-md shadow-green-100 text-green-900 ">
                            <p className=" lg:text-xl xl:text-2xl text-center break-words">Thanks for Submitting your Comment!</p>
                            <p className=" lg:text-xl xl:text-2xl text-center break-words">It will appear once approved by author: {post.author.name}</p>
                        </div>
                    ) : 
                    (
                        <>
                    <h1 className="font-bold text-gray-800 mt-3 font-mono text-xl selection:bg-green-400"> Submit a Comment</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("_id")} type="hidden" name="_id" value={post._id} />
                    <div className="md:flex items-center justify-between md:space-x-12 mt-5">
                    <div className='space-x-5 text-md flex-1 font-mono border-b mt-4 hover:border-black duration-500  ease-in-out transition-all hover:text-black'>
                    <span className="text-lg selection:bg-green-400">Name</span>
                    <input {...register("name",{required: true})} className="px-1 selection:bg-green-400 border-transparent focus:border-transparent focus:ring-transparent form-input text-sm flex-1" placeholder="please write your name?" type="text"/>
                    </div>
                    <div className='space-x-5 text-md flex-1 font-mono border-b mt-4 hover:border-black duration-500  ease-in-out transition-all hover:text-black'>
                    <span className="text-lg selection:bg-green-400">Email</span>
                    <input {...register("email",{required: true})} className="px-1 selection:bg-green-400 focus:border-transparent focus:ring-transparent active:border-transparent border-transparent form-input text-sm flex-1" placeholder="please write your mail?" type="email"/>
                    </div>
                    </div>
                    <div className='flex-col text-md font-mono text-center items-center justify-center flex border pt-5 mt-12 duration-500  ease-in-out transition-all hover:border-black hover:text-black'>
                    <span className="text-lg selection:bg-green-400 ">Comment</span>
                    <textarea {...register("comment",{required: true})} className="px-1 text-sm py-4 w-full border-transparent focus:border-transparent focus:ring-transparent selection:bg-green-400 text-center" placeholder="What's ur nice Comment?" />
                    </div>
                    <div className="flex-col my-3 space-y-1">
                        {errors.name && <p className="text-red-400 selection:bg-red-200 selection:text-red-800 ">- The Name field is required! </p>}
                        {errors.email && <p className="text-red-400 selection:bg-red-200 selection:text-red-800 ">- The email field is required! </p>}
                        {errors.comment && <p className="text-red-400 selection:bg-red-200 selection:text-red-800 ">- The comment field is required! </p>}
                    </div>
                    <div  className="text-center w-full items-center justify-center flex my-10 ">
                    <button type="submit" className="text-center border px-4 py-2 hover:border-black duration-500 delay-50 ease-in-out transition-all">Submit</button>
                    </div>
                   
                </form>
                </>
                )}
                <div>
                    <div className="border py-10 px-5">
                        <h1 className='text-center my-5 text-3xl font-mono'>
                            Comments</h1>
                    {
                        post.comments.map((comment)=>(
                        <div className=" flex border-b border-gray-200 border-dotted space-x-5 px-5 py-4">
                        <h1 className="text-lg self-center font-bold">{comment.name}</h1>
                        <p className="self-center">{comment.comment}</p>
                        </div>

                        ))}
                    </div>
                </div>
                
            </div>

        </div>
        </div>

        
            
       
    </div>
    </>
  )
}

export default Post;
export const getStaticPaths = async() =>{
const query = `
*[_type=="post"]{
  _id,
  slug{current},
}`
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: post)=>({
      params:{
          slug: post.slug.current,
      },
  }));
  return{
      paths,
      fallback:"blocking"
  }
}
export const getStaticProps: GetStaticProps = async ({params}) => {
    const query = `
    *[_type=="post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  _createdAt,
  body,
  "comments" : *[
    _type=="comment" &&
    post._ref==^._id &&
    approved==true],
  description,
  mainImage,
  author->{
  name,
  image,
}
}`;

const post = await sanityClient.fetch(query,{slug:params?.slug});


if (!post) {
    return {
        notFound:true 
    }
};

return {
    props:{
        post,
    },
    revalidate:60,
}
}