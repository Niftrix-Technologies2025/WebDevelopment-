
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, Image, X } from "lucide-react";

const BannerUpload = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const bannerConfig = {
    premium: {
      title: "PREMIUM BANNER",
      price: 2599,
      dimensions: "w=300px,h=156cm"
    },
    trending: {
      title: "TRENDING BANNER", 
      price: 500,
      dimensions: "w=132cm,h=205cm"
    }
  };

  const config = bannerConfig[type as keyof typeof bannerConfig];
  const isTrending = type === "trending";

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (isTrending) {
      // Handle multiple images for trending banner (allow more than 2-3)
      const newFiles = Array.from(files);
      const updatedFiles = [...selectedImages, ...newFiles];
      setSelectedImages(updatedFiles);

      // Create previews for new files
      newFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreviews(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      // Handle single image for premium banner (unchanged)
      const file = files[0];
      if (file) {
        setSelectedImage(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedImages.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = () => {
    if (isTrending) {
      if (selectedImages.length > 0) {
        navigate(`/banner-preview/${type}`, { 
          state: { 
            images: imagePreviews,
            config: config 
          } 
        });
      }
    } else {
      if (selectedImage) {
        navigate(`/banner-preview/${type}`, { 
          state: { 
            image: imagePreview,
            config: config 
          } 
        });
      }
    }
  };

  const handleGalleryUpload = () => {
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const hasImages = isTrending ? selectedImages.length > 0 : selectedImage !== null;

  return (
    <div className="min-h-screen bg-brand-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-8 max-w-md mx-auto">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/")}
          className="p-2 text-white hover:bg-brand-dark-gray"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/406ea8f8-ec27-4947-b051-07b2795d6b40.png" 
            alt="ROBIZ Logo"
            className="w-12 h-8 object-contain"
          />
        </div>
        <div className="w-10 h-10 bg-brand-dark-gray rounded-full overflow-hidden">
          <div className="w-full h-full bg-muted"></div>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 mt-8 mb-8 max-w-md mx-auto">
        <h1 className="text-brand-gold text-xl font-bold text-center">{config?.title}</h1>
      </div>

      {/* Upload Area */}
      <div className="px-4 max-w-md mx-auto">
        <Card className="bg-brand-dark-gray border-brand-dark-gray">
          <CardContent className="p-6">
            {/* Upload Zone */}
            <div className="mb-6">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple={isTrending}
                />
                <div className="bg-brand-black border-2 border-dashed border-brand-dark-gray rounded-lg h-48 flex items-center justify-center cursor-pointer hover:bg-brand-black/80 transition-colors">
                  {isTrending ? (
                    // Multiple images display for trending (support more images)
                    imagePreviews.length > 0 ? (
                      <div className="w-full h-full p-2 overflow-y-auto">
                        <div className="grid grid-cols-2 gap-2 min-h-full">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative aspect-square">
                              <img 
                                src={preview} 
                                alt={`Banner preview ${index + 1}`} 
                                className="w-full h-full object-cover rounded"
                              />
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  removeImage(index);
                                }}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                          {/* Show count if more than 4 images */}
                          {imagePreviews.length > 4 && (
                            <div className="col-span-2 text-center text-brand-gold text-sm py-2">
                              Total: {imagePreviews.length} images uploaded
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm mb-1">Click to upload multiple banners</p>
                        <p className="text-gray-500 text-xs">You can upload more than 2-3 pictures</p>
                      </div>
                    )
                  ) : (
                    // Single image display for premium (unchanged)
                    imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Banner preview" 
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400 text-sm mb-1">Click to upload banner</p>
                      </div>
                    )
                  )}
                </div>
              </label>
            </div>

            {/* Upload Info */}
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">
                Upload the banner{isTrending ? 's' : ''} in JPG,JPEG,PNG ({config?.dimensions})
              </p>
              {isTrending && (
                <p className="text-brand-gold text-xs mt-1">
                  Upload as many images as you want for the trending banner
                </p>
              )}
            </div>

            {/* Change Banner Button (shown when image is uploaded) */}
            {hasImages && (
              <Button 
                className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 border-0 mb-4 font-semibold"
                onClick={handleGalleryUpload}
              >
                {isTrending ? 'Add More Images' : 'Change Banner'}
              </Button>
            )}

            {/* Gallery Upload Button (shown when no image) */}
            {!hasImages && (
              <Button 
                className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 border-0 mb-4 font-semibold"
                onClick={handleGalleryUpload}
              >
                Upload from Gallery
              </Button>
            )}

            {/* Submit Button */}
            <Button 
              className="w-full bg-brand-gold text-black hover:bg-brand-gold/90 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={!hasImages}
            >
              SUBMIT
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BannerUpload;
