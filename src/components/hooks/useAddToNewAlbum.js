import { useEffect, useState } from "react";
import firebase, { db } from "../../firebase/index";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../context/useAuth";
const getDateAndTime = () => {
    const today = new Date();
    const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    const time = today.getHours() + ":" + today.getMinutes();

    return date + " " + time;
};

const useAddToNewAlbum = (checkedPhotos, name, likedPhoto, id) => {
    const { currentUser } = useAuth();
    const [ownerId, setOwnerId] = useState();
    const [addingErr, setAddingErr] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState("");
    const [sending, setSending] = useState(true);

    useEffect(() => {
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
        try {
            await db.collection("albums").add({
                name: `${name} ${getDateAndTime()}`,
                owner: ownerId,
                albumId: newId,
                editing: false,
            });

            if (currentUser) {
                checkedPhotos.forEach(async (photo) => {
                    await db
                        .collection("images")
                        .doc(photo.id)
                        .update({
                            albumId: firebase.firestore.FieldValue.arrayUnion(
                                newId
                            ),
                            checked: false,
                        });
                    setAddingErr(false);
                    setSending(false);
                    setConfirmMsg(
                        `DONE, you created a new album with ${checkedPhotos.length} photos.`
                    );
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
                        });
                    setAddingErr(false);
                    setSending(false);
                    setConfirmMsg(
                        `DONE, you sent ${likedPhoto.length} photos which you like to the photographer.`
                    );
                });
            }
        } catch (err) {
            setAddingErr(true);
            setConfirmMsg(
                "Something happened when try to create a new album!!"
            );
        }
    };

    return { handleAddTONewAlbum, addingErr, confirmMsg, sending };
};

export default useAddToNewAlbum;
