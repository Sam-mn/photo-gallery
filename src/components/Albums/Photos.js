import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import firebase, { db, storage } from "../../firebase/index";
import Photo from "./Photo";
import { useAuth } from "../../context/useAuth";
import { v4 as uuidv4 } from "uuid";

const Photos = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [checkedPhotos, setCheckedPhotos] = useState([]);
    const [newToAlbum, setNewAlbum] = useState(false);
    const { id, name } = useParams();
    const { currentUser } = useAuth();

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

    useEffect(() => {
        const unsubscribe = db
            .collection("images")
            .where("albumId", "array-contains", id)
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
        selectCheckedPhotos();
        return unsubscribe;
    }, [id]);

    const handleLike = (id) => {
        db.collection("images").doc(id).update({ like: true, dislike: false });
        console.log(checkedPhotos);
    };

    const handleDislike = (id) => {
        db.collection("images").doc(id).update({ like: false, dislike: true });
    };

    const handleCheck = (id) => {
        console.log("check");
        db.collection("images").doc(id).update({ checked: false });
        selectCheckedPhotos();
    };

    const handleUncheck = (id) => {
        console.log("uncheck");
        db.collection("images").doc(id).update({ checked: true });
        selectCheckedPhotos();
    };

    const handleAddTONewAlbum = async () => {
        const newId = uuidv4();

        await db.collection("albums").add({
            name: `New ${name}`,
            owner: currentUser.uid,
            albumId: newId,
            editing: false,
        });

        checkedPhotos.forEach(async (photo) => {
            console.log(photo.id);
            await db
                .collection("images")
                .doc(photo.id)
                .update({
                    albumId: firebase.firestore.FieldValue.arrayUnion(newId),
                    checked: false,
                    like: false,
                    dislike: false,
                });
        });
    };

    const handleDeletePhoto = () => {
        checkedPhotos.forEach(async (photo) => {
            await db
                .collection("images")
                .doc(photo.id)
                .get()
                .then(async (data) => {
                    const doc = data.data();
                    console.log(photo.id);

                    if (doc.albumId.length > 1) {
                        console.log("more than 1");
                        await db
                            .collection("images")
                            .doc(photo.id)
                            .update({
                                albumId: firebase.firestore.FieldValue.arrayRemove(
                                    id
                                ),
                            });
                    } else {
                        console.log("less than 1", photo.ref);
                        const desertRef = storage.ref(doc.path);
                        await desertRef.delete();
                        db.collection("images").doc(photo.id).delete();
                    }
                });
        });
    };

    return (
        <div className='my-3'>
            <Photo
                uploadedPhotos={uploadedPhotos}
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleCheck={handleCheck}
                handleUncheck={handleUncheck}
            />
            {checkedPhotos.length > 0 ? (
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
