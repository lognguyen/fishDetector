import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

export const processImage = async (uri: string) => {
  try {
    const processedImage = await manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: SaveFormat.JPEG }
    );
    return processedImage.uri;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};

export const filterImage = (imageData: any, filterType: string) => {
  // Implement filtering logic based on filterType
  // This is a placeholder for future image filtering functionality
  return imageData;
};