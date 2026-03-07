async function compressImageViaCanvas(file, quality = 0.82, maxSize = 1920) {
  const img = document.createElement('img');
  const objectUrl = URL.createObjectURL(file);
  img.src = objectUrl;

  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
  URL.revokeObjectURL(objectUrl);

  return new File([blob], `compressed-${Date.now()}.jpg`, { type: 'image/jpeg' });
}

async function pickWebFile() {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => resolve(input.files?.[0] || null);
    input.click();
  });
}

export async function pickAndCompressImage() {
  let file = null;

  try {
    const picker = await import('expo-image-picker');
    const permission = await picker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await picker.launchImageLibraryAsync({
        mediaTypes: picker.MediaTypeOptions.Images,
        quality: 0.9,
        allowsEditing: true
      });

      if (!result.canceled && result.assets?.[0]) {
        const asset = result.assets[0];
        const blob = await fetch(asset.uri).then((res) => res.blob());
        file = new File([blob], asset.fileName || `upload-${Date.now()}.jpg`, {
          type: blob.type || 'image/jpeg'
        });
      }
    }
  } catch (error) {
    // Falls back to web input picker.
  }

  if (!file) {
    file = await pickWebFile();
  }

  if (!file) return null;
  return compressImageViaCanvas(file);
}
