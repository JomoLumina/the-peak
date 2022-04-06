import { FC, useEffect, useRef, useState } from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel, Theme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Search as SearchIcon} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles()((theme: Theme) => {
  return {
    root: {
      display: 'flex',
      color: theme.palette.common.white,
      transition: 'all 0.2s ease',
      marginRight: 80,
      background: '#2153A3',
      [theme.breakpoints.down('sm')]:{
        marginRight: 0
      }
    },
    formControl: {
      flex: 1
    },
    label: {
      color: theme.palette.common.white,
      opacity: 0.4,
      paddingLeft: 10
    },
    input: {
      color: theme.palette.common.white,
      borderBottom: `2px solid ${theme.palette.common.white}`
    },
    adornment:{
      borderBottom: `2px solid ${theme.palette.common.white}`,
      position: 'relative',
      bottom: -7,
      paddingBottom: 20
    },
    icon:{
      color: theme.palette.common.white,
      paddingLeft: 10,
      paddingRight: 10,
    }
  }
});

const Search: FC = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const inputRef: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const [query,setQuery] = useState<string>('');
  const [showSearchField, setShowSearchField] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if(!query){
      setShowSearchField(false);
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSearchField(!showSearchField);
  };

  useEffect(() => {
    if(query){
      navigate(`/search/${query}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <FormControl variant="standard" className={classes.root} sx={{width: showSearchField ? 300 : 0}}>
      <InputLabel htmlFor="standard-adornment-search" className={classes.label}>
        Search all news
      </InputLabel>
      <Input
        id="standard-adornment-search"
        value={query}
        onChange={handleChange}
        onBlur={handleBlur}
        className={classes.input}
        style={{paddingLeft: showSearchField ? 10 : 0}}
        inputRef={inputRef}
        endAdornment={
          <InputAdornment className={classes.adornment} position="end">
            <IconButton
              aria-label="search transition display"
              onClick={handleClick}
              className={classes.icon}>
              <SearchIcon/>
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Search;