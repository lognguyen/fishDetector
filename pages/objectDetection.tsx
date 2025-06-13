import { useEffect, useState } from "react";
import { load as cocoModalLoad } from '@tensorflow-models/coco-ssd';


export default function ObjectDetection() {
  const [objectDetector, setObjectDetectors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadOCRModel = async () => {
      const model = await cocoModalLoad();
      setObjectDetectors(model);
      setIsLoading(false);
  };

  useEffect(() => {
      loadOCRModel();
  }, []);
}