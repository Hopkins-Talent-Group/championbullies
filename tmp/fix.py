import os
filepath = r'C:\citrixlabph\championbullies\src\components\Gallery.tsx'
with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()
new_content = content.replace('puppy={state.data.puppy || undefined}', 'puppy={state.data.puppy ?? undefined}')
with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_content)
print('Done')