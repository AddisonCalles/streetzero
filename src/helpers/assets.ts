const loadImage = async (src: string): Promise<HTMLImageElement> => {
    const img = new Image();
    img.src = src;
    return new Promise((resolve) => {
        img.onload = () => {
            resolve(img);
        };
    });
};
