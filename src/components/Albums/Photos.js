import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import { db } from "../../firebase/index";
import Photo from "./Photo";
import { FadeLoader } from "react-spinners";
import useGetPhotos from "../hooks/useGetPhotos";
import useDeletePhoto from "../hooks/useDeletePhoto";
import useAddToNewAlbum from "../hooks/useAddToNewAlbum";
import useSelectPhotos from "../hooks/useSelectPhotos";
import { useAuth } from "../../context/useAuth";
const Photos = () => {
    const { id, name } = useParams();
    const { currentUser } = useAuth();
    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState("");
    const {
        uploadedPhotos,
        loading,
        imagesLength,
        likedPhotosLength,
        dislikedPhotosLength,
    } = useGetPhotos(id);
    const {
        checkedPhotos,
        selectCheckedPhotos,
        likedPhoto,
        selectLikedPhotos,
    } = useSelectPhotos(id);
    const { handleDeletePhoto } = useDeletePhoto(checkedPhotos, id);
    const { handleAddTONewAlbum } = useAddToNewAlbum(
        checkedPhotos,
        name,
        likedPhoto,
        id
    );

    const handleLike = (id) => {
        db.collection("images").doc(id).update({ like: true, dislike: false });
        selectLikedPhotos();
        console.log(imagesLength);
    };

    const handleDislike = (id) => {
        db.collection("images").doc(id).update({ like: false, dislike: true });
        selectLikedPhotos();
    };

    const handleCheck = (id) => {
        db.collection("images").doc(id).update({ checked: false });
        selectCheckedPhotos();
    };

    const handleUncheck = (id) => {
        db.collection("images").doc(id).update({ checked: true });
        selectCheckedPhotos();
    };

    const checkLikedPhotos = () => {
        if (likedPhotosLength + dislikedPhotosLength == imagesLength) {
            handleAddTONewAlbum();
            setErr(false);
        } else {
            console.log("its not equal");
            setErr(true);
            const leftPhotos =
                imagesLength - (likedPhotosLength + dislikedPhotosLength);
            setMsg(
                `you still have ${leftPhotos} left, check it before you send it back`
            );
        }
    };

    return (
        <div className='my-3'>
            <p className='text-white'>
                you are like {likedPhotosLength} photos.
            </p>

            {loading ? (
                <div className='d-flex justify-content-center my-5'>
                    <FadeLoader color={"#fff"} size={100} />
                </div>
            ) : (
                <Photo
                    uploadedPhotos={uploadedPhotos}
                    handleLike={handleLike}
                    handleDislike={handleDislike}
                    handleCheck={handleCheck}
                    handleUncheck={handleUncheck}
                />
            )}

            {!currentUser && (
                <div className='my-3'>
                    <Button variant='primary' onClick={checkLikedPhotos}>
                        Add to new Album
                    </Button>
                    {err && <Alert variant={"warning"}>{msg}</Alert>}
                </div>
            )}

            {currentUser && checkedPhotos.length > 0 ? (
                <div className='my-3'>
                    <Button variant='primary' onClick={handleAddTONewAlbum}>
                        Add to new Album
                    </Button>
                    <Button
                        variant='danger'
                        className='ml-1'
                        onClick={handleDeletePhoto}
                    >
                        Delete
                    </Button>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default Photos;
