import { useRef } from "react";

function AddGallery({addGallery}) {

    const title = useRef("")
    const userId = useRef("")

    const formSubmitHandler = (event) => {
        event.preventDefault()
        const gallery = {
            name : title.current.value,
            userId : userId.current.value,
        }

        addGallery(gallery)
    }

    return (
        <form onSubmit={formSubmitHandler}>
            <div>
                <label for="title">Title</label>
                <input name="title" type="text" ref={title}/>
            </div>
            <div>
                <label for="opening-text">User id</label>
                <input name="opening-text" type="text" ref = {userId}/>
            </div>
          
            <button type="submit">Add Gallery</button>
        </form>
    );
}

export default AddGallery;