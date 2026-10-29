/**
 * Automatically compresses an image File using HTML5 Canvas to ensure it stays well under the server limit (1MB).
 * Resizes max dimension to 1600px and applies JPEG compression.
 */
export async function compressImage(
	file: File,
	maxDimension = 1600,
	quality = 0.8,
): Promise<File> {
	// Skip non-images or files already below 300KB
	if (!file.type.startsWith("image/") || file.size <= 300 * 1024) {
		return file;
	}

	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new window.Image();
			img.onload = () => {
				let { width, height } = img;
				if (width > maxDimension || height > maxDimension) {
					if (width > height) {
						height = Math.round((height * maxDimension) / width);
						width = maxDimension;
					} else {
						width = Math.round((width * maxDimension) / height);
						height = maxDimension;
					}
				}

				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) {
					resolve(file);
					return;
				}

				ctx.drawImage(img, 0, 0, width, height);
				canvas.toBlob(
					(blob) => {
						if (!blob || blob.size >= file.size) {
							resolve(file);
							return;
						}
						const cleanName = `${file.name.replace(/\.[^/.]+$/, "")}.jpg`;
						const compressedFile = new File([blob], cleanName, {
							type: "image/jpeg",
							lastModified: Date.now(),
						});
						resolve(compressedFile);
					},
					"image/jpeg",
					quality,
				);
			};
			img.onerror = () => resolve(file);
			img.src = e.target?.result as string;
		};
		reader.onerror = () => resolve(file);
		reader.readAsDataURL(file);
	});
}

export default compressImage;

