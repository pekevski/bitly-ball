import Image from "next/image";
import useSWR, { SWRConfiguration } from "swr";
import { ScreenshotResponse } from "../types/ScreenshotResponse";
import Loader from "./Loader";

type BitlyImageProps = {
  url: string;
  width: number;
  height: number;
  handleSuccess: (response: ScreenshotResponse | undefined) => void;
  handleLoading: (loading: boolean) => void;
};

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json());

const useBitlyImage = (urlInput: string) => {
  const bitlyUrl: string = `https://bit.ly/${urlInput}`;

  const config: Partial<SWRConfiguration<ScreenshotResponse, Error>> = {
    revalidateOnFocus: false,
    refreshWhenHidden: false,
  };

  const { data, error } = useSWR<ScreenshotResponse, any>(
    `${process.env.NEXT_PUBLIC_SNAPSHOT_LAMBDA_ENDPOINT}?url=${bitlyUrl}`,
    fetcher,
    config
  );

  return {
    response: data,
    loading: !error && !data,
    error: error,
  };
};

const BitlyImage: React.FC<BitlyImageProps> = ({
  url,
  width,
  height,
  handleSuccess,
  handleLoading,
}) => {
  const { response, loading, error } = useBitlyImage(url);

  if (loading) {
    handleLoading(true);
    return <Loader />;
  }

  handleLoading(false);
  handleSuccess(response);

  const image: string | undefined =
    response && response.image && response.image.length
      ? `data:image/jpeg;charset=utl-8;base64,${response.image}`
      : undefined;

  if (!image || error) {
    return <h3>Image is corrupted</h3>;
  }

  return (
    <div className="rounded-lg">
      <Image
        className="object-contain rounded-lg"
        alt={`Bitly Image Result: ${url}`}
        width={width}
        height={height}
        src={image}
      />
    </div>
  );
};

export default BitlyImage;
