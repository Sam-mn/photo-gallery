import { useEffect, useState } from "react";
import firebase, { db } from "../../firebase/index";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/useAuth";

const useAddToNewAlbum = (checkedPhotos, name, likedPhoto, id) => {
    const { currentUser } = useAuth();
    const [ownerId, setOwnerId] = useState();
    useEffect(() => {
        console.log(id);
        db.collection("albums")
            .where("albumId", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setOwnerId(doc.data().owner);
                });
            });
    }, [id]);

    const handleAddTONewAlbum = async () => {
        const newId = uuidv4();

        await db.collection("albums").add({
            name: `New ${name}`,
            owner: ownerId,
            albumId: newId,
            editing: false,
        });

        if (currentUser) {
            checkedPhotos.forEach(async (photo) => {
                console.log(photo.id);
                await db
                    .collection("images")
                    .doc(photo.id)
                    .update({
                        albumId: firebase.firestore.FieldValue.arrayUnion(
                            newId
                        ),
                        checked: false,
                        like: false,
                        dislike: false,
                    });
            });
        } else {
            likedPhoto.forEach(async (photo) => {
                console.log(photo.id);
                await db
                    .collection("images")
                    .doc(photo.id)
                    .update({
                        albumId: firebase.firestore.FieldValue.arrayUnion(
                            newId
                        ),
                        checked: false,
                        like: false,
                        dislike: false,
                    });
            });
        }
    };

    return { handleAddTONewAlbum };
};

export default useAddToNewAlbum;
