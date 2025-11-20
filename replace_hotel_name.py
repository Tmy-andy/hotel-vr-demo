import os
import re

def replace_in_file(filepath, old_text, new_text):
    """Replace text in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count replacements
        count = content.count(old_text)
        
        if count > 0:
            new_content = content.replace(old_text, new_text)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✓ {filepath}: {count} replacements")
            return count
        else:
            return 0
    except Exception as e:
        print(f"✗ Error in {filepath}: {e}")
        return 0

def replace_in_directory(directory, old_text, new_text, extensions):
    """Recursively replace text in all files with given extensions"""
    total_replacements = 0
    files_modified = 0
    
    for root, dirs, files in os.walk(directory):
        # Skip node_modules, .git, etc.
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '__pycache__', 'venv']]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                count = replace_in_file(filepath, old_text, new_text)
                if count > 0:
                    total_replacements += count
                    files_modified += 1
    
    return files_modified, total_replacements

if __name__ == "__main__":
    # Configuration
    project_dir = r"c:\Users\ASUS\OneDrive\Desktop\hotel-app"
    old_name = "Maris"
    new_name = "Link"
    
    # File extensions to search
    extensions = ['.html', '.css', '.js', '.json', '.txt', '.md']
    
    print(f"Starting replacement: '{old_name}' → '{new_name}'")
    print(f"Directory: {project_dir}")
    print("=" * 60)
    
    files_modified, total_replacements = replace_in_directory(
        project_dir, 
        old_name, 
        new_name, 
        extensions
    )
    
    print("=" * 60)
    print(f"\n✓ Complete!")
    print(f"Files modified: {files_modified}")
    print(f"Total replacements: {total_replacements}")
