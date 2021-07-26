import useSWR from 'swr'

interface WebsiteSnapshotResponse {
  url: string;
  image: string;
  success: boolean;
}


const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())

function useBitlyImage(urlInput: string) {
  const bitlyUrl: string = `https://bit.ly/${urlInput}`;
  console.log("Checking url.", bitlyUrl);

  const { data, error } = useSWR(`${process.env.NEXT_PUBLIC_SNAPSHOT_LAMBDA_ENDPOINT}?url=${bitlyUrl}`, fetcher)

  return {
    response: data,
    isLoading: !error && !data,
    isError: error
  }
}

type BitlyImageProps = {
    url: string
}
 
const BitlyImage: React.FC<BitlyImageProps> = ({url}) => {

    const { response, isLoading, isError } = useBitlyImage(url)

    if (isLoading) return <h1>Loading...</h1>// <Spinner />
    if (isError) return <h1>Error!</h1>

    const success: boolean = response.success;
    const image: string | undefined = (response.image && response.image.length) ? `data:image/jpeg;charset=utl-8;base64,${response.image}` : undefined;
    const bitlyUrl: string = response.url;

    if (image) {
        return (
            <img
                className="object-contain rounded-lg rounded-t-none"
                alt="Bitly Image Result"
                style={{ pointerEvents: "none" }}
                src={image}
            />
        );
    } {
        return <h1>No Image</h1>
    }

}
 
export default BitlyImage;