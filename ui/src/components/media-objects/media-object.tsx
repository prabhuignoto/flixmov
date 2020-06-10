import React from "react";
import {
  MediaObject,
  ObjectImage,
  FallbackImage,
  ObjectName,
  ImageContainer,
  ImageInfo,
} from "./media-object.style";
import { config, useTransition } from "react-spring";
import {
  MediaObject as MediaObjectModel,
  ThumbnailSize,
} from "../../models/MediaObject";

import { UserIcon } from "./../icons/index";
import useResponsive from "../../effects/useResponsive";

const MediaObjectView: React.FunctionComponent<MediaObjectModel> = React.memo(
  ({
    hideObjectWithNoImage,
    id,
    info,
    name,
    noTitle,
    onSelect,
    path,
    thumbnailSize,
  }) => {
    const [loadState, setLoadState] = React.useState({
      loaded: false,
      failed: false,
    });
    const imageUrl = `https://image.tmdb.org/t/p/${
      thumbnailSize === ThumbnailSize.large ? "w500" : "w200"
    }/${path}`;
    const resx = useResponsive();
    const [showInfo, setShowInfo] = React.useState(false);

    const transition = useTransition(loadState.loaded, null, {
      initial: {
        opacity: 0,
        transform: "scale(0)",
      },
      enter: {
        opacity: 1,
        transform: "scale(1)",
      },
      leave: {
        opacity: 0,
        transform: "scale(0)",
      },
      config: config.stiff,
      unique: true,
    });

    const canShow = hideObjectWithNoImage
      ? hideObjectWithNoImage && path
      : !hideObjectWithNoImage;

    return canShow ? (
      <MediaObject
        onClick={() => onSelect && onSelect({ name, id })}
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <ImageContainer noTitle={noTitle ? 1 : 0}>
          <img
            src={imageUrl}
            onLoad={() => setLoadState({ loaded: true, failed: false })}
            onError={() => setLoadState({ loaded: false, failed: true })}
            style={{ display: "none" }}
          />

          {transition.map(({ item, key, props }) => {
            if (item) {
              return (
                <ObjectImage
                  src={imageUrl}
                  loaded={loadState.loaded ? 1 : 0}
                  style={props}
                  noTitle={noTitle ? 1 : 0}
                  key={key}
                  alt={name}
                  loading="lazy"
                ></ObjectImage>
              );
            } else {
              if (loadState.failed) {
                return (
                  <FallbackImage key={key}>
                    <UserIcon color="#ccc" />
                  </FallbackImage>
                );
              } else {
                return null;
              }
            }
          })}
        </ImageContainer>
        {!noTitle && info && showInfo && (
          <ImageInfo resx={resx}>{`${name} as ${info}`}</ImageInfo>
        )}
      </MediaObject>
    ) : null;
  },
  (prev, current) => prev.id === current.id
);

export default MediaObjectView;
