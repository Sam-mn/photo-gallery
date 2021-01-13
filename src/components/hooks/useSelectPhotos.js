import { useState, useEffect } from "react";
import { db } from "../../firebase/index";
const useSelectPhotos = (id) => {
    const [checkedPhotos, setCheckedPhotos] = useState([]);
    const [likedPhoto, setLikedPhoto] = useState([]);

    const selectCheckedPhotos = () => {
        return db
            .collection("images")
            .where("albumId", "array-contains", id)
            .onSnapshot((snapshot) => {
                const imgs = [];

                snapshot.forEach((doc) => {
                    if (doc.data().checked) {
                        imgs.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    }
                });
                setCheckedPhotos(imgs);
            });
    };

    const selectLikedPhotos = () => {
        return db
            .collection("images")
            .where("albumId", "array-contains", id)
            .onSnapshot((snapshot) => {
                const imgs = [];

                snapshot.forEach((doc) => {
                    if (doc.data().like) {
                        imgs.push({
                            id: doc.id,
                            ...doc.data(),
                        });
                    }
                });
                setLikedPhoto(imgs);
            });
    };

    useEffect(() => {
        selectCheckedPhotos();
        selectLikedPhotos();
    }, [id]);

    return {
        checkedPhotos,
        selectCheckedPhotos,
        likedPhoto,
        selectLikedPhotos,
    };
};

export default useSelectPhotos;
