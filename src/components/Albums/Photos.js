import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db, storage } from "../../firebase/index";
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
            .where("checked", "==", true)
            .onSnapshot((snapshot) => {
                const imgs = [];

                snapshot.forEach((doc) => {
                    imgs.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setCheckedPhotos(imgs);
            });
    };

    // useEffect(() => {
    //     setCheckedPhotos();
    // }, []);

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
            await db.collection("images").doc(photo.id).update({
                albumId: newId,
                checked: false,
                like: false,
                dislike: false,
            });
        });
    };

    const handleDeletePhoto = () => {
        checkedPhotos.forEach(async (photo) => {
            await db.collection("images").doc(photo.id).delete();

            const desertRef = storage.ref(photo.path);

            await desertRef.delete();
        });
    };

    return (
        <div className='mt-3'>
            <Photo
                uploadedPhotos={uploadedPhotos}
                handleLike={handleLike}
                handleDislike={handleDislike}
                handleCheck={handleCheck}
                handleUncheck={handleUncheck}
            />
            {checkedPhotos.length > 0 ? (
                <>
                    <Button variant='danger' onClick={handleDeletePhoto}>
                        Delete
                    </Button>
                    <Button
                        variant='primary'
                        className='ml-1'
                        onClick={handleAddTONewAlbum}
                    >
                        Add to new Album
                    </Button>
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default Photos;
