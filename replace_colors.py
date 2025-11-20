import os
import re

def replace_colors_in_file(filepath):
    """Replace color codes in a file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Primary blue color
        primary_blue = '#137fec'
        primary_blue_dark = '#0d6edb'
        
        # Color replacements mapping
        color_replacements = [
            # Gold/Yellow colors
            (r'#C4A962', primary_blue),
            (r'#d4b972', primary_blue),
            (r'#D4AF37', primary_blue),
            (r'#F59E0B', primary_blue),
            (r'#fbbf24', primary_blue),
            (r'#f59e0b', primary_blue),
            (r'#fef3c7', 'rgba(19, 127, 236, 0.1)'),
            (r'#fffbeb', 'rgba(19, 127, 236, 0.05)'),
            (r'#fcd34d', primary_blue),
            (r'#d97706', primary_blue_dark),
            
            # Teal/Green colors (from voucher page)
            (r'#0D9488', primary_blue),
            (r'#0a7e73', primary_blue_dark),
            (r'#10b981', primary_blue),  # Success green
            (r'#0EA5E9', primary_blue),  # Sky blue
            
            # Amber colors
            (r'amber-500', 'blue-500'),
            (r'amber', 'blue'),
            
            # Color names in comments or text
            (r'gold', 'blue'),
            (r'amber', 'blue'),
            (r'teal', 'blue'),
        ]
        
        # Apply replacements
        for old_color, new_color in color_replacements:
            content = re.sub(old_color, new_color, content, flags=re.IGNORECASE)
        
        # Count changes
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ {filepath}")
            return 1
        else:
            return 0
            
    except Exception as e:
        print(f"✗ Error in {filepath}: {e}")
        return 0

def process_directory(directory, extensions):
    """Process all files in directory"""
    files_modified = 0
    
    for root, dirs, files in os.walk(directory):
        # Skip certain directories
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.git', '__pycache__', 'venv']]
        
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                filepath = os.path.join(root, file)
                files_modified += replace_colors_in_file(filepath)
    
    return files_modified

if __name__ == "__main__":
    project_dir = r"c:\Users\ASUS\OneDrive\Desktop\hotel-app"
    extensions = ['.html', '.css', '.js', '.json']
    
    print("Starting color replacement to primary blue (#137fec)")
    print(f"Directory: {project_dir}")
    print("=" * 60)
    
    files_modified = process_directory(project_dir, extensions)
    
    print("=" * 60)
    print(f"\n✓ Complete! Files modified: {files_modified}")
