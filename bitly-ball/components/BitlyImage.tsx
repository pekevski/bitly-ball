import Image from "next/image";
import useSWR from "swr";
import { ScreenshotResponse } from "../types/ScreenshotResponse";
import { memo } from "react";
import Loader from './Loader';

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

const useBitlyImage = (urlInput: string) => {
  
  const bitlyUrl: string = `https://bit.ly/${urlInput}`;
  
  const { data, error } = useSWR<ScreenshotResponse, any>(
    `${process.env.NEXT_PUBLIC_SNAPSHOT_LAMBDA_ENDPOINT}?url=${bitlyUrl}`,
    fetcher,
    { revalidateOnFocus: false, refreshWhenHidden: false }
  );

  return {
    response: data,
    loading: !error && !data,
    error: error,
  };
};

type BitlyImageProps = {
  url: string;
};

const BitlyImage: React.FC<BitlyImageProps> = ({ url }) => {

  const { response, loading, error } = useBitlyImage(url);

  if (loading) return (
    <div className="flex items-center justify-center">
      <Loader />
    </div>
  );
  if (error || !response) return <h1>Error!</h1>;

  const success: boolean = response.success;
  const image: string | undefined =
    response.image && response.image.length
      ? `data:image/jpeg;charset=utl-8;base64,${response.image}`
      : undefined;
  const bitlyUrl: string = response.url;

  if (image) {
    return (
      <div className="rounded-lg rounded-t-none">
        <Image
          className="object-contain"
          alt="Bitly Image Result"
          width="1000"
          height="600"
          src={image}
        />
      </div>
    );
  }
  {
    return <h1>No Image</h1>;
  }
};

export default memo(BitlyImage);
