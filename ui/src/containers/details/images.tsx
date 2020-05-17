import React from "react";
import { useApolloClient } from "@apollo/client";
import { images } from "../../gqls/images";
import MediaObjects from "../../components/media-objects/media-objects";
import { MediaObject, ThumbnailSize } from "./../../models/MediaObject";
import styled from "styled-components";
import useResponsive from "../../effects/useResponsive";
import { Images } from "../../models/Images";

interface ImageResultDetails {
  getImages: Images;
}

interface ImagesModel {
  movieId?: number;
}

const MediaObjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  margin: 0 auto;
`;

const MediaObjectHeader = styled.div`
  margin-bottom: 0.5rem;
  font-family: "Poppins";
  font-size: 0.9rem;
  font-weight: 300;
  color: #fff;
  text-align: left;
  padding-left: 0.2rem;
  text-transform: uppercase;
`;

const ImagesView: React.FunctionComponent<ImagesModel> = React.memo(
  ({ movieId }) => {
    const client = useApolloClient();
    const [loading, setLoading] = React.useState(false);
    const [detailsData, setDetailsData] = React.useState<Images>();
    const { isBigScreen } = useResponsive();
    const containerRef = React.createRef<HTMLDivElement>();
    const executeQuery = async () => {
      setLoading(true);
      const { data } = await client.query<ImageResultDetails>({
        query: images,
        variables: {
          lang: "en-US",
          movie_id: movieId,
        },
        fetchPolicy: "cache-first",
      });
      if (data) {
        setDetailsData(data.getImages);
      }
      setLoading(false);
    };

    React.useEffect(() => {
      if (movieId) {
        executeQuery();
      }
    }, [movieId]);

    let view: any = null;

    if (!loading && detailsData && detailsData.id) {
      const { backdrops } = detailsData;
      view = (
        <>
          {backdrops && backdrops.length ? (
            <MediaObjectsWrapper>
              <MediaObjects
                title="Posters"
                id="movie_backdrops"
                items={backdrops.map<MediaObject>(
                  ({ file_path, height, width }) => ({
                    name: "",
                    path: file_path,
                    id: file_path,
                  })
                )}
                height={isBigScreen ? 350 : 400}
                itemSize={isBigScreen ? 400 : 400}
                thumbnailSize={ThumbnailSize.large}
                noTitle
              />
            </MediaObjectsWrapper>
          ) : null}
        </>
      );
    }
    return (
      <>
        {view}
      </>
    );
  },
  (prev, current) => prev.movieId === current.movieId
);

export default ImagesView;
