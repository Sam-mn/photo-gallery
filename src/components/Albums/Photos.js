import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { db } from "../../firebase/index";
import Photo from "./Photo";

const Photos = () => {
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [checkedPhotos, setCheckedPhotos] = useState([]);
    const { id } = useParams();

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
                    <Button variant='danger'>Delete</Button>
                    <Button variant='primary' className='ml-1'>
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
