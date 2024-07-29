"use client";

import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";

import { storage } from "@/lib/firebase";
import { cn } from "@/lib/utils";

export default function DropzoneConponent({
    email,
    
    onChange,
}: {
    email: string;
   
    onChange: (value: string) => void;
}) {
    const [imageURl, setImageUrl] = useState("");
    // max size of 20MB accepted
    const maxSize = 20971520;

    function getCurrentDateTime() {
        const date = new Date();
        return date.toISOString();
    }

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = async () => {
                await uploadFile(file);
            };
            reader.readAsArrayBuffer(file);

            reader.onabort = () => toast.error("file reading was aborted");
            reader.onerror = () => toast.error("file reading has failed");
        });

        const uploadFile = async (selectedFile: File) => {
            const toastId = toast.loading("Uploading file...");

            const imageRef = ref(
                storage,
                `users/${email}/files/${getCurrentDateTime()}`
            );
            await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                onChange(downloadURL);
            });

            toast.success("File uploaded successfully!", { id: toastId });
        };
    };
    return (
        <Dropzone onDrop={onDrop} minSize={0} maxSize={maxSize}>
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections,
            }) => {
                const isFileTooLarge =
                    fileRejections.length > 0 &&
                    fileRejections[0].file.size > maxSize;

                return (
                    <section>
                        <div
                            {...getRootProps()}
                            className={cn(
                                "mt-10 hover:cursor-pointer h-52 flex justify-center items-center p-5 border border-dashed border-primary rounded-lg text-center text-primary bg-background",
                                isDragActive
                                    ? "bg-background text-primary  animate-pulse"
                                    : "bg-background text-primary"
                            )}
                        >
                            <input {...getInputProps()} />
                            {!isDragActive &&
                                "Click here or drop a file to upload!"}
                            {isDragActive &&
                                !isDragReject &&
                                "Drop to upload this file!"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && (
                                <div className="text-red-500 mt-2">
                                    File is too large
                                </div>
                            )}
                        </div>
                    </section>
                );
            }}
        </Dropzone>
    );
}
