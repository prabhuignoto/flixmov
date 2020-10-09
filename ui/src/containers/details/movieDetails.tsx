import {useApolloClient} from '@apollo/client';
import emotion from '@emotion/styled';
import memoize from 'memoize-one';
import React from 'react';
import {animated, config, useSpring} from 'react-spring';
import CardDetails from '../../components/media-details/details-main';
import Loader from '../../components/media-loader';
import useResponsive, {responsiveProps} from '../../effects/useResponsive';
import {details} from '../../gqls/movieDetails';
import {MovieDetail} from '../../models/MovieDetails';
import {SliderType} from '../../models/Slider';

const getHeight = memoize(
  ({isBigScreen, isTabletOrMobile}: responsiveProps) => {
    let height;
    if (isBigScreen) {
      height = 820;
    } else if (isTabletOrMobile) {
      height = 720;
    } else {
      height = 500;
    }
    return height;
  }
);

const MovieDetails: React.FunctionComponent<{
  movieId: number | string;
  handleClose?: () => void;
  hide?: boolean;
}> = ({movieId, handleClose, hide}) => {
  const [data, setData] = React.useState<MovieDetail | null>();
  const [loading, setLoading] = React.useState(false);
  const client = useApolloClient();
  const [mounted, setMounted] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const resxProps = useResponsive();

  const [props, setProps] = useSpring(() => ({
    height: 0,
    opacity: 1,
    config: config.default,
  }));

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && movieId) {
      setLoading(true);
      if (wrapperRef && wrapperRef.current) {
        setProps({
          height: getHeight(resxProps),
          from: {
            height: 0,
          },
          onRest: () => executeQuery(),
        });
      }
    }
  }, [movieId]);

  React.useEffect(() => {
    if (mounted && hide) {
      setProps({
        height: 0,
        from: {
          height: getHeight(resxProps),
        },
      });
    }
  }, [hide]);

  const executeQuery = async () => {
    const {data} = await client.query({
      query: details,
      variables: {
        lang: 'en-US',
        id: movieId,
      },
    });

    setData(data.getDetails);

    setLoading(false);
  };

  let view = null;

  if (!loading && data && !hide) {
    const {
      poster_path,
      title,
      id,
      overview,
      genres,
      runtime,
      release_date,
      original_language,
      imdb_id,
      vote_average,
      video,
      production_companies,
    } = data;

    view = (
      <CardDetails
        poster_path={poster_path}
        title={title}
        id={id}
        overview={overview}
        handleClose={handleClose}
        genres={genres}
        runtime={runtime}
        release_date={release_date}
        original_language={original_language}
        isLoading={false}
        imdb_id={imdb_id}
        vote_average={vote_average}
        video={video}
        key={movieId}
        production_companies={production_companies}
        sliderType={SliderType.movies}
      />
    );
  } else if (loading) {
    view = <Loader />;
  }

  const Wrapper = emotion(animated.div)`
    position: relative;
    width: 98%;
    margin: 0 auto;
    border-radius: 0.2rem;
  `;

  return (
    <Wrapper style={props} ref={wrapperRef} key={movieId}>
      {view}
    </Wrapper>
  );
};

export default React.memo(
  MovieDetails,
  (prev, cur) => prev.movieId === cur.movieId
);
