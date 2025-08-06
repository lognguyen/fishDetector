"use client";
import React, { useEffect, useRef, useState } from 'react';
import Webcam from "react-webcam";
import { load as cocoSSDLoad } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
import { renderPrediction } from '@/utils/RenderPrediction';

let detectInterval;

function ObjectDetector() {

    const [isLoading, setIsLoading] = useState(true);
    // const [isBuffer, setIsBuffer] = useState(true);

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    const toggleCoco = async () => {
        setIsLoading(true)
        const net = await cocoSSDLoad();
        setIsLoading(false)

        detectInterval = setInterval(() => {
            runObjectDetector(net);
        }, 10);

        async function runObjectDetector(net) {
            if (canvasRef.current && webcamRef.current !== null &&
                webcamRef.current.video?.readyState === 4
            ) {
                canvasRef.current.width = webcamRef.current.video.videoWidth;
                canvasRef.current.height = webcamRef.current.video.videoHeight;

                // find detected objects
                const detectedObjects = await net.detect(webcamRef.current.video,undefined,0.6);
                console.log(detectedObjects)

                const context = canvasRef.current.getContext(
                    "2d"
                );
                renderPrediction(detectedObjects, context);


            }
        }


        async function runObjectDetector(net) {
            if (canvasRef.current && webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
                canvasRef.current.width = webcamRef.current.video.videoWidth;
                canvasRef.current.height = webcamRef.current.video.videoHeight;


                // find detected object
                const detectedObjects = await net.detect(webcamRef.current.video, undefined, 0.6)

                const context = canvasRef.current.getContext("2d");
                renderPrediction(detectedObjects, context);
            }
        }

    }



    const toggleShowCam = () => {
        if (webcamRef.current !== null && webcamRef.current.video?.readyState === 4) {
            const camWidth = webcamRef.current.video.videoWidth;
            const camHeight = webcamRef.current.video.videoHeight;


            webcamRef.current.video.width = camWidth;
            webcamRef.current.video.height = camHeight;
        }
    };


    useEffect(() => {
        toggleCoco()
        toggleShowCam()
    }, []);

    return (
        <div className='mt-8'>{
            isLoading ? (
                <div className='gradient-text'>Loading ...</div>
            ) :
                <div className="relative flex justify-center items-center gradient p-1.5 rounded-md">
                    {/* webcam */}
                    <Webcam
                        ref={webcamRef}
                        className="rounded-md w-full lg:h-[720px]" muted />
                    {/* canvas */}
                    <canvas ref={canvasRef}
                        className="absolute top-0 left-0 z-999999 w-full lg:h-[720px]">

                    </canvas>
                </div>}
        </div>
    );
}

export default ObjectDetector;