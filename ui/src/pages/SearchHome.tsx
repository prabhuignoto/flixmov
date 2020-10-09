import React from "react";
import { Movie2Icon } from "../components/icons";
import MediaMessage from "../components/media-message/media-message";
import MediaSearchBox from "../components/media-search-box/media-searchbox";
import MediaToggle, {
    MediaToggleOption
} from "../components/media-toggle/media-toggle";
import { MediaType } from "../containers/models";
import SearchContainer from "../containers/search";
import useResponsive, { responsiveProps } from "../effects/useResponsive";
import emotion from '@emotion/styled';

const SearchHomeWrapper = emotion.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const SearchResultsWrapper = emotion.div`
  margin-top: 2rem;
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MediaSearchBoxWrapper = emotion.div<{ resx?: responsiveProps }>`
  width: ${(p) => (p.resx?.isBigScreen ? "35%" : "50%")};
  height: ${(p) => (p.resx?.isBigScreen ? "3rem" : "2.5rem")};
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #1f1f1f;
  background: #181818;
  border-radius: .25rem;
  padding: 1rem;
`;

const SearchOptionToggle = emotion.div<{ resx?: responsiveProps }>`
  width: 250px;
  height: ${(p) => (p.resx?.isBigScreen ? "2.5rem" : "2rem")};
  margin-left: 2rem;
`;

const MessageWrapper = emotion.div`
  width: 100%;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
  transform: translateY(-30%);
`;

const SearchHome: React.FunctionComponent<{}> = () => {
  const props = useResponsive();
  const [search, setSearch] = React.useState({
    term: "",
    type: MediaType.MOVIES,
  });

  const onSearch = (val: string) => {
    setSearch({
      term: val,
      type: search.type,
    });
  };

  const handleToggleSelection = React.useCallback((opt: MediaToggleOption) => {
    if (opt.value === "movies") {
      setSearch({
        term: "",
        type: MediaType.MOVIES,
      });
    } else {
      setSearch({
        term: "",
        type: MediaType.TV,
      });
    }
  }, []);

  return (
    <SearchHomeWrapper>
      <MediaSearchBoxWrapper resx={props}>
        <MediaSearchBox onSearch={onSearch}></MediaSearchBox>
        <SearchOptionToggle resx={props}>
          <MediaToggle
            options={[
              { label: "movies", value: "movies" },
              {
                label: "television",
                value: "television",
              },
            ]}
            onSelect={handleToggleSelection}
          />
        </SearchOptionToggle>
      </MediaSearchBoxWrapper>
      {!search.term && (
        <MessageWrapper>
          <MediaMessage
            message="Search your favorite Movies and TV shows."
            icon={<Movie2Icon color="#464646"/>}
          />
        </MessageWrapper>
      )}
      <SearchResultsWrapper>
        <SearchContainer
          type={search.type}
          query={search.term}
          key={search.term}
        />
      </SearchResultsWrapper>
    </SearchHomeWrapper>
  );
};

export default SearchHome;
