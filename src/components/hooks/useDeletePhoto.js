import firebase, { db, storage } from "../../firebase/index";

const useDeletePhoto = (checkedPhotos, id) => {
    const handleDeletePhoto = () => {
        if (
            window.confirm(
                `Are you really sure you want to delete ${checkedPhotos.length} photos?`
            )
        ) {
            checkedPhotos.forEach(async (photo) => {
                await db
                    .collection("images")
                    .doc(photo.id)
                    .get()
                    .then(async (data) => {
                        const doc = data.data();

                        if (doc.albumId.length > 1) {
                            await db
                                .collection("images")
                                .doc(photo.id)
                                .update({
                                    albumId: firebase.firestore.FieldValue.arrayRemove(
                                        id
                                    ),
                                });
                        } else {
                            const desertRef = storage.ref(doc.path);
                            await desertRef.delete();
                            db.collection("images").doc(photo.id).delete();
                        }
                    });
            });
        }
    };
    return { handleDeletePhoto };
};

export default useDeletePhoto;
