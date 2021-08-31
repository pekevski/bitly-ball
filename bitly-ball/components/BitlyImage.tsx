import Image from "next/image";
import useSWR from "swr";
import { ScreenshotResponse } from "../types/ScreenshotResponse";
import Loader from './Loader';

type BitlyImageProps = {
  url: string;
  handleSuccess: (response: ScreenshotResponse | undefined) => void;
};

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

const BitlyImage: React.FC<BitlyImageProps> = ({ url, handleSuccess }) => {

    const {response, loading, error} = useBitlyImage(url)

    if (loading) {
      return <Loader />
    }

    handleSuccess(response)

    const image: string | undefined = response && response.image && response.image.length
      ? `data:image/jpeg;charset=utl-8;base64,${response.image}`
      : undefined;

    if (!image) {
      return (
        <h3>Image is corrupted</h3>
      )
    }

    return (
      <div className="rounded-lg">
        <Image
          className="object-contain rounded-lg"
          alt="Bitly Image Result"
          width="1000"
          height="600"
          src={image}
        />
      </div>
    );
    
};

export default BitlyImage;
