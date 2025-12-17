import json
import subprocess
import os

def fetch_videos(channel_url):
    print(f"Fetching videos from {channel_url}...")
    # Use yt-dlp to get flat playlist info
    # We use subprocess to call the CLI because it's robust
    # --flat-playlist: don't download videos
    # -J: dump JSON data
    cmd = [
        "yt-dlp",
        "--flat-playlist",
        "-J",
        channel_url
    ]
    
    # Check if we are in a venv or need to use specific path
    # Assuming 'yt-dlp' is in the path if run from workflow, 
    # or we can try to use the one we just installed if running locally.
    
    # For this script to be portable (CI and local), we'll assume yt-dlp is available in shell.
    # If running locally with venv, the user needs to activate it or we use sys.executable
    
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        data = json.loads(result.stdout)
        
        # 'entries' contains the list of videos
        entries = data.get('entries', [])
        print(f"Found {len(entries)} videos.")
        return entries
    except subprocess.CalledProcessError as e:
        print(f"Error running yt-dlp: {e}")
        return []

def update_files(videos):
    # Format: [{"poemSrc": "id", "poemTitle": "title"}]
    # The original file only had 'poemSrc', but having title is useful (and used in my previous edit).
    
    formatted_videos = []
    for v in videos:
        # Some entries might be private or deleted, check if id exists
        if 'id' in v:
            formatted_videos.append({
                "poemSrc": v['id'],
                "poemTitle": v.get('title', '')
            })
            
    # Write poem-ids.json (Complete List)
    full_path = 'assets/javascripts/poem-ids.json'
    with open(full_path, 'w', encoding='utf-8') as f:
        json.dump(formatted_videos, f, indent=4, ensure_ascii=False)
    print(f"Updated {full_path} with {len(formatted_videos)} videos.")
    
    # Write poem-ids-small.json (Top 12 for Home Page)
    # The original small file had ~32 entries. Let's keep top 20.
    small_list = formatted_videos[:20]
    small_path = 'assets/javascripts/poem-ids-small.json'
    with open(small_path, 'w', encoding='utf-8') as f:
        json.dump(small_list, f, indent=4, ensure_ascii=False)
    print(f"Updated {small_path} with {len(small_list)} videos.")

if __name__ == "__main__":
    CHANNEL_URL = "https://www.youtube.com/channel/UCA__E2cnlxfRKW3PoG5CL0Q/videos"
    videos = fetch_videos(CHANNEL_URL)
    if videos:
        update_files(videos)
