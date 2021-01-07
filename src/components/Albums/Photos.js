import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/index";
import Photo from "./Photo";

const Photos = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const unsubscribe = db
            .collection("images")
            .where("albumId", "==", id)
            .onSnapshot((snapshot) => {
                const imgs = [];

                snapshot.forEach((doc) => {
                    imgs.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });

                setUploadedPhotos(imgs);
            });

        return unsubscribe;
    }, [id]);

    const handleLike = (id) => {
        db.collection("images").doc(id).update({ like: true, dislike: false });
    };

    const handleDislike = (id) => {
        db.collection("images").doc(id).update({ like: false, dislike: true });
    };
    return (
        <div className='mt-3'>
            <Photo
                uploadedPhotos={uploadedPhotos}
                handleLike={handleLike}
                handleDislike={handleDislike}
            />
        </div>
    );
};

export default Photos;
