import cv2
import os

def extract_frames(video_path, output_folder):
    if not os.path.exists(video_path):
        print("❌ Error: Video file not found!")
        return
    
    cap = cv2.VideoCapture(video_path)

    if not cap.isOpened():
        print("❌ Error: Video file not opening (Maybe Codec Missing or Wrong Path)")
        return

    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    frame_count = 0
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        filename = f"{output_folder}/img{frame_count}.jpg"
        cv2.imwrite(filename, frame)
        print(f"Extracted: {filename}")

    cap.release()
    print(f"✅ All {frame_count} frames extracted successfully!")

# Example Usage
video_path = r"F:\Professional\Codes\VS Codes\Testing\wlt design\video.mp4"  # Add Full Path 🔥
output_folder = "frames"

extract_frames(video_path, output_folder)
