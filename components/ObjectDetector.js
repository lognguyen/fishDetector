"use client";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd"

const detectInterval;

function ObjectDetector() {

    const [isBuffer, setIsBuffer] = useState(true);

    const camRef = useRef(null);

    const toggleCoco = async () => {
        setIsBuffer(true)
        const cocoSSDLoader = await cocoSSDLoad();
        setIsBuffer(false)

        detectInterval = setInterval(() => {
            runObjectDetector();
        }, 10)
    }

    const toggleShowCam = () => {
        if (camRef.current !== null && camRef.current.video?.readyState === 4) {
            const camWidth = camRef.current.video.videoWidth;
            const camHeight = camRef.current.video.videoHeight;


            camRef.current.video.width = camWidth;
            camRef.current.video.height = camHeight;
        }
    };


    useEffect(() => {
        toggleShowCam()
    }, [])

    return (
        <div className='mt-8'>{
            isLoading ? (
                <div className=''>Loading mode</div>
            ) :
                <div className="relative flex justify-center">
                    {/* webcam */}
                    <Webcam
                        ref={camRef}
                        className="rounded-md w-full lg:h-[720px]" muted />
                    {/* cavas*/}
                </div>}
        </div>
    );
}

export default ObjectDetector;