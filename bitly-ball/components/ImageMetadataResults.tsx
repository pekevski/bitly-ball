import React from 'react';
import { ScreenshotResponse } from '../types/ScreenshotResponse';

type ImageMetadataResultsProps = {
  url: string;
  imageResponse: ScreenshotResponse;
};

export const ImageMetadataResults: React.FC<ImageMetadataResultsProps> = ({
  url,
  imageResponse
}) => {
  return (
    <div className="align-bottom bg-gray-100 p-5">
      <div className="flex sm:flex-row justify-between pb-5">
        <h4>
          {imageResponse.success ? '200 OK Success!' : '404 Fail!'}{' '}
          {imageResponse.success ? '+' : '-'}
          {url.length} points
        </h4>
        <h4>{imageResponse.url}</h4>
      </div>
    </div>
  );
};
