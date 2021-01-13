import firebase, { db, storage } from "../../firebase/index";

const useDeleteAlbum = () => {
    const handleDeleteAlbum = async (id, albumId) => {
        if (
            window.confirm(`Are you really sure you want to delete this album?`)
        ) {
            await db.collection("albums").doc(id).delete();

            await db
                .collection("images")
                .where("albumId", "array-contains", albumId)
                .get()
                .then((data) => {
                    const batch = db.batch();
                    data.forEach((photo) => {
                        if (photo.data().albumId.length > 1) {
                            db.collection("images")
                                .doc(photo.id)
                                .update({
                                    albumId: firebase.firestore.FieldValue.arrayRemove(
                                        albumId
                                    ),
                                });
                        } else {
                            const desertRef = storage.ref(photo.data().path);
                            desertRef.delete();
                            batch.delete(photo.ref);
                        }
                    });

                    return batch.commit();
                });
        }
    };
    return { handleDeleteAlbum };
};

export default useDeleteAlbum;
