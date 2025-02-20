// src/components/shared/preview.tsx
interface PreviewProps {
  title: string;
  description: string;
  image: string;
}

export const Preview: React.FC<PreviewProps> = ({ title, description, image }) => {
  return (
    <div className="w-full max-w-2xl border rounded-lg overflow-hidden shadow-lg">
      {image && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};