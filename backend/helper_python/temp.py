import os
import glob

def check_filepath(video_file):
    """Check if the video file path is valid and provide debugging info"""
    
    print("="*50)
    print("FILE PATH DEBUGGING")
    print("="*50)
    
    # Get current script directory
    script_dir = os.path.dirname(__file__) if '__file__' in globals() else os.getcwd()
    print(f"Script directory: {script_dir}")
    
    # Check the constructed path
    print(f"Looking for file: {video_file}")
    print(f"Absolute path: {os.path.abspath(video_file)}")
    
    # Check if file exists
    if os.path.exists(video_file):
        print("✓ FILE FOUND!")
        
        # Get file info
        file_size = os.path.getsize(video_file)
        print(f"File size: {file_size:,} bytes ({file_size/1024/1024:.2f} MB)")
        
        # Check if it's readable
        if os.access(video_file, os.R_OK):
            print("✓ File is readable")
        else:
            print("✗ File exists but is not readable (permission issue)")
            
        return True
    else:
        print("✗ FILE NOT FOUND!")
        
        # Show what files ARE in the directory
        directory = os.path.dirname(video_file) if os.path.dirname(video_file) else script_dir
        print(f"\nFiles in directory '{directory}':")
        
        try:
            all_files = os.listdir(directory)
            if all_files:
                for file in sorted(all_files):
                    file_path = os.path.join(directory, file)
                    if os.path.isfile(file_path):
                        size = os.path.getsize(file_path)
                        print(f"  📄 {file} ({size:,} bytes)")
                    else:
                        print(f"  📁 {file}/")
            else:
                print("  (directory is empty)")
        except PermissionError:
            print("  (cannot read directory - permission denied)")
        except FileNotFoundError:
            print("  (directory does not exist)")
        
        # Look for video files specifically
        print(f"\nVideo files in '{directory}':")
        video_extensions = ['*.mp4', '*.avi', '*.mov', '*.mkv', '*.flv', '*.wmv', '*.m4v', '*.webm']
        video_files = []
        
        for ext in video_extensions:
            pattern = os.path.join(directory, ext)
            video_files.extend(glob.glob(pattern, recursive=False))
            # Also check uppercase
            pattern = os.path.join(directory, ext.upper())
            video_files.extend(glob.glob(pattern, recursive=False))
        
        if video_files:
            for vf in sorted(set(video_files)):  # Remove duplicates and sort
                size = os.path.getsize(vf)
                print(f"  🎬 {os.path.basename(vf)} ({size:,} bytes)")
        else:
            print("  (no video files found)")
        
        return False

# Test your specific path
if __name__ == "__main__":
    # Your current approach
    video_file = os.path.join(os.path.dirname(__file__), "vdo.mp4")
    
    print("Testing your file path:")
    file_exists = check_filepath(video_file)
    
    if not file_exists:
        print("\n" + "="*50)
        print("SUGGESTED FIXES:")
        print("="*50)
        print("1. Make sure 'vdo.mp4' is in the same folder as your .py file")
        print("2. Check the filename spelling (case-sensitive on some systems)")
        print("3. Try using just the filename: video_file = 'vdo.mp4'")
        print("4. Use absolute path if file is elsewhere")
        print("5. Check file permissions")
        
        # Alternative paths to try
        print("\nAlternative paths to try:")
        alternatives = [
            "vdo.mp4",  # Simple filename
            "./vdo.mp4",  # Explicit current directory
            os.path.abspath("vdo.mp4"),  # Absolute path
        ]
        
        for alt in alternatives:
            print(f"  {alt}")
            if os.path.exists(alt):
                print(f"    ✓ This path works!")
            else:
                print(f"    ✗ Not found")