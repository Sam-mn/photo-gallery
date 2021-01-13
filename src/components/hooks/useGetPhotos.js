import { useEffect, useState } from "react";
import { db } from "../../firebase/index";

const useGetPhotos = (id) => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [imagesLength, setImagesLength] = useState(0);
    const [likedPhotosLength, setLikedPhotosLength] = useState(0);
    const [dislikedPhotosLength, setDislikedPhotosLength] = useState(0);
    const [checkPhotos, setCheckPhotos] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = db
            .collection("images")
            .where("albumId", "array-contains", id)
            .onSnapshot((snapshot) => {
                const imgs = [];
                const likedPhotos = [];
                const dislikedPhotos = [];

                snapshot.forEach((doc) => {
                    imgs.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                    if (doc.data().like) {
                        likedPhotos.push({ id: doc.id, ...doc.data() });
                    }
                    if (doc.data().dislike) {
                        dislikedPhotos.push({ id: doc.id, ...doc.data() });
                    }
                });

                setUploadedPhotos(imgs);
                setImagesLength(imgs.length);
                setLikedPhotosLength(likedPhotos.length);
                setDislikedPhotosLength(dislikedPhotos.length);

                setLoading(false);
            });

        return unsubscribe;
    }, [id]);
    return {
        uploadedPhotos,
        imagesLength,
        loading,
    };
};

export default useGetPhotos;
