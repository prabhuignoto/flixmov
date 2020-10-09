import { useApolloClient } from '@apollo/client';
import React from 'react';
import MediaObjects from '../../components/media-objects/media-objects';
import useResponsive from '../../effects/useResponsive';
import { images, tvImages } from '../../gqls/images';
import { Images } from '../../models/Images';
import { SliderType } from '../../models/Slider';
import { MediaObject, ThumbnailSize } from './../../models/MediaObject';
import emotion from '@emotion/styled';

interface ImageResultDetails {
  getImages: Images;
  getTvImages: Images;
}

interface ImagesModel {
  movieId?: number | string;
  sliderType: SliderType;
}

const MediaObjectsWrapper = emotion.div`
  display: flex;
  flex-direction: column;
  width: 97%;
  margin: 0 auto;
`;

const ImagesView: React.FunctionComponent<ImagesModel> = React.memo(
  ({ movieId, sliderType }) => {
    const client = useApolloClient();
    const [loading, setLoading] = React.useState(false);
    const [detailsData, setDetailsData] = React.useState<Images>();
    const { isBigScreen } = useResponsive();
    const executeQuery = async () => {
      setLoading(true);
      const { data } = await client.query<ImageResultDetails>({
        query: sliderType === SliderType.movies ? images : tvImages,
        variables: {
          lang: 'en-US',
          movie_id: movieId,
        },
        fetchPolicy: 'cache-first',
      });
      if (data) {
        const _data =
          sliderType === SliderType.movies ? data.getImages : data.getTvImages;
        setDetailsData(_data);
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
                noTitle
                id="movie_backdrops"
                items={backdrops.map<MediaObject>(({ file_path }) => ({
                  name: '',
                  path: file_path,
                  id: file_path,
                }))}
                height={isBigScreen ? 370 : 280}
                itemSize={isBigScreen ? 500 : 380}
                thumbnailSize={ThumbnailSize.large}
                showExpand
              />
            </MediaObjectsWrapper>
          ) : null}
        </>
      );
    }
    return <>{view}</>;
  },
  (prev, current) => prev.movieId === current.movieId
);

export default ImagesView;
