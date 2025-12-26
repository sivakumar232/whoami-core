'use client';

interface ImageElementProps {
    url?: string;
    alt?: string;
    fit?: 'cover' | 'contain' | 'fill';
}

export function ImageElement({
    url = 'https://via.placeholder.com/400x300',
    alt = 'Image',
    fit = 'cover',
}: ImageElementProps) {
    return (
        <div className="w-full h-full overflow-hidden rounded">
            <img
                src={url}
                alt={alt}
                className="w-full h-full"
                style={{ objectFit: fit }}
            />
        </div>
    );
}
