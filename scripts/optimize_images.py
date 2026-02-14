import os
import re
from PIL import Image

# Files to exclude from conversion for compatibility
EXCLUDE_IMAGES = {'favicon.png', 'apple-touch-icon.png'}

def convert_to_webp(directory):
    path = os.path.abspath(directory)
    converted_count = 0
    skipped_count = 0
    converted_files = set()
    
    print(f"Walking through directory: {path}")
    for root, dirs, files in os.walk(path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                if file in EXCLUDE_IMAGES:
                    print(f"Skipping excluded image: {file}")
                    skipped_count += 1
                    continue
                    
                input_path = os.path.join(root, file)
                # Get relative path for reference update
                rel_path = os.path.relpath(input_path, os.getcwd())
                output_path = os.path.splitext(input_path)[0] + ".webp"
                
                print(f"Converting {file} to WebP...")
                try:
                    with Image.open(input_path) as img:
                        # WebP supports both lossy and lossless. quality=80 is lossy but good for web.
                        img.save(output_path, "WEBP", quality=80)
                    converted_count += 1
                    converted_files.add(rel_path)
                except Exception as e:
                    print(f"Failed to convert {input_path}: {e}")
    
    print(f"\nImage Conversion Summary:")
    print(f"- Successfully converted: {converted_count}")
    print(f"- Skipped: {skipped_count}")
    return converted_files

def update_references(base_dir, converted_files):
    # Create a list of replacement pairs: (original_basename, webp_basename)
    # Sorting by length descending to avoid issues with substrings
    replacements = []
    for conv_file in converted_files:
        basename = os.path.basename(conv_file)
        webp_basename = os.path.splitext(basename)[0] + ".webp"
        replacements.append((basename, webp_basename))
    
    replacements.sort(key=lambda x: len(x[0]), reverse=True)
    
    updated_files_count = 0
    ref_extensions = ('.html', '.js', '.json', '.css')
    
    print(f"\nScanning for references in {base_dir}...")
    for root, dirs, files in os.walk(base_dir):
        # Skip some directories
        dirs[:] = [d for d in dirs if d not in {'.git', '.venv', 'node_modules'}]
        
        for file in files:
            if file.endswith(ref_extensions):
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old_name, new_name in replacements:
                        # Use regex with lookbehind/lookahead to be safe
                        # We want to match old_name only if it's preceded by something like / or quote or whitespace
                        # and followed by similar.
                        pattern = re.compile(re.escape(old_name), re.IGNORECASE)
                        new_content = pattern.sub(new_name, new_content)

                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated references in: {file_path}")
                        updated_files_count += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")

    print(f"\nReference Update Summary:")
    print(f"- Files updated: {updated_files_count}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Convert images to WebP and update references.")
    parser.add_argument("--delete", action="store_true", help="Delete original JPG/PNG files after conversion")
    args = parser.parse_args()

    assets_dir = "assets/images"
    if not os.path.exists(assets_dir):
        print(f"Directory {assets_dir} not found!")
    else:
        converted = convert_to_webp(assets_dir)
        if converted:
            update_references(".", converted)
            
            if args.delete:
                print("\nDeleting original files...")
                for conv_file in converted:
                    try:
                        if os.path.exists(conv_file):
                            os.remove(conv_file)
                            print(f"Deleted: {conv_file}")
                    except Exception as e:
                        print(f"Error deleting {conv_file}: {e}")
            
            print("\nOptimization complete! All images converted and references updated.")
            if not args.delete:
                print("Note: The original JPG/PNG files still exist. Run with --delete to remove them.")
        else:
            print("No images found to convert.")
