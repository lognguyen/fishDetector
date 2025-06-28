import ObjectDetector from "@/components/objectDetector";

export default function Home() {
  return (
   <main className="flex min-h-screen flex-col p-8">
    <h1 className="font-bold" > Detection Area</h1>
    <ObjectDetector />
   </main>
  );
}
