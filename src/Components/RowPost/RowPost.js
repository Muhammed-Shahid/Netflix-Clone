import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { imageUrl,API_KEY } from '../../Constants/constants'
import './RowPost.css'
import Youtube from 'react-youtube'

function RowPost(props) {

    const [movies,setMovies]= useState([])
    const[id,setId]= useState('')

    useEffect(() => {
        axios.get(props.url).then(response=>{
            console.log(response.data.results)
           setMovies(response.data.results)
        })        
    },[])
    
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const movieTrailer=(id)=>{
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
              if (response.data.results.length!==0) {
                  setId(response.data.results[0])
              }else{
                  console.log('Array Empty');
              }
          })       
      }

    return (
        <div className="Row">
            <h2>{props.title}</h2>
            <div className="Posters">
               {movies.map((obj)=>   
               <img onClick={()=>movieTrailer(obj.id)} className={props.isSmall? "smallPoster" : "poster" }alt="poster"  src={`${imageUrl+obj.backdrop_path}`}/>
               )}
                 
            </div>
         {id &&  <Youtube opts={opts} videoId={id.key}/> }
        </div>
    )
}

export default RowPost
