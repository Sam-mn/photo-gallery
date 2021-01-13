import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import { db } from "../../firebase/index";

const useGEtAlbums = () => {
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const unsubscribe = db
            .collection("albums")
            .where("owner", "==", currentUser.uid)
            .orderBy("name")
            .onSnapshot((data) => {
                const allAlbums = [];
                data.forEach((album) => {
                    allAlbums.push({
                        id: album.id,
                        ...album.data(),
                    });
                });

                setAlbums(allAlbums);
                setLoading(false);
            });

        return unsubscribe;
    }, [currentUser.uid]);

    return { albums, loading };
};

export default useGEtAlbums;
