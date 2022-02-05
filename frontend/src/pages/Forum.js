import React, {useState, useEffect, useContext} from 'react'
import Header from '../components/Header'
import { useHistory } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Forum = () => {

    let {authTokens} = useContext(AuthContext)
    let [posts, setPosts] = useState([])

    let [displayForm, setDisplayForm] = useState(true)
    
    const history = useHistory()

    useEffect(()=> {
        
        
        // To fetch all the jobs listed by all the companies
        let getPosts = async() =>{
            let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/get-posts/`, {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                }
            })
            let data = await response.json()

            if(response.status === 200){
                setPosts(data)
            }else{
                alert('ERROR: ', data)
            }
            
        }
        
        getPosts()

    }, [])


    // To add a new post
    let addPost = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/add-post/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // Provide the authToken when making API request to backend to access the protected route of that user
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
            body:JSON.stringify({'content':e.target.content.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)
            history.push('/forum')
        }
        else{
            alert('ERROR: ', data)
        }
    } 



    // To add a new post
    let addComment = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/add-comment/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // Provide the authToken when making API request to backend to access the protected route of that user
                'Authorization':'Bearer ' + String(authTokens.access)
            },
            // 'e.target' is the form, '.username' gets the username field and '.password' gets the password field from wherever it is called (LoginPage.js here)
            body:JSON.stringify({'content':e.target.content.value, 'postID':e.target.postID.value})
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)
            history.push('/forum')
        }
        else{
            alert('ERROR: ', data)
        }
    } 


    // To add a new post
    let like = async (e )=> {
        e.preventDefault()
        // Make a post request to the api with the user's credentials.
        let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/forum/like/${e.target.postID.value}`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                // Provide the authToken when making API request to backend to access the protected route of that user
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        })
        // Get the access and refresh tokens
        let data = await response.json()

        if(response.status === 200){
            alert(data)
            history.push('/forum')
        }
        else{
            alert('ERROR: ', data)
        }
    } 
    

    console.log('POSTS: ', posts)

    return (
        <div>
            <Header/>

            <h3> --- To add a new post ---  </h3>
            <form onSubmit={addPost}>
                <textarea name='content'/> <br/>
                <input type='submit' />
            </form>

            <h3> --- Posts/Questions/Discussions are shown here --- </h3>
            <div>
                {posts.map(post => (
                    <div key={post.id} style={{border: '1px solid black'}}>
                        <p> Poster Name: {post.poster.name} </p>
                        <p> Poster Img: <img src={post.poster.image} alt='profilePhoto' style={{height:50}}/> </p>
                        <p> {post.content} </p>
                        <p> Timestamp: {post.timestamp} </p>
                        <p> Likes: {post.likes} </p>
                        <form onSubmit={like}>
                            <input name='postID' defaultValue={post.id} hidden={true}/>
                            <input type='submit' value='Like Btn' />
                        </form>
                        <button onClick={() => setDisplayForm(false)}> Comment </button>
                        <form onSubmit={addComment} hidden={displayForm}>
                            <textarea name='content'/> <br/>
                            <input name='postID' defaultValue={post.id} hidden={true} />
                            <input type='submit' />
                        </form>

                        <p> ---------Comments: ---------</p>
                        {post.reply.map(reply => (
                            <div key={reply.id}>
                                <p> Poster Name: {reply.poster.name} </p>
                                <p> Poster Img: <img src={reply.poster.image} alt='profilePhoto' style={{height:50}}/> </p>
                                <p> {reply.content} </p>
                                <p> Timestamp: {reply.timestamp} </p>
                            </div>
                        ))}

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Forum
