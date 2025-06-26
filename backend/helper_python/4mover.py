import os
import shutil

def move_summary_file():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    src_file = os.path.join(current_dir, 'response_summary.json')
    dest_dir = os.path.abspath(os.path.join(current_dir, '../../frontend/public'))
    dest_file = os.path.join(dest_dir, 'response_summary.json')

    try:
        os.makedirs(dest_dir, exist_ok=True)
        shutil.move(src_file, dest_file)
        print(f"Moved {src_file} to {dest_file}")
    except FileNotFoundError:
        print("Error: response_summary.json not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    move_summary_file()
