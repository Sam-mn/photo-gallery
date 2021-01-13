import firebase, { db, storage } from "../../firebase/index";

const useDeletePhoto = (checkedPhotos, id) => {
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
    return { handleDeletePhoto };
};

export default useDeletePhoto;
