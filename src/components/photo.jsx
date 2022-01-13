import axios from "axios";
import React,{useEffect, useState} from "react";
import h from './photo.module.css'
import {useForm} from "react-hook-form";
import loader from './photo/loadingg.svg'

function Photo(){
    const [photos, setPhotos] = useState([])  // Enable state in the stateless component! 
    const [isFetching, setIsFetching]=useState(false)
    const {register, watch} = useForm() // Helps with handling the inputs/forms
    
    const queryInput = watch('queryInput')  // Returns the values entered in the input field.
    const queryInputRegister = register('queryInput')  // Goes to the input html element
    
    useEffect(() => {
        if (queryInput) {
            setIsFetching(true)
            axios.get(`https://pixabay.com/api/?key=24835238-a3f8a742761c760fc4f9ab1d9&q=${queryInput}&image_type=photo`).then((response) => {
                    setPhotos(response.data.hits)
                    setIsFetching(false)
                }
            )
        }
    }, [queryInput])
        return(
            <>
            <div className={h.body}>
            <div>
            <input {...queryInputRegister} className={h.input} type="text" placeholder="Search..." />
            </div>
            {isFetching ? <img className={h.loader} src={loader} /> : null}
             {photos.map((p)=>(
                <img src={p.largeImageURL} className={h.img}/>
             ))}
             </div>
            </>
        )
    
}

export default Photo