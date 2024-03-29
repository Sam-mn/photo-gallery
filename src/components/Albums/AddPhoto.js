import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Dropzone from "react-dropzone";
import { ListGroup, Button } from "react-bootstrap";
import { storage, db } from "../../firebase/index";
import { useAuth } from "../../context/useAuth";

const AddPhoto = ({ setAdding }) => {
    const [droppedFiles, setDroppedFiles] = useState([]);
    const [progress, setProgress] = useState(null);
    const [err, setErr] = useState(false);
    const [msg, setMsg] = useState("");
    const { id } = useParams();
    const { currentUser } = useAuth();

    useEffect(() => {}, [droppedFiles]);

    const handleOnDrop = (acceptedFiles) => {
        const files = [];
        setErr(false);
        acceptedFiles.forEach((acceptedFile) => {
            files.push(acceptedFile);
        });

        setDroppedFiles([...droppedFiles, ...files]);
    };

    const handleOnClick = () => {
        if (droppedFiles.length === 0) {
            setErr(true);
            setMsg("Select or drop photos to upload.");
            return;
        }

        droppedFiles.forEach(async (file) => {
            const fileRef = storage.ref(`images/${file.name}`);

            const uploadTask = await fileRef.put(file);

            const fileUrl = await uploadTask.ref.getDownloadURL();

            const image = {
                name: file.name,
                owner: currentUser.uid,
                path: uploadTask.ref.fullPath,
                size: file.size,
                type: file.type,
                url: fileUrl,
                albumId: [id],
                like: false,
                dislike: false,
                checked: false,
            };

            await db.collection("images").add(image);
        });

        setAdding(false);
    };

    const handleOnDelete = (name) => {
        const newPhotosArr = droppedFiles.filter(
            (photo) => photo.name !== name
        );
        setDroppedFiles(newPhotosArr);
    };

    return (
        <>
            <Dropzone onDrop={handleOnDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()} className='dropzone mt-5'>
                            <input {...getInputProps()} />
                            <p className='text-center'>
                                Drag & drop one or many files here, or click to
                                select one or many files.
                            </p>
                        </div>
                    </section>
                )}
            </Dropzone>
            <Button
                variant='outline-primary'
                className=' d-block my-1 mx-auto'
                onClick={handleOnClick}
            >
                Upload
            </Button>
            {err && <p className='text-white text-center'>{msg}</p>}
            {droppedFiles &&
                droppedFiles.map((file, i) => (
                    <ListGroup variant='flush' key={i} className='photosList'>
                        <ListGroup.Item className='d-flex justify-content-between align-items-center mt-1 p-1'>
                            <span className='fileNameSpan'>{file.name}</span>
                            <Button
                                variant='outline-danger'
                                onClick={() => handleOnDelete(file.name)}
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
        </>
    );
};

export default AddPhoto;
